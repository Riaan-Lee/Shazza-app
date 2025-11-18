import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // for sessions/JWT cookies if needed later
})

// Auto-attach token if stored
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('shazza_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Handle expired tokens globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expired
    if (error.response?.status === 401) {
      localStorage.removeItem('shazza_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default axiosClient
