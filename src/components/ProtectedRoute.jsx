// src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ redirectTo = '/login' }) {
  const { user, loading } = useAuth()

  // While auth is loading, you can return a loader or null
  if (loading) return null

  // If not logged in, navigate to login
  if (!user) return <Navigate to={redirectTo} replace />

  // Otherwise render children via Outlet
  return <Outlet />
}
