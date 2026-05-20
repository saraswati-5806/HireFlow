import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Log user in immediately upon successful creation

  // Form State parameters
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Candidate"); // Default per specification
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Gather existing user base registries out of memory
      const existingUsers = JSON.parse(localStorage.getItem("hireflow_users") || "[]");

      // 2. Safeguard against duplicate registration
      const userExists = existingUsers.some((user) => user.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setError("An account with this email address already exists. Try logging in.");
        return;
      }

      // 3. Formulate the clean user structural object record
      const newUser = {
        id: "usr_" + Math.random().toString(36).substr(2, 9),
        name,
        email: email.toLowerCase(),
        password, // Simple direct text storage for client evaluation simulation
        role,
        company: role === "Employer" ? companyName || "Independent Corporate" : ""
      };

      // 4. Save to browser database registry array
      existingUsers.push(newUser);
      localStorage.setItem("hireflow_users", JSON.stringify(existingUsers));

      // 5. Establish immediate session state persistence
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      if (login) login(newUser);

      // 6. Redirect instantly to role dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Storage assignment write access interrupted. Please refresh.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", padding: "2rem" }}>
      <div className="card" style={{ width: "100%", maxWidth: "450px", padding: "2.5rem", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.75rem", margin: "0 0 0.5rem 0", color: "#115e59" }}>Create Your Account</h2>
          <p style={{ color: "#64748b", margin: "0", fontSize: "0.95rem" }}>Join HireFlow to post jobs or submit applications.</p>
        </div>

        {error && (
          <div style={{ padding: "0.75rem", background: "#fef2f2", color: "#991b1b", borderRadius: "6px", fontSize: "0.9rem", marginBottom: "1.25rem", border: "1px solid #fee2e2", fontWeight: "500" }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSignupSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1e293b" }}>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your full name" style={{ width: "100%", boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1e293b" }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@company.com" style={{ width: "100%", boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1e293b" }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: "100%", boxSizing: "border-box" }} />
          </div>

          {/* Role selector field toggle match */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1e293b" }}>Select Your Role</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div onClick={() => setRole("Candidate")} style={{ padding: "0.75rem", borderRadius: "8px", border: role === "Candidate" ? "2px solid #0d9488" : "1px solid #cbd5e1", background: role === "Candidate" ? "#e0f2fe" : "#ffffff", textAlign: "center", cursor: "pointer", fontWeight: "600", transition: "all 0.2s" }}>
                🙋‍♂️ Candidate
              </div>
              <div onClick={() => setRole("Employer")} style={{ padding: "0.75rem", borderRadius: "8px", border: role === "Employer" ? "2px solid #0d9488" : "1px solid #cbd5e1", background: role === "Employer" ? "#e0f2fe" : "#ffffff", textAlign: "center", cursor: "pointer", fontWeight: "600", transition: "all 0.2s" }}>
                🏢 Employer
              </div>
            </div>
          </div>

          {/* Conditional Input Rendering based on selected state option mapping */}
          {role === "Employer" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", animation: "fadeIn 0.3s ease" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1e293b" }}>Company Name</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required={role === "Employer"} placeholder="e.g. Acme Tech Solutions" style={{ width: "100%", boxSizing: "border-box" }} />
            </div>
          )}

          <button type="submit" className="btn" style={{ width: "100%", padding: "0.75rem", fontSize: "1rem", marginTop: "0.5rem" }}>
            Sign Up
          </button>

        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "1rem", fontSize: "0.9rem", color: "#64748b" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#0d9488", fontWeight: "600", textDecoration: "none" }}>
            Login Here
          </Link>
        </div>

      </div>
    </div>
  );
}