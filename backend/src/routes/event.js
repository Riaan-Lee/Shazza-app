import express from 'express'
import auth from '../middleware/auth.js'

import {
  createNewEvent,
  listEvents,
  getEvent,
} from '../controllers/eventController.js'

const router = express.Router()

// Create event (protected)
router.post('/create', auth, createNewEvent)

// List events (public)
router.get('/', listEvents)

// Get event details (public)
router.get('/:id', getEvent)

export default router
