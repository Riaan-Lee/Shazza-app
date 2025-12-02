import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axiosClient from '../services/axiosClient'

export default function FreeBooking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFreeBooking = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await axiosClient.post('/bookings/free', {
        event_id: id,
      })

      navigate(`/booking-success?ref=${res.data.booking_id}`)
    } catch (err) {
      setError('Failed to reserve your spot. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Reserve Spot</h1>

      <div className="glass-card p-5 space-y-4 mt-4">
        <p className="text-white/80">
          Confirm your free reservation for this event.
        </p>

        {error && <p className="text-red-400">{error}</p>}

        <button
          onClick={handleFreeBooking}
          disabled={loading}
          className="submit-btn"
        >
          {loading ? 'Reserving...' : 'Confirm Reservation'}
        </button>
      </div>
    </div>
  )
}
