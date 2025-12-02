import { getAuthToken } from '../services/pesapalService.js'
;(async () => {
  try {
    const token = await getAuthToken()
    console.log('TOKEN RESPONSE:', token)
  } catch (err) {
    console.error('TOKEN ERROR:', err?.response?.data || err.message)
  }
})()
console.log(process.env.PESAPAL_CONSUMER_KEY)
