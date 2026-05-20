import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import * as storage from "../utils/storage"; // <-- Wildcard fix

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [metrics, setMetrics] = useState({ totalJobs: 0, totalApplications: 0, applications: [] });
  const [loading, setLoading] = useState(true);

  // Form Field States
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full Time");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      if (currentUser?.id) {
        const data = await storage.getEmployerDashboard(currentUser.id);
        setMetrics(data || { totalJobs: 0, totalApplications: 0, applications: [] });
      }
      setLoading(false);
    }
    loadDashboardData();
  }, [currentUser]);

  const handlePostJob = async (e) => {
    e.preventDefault();
    const newJob = {
      title, company, location, type, salary, description,
      requirements: ["React", "Node.js"], // Automated default requirements array
      postedBy: currentUser.id
    };

    await storage.addJob(newJob);
    alert("Job successfully posted to live board!");
    
    // Refresh view data rows
    const data = await storage.getEmployerDashboard(currentUser.id);
    setMetrics(data);
    
    // Reset Form
    setTitle(""); setCompany(""); setLocation(""); setSalary(""); setDescription("");
  };

  if (loading) return <div style={{ padding: "3rem", textAlign: "center" }}>Loading Dashboard Pipeline...</div>;

  return (
    <div className="container" style={{ maxWidth: "1200px", margin: "2rem auto", padding: "1.5rem" }}>
      <h1>Recruiter Management Hub</h1>
      <p style={{ color: "#666" }}>Logged in as: <strong>{currentUser?.name}</strong></p>

      {/* Metrics Counters Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", margin: "2rem 0" }}>
        <div style={{ padding: "1.5rem", background: "#f1f5f9", borderRadius: "8px", borderLeft: "5px solid #7c3aed" }}>
          <h3>Total Openings</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0" }}>{metrics.totalJobs}</p>
        </div>
        <div style={{ padding: "1.5rem", background: "#f1f5f9", borderRadius: "8px", borderLeft: "5px solid #7c3aed" }}>
          <h3>Received Applications</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0" }}>{metrics.totalApplications}</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2rem" }}>
        {/* Left Column: Post Job Form */}
        <form onSubmit={handlePostJob} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h2>Post a New Opening</h2>
          <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required />
          <input type="text" placeholder="Location (e.target. e.g. Remote, Mumbai)" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Remote</option>
            <option>Internship</option>
          </select>
          <input type="text" placeholder="Salary Package (e.g. $80,000/yr)" value={salary} onChange={(e) => setSalary(e.target.value)} required />
          <textarea placeholder="Job Description Specifications" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          <button type="submit" style={{ padding: "0.75rem", cursor: "pointer", fontWeight: "bold" }}>Launch Vacancy</button>
        </form>

        {/* Right Column: Applications Table List */}
        <div>
          <h2>Candidate Tracking Pipeline</h2>
          {metrics.applications.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
              <thead>
                <tr style={{ background: "#111827", color: "#fff", textAlign: "left" }}>
                  <th style={{ padding: "0.5rem" }}>Candidate</th>
                  <th style={{ padding: "0.5rem" }}>Target Role</th>
                  <th style={{ padding: "0.5rem" }}>Email</th>
                </tr>
              </thead>
              <tbody>
                {metrics.applications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "0.75rem" }}>{app.candidate_name}</td>
                    <td style={{ padding: "0.75rem" }}>{app.job_title}</td>
                    <td style={{ padding: "0.75rem", color: "#6d28d9" }}>{app.candidate_email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#777", fontStyle: "italic", marginTop: "1rem" }}>No candidates have applied to your listings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}