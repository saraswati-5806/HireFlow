import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Candidate");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await signup(name, email, password, role);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Registration failed. Email might already be taken.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "450px", margin: "4rem auto", padding: "2.5rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Create Your Account</h2>
      {error && <p style={{ color: "#ef4444", background: "#fee2e2", padding: "0.75rem", borderRadius: "6px", fontSize: "0.9rem" }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontWeight: "600" }}>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontWeight: "600" }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontWeight: "600" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontWeight: "600" }}>Account Type</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Candidate">Candidate (Looking for work)</option>
            <option value="Employer">Employer (Hiring candidates)</option>
          </select>
        </div>
        <button type="submit" style={{ padding: "0.75rem", fontWeight: "bold", fontSize: "1rem", marginTop: "0.5rem", cursor: "pointer" }}>
          Register Account
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1.5rem", marginBottom: "0" }}>
        Already have an account? <Link to="/login" style={{ color: "#7c3aed", fontWeight: "600", textDecoration: "none" }}>Log in here</Link>
      </p>
    </div>
  );
}