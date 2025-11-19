import {
  createFreeBooking,
  userAlreadyBooked,
  getEventCapacity,
  reduceEventCapacity,
} from '../models/bookingModel.js'

export const bookFreeEvent = async (req, res) => {
  try {
    const user_id = req.user.id
    const { event_id } = req.body

    if (!event_id) return res.status(400).json({ error: 'Missing event_id' })

    // Check duplicates
    if (await userAlreadyBooked(user_id, event_id)) {
      return res.status(400).json({ error: 'Already booked' })
    }

    // Check capacity
    const event = await getEventCapacity(event_id)
    if (!event) return res.status(404).json({ error: 'Event not found' })

    if (event.capacity <= 0) {
      return res.status(400).json({ error: 'Event is full' })
    }

    // Create booking
    const bookingId = await createFreeBooking({ user_id, event_id })

    // Reduce capacity
    await reduceEventCapacity(event_id)

    return res.json({ success: true, booking_id: bookingId })
  } catch (err) {
    console.error('bookFreeEvent error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
