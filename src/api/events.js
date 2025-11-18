import axiosClient from './axiosClient'

// Get all events
export const getEvents = () => axiosClient.get('/events')

// Get single event
export const getEventById = (id) => axiosClient.get(`/events/${id}`)

// Create event (event organizers)
export const createEvent = (data) => axiosClient.post('/events', data)
