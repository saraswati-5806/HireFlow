import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import * as storage from "../utils/storage";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // 🌓 Dark Mode State Management
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#f8fafc";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogoutClick = () => {
    storage.clearCurrentUser();
    if (logout) logout();
    navigate("/");
  };

  return (
    <nav style={{ 
      background: darkMode ? "#1e293b" : "#e0f2fe", 
      borderBottom: `2px solid ${darkMode ? "#0f766e" : "#0d9488"}`, 
      padding: "1rem 2rem", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      fontFamily: "sans-serif" 
    }}>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: darkMode ? "#2dd4bf" : "#115e59", cursor: "pointer" }} onClick={() => navigate("/")}>
        Hire<span style={{ color: "#0d9488" }}>Flow</span>
      </div>
      
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {/* Always present Home Option */}
        <Link to="/" style={{ color: darkMode ? "#f8fafc" : "#115e59", textDecoration: "none", fontWeight: "600" }}>Home</Link>

        {!currentUser ? (
          <>
            <Link to="/jobs" style={{ color: darkMode ? "#f8fafc" : "#115e59", textDecoration: "none", fontWeight: "600" }}>Jobs</Link>
            <Link to="/login" style={{ color: darkMode ? "#f8fafc" : "#115e59", textDecoration: "none", fontWeight: "600" }}>Login</Link>
            <Link to="/signup" style={{ background: "#0d9488", color: "white", textDecoration: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600" }}>Signup</Link>
          </>
        ) : currentUser.role === "Candidate" ? (
          <>
            <Link to="/jobs" style={{ color: darkMode ? "#f8fafc" : "#115e59", textDecoration: "none", fontWeight: "600" }}>Jobs</Link>
            <Link to="/dashboard" style={{ color: darkMode ? "#f8fafc" : "#115e59", textDecoration: "none", fontWeight: "600" }}>Candidate Dashboard</Link>
            <Link to="/my-applications" style={{ color: darkMode ? "#f8fafc" : "#115e59", textDecoration: "none", fontWeight: "600" }}>My Applications</Link>
            <button onClick={handleLogoutClick} style={{ background: "#ef4444", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Logout</button>
          </>
        ) : (
          /* 💼 EMPLOYER INTERFACE - EXACTLY 4 SPECIFICATION PATHS: Home, Employer Dashboard, Applicants, Logout */
          <>
            <Link to="/dashboard" style={{ color: darkMode ? "#f8fafc" : "#115e59", textDecoration: "none", fontWeight: "600" }}>Employer Dashboard</Link>
            <Link to="/applicants" style={{ color: darkMode ? "#f8fafc" : "#115e59", textDecoration: "none", fontWeight: "600" }}>Applicants</Link>
            <button onClick={handleLogoutClick} style={{ background: "#ef4444", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Logout</button>
          </>
        )}

        {/* 🌓 Theme Toggle Button Container */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          style={{ 
            background: darkMode ? "#f59e0b" : "#1e293b", 
            color: darkMode ? "#1e293b" : "#ffffff", 
            border: "none", 
            padding: "0.5rem 0.75rem", 
            borderRadius: "20px", 
            cursor: "pointer", 
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}