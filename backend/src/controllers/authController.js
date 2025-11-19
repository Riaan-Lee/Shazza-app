// backend/src/controllers/authController.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import {
  createUser,
  findUserByEmail,
  findUserById,
  verifyPassword,
} from '../models/userModel.js'

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ error: 'Missing fields' })

    const existing = await findUserByEmail(email)
    if (existing)
      return res.status(400).json({ error: 'Email already registered' })

    const user = await createUser({ name, email, password })
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    })
    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    })
  } catch (err) {
    console.error('register error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ error: 'Missing email or password' })

    const user = await findUserByEmail(email)
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const ok = await verifyPassword(password, user.password)
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    })
    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    })
  } catch (err) {
    console.error('login error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const me = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ error: 'Unauthorized' })
    const user = await findUserById(req.user.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    return res.json({ user })
  } catch (err) {
    console.error('me error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
