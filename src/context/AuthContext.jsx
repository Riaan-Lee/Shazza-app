import { createContext, useContext, useState, useEffect } from 'react'
import axiosClient from '../services/axiosClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user on app start
  useEffect(() => {
    const token = localStorage.getItem('shazza_token')

    if (!token) {
      setLoading(false)
      return
    }

    axiosClient
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('shazza_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = async (credentials) => {
    const res = await axiosClient.post('/auth/login', credentials)
    localStorage.setItem('shazza_token', res.data.token)
    setUser(res.data.user)
  }

  const register = async (credentials) => {
    const res = await axiosClient.post('/auth/register', credentials)
    localStorage.setItem('shazza_token', res.data.token)
    setUser(res.data.user)
  }

  const logout = () => {
    localStorage.removeItem('shazza_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
