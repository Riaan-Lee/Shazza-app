// src/models/paymentModel.js
import db from '../config/db.js'

export const createPaymentRecord = async ({
  user_id,
  event_id,
  amount,
  method = 'pesapal',
  transaction_ref,
  status = 'pending',
}) => {
  const [result] = await db.query(
    `INSERT INTO payments (user_id, event_id, amount, method, transaction_id, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, event_id, amount, method, transaction_ref, status],
  )
  return result.insertId
}

export const updatePaymentStatus = async ({
  transaction_id,
  newTxId,
  status,
}) => {
  // update payments matching our reference or Pesapal reference
  await db.query(
    `UPDATE payments SET status = ?, transaction_id = ? WHERE transaction_id = ?`,
    [status, newTxId || transaction_id, transaction_id],
  )
}

export const findPaymentByRef = async (ref) => {
  const [rows] = await db.query(
    `SELECT * FROM payments WHERE transaction_id = ? LIMIT 1`,
    [ref],
  )
  return rows[0]
}
