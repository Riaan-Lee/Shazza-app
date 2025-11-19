import '/Users/riaanlee/Shazza-app/src/styles/eventCard.css'

export default function EventCard({ title, date, location, image }) {
  return (
    <div className="event-card">
      <div className="event-img">
        <img src={image} alt={title} />
      </div>

      <div className="event-content">
        <h3>{title}</h3>
        <p className="event-date">{date}</p>
        <p className="event-location">{location}</p>
      </div>
    </div>
  )
}
