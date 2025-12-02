// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import {
  MdHome,
  MdEvent,
  MdTravelExplore,
  MdPerson,
  MdAddBox,
} from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import '/Users/riaanlee/Shazza-app/src/styles/navbar.css'

export default function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const items = [
    { to: '/', label: 'Home', Icon: MdHome, protect: false },
    {
      to: '/Events',
      label: 'Events',
      Icon: MdEvent,
      protect: false,
    },
    {
      to: '/discover',
      label: 'Discover',
      Icon: MdTravelExplore,
      protect: false,
    },
    { to: '/create-event', label: 'Create', Icon: MdAddBox, protect: true },
    { to: '/profile', label: 'Profile', Icon: MdPerson, protect: true },
  ]

  const onClickItem = (e, item) => {
    if (item.protect && !user) {
      e.preventDefault()
      navigate('/login')
    }
  }

  return (
    <nav className="top-nav-glass">
      <div className="top-nav-container">
        <div className="nav-logo">Shazza</div>

        <ul className="top-nav-links">
          {items.map(({ to, label, Icon, protect }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `top-nav-button ${isActive ? 'top-nav-active' : ''}`
                }
                onClick={(e) => onClickItem(e, { to, protect })}
              >
                <Icon className="top-nav-icon" />
                <span className="top-nav-text">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
