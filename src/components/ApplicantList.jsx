import {
  getApplicationsByJob,
} from "../utils/storage";

export default function ApplicantList({
  jobId,
}) {
  const applicants =
    getApplicationsByJob(jobId);

  return (
    <div className="applicant-list">

      <h3>Applicants</h3>

      {applicants.length === 0 && (
        <p>No applicants yet.</p>
      )}

      {applicants.map((app) => (
        <div key={app.id} className="applicant-card">

          <h4>{app.candidateName}</h4>

          <p>{app.candidateEmail}</p>

          <p>{app.resumeText}</p>

          <span>{app.status}</span>

        </div>
      ))}

    </div>
  );
}