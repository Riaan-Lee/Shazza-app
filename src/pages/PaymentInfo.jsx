import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosClient from '../services/axiosClient'

export default function PaymentInfo() {
  const { id } = useParams()
  const [event, setEvent] = useState(undefined)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let mounted = true
    axiosClient
      .get(`/events/${id}`)
      .then((res) => {
        const data = res.data.event || res.data
        if (mounted) setEvent(data)
      })
      .catch((err) => {
        console.error('Failed to load event:', err)
        if (mounted) setEvent(null)
      })
    return () => (mounted = false)
  }, [id])

  if (event === undefined)
    return <div className="text-white p-6">Loading...</div>
  if (event === null)
    return <div className="text-white p-6">Event not found.</div>

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="text-white p-6">
      <div className="max-w-2xl mx-auto bg-white/10 p-6 rounded-2xl backdrop-blur">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <p className="mt-2 text-white/80">{event.description}</p>

        {event.mpesa_number ? (
          <div className="mt-4 space-y-3">
            <p>
              <strong>Type:</strong> {event.mpesa_type || 'phone'}
            </p>
            <p>
              <strong>Number:</strong> {event.mpesa_number}
              <button
                onClick={() => copy(event.mpesa_number)}
                className="ml-3 px-3 py-1 bg-purple-600 rounded text-white"
              >
                Copy
              </button>
            </p>

            {event.mpesa_account && (
              <p>
                <strong>Account:</strong> {event.mpesa_account}
              </p>
            )}

            {event.payment_instructions && (
              <p className="text-sm text-white/70">
                {event.payment_instructions}
              </p>
            )}

            {copied && <p className="text-green-400 text-sm">Copied!</p>}
          </div>
        ) : (
          <p className="mt-4">No M-Pesa details for this event.</p>
        )}

        <Link
          to={`/events/${event.id}`}
          className="inline-block mt-6 px-4 py-2 bg-white/20 rounded text-white"
        >
          Back
        </Link>
      </div>
    </div>
  )
}
