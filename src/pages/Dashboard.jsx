import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as storage from "../utils/storage";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Unified State Orchestration
  const [employerMetrics, setEmployerMetrics] = useState({ totalJobs: 0, totalApplications: 0, applications: [] });
  const [myJobs, setMyJobs] = useState([]);
  const [candidateApps, setCandidateApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Job Posting Form Modal Switch State
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({ title: "", company: "", location: "", type: "Full Time", salary: "", category: "Tech", description: "" });

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    loadDashboardCore();
  }, [currentUser]);

  async function loadDashboardCore() {
    setLoading(false);
    if (currentUser.role === "Employer") {
      const data = await storage.getEmployerDashboard(currentUser.id);
      const allJobs = await storage.getJobs();
      const filteredJobs = allJobs.filter(j => j.postedBy === currentUser.id);
      setEmployerMetrics(data);
      setMyJobs(filteredJobs);
    } else {
      const data = await storage.getCandidateApplications(currentUser.id);
      setCandidateApps(data);
    }
  }

  const handleOpenCreate = () => {
    setEditingJob(null);
    setFormData({ title: "", company: currentUser.name || "My Company", location: "", type: "Full Time", salary: "", category: "Tech", description: "" });
    setShowForm(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job.id);
    setFormData({ title: job.title, company: job.company, location: job.location, type: job.type, salary: job.salary, category: job.category || "Tech", description: job.description });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job post? This action will clear out matching candidate tracking arrays.")) {
      await storage.deleteJob(id);
      loadDashboardCore();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingJob) {
      await storage.updateJob({ ...formData, id: editingJob, postedBy: currentUser.id });
    } else {
      await storage.addJob({ ...formData, postedBy: currentUser.id });
    }
    setShowForm(false);
    loadDashboardCore();
  };

  if (loading) return <div style={{ padding: "4rem", textAlign: "center" }}>Initializing secure profile session...</div>;

  // ==========================================================================
  // VIEW A: CANDIDATE DASHBOARD LAYOUT (Stored in LocalStorage)
  // ==========================================================================
  if (currentUser?.role === "Candidate") {
    return (
      <div className="container" style={{ maxWidth: "1000px", margin: "3rem auto", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.25rem", margin: "0" }}>My Applications</h1>
          <p style={{ color: "#64748b", margin: "0.25rem 0 0 0" }}>Track the status of positions you have applied for.</p>
        </div>

        {candidateApps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
            <p style={{ color: "#64748b", margin: "0 0 1.5rem 0" }}>You haven't submitted any job application forms yet.</p>
            <button onClick={() => navigate("/jobs")} className="btn">Explore Available Openings</button>
          </div>
        ) : (
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <tr>
                  <th style={{ padding: "1rem" }}>Position</th>
                  <th style={{ padding: "1rem" }}>Company</th>
                  <th style={{ padding: "1rem" }}>Location</th>
                  <th style={{ padding: "1rem" }}>Applied Date</th>
                  <th style={{ padding: "1rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {candidateApps.map((app) => (
                  <tr key={app.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "1rem", fontWeight: "600" }}>{app.title}</td>
                    <td style={{ padding: "1rem" }}>{app.company}</td>
                    <td style={{ padding: "1rem" }}>{app.location}</td>
                    <td style={{ padding: "1rem", color: "#64748b" }}>{app.appliedAt}</td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", background: "#d1fae5", color: "#065f46", fontWeight: "600" }}>
                        Submitted Successfully
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // VIEW B: EMPLOYER DASHBOARD LAYOUT (Matches Video Reference Interface)
  // ==========================================================================
  return (
    <div className="container" style={{ maxWidth: "1250px", margin: "3rem auto", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        <div>
          <h1 style={{ fontSize: "2.25rem", margin: "0" }}>Employer Dashboard</h1>
          <p style={{ color: "#64748b", margin: "0.25rem 0 0 0" }}>Manage your job openings and view applicant details.</p>
        </div>
        <button onClick={handleOpenCreate} className="btn" style={{ fontSize: "1rem", padding: "0.75rem 1.25rem" }}>
          + Post a New Job
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
        
        {/* LEFT COLUMN: MY JOBS */}
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "0", marginBottom: "1.5rem", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem" }}>My Jobs</h2>
          {myJobs.length === 0 ? (
            <p style={{ color: "#64748b", textAlign: "center", padding: "2rem 0" }}>You haven't posted any job openings yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {myJobs.map(job => (
                <div key={job.id} style={{ padding: "1rem", border: "1px solid #f1f5f9", borderRadius: "8px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "1.1rem" }}>{job.title}</h4>
                    <p style={{ margin: "0", fontSize: "0.85rem", color: "#64748b" }}>📍 {job.location} | 💼 {job.type}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleOpenEdit(job)} style={{ background: "#cbd5e1", color: "#1e293b", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} className="btn">Edit</button>
                    <button onClick={() => handleDelete(job.id)} style={{ background: "#ef4444", color: "white", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} className="btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: RECENT APPLICANTS */}
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "0", marginBottom: "1.5rem", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem" }}>Recent Applications</h2>
          {employerMetrics.applications.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem color", color: "#64748b" }}>
              <p style={{ margin: "0" }}>No applications received yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {employerMetrics.applications.map(app => (
                <div key={app.id} style={{ padding: "1rem", border: "1px solid #e2e8f0", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "1.05rem" }}>{app.candidateName}</strong>
                    <span style={{ fontSize: "0.85rem", color: "#0d9488", fontWeight: "bold" }}>{app.job_title}</span>
                  </div>
                  <p style={{ margin: "0", fontSize: "0.9rem", color: "#475569" }}>✉ {app.candidateEmail}</p>
                  <span style={{ fontSize: "0.8rem", color: "#94a3b8", textAlign: "right" }}>Logged on: {app.appliedAt}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* OVERLAY MODAL FORM (Matches Add/Edit Video Trigger) */}
      {showForm && (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", background: "rgba(15, 23, 42, 0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "999" }}>
          <form onSubmit={handleFormSubmit} style={{ background: "white", padding: "2rem", borderRadius: "12px", width: "100%", maxWidth: "550px", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem" }}>{editingJob ? "Edit Job Posting" : "Post a New Job"}</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Job Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="e.g. Frontend Developer" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required placeholder="e.g. Remote / Mumbai" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Job Type</label>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                  <option value="Full Time">Full Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Salary Range</label>
                <input type="text" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} required placeholder="e.g. ₹10L - ₹15L" />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                <option value="Tech">Tech</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Management">Management</option>
                <option value="Data">Data</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Job Description</label>
              <textarea rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required placeholder="Outline core responsibilities, skills needed, and requirements..." style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "0.5rem" }}></textarea>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: "#cbd5e1", color: "#1e293b" }} className="btn">Cancel</button>
              <button type="submit" className="btn">Save Changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}