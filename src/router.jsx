import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Events from './pages/Events'
import Login from './pages/Auth.jsx'
import Register from './pages/Auth.jsx'
import Profile from './pages/Profile'
import EventDetails from './pages/EventDetails.jsx'
import PaymentInfo from './pages/PaymentInfo.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/Events', element: <Events /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },

      // Public event pages
      { path: '/events/:id', element: <EventDetails /> },
      { path: '/event/:id/mpesa', element: <PaymentInfo /> },

      // Protected routes
      {
        path: '/create-event',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <CreateEvent /> }],
      },
      {
        path: '/profile',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <Profile /> }],
      },
    ],
  },
])

export default router
