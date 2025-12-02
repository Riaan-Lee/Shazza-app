// src/routes/payments.js
import express from 'express'
import auth from '../middleware/auth.js'
import {
  createPesapalOrder,
  pesapalIPN,
} from '../controllers/paymentController.js'

const router = express.Router()

// protected route to initiate payment
router.post('/pesapal/create-order', auth, createPesapalOrder)

// public IPN endpoint Pesapal will call
router.post('/pesapal/ipn', express.json({ type: '*/*' }), pesapalIPN)

export default router
