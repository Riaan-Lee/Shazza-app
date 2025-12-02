import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../services/axiosClient'

export default function CreateEvent() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 10,
    price: 0,
    is_paid: 0,
    mpesa_type: '',
    mpesa_number: '',
    mpesa_account: '',
    payment_instructions: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await axiosClient.post('/events/create', form)
      const eventId = res.data?.event_id
      navigate(`/events/${eventId}`)
    } catch (err) {
      setError('Failed to create event.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Create Event</h1>

      <form onSubmit={handleSubmit} className="glass-card p-5 mt-4 space-y-4">
        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={onChange}
          className="input"
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={onChange}
          className="input"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={onChange}
          className="input"
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={onChange}
          className="input"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={onChange}
          className="input"
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={onChange}
          className="input"
        />

        <input
          type="number"
          name="price"
          placeholder="Price (0 = free)"
          value={form.price}
          onChange={onChange}
          className="input"
        />

        <label className="block">
          <span className="text-sm text-gray-200">M-Pesa Type</span>
          <select
            name="mpesa_type"
            value={form.mpesa_type}
            onChange={onChange}
            className="input mt-1"
          >
            <option value="">None</option>
            <option value="paybill">Paybill</option>
            <option value="phone">Phone</option>
          </select>
        </label>

        <input
          name="mpesa_number"
          placeholder="M-Pesa Number (phone or paybill)"
          value={form.mpesa_number}
          onChange={onChange}
          className="input"
        />

        <input
          name="mpesa_account"
          placeholder="Account (if using Paybill)"
          value={form.mpesa_account}
          onChange={onChange}
          className="input"
        />

        <textarea
          name="payment_instructions"
          placeholder="Payment instructions"
          value={form.payment_instructions}
          onChange={onChange}
          className="input"
        />

        {error && <p className="text-red-400">{error}</p>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  )
}
