import { useState, useEffect } from "react";
import { getJobs } from "../utils/storage";
import JobCard from "../components/JobCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  {(Array.isArray(jobs) ? jobs : []).slice(0, 4).map((job) => (
  <JobCard key={job.id} job={job} />
  ))}

  // Simulate an API / Database fetch delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Connect with top companies and employers.</p>
      </section>

      <h2>Featured Jobs</h2>

      {loading ? (
        /* SKELETON LOADING GRID */
        <div className="job-grid">
          {[1, 2, 3].map((n) => (
            <div 
              key={n} 
              className="job-card skeleton" 
              style={{ 
                background: "#EAECEE", 
                height: "200px", 
                borderRadius: "10px",
                opacity: 0.6,
                animation: "pulse 1.5s infinite ease-in-out"
              }}
            >
              {/* This mimics the layout of a card while it loads */}
              <div style={{ height: "20px", background: "#BDC3C7", width: "70%", marginBottom: "15px", borderRadius: "4px" }}></div>
              <div style={{ height: "15px", background: "#BDC3C7", width: "40%", marginBottom: "10px", borderRadius: "4px" }}></div>
              <div style={{ height: "15px", background: "#BDC3C7", width: "50%", marginBottom: "20px", borderRadius: "4px" }}></div>
              <div style={{ height: "35px", background: "#BDC3C7", width: "100%", borderRadius: "4px" }}></div>
            </div>
          ))}
        </div>
      ) : (
        /* ACTUAL REAL CONTENT GRID */
        <div className="job-grid">
          {jobs.length === 0 ? (
            <p>No featured jobs available right now.</p>
          ) : (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      )}
    </div>
  );
}