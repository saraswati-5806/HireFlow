import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InfoModals from "./InfoModals";

export default function Footer() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeModal, setActiveModal] = useState(null);

  const handlePostJobRedirect = () => {
    if (currentUser?.role === "Employer") {
      navigate("/dashboard"); // Opens dashboard workspace with addition parameters
    } else {
      alert("Please log in as an Employer to access the creation workspace.");
      navigate("/login");
    }
  };

  const handleFindTalentRedirect = () => {
    if (currentUser?.role === "Employer") {
      navigate("/applicants");
    } else {
      alert("Recruiter access only. Please log in as an Employer.");
      navigate("/login");
    }
  };

  const handlePostedJobsRedirect = () => {
    if (currentUser?.role === "Employer") {
      navigate("/jobs-posted");
    } else {
      alert("Recruiter access only. Please log in as an Employer.");
      navigate("/login");
    }
  };

  return (
    <footer style={{ background: "#0f172a", color: "#94a3b8", paddingTop: "3.5rem", paddingBottom: "2rem", borderTop: "4px solid #0d9488", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
        
        {/* SECTION 1: IDENTITY & SOCIAL ANCHORS */}
        <div>
          <h3 style={{ color: "#ffffff", margin: "0 0 1rem 0", fontSize: "1.4rem" }}>Hire<span style={{ color: "#0d9488" }}>Flow</span></h3>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1.25rem" }}>
            The definitive frontend pipeline mapping elite student engineers directly onto modern corporate talent nodes.
          </p>
          <div style={{ display: "flex", gap: "1rem", fontSize: "1.2rem" }}>
            <a href="mailto:support@hireflow.edu" target="_blank" rel="noreferrer" style={{ color: "#0d9488", textDecoration: "none" }}>✉️ Gmail</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: "#0d9488", textDecoration: "none" }}>🔗 LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: "#0d9488", textDecoration: "none" }}>🐙 GitHub</a>
          </div>
        </div>

        {/* SECTION 2: FOR CANDIDATES */}
        <div>
          <h4 style={{ color: "#ffffff", margin: "0 0 1.25rem 0", fontSize: "1.1rem" }}>For Candidates</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
            <span onClick={() => navigate("/jobs")} style={{ cursor: "pointer", hover: { color: "#white" } }}>🔍 Browse Jobs</span>
            <span onClick={() => setActiveModal("advice")} style={{ cursor: "pointer", color: "#38bdf8" }}>📚 Career Advice</span>
            <span onClick={() => setActiveModal("tips")} style={{ cursor: "pointer", color: "#38bdf8" }}>📄 Resume Tips</span>
          </div>
        </div>

        {/* SECTION 3: FOR EMPLOYERS */}
        <div>
          <h4 style={{ color: "#ffffff", margin: "0 0 1.25rem 0", fontSize: "1.1rem" }}>For Employers</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
            <span onClick={handlePostJobRedirect} style={{ cursor: "pointer", color: "#38bdf8" }}>💼 Post a Job</span>
            <span onClick={handleFindTalentRedirect} style={{ cursor: "pointer", color: "#38bdf8" }}>🤝 Find Talent</span>
            <span onClick={handlePostedJobsRedirect} style={{ cursor: "pointer", color: "#38bdf8" }}>📋 Posted Jobs</span>
          </div>
        </div>

        {/* SECTION 4: COMPANY REFERENCE NODES */}
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

      {/* Render Content Lightbox Modals dynamically */}
      {activeModal && <InfoModals type={activeModal} onClose={() => setActiveModal(null)} />}
    </footer>
  );
}