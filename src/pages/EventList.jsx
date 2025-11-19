import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function EventList() {
  const [filter, setFilter] = useState('all')

  // Temporary mock events — backend will replace this
  const events = [
    {
      id: 1,
      title: "David's Birthday Bash",
      date: '2025-01-20',
      location: 'Nairobi',
      price: 0,
      image: 'https://images.unsplash.com/photo-1559526323-ad6fdfcfc021',
    },
    {
      id: 2,
      title: 'Shazza Purple Party',
      date: '2025-02-18',
      location: 'Westlands',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439',
    },
  ]

  const filteredEvents = events.filter((e) => {
    if (filter === 'free') return e.price === 0
    if (filter === 'paid') return e.price > 0
    return true
  })

  return (
    <div className="min-h-screen text-white p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Events</h1>

      {/* Filters */}
      <div className="flex gap-3">
        {[
          { id: 'all', label: 'All' },
          { id: 'free', label: 'Free' },
          { id: 'paid', label: 'Paid' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-4 py-2 rounded-xl transition border ${
              filter === btn.id
                ? 'bg-[#A020F0]/80 border-[#A020F0]'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Event Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <Link
            to={`/event/${event.id}`}
            key={event.id}
            className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-[1.02] transition block"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-white/80">{event.date}</p>
              <p className="text-white/80">{event.location}</p>

              <p className="font-semibold mt-2">
                {event.price === 0
                  ? 'Free'
                  : `KES ${event.price.toLocaleString()}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
