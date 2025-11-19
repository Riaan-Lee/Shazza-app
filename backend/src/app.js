import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import eventsRoutes from './routes/event.js'
import bookingRoutes from './routes/booking.js'
import paymentsRoutes from './routes/payments.js'
import pesapalRoutes from './routes/pesapal.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentsRoutes)
app.use('/api/payments/pesapal', pesapalRoutes)

app.get('/', (req, res) =>
  res.json({ ok: true, message: 'Shazza API running' }),
)

export default app
