import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Read users directly out of browser memory
    const existingUsers = JSON.parse(localStorage.getItem("hireflow_users") || "[]");
    
    // Find matching profile record
    const userMatch = existingUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (userMatch) {
      localStorage.setItem("currentUser", JSON.stringify(userMatch));
      if (login) login(userMatch);
      navigate("/dashboard");
    } else {
      setError("Invalid email address or password combination. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "75vh", padding: "2rem" }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px", padding: "2.5rem", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.75rem", margin: "0 0 0.5rem 0", color: "#115e59" }}>Welcome Back</h2>
          <p style={{ color: "#64748b", margin: "0", fontSize: "0.95rem" }}>Log in to manage jobs or apply to openings.</p>
        </div>

        {error && (
          <div style={{ padding: "0.75rem", background: "#fef2f2", color: "#991b1b", borderRadius: "6px", fontSize: "0.9rem", marginBottom: "1.25rem", border: "1px solid #fee2e2" }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" style={{ width: "100%", boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: "100%", boxSizing: "border-box" }} />
          </div>

          <button type="submit" className="btn" style={{ width: "100%", padding: "0.75rem", fontSize: "1rem", marginTop: "0.5rem" }}>
            Log In
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "1rem", fontSize: "0.9rem", color: "#64748b" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#0d9488", fontWeight: "600", textDecoration: "none" }}>
            Sign Up Here
          </Link>
        </div>

      </div>
    </div>
  );
}