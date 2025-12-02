import {
  createEvent,
  getAllEvents,
  getEventById,
} from '../models/eventModel.js'

export const createNewEvent = async (req, res) => {
  try {
    const user_id = req.user?.id

    const {
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
    } = req.body

    if (!title || !date || !time || !location || !capacity)
      return res.status(400).json({ error: 'Missing required fields' })

    const eventId = await createEvent({
      user_id,
      title,
      description,
      date,
      time,
      location,
      capacity,
      price: price || 0,
      is_paid: is_paid ? 1 : 0,
      mpesa_type,
      mpesa_number,
      mpesa_account,
      payment_instructions,
    })

    return res.json({ success: true, event_id: eventId })
  } catch (err) {
    console.error('createNewEvent error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const listEvents = async (req, res) => {
  try {
    const events = await getAllEvents()
    return res.json({ events })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch events' })
  }
}

export const getEvent = async (req, res) => {
  try {
    const event_id = req.params.id

    const event = await getEventById(event_id)
    if (!event) return res.status(404).json({ error: 'Event not found' })

    return res.json({ event })
  } catch (err) {
    console.error('getEvent error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
