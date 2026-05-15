// USERS
export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// CURRENT USER
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

// JOBS
export function getJobs() {
  return JSON.parse(localStorage.getItem("jobs")) || [];
}

export function saveJobs(jobs) {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

export function addJob(job) {
  const jobs = getJobs();
  jobs.push(job);
  saveJobs(jobs);
}

export function updateJob(updatedJob) {
  const jobs = getJobs().map((job) =>
    job.id === updatedJob.id ? updatedJob : job
  );

  saveJobs(jobs);
}

export function deleteJob(jobId) {
  const jobs = getJobs().filter((job) => job.id !== jobId);

  saveJobs(jobs);
}

export function getJobById(id) {
  return getJobs().find((job) => job.id === id);
}

// APPLICATIONS
export function getApplications() {
  return JSON.parse(localStorage.getItem("applications")) || [];
}

export function saveApplications(apps) {
  localStorage.setItem("applications", JSON.stringify(apps));
}

export function addApplication(app) {
  const apps = getApplications();

  apps.push(app);

  saveApplications(apps);
}

export function getApplicationsByCandidate(candidateId) {
  return getApplications().filter(
    (app) => app.candidateId === candidateId
  );
}

export function getApplicationsByJob(jobId) {
  return getApplications().filter((app) => app.jobId === jobId);
}

export function hasApplied(jobId, candidateId) {
  return getApplications().some(
    (app) =>
      app.jobId === jobId &&
      app.candidateId === candidateId
  );
}

// SEED DATA
export function seedDemoData() {
  if (localStorage.getItem("seeded")) return;

  const users = [
    {
      id: "emp1",
      name: "Rajesh Kumar",
      email: "rajesh@techcorp.com",
      password: "demo123",
      role: "employer",
      company: "TechCorp Solutions",
    },
    {
      id: "cand1",
      name: "Priya Sharma",
      email: "priya@email.com",
      password: "demo123",
      role: "candidate",
    },
  ];

  const jobs = [
    {
      id: "job1",
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      location: "Mumbai",
      type: "Full Time",
      salary: "8-12 LPA",
      description: "Build React applications.",
      requirements: ["React", "CSS", "Git"],
      employerId: "emp1",
      postedDate: new Date().toISOString(),
    },
    {
      id: "job2",
      title: "Backend Engineer",
      company: "DataFlow Inc",
      location: "Bangalore",
      type: "Remote",
      salary: "10-15 LPA",
      description: "Node.js API development.",
      requirements: ["Node.js", "MongoDB"],
      employerId: "emp1",
      postedDate: new Date().toISOString(),
    },
  ];

  saveUsers(users);
  saveJobs(jobs);

  localStorage.setItem("seeded", "true");
}