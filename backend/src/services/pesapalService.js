import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const { PESAPAL_CONSUMER_KEY, PESAPAL_CONSUMER_SECRET, PESAPAL_ENV } =
  process.env

// Correct v3 base URLs
const BASE =
  PESAPAL_ENV === 'production'
    ? 'https://pay.pesapal.com/v3'
    : 'https://cybqa.pesapal.com/v3'

// Request an auth token
export async function getAuthToken() {
  const url = `${BASE}/api/Auth/RequestToken`
  const auth = Buffer.from(
    `${PESAPAL_CONSUMER_KEY}:${PESAPAL_CONSUMER_SECRET}`,
  ).toString('base64')

  try {
    const res = await axios.post(url, null, {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data?.token || res.data?.access_token || res.data
  } catch (err) {
    console.error('getAuthToken ERROR:', err.response?.data || err.message)
    throw err
  }
}
export async function getTransactionStatus(orderTrackingId) {
  const token = await getAuthToken()
  const url = `${BASE}/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    return res.data
  } catch (err) {
    console.error(
      'getTransactionStatus ERROR:',
      err.response?.data || err.message,
    )
    throw err
  }
}

// Submit order
export async function submitOrder({
  amount,
  reference,
  description,
  callback_url,
  customer,
  currency = 'KES',
}) {
  const token = await getAuthToken()
  const url = `${BASE}/api/Transactions/SubmitOrderRequest`

  const payload = {
    amount,
    currency,
    description,
    callback_url,
    reference,
    customer,
  }

  try {
    const res = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (err) {
    console.error('submitOrder ERROR:', err.response?.data || err.message)
    throw err
  }
}
