import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <p>{job.company}</p>

      <p>{job.location}</p>

      <span>{job.type}</span>

      <h4>{job.salary}</h4>

      <Link to={`/jobs/${job.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}