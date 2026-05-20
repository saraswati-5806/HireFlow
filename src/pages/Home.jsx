import { useState, useEffect } from "react";
import { getJobs } from "../utils/storage";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";

export default function Home() {
  const [homeJobs, setHomeJobs] = useState([]); // Clear, unique state variable name
  const [loading, setLoading] = useState(true);

  // Fetch jobs safely from backend server database on page mount
  useEffect(() => {
    async function loadHomeData() {
      try {
        const data = await getJobs();
        // Fallback validation: ensure state gets an array even if backend is offline
        setHomeJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to parse home listings:", error);
        setHomeJobs([]);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  // Take up to 4 elements safely for the featured grid display
  const featuredJobs = homeJobs.slice(0, 4);

  return (
    <div className="home-container" style={{ padding: "2rem 0", textAlign: "center" }}>
      <div className="hero-section" style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Find Your Dream Job</h1>
        <p style={{ color: "#666" }}>Connect with top companies and employers.</p>
      </div>

      <div className="featured-section" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <h2 style={{ textAlign: "left", marginBottom: "1.5rem" }}>Featured Jobs</h2>

        {loading ? (
          <p>Loading curated listings...</p>
        ) : featuredJobs.length > 0 ? (
          <div className="job-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div style={{ padding: "3rem 1rem", border: "1px dashed #ccc", borderRadius: "8px", background: "#f9f9f9" }}>
            <p style={{ color: "#555", marginBottom: "1rem" }}>No featured listings found.</p>
            <p style={{ fontSize: "0.85rem", color: "#888" }}>Make sure your local Node backend server is running on port 5000!</p>
          </div>
        )}

        <div style={{ marginTop: "2.5rem" }}>
          <Link to="/jobs" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", background: "#2563eb", color: "#fff", borderRadius: "5px", textDecoration: "none", fontWeight: "600" }}>
            See All Openings
          </Link>
        </div>
      </div>
    </div>
  );
}