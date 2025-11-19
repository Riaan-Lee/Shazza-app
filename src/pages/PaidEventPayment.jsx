import { useState } from 'react'
import { createPesapalOrder } from '../services/payment.service'

export default function PaidEventPayment({ event, user }) {
  const [method, setMethod] = useState('mpesa')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePesapal = async () => {
    try {
      if (!phone) return alert('Enter phone number')
      if (!event) return alert('Missing event data')

      setLoading(true)

      const payload = {
        event_id: event.id,
        amount: event.price,
        phone: phone,
        first_name: user?.name?.split(' ')[0] || 'Guest',
        last_name: user?.name?.split(' ').slice(1).join(' ') || '',
        email: user?.email || 'no-reply@shazza.app',
      }

      const res = await createPesapalOrder(
        payload.event_id,
        payload.amount,
        payload.phone,
        payload.first_name,
        payload.last_name,
        payload.email,
      )

      setLoading(false)

      const redirectUrl =
        res?.data?.data?.redirect_url ||
        res?.data?.data?.payment_url ||
        res?.data?.redirect_url ||
        res?.data?.payment_url

      if (redirectUrl) {
        window.location.href = redirectUrl
      } else {
        alert('Payment link missing. Check backend logs.')
      }
    } catch (err) {
      setLoading(false)
      console.error(err)
      alert('Failed to create Pesapal order.')
    }
  }

  return (
    <div className="min-h-screen text-white p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Complete Payment</h1>

      <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg space-y-6">
        <h2 className="text-xl font-semibold">Choose Payment Method</h2>

        <div className="flex gap-3">
          <button
            onClick={() => setMethod('mpesa')}
            className={`flex-1 p-3 rounded-xl transition border ${
              method === 'mpesa'
                ? 'bg-[#A020F0]/80 border-[#A020F0]'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            Mpesa
          </button>

          <button
            onClick={() => setMethod('card')}
            className={`flex-1 p-3 rounded-xl transition border ${
              method === 'card'
                ? 'bg-[#A020F0]/80 border-[#A020F0]'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            Card (Stripe)
          </button>
        </div>

        {method === 'mpesa' && (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="Mpesa Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
            />

            <button
              onClick={handlePesapal}
              disabled={loading}
              className="w-full p-3 rounded-xl bg-[#A020F0]/80 hover:bg-[#A020F0] transition text-white font-semibold"
            >
              {loading ? 'Processing...' : 'Pay with Mpesa'}
            </button>
          </div>
        )}

        {method === 'card' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
            />

            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
            />

            <input
              type="text"
              placeholder="CVC"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
            />

            <button className="w-full p-3 rounded-xl bg-[#A020F0]/80 hover:bg-[#A020F0] transition text-white font-semibold">
              Pay with Card
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
