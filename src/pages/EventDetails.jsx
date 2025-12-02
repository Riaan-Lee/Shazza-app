import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdLocationOn, MdCalendarToday, MdPeople } from 'react-icons/md'
import { motion } from 'framer-motion'
import axiosClient from '../services/axiosClient'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosClient
      .get(`/events/${id}`)
      .then((res) => {
        setEvent(res.data.event || res.data)
      })
      .catch((err) => {
        console.error('Failed to load event', err)
        setEvent(null)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-white p-6">Loading event...</div>
  if (!event) return <div className="text-white p-6">Event not found.</div>

  const isPaid = event.price > 0

  const handleBooking = () => {
    if (isPaid) {
      navigate(`/event/${event.id}/mpesa`)
    } else {
      navigate(`/book/${event.id}`)
    }
  }

  return (
    <div className="pb-24">
      {/* ===== Hero Banner ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[280px] w-full relative"
      >
        <img
          src={event.banner}
          alt="Event banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90" />
      </motion.div>

      {/* ===== Event Info Card ===== */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-5 -mt-20 relative z-10"
      >
        <div
          className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border
                     border-[rgba(160,32,240,0.14)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                     rounded-3xl p-5"
        >
          <h1 className="text-2xl font-bold text-white">{event.title}</h1>
          <p className="text-white/80 mt-2">{event.description}</p>

          {/* Icons row */}
          <div className="mt-4 space-y-2">
            <p className="flex items-center gap-2 text-white/90">
              <MdCalendarToday className="text-purple-400" />
              <span>{event.date}</span>
            </p>
            <p className="flex items-center gap-2 text-white/90">
              <MdLocationOn className="text-purple-400" />
              <span>{event.location}</span>
            </p>
            <p className="flex items-center gap-2 text-white/90">
              <MdPeople className="text-purple-400" />
              <span>{event.capacity} Guests Allowed</span>
            </p>
          </div>

          {/* Price */}
          <div className="mt-4">
            {isPaid ? (
              <p className="text-purple-300 font-semibold text-lg">
                Ksh {event.price.toLocaleString()}
              </p>
            ) : (
              <p className="text-green-300 font-semibold text-lg">Free Entry</p>
            )}
          </div>
        </div>

        {/* ===== Booking Button ===== */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleBooking}
          className="w-full mt-6 py-4 rounded-2xl font-semibold text-lg
                     text-white shadow-[0_8px_32px_rgba(160,32,240,0.45)]
                     bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700
                     hover:bg-purple-700 transition-all"
        >
          {isPaid ? 'Reserve & Pay' : 'Reserve Spot'}
        </motion.button>
        {event.mpesa_number && (
          <button
            onClick={() => navigate(`/event/${event.id}/mpesa`)}
            className="w-full mt-3 py-3 rounded-2xl font-semibold text-md bg-white/10 text-purple-300 border border-purple-500"
          >
            Pay via M-Pesa
          </button>
        )}
      </motion.div>
    </div>
  )
}
