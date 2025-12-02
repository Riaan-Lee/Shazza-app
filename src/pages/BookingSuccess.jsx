import { useSearchParams, Link } from 'react-router-dom'

export default function BookingSuccess() {
  const [params] = useSearchParams()
  const bookingId = params.get('ref')

  return (
    <div className="page-container">
      <h1 className="page-title">Reservation Confirmed 🎉</h1>

      <div className="glass-card p-5 mt-4 space-y-4">
        <p className="text-white/80">
          Your spot has been successfully reserved.
        </p>

        {bookingId && (
          <p className="text-purple-300 font-semibold">
            Booking Reference: {bookingId}
          </p>
        )}

        <Link to="/" className="submit-btn text-center block">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
