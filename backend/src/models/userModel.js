// backend/src/models/userModel.js
import db from '../config/db.js'
import bcrypt from 'bcryptjs'

export const createUser = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10)
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashed],
  )
  return { id: result.insertId, name, email }
}

export const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [
    email,
  ])
  return rows[0]
}

export const findUserById = async (id) => {
  const [rows] = await db.query(
    'SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1',
    [id],
  )
  return rows[0]
}

export const verifyPassword = async (plain, hash) => {
  return bcrypt.compare(plain, hash)
}
