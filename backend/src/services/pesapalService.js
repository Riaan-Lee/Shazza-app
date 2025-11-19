import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const { PESAPAL_CONSUMER_KEY, PESAPAL_CONSUMER_SECRET, PESAPAL_ENV } =
  process.env

// Pesapal hosts
const BASE =
  PESAPAL_ENV === 'production'
    ? 'https://pay.pesapal.com'
    : 'https://cybqa.pesapal.com' // sandbox

//------------------------------------------------------
// 1) GET ACCESS TOKEN
//------------------------------------------------------
export async function getAuthToken() {
  const url = `${BASE}/api/Auth/RequestToken`

  const auth = Buffer.from(
    `${PESAPAL_CONSUMER_KEY}:${PESAPAL_CONSUMER_SECRET}`,
  ).toString('base64')

  const resp = await axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    },
  )

  return resp.data?.token || resp.data?.access_token || resp.data
}

//------------------------------------------------------
// 2) SUBMIT ORDER REQUEST
//------------------------------------------------------
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

  const resp = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return resp.data
}

//------------------------------------------------------
// 3) GET TRANSACTION STATUS
//------------------------------------------------------
export async function getTransactionStatus(orderTrackingId) {
  const token = await getAuthToken()

  const url = `${BASE}/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`

  const resp = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return resp.data
}
