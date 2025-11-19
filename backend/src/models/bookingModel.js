import db from '../config/db.js'

// Create free booking
export const createFreeBooking = async ({ user_id, event_id }) => {
  const [result] = await db.query(
    `INSERT INTO bookings (user_id, event_id, attendees, status)
     VALUES (?, ?, ?, ?)`,
    [user_id, event_id, 1, 'confirmed'],
  )
  return result.insertId
}

// Check if user already booked the event
export const userAlreadyBooked = async (user_id, event_id) => {
  const [rows] = await db.query(
    `SELECT id FROM bookings WHERE user_id = ? AND event_id = ? LIMIT 1`,
    [user_id, event_id],
  )
  return rows.length > 0
}

// Get event capacity info
export const getEventCapacity = async (event_id) => {
  const [rows] = await db.query(
    `SELECT capacity FROM events WHERE id = ? LIMIT 1`,
    [event_id],
  )
  return rows[0]
}

// Reduce event capacity
export const reduceEventCapacity = async (event_id) => {
  await db.query(
    `UPDATE events SET capacity = capacity - 1 WHERE id = ? AND capacity > 0`,
    [event_id],
  )
}
