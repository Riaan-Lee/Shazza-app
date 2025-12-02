import { Link } from 'react-router-dom'
import '../styles/eventCard.css'

export default function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="event-card block rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[rgba(160,32,240,0.14)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-[rgba(255,255,255,0.12)] transition"
    >
      <div className="event-img h-40 w-full overflow-hidden">
        <img
          src={event.banner || event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="event-content p-4">
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
        <p className="text-sm text-white/70 mt-1">{event.location}</p>
        <p className="text-sm text-purple-300 mt-1">
          {event.price > 0 ? `Ksh ${event.price}` : 'Free'}
        </p>

        <button className="mt-3 w-full py-2 rounded-xl bg-purple-600 text-white font-semibold">
          View Event
        </button>
      </div>
    </Link>
  )
}
