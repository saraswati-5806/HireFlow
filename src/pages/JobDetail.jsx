import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  getJobById,
  addApplication,
  hasApplied,
} from "../utils/storage";

import { useAuth } from "../context/AuthContext";

export default function JobDetail() {
  const { id } = useParams();
  const job = getJobById(id);
  const { currentUser } = useAuth();
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState(""); // State for frontend file preview

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Store the file name for the frontend preview
      toast.info(`Selected file: ${file.name}`);
    }
  }

  function handleApply() {
    if (!currentUser) {
      toast.error("Please login first");
      return;
    }

    if (currentUser.role !== "candidate") {
      toast.error("Only candidates can apply");
      return;
    }

    if (hasApplied(job.id, currentUser.id)) {
      toast.warning("You have already applied for this job");
      return;
    }

    // Optional validation: Ensure they uploaded a file or filled the box
    if (!fileName && !resumeText.trim()) {
      toast.error("Please provide a text cover letter or upload a resume file.");
      return;
    }

    const application = {
      id: Date.now().toString(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      candidateId: currentUser.id,
      candidateName: currentUser.name,
      candidateEmail: currentUser.email,
      resumeText,
      attachedFileName: fileName || "No file attached", // Mock save to your localStorage record
      appliedDate: new Date().toISOString(),
      status: "Applied",
    };

    addApplication(application);
    toast.success("Application Submitted Successfully");
    
    // Clear form inputs on success
    setResumeText("");
    setFileName("");
  }

  if (!job) {
    return <div className="container">Job not found</div>;
  }

  return (
    <div className="container">
      <h1>{job.title}</h1>
      <h3>{job.company}</h3>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>{job.description}</p>

      <div className="requirements">
        {job.requirements?.map((req, index) => (
          <span key={index}>{req}</span>
        ))}
      </div>

      {currentUser?.role === "candidate" && (
        <div className="apply-box" style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
          
          <textarea
            placeholder="Write Resume / Cover Letter"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />

          {/* Added File Input Field */}
          <div className="file-upload-section" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Upload Resume File (PDF/Doc):</label>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange} 
            />
            {fileName && (
              <p style={{ fontSize: "13px", color: "#27AE60", marginTop: "2px" }}>
                📎 Ready to upload: <strong>{fileName}</strong>
              </p>
            )}
          </div>

          <button onClick={handleApply} style={{ marginTop: "10px" }}>
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
}