import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import * as storage from "./utils/storage";

// ==========================================
// 1. RE-VERIFIED MULTI-ROLE INFRASTRUCTURE COMPONENTS
// ==========================================

function Navbar() {
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
          /* 💼 EMPLOYER INTERFACE - EXACTLY 4 SPECIFICATION PATHS: Home, Employer Dashboard, Applicants, Logout */
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

function InfoModals({ type, onClose }) {
  const getContent = () => {
    switch (type) {
      case "recruiters":
        return {
          title: "Find Recruiters Directory",
          body: (
            <div>
              <p>Connect with active corporate talent acquisition pipelines looking for engineering talent:</p>
              <ul>
                <li><strong>Acme Corporate Tech:</strong> Specialized in cloud systems architecture.</li>
                <li><strong>NexGen Systems Group:</strong> Focusing on interactive interface loops.</li>
                <li><strong>Global Data Nodes:</strong> Core computing performance optimization clusters.</li>
              </ul>
            </div>
          )
        };
      case "about":
        return {
          title: "About HireFlow Framework",
          body: (
            <p>HireFlow is an independent client-driven platform designed to remove complex overhead from entry-level engineering placement workflows. Operating inside isolated local memory layers, the framework delivers zero-latency workspace configurations instantly.</p>
          )
        };
      case "contact":
        return {
          title: "Contact Engineering Support",
          body: (
            <div>
              <p><strong>Corporate Workspace Hub:</strong> Tech Core Park, Phase II, Bangalore, KA</p>
              <p><strong>Electronic Communication Logs:</strong> support@hireflow.edu</p>
              <p><strong>System Assistance Channels:</strong> +91 80 4912 7000 (Mon-Fri, 09:00 - 18:00 IST)</p>
            </div>
          )
        };
      case "privacy":
        return {
          title: "Privacy & Memory Isolation Guidelines",
          body: (
            <p>HireFlow secures parameters by running execution scripts entirely within separate client memory modules. No personal usage profiling sequences or session analytics indices are collected, recorded, or transmitted outside your workspace environment.</p>
          )
        };
      default:
        return { title: "", body: null };
    }
  };

  const content = getContent();

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(15, 23, 42, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, color: "#1e293b", fontFamily: "sans-serif" }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "500px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)" }}>
        <h3 style={{ marginTop: 0, color: "#115e59", fontSize: "1.4rem", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem" }}>{content.title}</h3>
        <div style={{ margin: "1.5rem 0", lineHeight: "1.5", fontSize: "0.95rem" }}>{content.body}</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "#0d9488", color: "white", border: "none", padding: "0.5rem 1.25rem", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            Dismiss View
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeModal, setActiveModal] = useState(null);

  const handlePostJobRedirect = () => {
    if (currentUser?.role === "Employer") navigate("/dashboard");
    else { alert("Employer login status required."); navigate("/login"); }
  };

  const handleFindTalentRedirect = () => {
    if (currentUser?.role === "Employer") navigate("/applicants");
    else { alert("Employer authorization required."); navigate("/login"); }
  };

  const handleCandidateRedirect = (targetRoute) => {
    if (currentUser?.role === "Candidate") navigate(targetRoute);
    else { alert("Candidate access profile required."); navigate("/login"); }
  };

  return (
    <footer style={{ background: "#0f172a", color: "#94a3b8", paddingTop: "3.5rem", paddingBottom: "2rem", borderTop: "4px solid #0d9488", fontFamily: "sans-serif", width: "100%", marginTop: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
        <div>
          <h3 style={{ color: "#ffffff", margin: "0 0 1rem 0", fontSize: "1.4rem" }}>Hire<span style={{ color: "#0d9488" }}>Flow</span></h3>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>The definitive frontend pipeline mapping elite student engineers directly onto corporate placement nodes.</p>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <a href="mailto:support@hireflow.edu" style={{ textDecoration: "none" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="#EA4335"/><path d="M22 6V9L12 15L2 9V6L12 12L22 6Z" fill="#C5221F"/><path d="M2 6V18C2 19.1 2.9 20 4 20H6V9L2 6Z" fill="#F4B400"/><path d="M22 6V18C22 19.1 21.1 20 20 20H18V9L22 6Z" fill="#4285F4"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.345.72-4.05-1.62-4.05-1.62-.54-1.38-1.32-1.75-1.32-1.75-1.095-.75.075-.735.075-.735 1.205.09 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.374.805 1.117.805 2.25 0 1.62-.015 2.925-.015 3.314 0 .319.225.684.825.56C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 style={{ color: "#ffffff", margin: "0 0 1.25rem 0", fontSize: "1.1rem" }}>For Candidates</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
            <span onClick={() => navigate("/jobs")} style={{ cursor: "pointer", color: "#38bdf8" }}>🔍 Browse Jobs</span>
            <span onClick={() => setActiveModal("recruiters")} style={{ cursor: "pointer", color: "#38bdf8" }}>🏢 Find Recruiters</span>
            <span onClick={() => handleCandidateRedirect("/my-applications")} style={{ cursor: "pointer", color: "#38bdf8" }}>📄 My Applications</span>
          </div>
        </div>

        <div>
          <h4 style={{ color: "#ffffff", margin: "0 0 1.25rem 0", fontSize: "1.1rem" }}>For Employers</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
            <span onClick={handlePostJobRedirect} style={{ cursor: "pointer", color: "#38bdf8" }}>💼 Post a Job</span>
            <span onClick={handleFindTalentRedirect} style={{ cursor: "pointer", color: "#38bdf8" }}>🤝 Find Talent</span>
            <span onClick={() => navigate("/dashboard")} style={{ cursor: "pointer", color: "#38bdf8" }}>📋 Posted Jobs</span>
          </div>
        </div>

        <div>
          <h4 style={{ color: "#ffffff", margin: "0 0 1.25rem 0", fontSize: "1.1rem" }}>Company</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
            <span onClick={() => setActiveModal("about")} style={{ cursor: "pointer", color: "#38bdf8" }}>ℹ️ About Us</span>
            <span onClick={() => setActiveModal("contact")} style={{ cursor: "pointer", color: "#38bdf8" }}>📞 Contact</span>
            <span onClick={() => setActiveModal("privacy")} style={{ cursor: "pointer", color: "#38bdf8" }}>🔒 Privacy Policy</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "2.5rem auto 0 auto", padding: "1.5rem 1.5rem 0 1.5rem", borderTop: "1px solid #334155", textAlign: "center", fontSize: "0.85rem" }}>
        © 2026 HireFlow Single-Page local Layer Framework. All content configurations active.
      </div>
      {activeModal && <InfoModals type={activeModal} onClose={() => setActiveModal(null)} />}
    </footer>
  );
}

// ==========================================
// 2. ROOT PLATFORM APPLICATION LAYOUT ASSEMBLY
// ==========================================

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* 🛡️ STICKY FOOTER MECHANISM - Forces footer down even if the screen content is empty */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%", margin: 0, padding: 0 }}>
          
          <Navbar />
          
          {/* Main element takes all remaining empty space pushing the footer down */}
          <main style={{ flex: "1 0 auto", width: "100%", boxSizing: "border-box" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Fallbacks link paths directly into the functional Workspace dashboard */}
              <Route path="/applicants" element={<Dashboard />} />
              <Route path="/jobs-posted" element={<Dashboard />} />
              <Route path="/my-applications" element={<Dashboard />} />
            </Routes>
          </main>
          
          <Footer />
          
        </div>
      </Router>
    </AuthProvider>
  );
}