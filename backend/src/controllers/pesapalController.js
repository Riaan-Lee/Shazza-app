import { v4 as uuidv4 } from 'uuid'
import db from '../config/db.js'
import {
  submitOrder,
  getTransactionStatus,
} from '../services/pesapalService.js'

export const createOrder = async (req, res) => {
  try {
    const user_id = req.user?.id || null
    const { event_id, amount, first_name, last_name, email, phone } = req.body

    if (!event_id || !amount)
      return res.status(400).json({ error: 'Missing event_id or amount' })

    const reference = `shazza_${event_id}_${uuidv4().slice(0, 8)}`
    const callbackUrl = `${process.env.FRONTEND_URL}/payment/success?ref=${reference}`

    const customer = {
      first_name: first_name || 'Guest',
      last_name: last_name || '',
      email: email || 'no-reply@shazza.app',
      phone_number: phone || '',
    }

    const pesapalRes = await submitOrder({
      amount,
      reference,
      description: `Ticket for event ${event_id}`,
      callback_url: callbackUrl,
      customer,
    })

    // Save initial payment record
    await db.query(
      `INSERT INTO payments (user_id, event_id, amount, method, transaction_id, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, event_id, amount, 'pesapal', reference, 'pending'],
    )

    return res.json({ success: true, data: pesapalRes })
  } catch (err) {
    console.error('createOrder error:', err)
    return res.status(500).json({ error: 'Failed to create order' })
  }
}

//------------------------------------------------------
// IPN HANDLER
//------------------------------------------------------
export const pesapalIPN = async (req, res) => {
  try {
    const body = req.body
    console.log('=== Pesapal IPN ===')
    console.log(body)

    const orderTrackingId =
      body?.orderTrackingId ||
      body?.OrderTrackingId ||
      body?.transaction_tracking_id

    if (!orderTrackingId) {
      console.warn('IPN missing orderTrackingId')
      return res.status(400).send('Missing orderTrackingId')
    }

    // Lookup transaction status
    const statusResp = await getTransactionStatus(orderTrackingId)

    const status =
      statusResp?.status ||
      statusResp?.payment_status ||
      statusResp?.data?.status

    const merchantRef =
      statusResp?.merchant_reference ||
      statusResp?.reference ||
      statusResp?.orderReference

    const tx_ref = merchantRef

    if (!tx_ref) {
      console.warn('Missing merchant reference')
      return res.status(200).send('OK')
    }

    //------------------------------------------------------
    // If transaction was successful:
    //------------------------------------------------------
    if (status && status.toLowerCase() === 'completed') {
      // Update payment
      await db.query(
        `UPDATE payments SET status='paid' 
         WHERE transaction_id=?`,
        [tx_ref],
      )

      // Fetch row to get user & event
      const [rows] = await db.query(
        `SELECT user_id, event_id 
         FROM payments 
         WHERE transaction_id=? LIMIT 1`,
        [tx_ref],
      )

      const row = rows[0]

      if (row) {
        await db.query(
          `INSERT INTO bookings (user_id, event_id, attendees, status)
           VALUES (?, ?, ?, ?)`,
          [row.user_id, row.event_id, 1, 'confirmed'],
        )
      }
    }

    //------------------------------------------------------
    // Respond quickly (Pesapal requires 200 OK)
    //------------------------------------------------------
    return res.status(200).send('OK')
  } catch (err) {
    console.error('Pesapal IPN error:', err)
    return res.status(500).send('Error')
  }
}
