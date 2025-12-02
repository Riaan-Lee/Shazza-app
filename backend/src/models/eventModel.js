import db from '../config/db.js'

// Create event
export const createEvent = async ({
  user_id,
  title,
  description,
  date,
  time,
  location,
  capacity,
  price,
  is_paid,
  mpesa_type,
  mpesa_number,
  mpesa_account,
  payment_instructions,
}) => {
  const [result] = await db.query(
    `INSERT INTO events 
    (user_id, title, description, date, time, location, capacity, price, is_paid, mpesa_type, mpesa_number, mpesa_account, payment_instructions)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      title,
      description,
      date,
      time,
      location,
      capacity,
      price,
      is_paid,
      mpesa_type || null,
      mpesa_number || null,
      mpesa_account || null,
      payment_instructions || null,
    ],
  )

  return result.insertId
}

// List events (public)
export const getAllEvents = async () => {
  const [rows] = await db.query(`SELECT * FROM events ORDER BY created_at DESC`)
  return rows
}

// Get event by id
export const getEventById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM events WHERE id = ? LIMIT 1`, [
    id,
  ])
  return rows[0]
}
