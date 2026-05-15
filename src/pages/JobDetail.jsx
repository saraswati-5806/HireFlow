import { useParams } from "react-router-dom";
import { useState } from "react";

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

  const [resumeText, setResumeText] =
    useState("");

  function handleApply() {
    if (!currentUser) {
      alert("Login First");
      return;
    }

    if (currentUser.role !== "candidate") {
      alert("Only candidates can apply");
      return;
    }

    if (hasApplied(job.id, currentUser.id)) {
      alert("Already Applied");
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
      appliedDate: new Date().toISOString(),
      status: "Applied",
    };

    addApplication(application);

    alert("Application Submitted");
  }

  return (
    <div className="container">

      <h1>{job.title}</h1>

      <h3>{job.company}</h3>

      <p>{job.location}</p>

      <p>{job.salary}</p>

      <p>{job.description}</p>

      <div className="requirements">
        {job.requirements.map((req, index) => (
          <span key={index}>{req}</span>
        ))}
      </div>

      {currentUser?.role === "candidate" && (
        <div className="apply-box">

          <textarea
            placeholder="Write Resume / Cover Letter"
            onChange={(e) =>
              setResumeText(e.target.value)
            }
          />

          <button onClick={handleApply}>
            Apply Now
          </button>

        </div>
      )}

    </div>
  );
}