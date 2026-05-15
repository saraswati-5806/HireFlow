import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getJobs,
  addJob,
  deleteJob,
  updateJob,
  getApplicationsByCandidate,
} from "../utils/storage";

import JobForm from "../components/JobForm";

import ApplicantList from "../components/ApplicantList";

export default function Dashboard() {
  const { currentUser } = useAuth();

  const [editingJob, setEditingJob] =
    useState(null);

  const jobs = getJobs();

  // EMPLOYER JOBS
  const employerJobs = jobs.filter(
    (job) =>
      job.employerId === currentUser.id
  );

  // CANDIDATE APPLICATIONS
  const applications =
    getApplicationsByCandidate(
      currentUser.id
    );

  function handleAddJob(formData) {
    const newJob = {
      id: Date.now().toString(),
      title: formData.title,
      company: currentUser.company,
      location: formData.location,
      type: formData.type,
      salary: formData.salary,
      description: formData.description,
      requirements:
        formData.requirements.split(","),
      employerId: currentUser.id,
      postedDate:
        new Date().toISOString(),
    };

    addJob(newJob);

    window.location.reload();
  }

  function handleUpdateJob(formData) {
    const updatedJob = {
      ...editingJob,
      ...formData,
      requirements:
        formData.requirements.split(","),
    };

    updateJob(updatedJob);

    setEditingJob(null);

    window.location.reload();
  }

  function handleDelete(id) {
    deleteJob(id);

    window.location.reload();
  }

  return (
    <div className="container">

      <h1>Dashboard</h1>

      <h2>
        Welcome {currentUser.name}
      </h2>

      {/* EMPLOYER */}
      {currentUser.role === "employer" && (
        <>

          <JobForm
            onSave={
              editingJob
                ? handleUpdateJob
                : handleAddJob
            }
            initialData={editingJob}
          />

          <div className="job-grid">

            {employerJobs.map((job) => (
              <div
                key={job.id}
                className="job-card"
              >

                <h3>{job.title}</h3>

                <p>{job.location}</p>

                <button
                  onClick={() =>
                    setEditingJob(job)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(job.id)
                  }
                >
                  Delete
                </button>

                <ApplicantList
                  jobId={job.id}
                />

              </div>
            ))}

          </div>

        </>
      )}

      {/* CANDIDATE */}
      {currentUser.role === "candidate" && (
        <div className="applications">

          <h2>My Applications</h2>

          {applications.map((app) => (
            <div
              key={app.id}
              className="application-card"
            >

              <h3>{app.jobTitle}</h3>

              <p>{app.company}</p>

              <span>{app.status}</span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}