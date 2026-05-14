import { getJobs } from "../utils/storage";
import JobCard from "../components/JobCard";

export default function Home() {
  const jobs = getJobs().slice(0, 6);

  return (
    <div className="container">
      <section className="hero">
        <h1>Find Your Dream Job</h1>

        <p>Connect with top companies and employers.</p>
      </section>

      <h2>Featured Jobs</h2>

      <div className="job-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}