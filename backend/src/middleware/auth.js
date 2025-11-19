// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'

export default (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ error: 'Unauthorized' })
    const parts = auth.split(' ')
    if (parts.length !== 2)
      return res.status(401).json({ error: 'Unauthorized' })
    const token = parts[1]
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
