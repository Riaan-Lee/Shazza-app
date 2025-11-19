import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Events from './pages/Events'
import Login from './pages/Auth.jsx'
import Register from './pages/Auth.jsx'
import Profile from './pages/Profile'
import EventDetails from './pages/EventDetails.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/events', element: <Events /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/profile', element: <Profile /> },
      {
        path: '/events/:id',
        element: <EventDetails />,
      },
    ],
  },
])

export default router
