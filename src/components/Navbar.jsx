import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |<Link to="/events">Events</Link> |
      {user ? (
        <>
          <Link to="/profile">Profile</Link> |
          <button onClick={logout} style={{ background: "none" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |<Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
