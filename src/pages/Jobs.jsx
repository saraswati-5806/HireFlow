import { useState } from "react";
import { getJobs } from "../utils/storage";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [search, setSearch] = useState("");

  const jobs = getJobs().filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Browse Jobs</h1>

      <input
        type="text"
        placeholder="Search Jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="job-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}