import express from 'express'
import auth from '../middleware/auth.js'
import { createOrder, pesapalIPN } from '../controllers/pesapalController.js'

const router = express.Router()

// Protected payment initiation
router.post('/create-order', auth, createOrder)

// Webhook (public)
router.post('/ipn', express.json({ type: '*/*' }), pesapalIPN)

export default router
