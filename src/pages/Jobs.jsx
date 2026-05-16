import { useState } from "react";

import { getJobs } from "../utils/storage";

import JobCard from "../components/JobCard";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 4;
  
  const [filter, setFilter] =
    useState("All");

  const jobs = getJobs().filter((job) => {

    const matchesSearch =
      job.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      job.type === filter;

    return matchesSearch && matchesFilter;
  });

  const startIndex =
    (currentPage - 1) * jobsPerPage;

  const paginatedJobs =
    jobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="container">

      <h1>Browse Jobs</h1>

      <div className="filters">

        <input
          type="text"
          placeholder="Search Jobs"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Remote</option>
          <option>Internship</option>
        </select>

      </div>

      <div className="job-grid">
        {paginatedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(currentPage - 1)
    }
    >
    Prev
  </button>

  <button
    onClick={() =>
      setCurrentPage(currentPage + 1)
    }
    >
    Next
  </button>

  </div>
    </div>
  );
}