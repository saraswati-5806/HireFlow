import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <h2>HireFlow</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>

        {!currentUser && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {currentUser && (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}