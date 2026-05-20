import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as storage from "../utils/storage";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    storage.clearCurrentUser();
    if (logout) logout();
    navigate("/");
  };

  return (
    <nav style={{ background: "#e0f2fe", borderBottom: "2px solid #0d9488", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#115e59", cursor: "pointer" }} onClick={() => navigate("/")}>
        Hire<span style={{ color: "#0d9488" }}>Flow</span>
      </div>
      
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/" style={{ color: "#115e59", textDecoration: "none", fontWeight: "600" }}>Home</Link>

        {!currentUser ? (
          <>
            <Link to="/jobs" style={{ color: "#115e59", textDecoration: "none", fontWeight: "600" }}>Jobs</Link>
            <Link to="/login" style={{ color: "#115e59", textDecoration: "none", fontWeight: "600" }}>Login</Link>
            <Link to="/signup" style={{ background: "#0d9488", color: "white", textDecoration: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600" }}>Signup</Link>
          </>
        ) : currentUser.role === "Candidate" ? (
          <>
            <Link to="/jobs" style={{ color: "#115e59", textDecoration: "none", fontWeight: "600" }}>Jobs</Link>
            <Link to="/dashboard" style={{ color: "#115e59", textDecoration: "none", fontWeight: "600" }}>Candidate Dashboard</Link>
            <Link to="/my-applications" style={{ color: "#115e59", textDecoration: "none", fontWeight: "600" }}>My Applications</Link>
            <button onClick={handleLogoutClick} style={{ background: "#ef4444", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Logout</button>
          </>
        ) : (
          /* 💼 EMPLOYER: Exactly 4 choices */
          <>
            <Link to="/dashboard" style={{ color: "#115e59", textDecoration: "none", fontWeight: "600" }}>Employer Dashboard</Link>
            <Link to="/applicants" style={{ color: "#115e59", textDecoration: "none", fontWeight: "600" }}>Applicants</Link>
            <button onClick={handleLogoutClick} style={{ background: "#ef4444", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}