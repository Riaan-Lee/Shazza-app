import express from 'express'
import auth from '../middleware/auth.js'
import { bookFreeEvent } from '../controllers/bookingController.js'

const router = express.Router()

// Free event booking
router.post('/free', auth, bookFreeEvent)

export default router
