import { useState, useEffect } from "react";
import { getJobs } from "../utils/storage";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [allJobs, setAllJobs] = useState([]); // Safe starting state array
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");

  const jobsPerPage = 4;

  // 1. Fetch data from your backend safely when the page opens
  useEffect(() => {
    async function fetchJobsData() {
      const data = await getJobs();
      // Safeguard: Make sure state receives a valid array even if server drops connection
      setAllJobs(Array.isArray(data) ? data : []);
    }
    fetchJobsData();
  }, []);

  // 2. Filter the backend jobs dynamically based on user input
  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title && job.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || job.type === filter;

    return matchesSearch && matchesFilter;
  });

  // 3. Paginate the filtered array safely using our array type-guard
  const startIndex = (currentPage - 1) * jobsPerPage;
  
  const safeFilteredList = Array.isArray(filteredJobs) ? filteredJobs : [];
  const paginatedJobs = safeFilteredList.slice(startIndex, startIndex + jobsPerPage);

  // Calculate maximum total pages to prevent infinite empty pages
  const totalPages = Math.ceil(safeFilteredList.length / jobsPerPage) || 1;

  return (
    <div className="container">
      <h1>Browse Jobs</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Jobs"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset back to page 1 during a search
          }}
        />

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reset back to page 1 during a filter change
          }}
        >
          <option>All</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Remote</option>
          <option>Internship</option>
        </select>
      </div>

      {/* 4. Map through the safely sliced job cards array */}
      <div className="job-grid">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1/-1", margin: "2rem 0" }}>
            No jobs found matching your criteria.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span style={{ alignSelf: "center", fontWeight: "bold" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}