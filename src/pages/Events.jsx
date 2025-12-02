import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard'
import axiosClient from '../services/axiosClient'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    axiosClient
      .get('/events')
      .then((res) => {
        if (mounted) setEvents(res.data.events || [])
      })
      .catch((err) => console.error('Failed to load events:', err))
      .finally(() => mounted && setLoading(false))

    return () => (mounted = false)
  }, [])

  if (loading) return <div className="text-white p-6">Loading events...</div>

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      )}
    </div>
  )
}
