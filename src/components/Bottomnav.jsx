import { NavLink } from 'react-router-dom'
import { MdHome, MdSearch, MdAddBox, MdEvent, MdPerson } from 'react-icons/md'

export default function BottomNav() {
  const items = [
    { to: '/', label: 'Home', Icon: MdHome },
    { to: '/search', label: 'Explore', Icon: MdSearch },
    { to: '/create', label: 'Create', Icon: MdAddBox },
    { to: '/tickets', label: 'Tickets', Icon: MdEvent },
    { to: '/profile', label: 'Profile', Icon: MdPerson },
  ]

  return (
    // hidden on md+ (desktop), fixed floating bottom nav on mobile
    <nav
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-xl
                 md:hidden
                 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl
                 border border-[rgba(160,32,240,0.14)] rounded-3xl
                 shadow-[0_12px_30px_rgba(0,0,0,0.35)] p-2"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <ul className="flex items-center justify-between gap-1 px-2">
        {items.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl
                 ${
                   isActive
                     ? 'text-white bg-[rgba(160,32,240,0.16)] shadow-[0_6px_18px_rgba(160,32,240,0.12)]'
                     : 'text-white/80 hover:bg-[rgba(160,32,240,0.06)]'
                 }`
              }
              aria-label={label}
              title={label}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[11px]">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
