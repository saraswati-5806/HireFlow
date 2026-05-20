import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as storage from "../utils/storage"; // <-- Wildcard fix

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    storage.clearCurrentUser(); // <-- Clean object call
    navigate("/login");
  };

  return (
    <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", padding: "1rem 2rem", alignItems: "center" }}>
      <div className="navbar-brand">
        <Link to="/" style={{ fontSize: "1.5rem", fontWeight: "bold", textDecoration: "none" }}>HireFlow</Link>
      </div>
      <div className="nav-links" style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/jobs" style={{ textDecoration: "none" }}>Browse Jobs</Link>
        {currentUser ? (
          <>
            {currentUser.role === "Employer" && (
              <Link to="/dashboard" style={{ textDecoration: "none" }}>Dashboard</Link>
            )}
            <span style={{ color: "#a78bfa", fontWeight: "600" }}>Welcome, {currentUser.name}</span>
            <button onClick={handleLogout} className="btn" style={{ padding: "0.4rem 1rem", cursor: "pointer" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none" }}>Login</Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}