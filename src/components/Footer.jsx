import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InfoModals from "./InfoModals";

export default function Footer() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeModal, setActiveModal] = useState(null);

  const handlePostJobRedirect = () => {
    if (currentUser?.role === "Employer") navigate("/dashboard");
    else { alert("Employer login status required."); navigate("/login"); }
  };

  const handleFindTalentRedirect = () => {
    if (currentUser?.role === "Employer") navigate("/applicants");
    else { alert("Employer status required."); navigate("/login"); }
  };

  const handleCandidateRedirect = (path) => {
    if (currentUser?.role === "Candidate") navigate(path);
    else { alert("Candidate status required."); navigate("/login"); }
  };

  return (
    <footer style={{ background: "#0f172a", color: "#94a3b8", paddingTop: "3.5rem", paddingBottom: "2rem", borderTop: "4px solid #0d9488", fontFamily: "sans-serif", width: "100%" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
        
        {/* COL 1: LOGO & REAL SVG BRAND ICONS */}
        <div>
          <h3 style={{ color: "#ffffff", margin: "0 0 1rem 0", fontSize: "1.4rem" }}>Hire<span style={{ color: "#0d9488" }}>Flow</span></h3>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>The definitive frontend pipeline mapping elite student engineers directly onto modern corporate talent nodes.</p>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <a href="mailto:support@hireflow.edu" title="Email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="#EA4335"/><path d="M22 6V9L12 15L2 9V6L12 12L22 6Z" fill="#C5221F"/><path d="M2 6V18C2 19.1 2.9 20 4 20H6V9L2 6Z" fill="#F4B400"/><path d="M22 6V18C22 19.1 21.1 20 20 20H18V9L22 6Z" fill="#4285F4"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.345.72-4.05-1.62-4.05-1.62-.54-1.38-1.32-1.75-1.32-1.75-1.095-.75.075-.735.075-.735 1.205.09 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.374.805 1.117.805 2.25 0 1.62-.015 2.925-.015 3.314 0 .319.225.684.825.56C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>

        {/* COL 2: CANDIDATE LINK CHANNELS */}
        <div>
          <h4 style={{ color: "#ffffff", margin: "0 0 1.25rem 0", fontSize: "1.1rem" }}>For Candidates</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
            <span onClick={() => navigate("/jobs")} style={{ cursor: "pointer", color: "#38bdf8" }}>🔍 Browse Jobs</span>
            <span onClick={() => setActiveModal("recruiters")} style={{ cursor: "pointer", color: "#38bdf8" }}>🏢 Find Recruiters</span>
            <span onClick={() => handleCandidateRedirect("/my-applications")} style={{ cursor: "pointer", color: "#38bdf8" }}>📄 My Applications</span>
          </div>
        </div>

        {/* COL 3: RECRUITER ACTIONS */}
        <div>
          <h4 style={{ color: "#ffffff", margin: "0 0 1.25rem 0", fontSize: "1.1rem" }}>For Employers</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
            <span onClick={handlePostJobRedirect} style={{ cursor: "pointer", color: "#38bdf8" }}>💼 Post a Job</span>
            <span onClick={handleFindTalentRedirect} style={{ cursor: "pointer", color: "#38bdf8" }}>🤝 Find Talent</span>
            <span onClick={() => navigate("/dashboard")} style={{ cursor: "pointer", color: "#38bdf8" }}>📋 Posted Jobs</span>
          </div>
        </div>

        {/* COL 4: COMPANY INFO NODES */}
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