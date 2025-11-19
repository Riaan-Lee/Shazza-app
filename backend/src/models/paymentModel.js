import db from '../config/db.js'

export const createPaymentRecord = async ({
  user_id,
  event_id,
  amount,
  method,
  transaction_id,
  status,
}) => {
  const [result] = await db.query(
    'INSERT INTO payments (user_id, event_id, amount, method, transaction_id, status) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, event_id, amount, method, transaction_id, status],
  )
  return { id: result.insertId }
}
