import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  if (!job) return null;

  return (
    <div className="job-card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem" }}>{job.title}</h3>
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#7c3aed", fontWeight: "600" }}>{job.company}</h4>
          <p style={{ margin: "0", color: "#64748b", fontSize: "0.9rem" }}>
            📍 {job.location} | 💼 {job.type}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", background: "#f1f5f9", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "600", color: "#475569" }}>
            {job.salary}
          </span>
        </div>
      </div>
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
        <Link to={`/jobs/${job.id}`} className="btn" style={{ padding: "0.5rem 1rem", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600" }}>
          View Details →
        </Link>
      </div>
    </div>
  );
}