// ── DATA ACCESS POINT SOURCE OF TRUTH ──

export function seedDemoData() {
  if (localStorage.getItem("hireflow_seeded") === "true") return;

  const demoEmployer = {
    id: "user_demo_employer",
    name: "Rajesh Kumar",
    email: "rajesh@techcorp.com",
    password: "demo123",
    role: "Employer",
    company: "TechCorp Solutions"
  };

  const demoCandidate = {
    id: "user_demo_candidate",
    name: "Priya Sharma",
    email: "priya@email.com",
    password: "demo123",
    role: "Candidate",
    company: ""
  };

  const demoJobs = [
    {
      id: "job_1",
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      location: "Mumbai, Maharashtra",
      salary: "8-12 LPA",
      description: "Build beautiful operational tracking frameworks using React.js and standard CSS structures.",
      requirements: ["React.js", "HTML5", "CSS3", "Git"],
      postedBy: "user_demo_employer"
    },
    {
      id: "job_2",
      title: "Backend Engineer",
      company: "DataFlow Systems",
      location: "Bangalore, Karnataka",
      salary: "12-18 LPA",
      description: "Design robust, highly scalable storage arrays and perform integration routing processes.",
      requirements: ["Node.js", "Express", "REST APIs", "SQL"],
      postedBy: "user_demo_employer"
    }
  ];

  localStorage.setItem("hireflow_users", JSON.stringify([demoEmployer, demoCandidate]));
  localStorage.setItem("hireflow_jobs", JSON.stringify(demoJobs));
  localStorage.setItem("hireflow_seeded", "true");
  console.log("Database layers initialized with evaluation accounts.");
}

// ── USERS DATA INTERFACES ──
export function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

// ── JOBS DATA INTERFACES ──
export function getJobs() {
  // Always trigger seed verification check during compilation queries
  seedDemoData();
  return JSON.parse(localStorage.getItem("hireflow_jobs") || "[]");
}

export function getJobById(id) {
  return getJobs().find((j) => j.id === id);
}

export function addJob(jobData) {
  const jobs = getJobs();
  const newJob = {
    ...jobData,
    id: "job_" + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  jobs.push(newJob);
  localStorage.setItem("hireflow_jobs", JSON.stringify(jobs));
  return newJob;
}

// ── APPLICATIONS DATA INTERFACES ──
export function getApplications() {
  return JSON.parse(localStorage.getItem("hireflow_applications") || "[]");
}

export function addApplication(appData) {
  const apps = getApplications();
  const newApp = {
    ...appData,
    id: "app_" + Math.random().toString(36).substr(2, 9),
    appliedAt: new Date().toLocaleDateString()
  };
  apps.push(newApp);
  localStorage.setItem("hireflow_applications", JSON.stringify(apps));
  return newApp;
}

export function getEmployerDashboard(employerId) {
  const allJobs = getJobs();
  const employerJobs = allJobs.filter((j) => j.postedBy === employerId);
  const allApps = getApplications();

  const employerJobIds = employerJobs.map((j) => j.id);
  const filteredApps = allApps.filter((a) => employerJobIds.includes(a.jobId));

  const structuredApps = filteredApps.map((a) => {
    const matchJob = employerJobs.find((j) => j.id === a.jobId);
    return {
      ...a,
      job_title: matchJob ? matchJob.title : "Unknown Position Matrix"
    };
  });

  return {
    totalJobs: employerJobs.length,
    applications: structuredApps
  };
}

export function getCandidateApplications(candidateId) {
  const allApps = getApplications().filter((a) => a.candidateId === candidateId);
  const allJobs = getJobs();

  return allApps.map((a) => {
    const associatedJob = allJobs.find((j) => j.id === a.jobId);
    return {
      id: a.id,
      title: associatedJob ? associatedJob.title : "Archived Opening Node",
      company: associatedJob ? associatedJob.company : "External Entity",
      location: associatedJob ? associatedJob.location : "Remote Operations",
      appliedAt: a.appliedAt
    };
  });
}