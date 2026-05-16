import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

import {
  getJobs,
  addJob,
  deleteJob,
  updateJob,
  getApplicationsByCandidate,
  getApplicationsByJob, // Imported this to support your new stats logic
} from "../utils/storage";

import JobForm from "../components/JobForm";
import ApplicantList from "../components/ApplicantList";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [editingJob, setEditingJob] = useState(null);
  
  // Use local state to force immediate component re-render without refreshing the page
  const [jobsList, setJobsList] = useState(getJobs());

  // EMPLOYER JOBS
  const employerJobs = jobsList.filter(
    (job) => job.employerId === currentUser.id
  );

  // CANDIDATE APPLICATIONS
  const applications = getApplicationsByCandidate(currentUser.id);

  function handleAddJob(formData) {
    const newJob = {
      id: Date.now().toString(),
      title: formData.title,
      company: currentUser.company || "Your Company",
      location: formData.location,
      type: formData.type,
      salary: formData.salary,
      description: formData.description,
      requirements: typeof formData.requirements === "string" 
        ? formData.requirements.split(",").map(r => r.trim()) 
        : formData.requirements,
      employerId: currentUser.id,
      postedDate: new Date().toISOString(),
    };

    addJob(newJob);
    setJobsList(getJobs()); // Update state to display job instantly
    toast.success("Job Added Successfully");
  }

  function handleUpdateJob(formData) {
    const updatedJob = {
      ...editingJob,
      ...formData,
      requirements: typeof formData.requirements === "string"
        ? formData.requirements.split(",").map(r => r.trim())
        : formData.requirements,
    };

    updateJob(updatedJob);
    setEditingJob(null);
    setJobsList(getJobs()); // Update state to display updates instantly
    toast.success("Job Updated Successfully");
  }

  function handleDelete(id) {
    deleteJob(id);
    setJobsList(getJobs()); // Update state to clean UI instantly
    toast.info("Job Deleted Successfully");
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <h2>Welcome {currentUser.name}</h2>
      <p style={{ textTransform: "capitalize", marginBottom: "20px" }}>Role: {currentUser.role}</p>

      {/* EMPLOYER INTERFACE */}
      {currentUser.role === "employer" && (
        <>
          <JobForm
            onSave={editingJob ? handleUpdateJob : handleAddJob}
            initialData={editingJob}
          />

          {/* ADDED STATS SECTION */}
          <div className="stats-grid" style={{ display: "flex", gap: "20px", marginTop: "30px", marginBottom: "20px" }}>
            <div className="stat-card" style={{ background: "white", padding: "20px", borderRadius: "10px", flex: "1", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
              <h2>{employerJobs.length}</h2>
              <p style={{ color: "#666" }}>Total Jobs</p>
            </div>

            <div className="stat-card" style={{ background: "white", padding: "20px", borderRadius: "10px", flex: "1", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
              <h2>
                {employerJobs.reduce(
                  (acc, job) => acc + getApplicationsByJob(job.id).length,
                  0
                )}
              </h2>
              <p style={{ color: "#666" }}>Total Applicants</p>
            </div>
          </div>

          <h2 style={{ marginTop: "30px" }}>Your Job Listings</h2>
          <div className="job-grid">
            {employerJobs.length === 0 ? (
              <p>You haven't posted any jobs yet.</p>
            ) : (
              employerJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary}</p>
                  
                  <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
                    <button onClick={() => setEditingJob(job)}>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(job.id)} 
                      style={{ backgroundColor: "#E74C3C" }}
                    >
                      Delete
                    </button>
                  </div>

                  <ApplicantList jobId={job.id} />
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* CANDIDATE INTERFACE */}
      {currentUser.role === "candidate" && (
        <div className="applications">
          <h2>My Applications</h2>
          {applications.length === 0 ? (
            <p>You haven't applied to any jobs yet.</p>
          ) : (
            <div className="job-grid">
              {applications.map((app) => (
                <div key={app.id} className="application-card" style={{ background: "white", padding: "20px", borderRadius: "10px", marginTop: "15px" }}>
                  <h3>{app.jobTitle}</h3>
                  <p>🏢 {app.company}</p>
                  <p>📅 Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                  <span className={`status-badge ${app.status.toLowerCase()}`} style={{ display: "inline-block", marginTop: "10px", padding: "5px 10px", borderRadius: "5px", background: "#EAECEE", fontWeight: "bold" }}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}