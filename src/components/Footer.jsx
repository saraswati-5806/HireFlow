import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#0f172a", color: "#94a3b8", paddingTop: "3rem", paddingBottom: "1.5rem", marginTop: "auto", borderTop: "4px solid #0d9488" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
        
        {/* Branding Identity Column */}
        <div>
          <h3 style={{ color: "#ffffff", margin: "0 0 1rem 0", fontSize: "1.5rem" }}>Hire<span style={{ color: "#0d9488" }}>Flow</span></h3>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            A streamlined digital portal bridging elite talent loops together with modern corporate ecosystems seamlessly.
          </p>
        </div>

        {/* Quick Route Platform Links Mapping */}
        <div>
          <h4 style={{ color: "#ffffff", margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Platform Routes</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <li><Link to="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home Dashboard</Link></li>
            <li><Link to="/jobs" style={{ color: "#94a3b8", textDecoration: "none" }}>Browse Job Matrix</Link></li>
            <li><Link to="/signup" style={{ color: "#94a3b8", textDecoration: "none" }}>Employer Registration</Link></li>
          </ul>
        </div>

        {/* Job Categories Listing Section */}
        <div>
          <h4 style={{ color: "#ffffff", margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Job Domains</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
            <li>💻 Technical Architecture</li>
            <li>🎨 UI/UX Interface Design</li>
            <li>📈 Growth & Marketing</li>
            <li>📊 Data Metrics Research</li>
          </ul>
        </div>

      </div>

      {/* Signature Disclaimer Copyright Strip */}
      <div style={{ maxWidth: "1200px", margin: "2rem auto 0 auto", padding: "1.5rem 1.5rem 0 1.5rem", borderTop: "1px solid #334155", display: "flex", justifyContent: "between", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem" }}>
        <div>© {new Date().getFullYear()} HireFlow JobPortal System Inc. All rights reserved.</div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <span>Terms of Placement</span>
          <span>Security Architecture</span>
        </div>
      </div>
    </footer>
  );
}