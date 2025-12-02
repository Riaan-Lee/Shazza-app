import EventCard from '../components/EventCard'
import '/Users/riaanlee/Shazza-app/src/styles/home.css'

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Your Next Event</h1>
        <p>
          Discover concerts, parties, meetups, sports, and everything happening
          around you.
        </p>

        <div className="hero-tags">
          <span>🔥 Trending</span>
          <span>🎵 Concerts</span>
          <span>⚽ Sports</span>
          <span>🎉 Parties</span>
        </div>
      </section>

      {/* Event Feed */}
      <section className="event-feed">
        <h2>Upcoming Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 1,
              title: 'Midnight Purple Party',
              date: 'Fri • 11:00 PM',
              location: 'Westlands, Nairobi',
              image:
                'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
            },
            {
              id: 2,
              title: 'Live Concert: Magenta Nights',
              date: 'Sat • 7:00 PM',
              location: 'Kilimani, Nairobi',
              image:
                'https://images.unsplash.com/photo-1504805572947-34fad45aed93',
            },
            {
              id: 3,
              title: 'Tech & Innovation Meetup',
              date: 'Sun • 2:00 PM',
              location: 'Upper Hill',
              image:
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
            },
          ].map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      </section>
    </div>
  )
}
