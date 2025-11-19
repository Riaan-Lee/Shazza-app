// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
//       <Link to="/">Home</Link> |<Link to="/events">Events</Link> |
//       {user ? (
//         <>
//           <Link to="/profile">Profile</Link> |
//           <button onClick={logout} style={{ background: "none" }}>
//             Logout
//           </button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">Login</Link> |<Link to="/register">Register</Link>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
import { Link } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  return (
    <nav className="glass-nav">
      <div className="nav-logo">Shazza</div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/discover">Discover</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  )
}
