import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout, darkMode, setDarkMode } = useAuth() || {};
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "1rem 2rem",
      background: darkMode ? "#1e293b" : "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      borderBottom: darkMode ? "1px solid #334155" : "1px solid #e2e8f0"
    }}>
      <div style={{ fontWeight: "bold", fontSize: "1.3rem", color: "#0d9488", cursor: "pointer" }} onClick={() => navigate("/")}>
        HireFlow 🚀
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link to="/jobs" style={{ color: darkMode ? "#f8fafc" : "#334155", textDecoration: "none" }}>Browse Jobs</Link>
        
        {/* 🌓 Dark Mode Toggle Switch */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
          title="Toggle UI Color Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {!currentUser ? (
          <>
            <Link to="/login"><button style={{ background: "transparent", color: "#0d9488", border: "1px solid #0d9488" }}>Login</button></Link>
            <Link to="/signup"><button style={{ background: "#0d9488", color: "white" }}>Sign Up</button></Link>
          </>
        ) : currentUser.role === "Candidate" ? (
          <>
            <Link to="/dashboard" style={{ color: darkMode ? "#f8fafc" : "#334155", textDecoration: "none" }}>My Workspace</Link>
            <button onClick={handleLogoutClick} style={{ background: "#64748b", color: "white" }}>Disconnect</button>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={{ color: darkMode ? "#f8fafc" : "#334155", textDecoration: "none" }}>Employer Panel</Link>
            <button onClick={handleLogoutClick} style={{ background: "#64748b", color: "white" }}>Disconnect</button>
          </>
        )}
      </div>
    </nav>
  );
}