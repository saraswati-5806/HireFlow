import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function JobCard({ job }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        background: "var(--card-bg, #ffffff)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        minHeight: "260px"
      }}
      className="premium-job-card"
    >
      <div>
        {/* Top Header Row: Company Initials Avatar & Job Type Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            background: "#EBF5FF",
            color: "#2563EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "16px"
          }}>
            {job.company ? job.company.charAt(0).toUpperCase() : "H"}
          </div>
          <span style={{
            background: job.type === "Remote" ? "#ECFDF5" : "#F3F4F6",
            color: job.type === "Remote" ? "#059669" : "#4B5563",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600"
          }}>
            {job.type || "Full-time"}
          </span>
        </div>

        {/* Job Title & Company Name Info */}
        <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 4px 0", color: "var(--text-main, #1F2937)" }}>
          {job.title}
        </h3>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: "0 0 16px 0", fontWeight: "500" }}>
          🏢 {job.company}
        </p>

        {/* Bottom Details Row: Location & Salary */}
        <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "#4B5563", marginBottom: "20px" }}>
          <span>📍 {job.location}</span>
          <span style={{ fontWeight: "600", color: "#2563EB" }}>💰 {job.salary}</span>
        </div>
      </div>

      {/* Action Interactive Buttons Container */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "auto" }}>
        <Link to={`/jobs/${job.id}`} style={{ flex: 1, textDecoration: "none" }}>
          <button style={{
            width: "100%",
            padding: "10px 16px",
            background: "#2563EB",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
            transition: "background 0.2s"
          }}>
            View Details
          </button>
        </Link>
        <button 
          title="Save Job"
          style={{
            padding: "10px 12px",
            background: "#F3F4F6",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          🔖
        </button>
      </div>
    </motion.div>
  );
}