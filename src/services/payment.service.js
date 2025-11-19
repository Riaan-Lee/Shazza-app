import axiosClient from './axiosClient'

export const createPesapalOrder = (
  event_id,
  amount,
  phone,
  first_name,
  last_name,
  email,
) =>
  axiosClient.post('/payments/pesapal/create-order', {
    event_id,
    amount,
    phone,
    first_name,
    last_name,
    email,
  })
