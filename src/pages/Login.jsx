import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Invalid email or password credentials.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "450px", margin: "4rem auto", padding: "2.5rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Welcome Back</h2>
      {error && <p style={{ color: "#ef4444", background: "#fee2e2", padding: "0.75rem", borderRadius: "6px", fontSize: "0.9rem" }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontWeight: "600" }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontWeight: "600" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ padding: "0.75rem", fontWeight: "bold", fontSize: "1rem", marginTop: "0.5rem", cursor: "pointer" }}>
          Sign In
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1.5rem", marginBottom: "0" }}>
        New to HireFlow? <Link to="/signup" style={{ color: "#7c3aed", fontWeight: "600", textDecoration: "none" }}>Create an account</Link>
      </p>
    </div>
  );
}