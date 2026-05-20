import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as storage from "../utils/storage"; // <-- Standardized Wildcard Fix

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    async function loadJobDetails() {
      const data = await storage.getJobById(id);
      setJob(data);
      setLoading(false);
    }
    loadJobDetails();
  }, [id]);

  const handleApply = async () => {
    if (!currentUser) {
      alert("Please log in to submit your job application.");
      navigate("/login");
      return;
    }

    const applicationPayload = {
      jobId: job.id,
      candidateId: currentUser.id,
      candidateName: currentUser.name,
      candidateEmail: currentUser.email
    };

    await storage.addApplication(applicationPayload);
    setApplied(true);
    alert(`Success! Your application for ${job.title} has been logged in the backend database.`);
  };

  if (loading) return <div style={{ padding: "3rem", textAlign: "center" }}>Loading position metrics...</div>;
  if (!job) return <div style={{ padding: "3rem", textAlign: "center" }}>Job position not found.</div>;

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "3rem auto", padding: "2rem" }}>
      <button onClick={() => navigate(-1)} style={{ padding: "0.5rem 1rem", marginBottom: "1.5rem", cursor: "pointer", background: "#f1f5f9", color: "#111827", border: "1px solid #cbd5e1" }}>
        ← Back to Listings
      </button>

      <div style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", margin: "0 0 0.5rem 0" }}>{job.title}</h1>
        <h3 style={{ color: "#7c3aed", margin: "0 0 0.25rem 0" }}>{job.company}</h3>
        <p style={{ color: "#666", margin: "0" }}>📍 {job.location} | 💼 {job.type} | 💰 {job.salary}</p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Job Description</h2>
        <p style={{ lineHeight: "1.6", color: "#334155" }}>{job.description}</p>
      </div>

      <div style={{ marginBottom: "2.5rem" }}>
        <h2>Core Prerequisites</h2>
        <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.8" }}>
          {Array.isArray(job.requirements) && job.requirements.length > 0 ? (
            job.requirements.map((req, idx) => <li key={idx}>{req}</li>)
          ) : (
            <>
              <li>Strong problem-solving capability</li>
              <li>Familiarity with collaborative engineering systems</li>
            </>
          )}
        </ul>
      </div>

      {currentUser?.role === "Employer" ? (
        <p style={{ fontStyle: "italic", color: "#666", background: "#f1f5f9", padding: "1rem", borderRadius: "6px" }}>
          ℹ️ You are currently viewing this vacancy as a Recruiter. Candidates will see an "Apply Now" submission trigger here.
        </p>
      ) : (
        <button
          onClick={handleApply}
          disabled={applied}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: applied ? "not-allowed" : "pointer",
            background: applied ? "#10b981" : "#7c3aed",
            color: "white",
            borderRadius: "8px"
          }}
        >
          {applied ? "✓ Application Transmitted Safely" : "Submit Application Now"}
        </button>
      )}
    </div>
  );
}