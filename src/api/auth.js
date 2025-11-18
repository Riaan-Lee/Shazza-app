import axiosClient from './axiosClient'

// Register
export const registerUser = (data) => axiosClient.post('/auth/register', data)

// Login
export const loginUser = (data) => axiosClient.post('/auth/login', data)

// Get current user
export const getCurrentUser = () => axiosClient.get('/auth/me')

// Logout
export const logoutUser = () => axiosClient.post('/auth/logout')
