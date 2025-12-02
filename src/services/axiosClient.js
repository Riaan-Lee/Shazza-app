import axios from 'axios'

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  window.location.origin.replace(':5173', ':4000') + '/api'

const axiosClient = axios.create({
  baseURL: API_BASE,
})

// Attach token automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('shazza_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default axiosClient
