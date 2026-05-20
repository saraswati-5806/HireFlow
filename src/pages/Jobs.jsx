import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as storage from "../utils/storage";

export default function Jobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    async function fetchListings() {
      const data = await storage.getJobs();
      setAllJobs(data);
      setFilteredJobs(data);
    }
    fetchListings();
  }, []);

  // Continuous filtering without breaking the list view array context
  useEffect(() => {
    let result = allJobs;

    if (searchQuery) {
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType !== "All") {
      result = result.filter((j) => j.type === selectedType);
    }

    setFilteredJobs(result);
  }, [searchQuery, selectedType, allJobs]);

  return (
    <div className="container" style={{ maxWidth: "1200px", margin: "2.5rem auto", padding: "0 1.5rem" }}>
      
      {/* Search Header Structure */}
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "2.5rem", display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1", minWidth: "280px" }}>
          <input
            type="text"
            placeholder="🔍 Search by job position or company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ padding: "0.75rem", minWidth: "180px", fontWeight: "600" }}>
            <option value="All">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div style={{ fontWeight: "600", color: "#475569" }}>
          Showing {filteredJobs.length} Positions Available
        </div>
      </div>

      {/* 🚀 CONTINUOUS FULL-VIEW GRID LAYOUT (No Pagination Buttons) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card" style={{ background: "white", padding: "1.75rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
            <div>
              <span style={{ position: "absolute", top: "1.25rem", right: "1.25rem", padding: "0.25rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", background: "#e0f2fe", color: "#0369a1", fontWeight: "700" }}>
                {job.type}
              </span>
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.35rem", paddingRight: "4.5rem" }}>{job.title}</h3>
              <h5 style={{ margin: "0 0 1rem 0", color: "#0d9488", fontSize: "1rem" }}>🏢 {job.company}</h5>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "#475569" }}>📍 <strong>Location:</strong> {job.location}</p>
              <p style={{ margin: "0 0 1.25rem 0", fontSize: "0.9rem", color: "#475569" }}>💰 <strong>Compensation:</strong> {job.salary}</p>
            </div>
            <Link to={`/jobs/${job.id}`} className="btn" style={{ textDecoration: "none", display: "block", textAlign: "center", padding: "0.6rem" }}>
              View Position Details
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}