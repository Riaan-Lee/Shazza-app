import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, loginUser, logoutUser } from '../api/auth'

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

    getCurrentUser()
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('shazza_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = async (credentials) => {
    const res = await loginUser(credentials)
    localStorage.setItem('shazza_token', res.data.token)
    setUser(res.data.user)
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch {}
    localStorage.removeItem('shazza_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
