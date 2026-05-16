import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function JobCard({ job }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="job-card"
    >
      <h3>{job.title}</h3>

      <p>{job.company}</p>

      <p>{job.location}</p>

      <span>{job.type}</span>

      <h4>{job.salary}</h4>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Link to={`/jobs/${job.id}`} style={{ flex: 1 }}>
          <button style={{ width: "100%" }}>View Details</button>
        </Link>
        <button style={{ backgroundColor: "#EAECEE", color: "#333" }}>🔖 Save</button>
      </div>
    </motion.div>
  );
}