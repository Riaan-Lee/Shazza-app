// src/controllers/paymentController.js
import { v4 as uuidv4 } from 'uuid'
import db from '../config/db.js'
import {
  submitOrder,
  getTransactionStatus,
} from '../services/pesapalService.js'
import {
  createPaymentRecord,
  updatePaymentStatus,
  findPaymentByRef,
} from '../models/paymentModel.js'
import { createFreeBooking as createBookingRecord } from '../models/bookingModel.js'

// Create Pesapal order and save pending payment
export const createPesapalOrder = async (req, res) => {
  try {
    const user_id = req.user.id
    const { event_id, amount, first_name, last_name, email, phone } = req.body

    if (!event_id || !amount)
      return res.status(400).json({ error: 'Missing event_id or amount' })

    // Validate event exists and has capacity
    const [evRows] = await db.query(
      'SELECT id, capacity, is_paid, price FROM events WHERE id = ? LIMIT 1',
      [event_id],
    )
    const ev = evRows?.[0]
    if (!ev) return res.status(404).json({ error: 'Event not found' })
    if (ev.capacity <= 0)
      return res.status(400).json({ error: 'Event is full' })

    if (!ev.is_paid)
      return res
        .status(400)
        .json({ error: 'This event is free — use free booking endpoint' })

    // Use a unique merchant reference
    const merchantRef = `shazza_evt_${event_id}_${uuidv4().slice(0, 8)}`

    // callback url -> frontend return (user-facing)
    const callbackUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success?ref=${merchantRef}`

    const customer = {
      first_name: first_name || 'Guest',
      last_name: last_name || '',
      email: email || 'no-reply@shazza.app',
      phone_number: phone || '',
    }

    // Submit to Pesapal
    const pesapalResp = await submitOrder({
      amount,
      reference: merchantRef,
      description: `Ticket for event ${event_id}`,
      callback_url: callbackUrl,
      customer,
    })

    // Save pending payment (transaction_id = our merchantRef)
    await createPaymentRecord({
      user_id,
      event_id,
      amount,
      method: 'pesapal',
      transaction_ref: merchantRef,
      status: 'pending',
    })

    // Pesapal typically returns redirect url inside response - pass it back to frontend
    return res.json({ success: true, data: pesapalResp })
  } catch (err) {
    console.error(
      'createPesapalOrder error:',
      err?.response?.data || err.message || err,
    )
    return res.status(500).json({ error: 'Failed to create Pesapal order' })
  }
}

// IPN handler — Pesapal posts to this endpoint when payment changes
export const pesapalIPN = async (req, res) => {
  try {
    const body = req.body || {}
    console.log('Pesapal IPN received:', body)

    // Pesapal usually sends orderTrackingId (the server should use it to query)
    const orderTrackingId =
      body?.orderTrackingId ||
      body?.OrderTrackingId ||
      body?.orderTrackingID ||
      body?.order_id ||
      body?.OrderId
    if (!orderTrackingId) {
      console.warn('IPN missing orderTrackingId body:', body)
      // Pesapal expects 200 OK even if IPN incomplete
      return res.status(200).send('OK')
    }

    // Query Pesapal to get canonical status/details
    const statusResp = await getTransactionStatus(orderTrackingId)
    console.log('Pesapal status response:', statusResp)

    // Parse status + merchant reference: adjust based on returned shape
    const status =
      statusResp?.status ||
      statusResp?.payment_status ||
      (statusResp?.data && statusResp.data.status)
    const merchantRef =
      statusResp?.merchant_reference ||
      statusResp?.reference ||
      (statusResp?.data && statusResp.data.reference) ||
      null
    const pesapalTxId =
      statusResp?.orderTrackingId ||
      statusResp?.transactionId ||
      orderTrackingId

    // Common statuses: 'COMPLETED' or 'PAID' or 'successful'
    const successStatuses = [
      'completed',
      'paid',
      'successful',
      'COMPLETED',
      'PAID',
      'SUCCESSFUL',
    ]

    // If merchantRef missing, we try to find payment by orderTrackingId in case Pesapal returned it earlier
    const lookupRef = merchantRef || orderTrackingId

    // Prevent double-processing: check payment exists
    const existingPayment = await findPaymentByRef(lookupRef)
    if (!existingPayment) {
      // Maybe Pesapal returns merchant reference different; try searching payments by transaction_id = orderTrackingId
      // If still not found, log and return OK (we shouldn't fail IPN)
      console.warn('No payment record found for ref:', lookupRef)
      return res.status(200).send('OK')
    }

    // If transaction is successful, update payment status and create booking
    if (status && successStatuses.includes(String(status).toLowerCase())) {
      // update payment to paid; use pesapalTxId as authoritative transaction id
      await updatePaymentStatus({
        transaction_id: existingPayment.transaction_id,
        newTxId: pesapalTxId,
        status: 'paid',
      })

      // ensure no duplicate booking: check bookings table
      const [bkRows] = await db.query(
        `SELECT id FROM bookings WHERE user_id = ? AND event_id = ? LIMIT 1`,
        [existingPayment.user_id, existingPayment.event_id],
      )

      if (bkRows.length === 0) {
        // create booking
        await db.query(
          `INSERT INTO bookings (user_id, event_id, attendees, status) VALUES (?, ?, ?, ?)`,
          [existingPayment.user_id, existingPayment.event_id, 1, 'confirmed'],
        )
        // reduce capacity
        await db.query(
          `UPDATE events SET capacity = capacity - 1 WHERE id = ? AND capacity > 0`,
          [existingPayment.event_id],
        )
      }

      return res.status(200).send('OK')
    } else {
      // mark as failed
      await updatePaymentStatus({
        transaction_id: existingPayment.transaction_id,
        newTxId: pesapalTxId,
        status: 'failed',
      })
      return res.status(200).send('OK')
    }
  } catch (err) {
    console.error(
      'pesapalIPN error:',
      err?.response?.data || err.message || err,
    )
    // acknowledge Pesapal to avoid retries loop - log for debugging
    return res.status(500).send('Error')
  }
}
