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
    // --- EMPLOYERS ---
    {
      id: "emp1",
      name: "Rajesh Kumar",
      email: "rajesh@techcorp.com",
      password: "demo123",
      role: "employer",
      company: "TechCorp Solutions",
    },
    {
      id: "emp2",
      name: "Ananya Iyer",
      email: "ananya@dataflow.io",
      password: "demo123",
      role: "employer",
      company: "DataFlow Inc",
    },
    {
      id: "emp3",
      name: "Vikram Malhotra",
      email: "vikram@cloudscale.com",
      password: "demo123",
      role: "employer",
      company: "CloudScale Labs",
    },
    {
      id: "emp4",
      name: "Karan Johar",
      email: "karan@fintechx.in",
      password: "demo123",
      role: "employer",
      company: "FinTechX",
    },

    // --- CANDIDATES ---
    {
      id: "cand1",
      name: "Priya Sharma",
      email: "priya@email.com",
      password: "demo123",
      role: "candidate",
    },
    {
      id: "cand2",
      name: "Amit Patel",
      email: "amit@email.com",
      password: "demo123",
      role: "candidate",
    },
    {
      id: "cand3",
      name: "Neha Reddy",
      email: "neha@email.com",
      password: "demo123",
      role: "candidate",
    },
    {
      id: "cand4",
      name: "Rohan Das",
      email: "rohan@email.com",
      password: "demo123",
      role: "candidate",
    }
  ];

  const jobs = [
    // TechCorp Solutions Jobs (emp1)
    {
      id: "job1",
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      location: "Mumbai",
      type: "Full Time",
      salary: "8-12 LPA",
      description: "Join our core UI engineering unit building cutting-edge corporate dashboard applications and intuitive workflows.",
      requirements: ["React", "CSS", "Git", "JavaScript"],
      employerId: "emp1",
      postedDate: new Date().toISOString(),
    },
    {
      id: "job2",
      title: "UI/UX Designer",
      company: "TechCorp Solutions",
      location: "Mumbai",
      type: "Hybrid",
      salary: "6-9 LPA",
      description: "Design mockups, create complex wireframes, and build dynamic design systems for web portals using interactive user-centric components.",
      requirements: ["Figma", "Prototyping", "Wireframing"],
      employerId: "emp1",
      postedDate: new Date().toISOString(),
    },

    // DataFlow Inc Jobs (emp2)
    {
      id: "job3",
      title: "Backend Engineer",
      company: "DataFlow Inc",
      location: "Bangalore",
      type: "Remote",
      salary: "10-15 LPA",
      description: "Design high-throughput backend infrastructure engines, structure secure databases, and manage distributed architectural pipelines.",
      requirements: ["Node.js", "MongoDB", "Express", "REST APIs"],
      employerId: "emp2",
      postedDate: new Date().toISOString(),
    },
    {
      id: "job4",
      title: "Data Analyst",
      company: "DataFlow Inc",
      location: "Bangalore",
      type: "Full Time",
      salary: "7-11 LPA",
      description: "Analyze vast operational metric pipelines, build business reports, and turn unstructured server statistics into actionable growth plans.",
      requirements: ["Python", "SQL", "Tableau", "Excel"],
      employerId: "emp2",
      postedDate: new Date().toISOString(),
    },

    // CloudScale Labs Jobs (emp3)
    {
      id: "job5",
      title: "DevOps Engineer",
      company: "CloudScale Labs",
      location: "Pune",
      type: "Full Time",
      salary: "12-18 LPA",
      description: "Maintain core cloud configurations, handle active server clusters, build clean automation workflows, and track performance anomalies.",
      requirements: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      employerId: "emp3",
      postedDate: new Date().toISOString(),
    },
    {
      id: "job6",
      title: "Python Developer",
      company: "CloudScale Labs",
      location: "Hyderabad",
      type: "Remote",
      salary: "9-14 LPA",
      description: "Build robust automation routines, write scripts to handle mass file ingestion systems, and support model training endpoints.",
      requirements: ["Python", "Django", "PostgreSQL", "Linux"],
      employerId: "emp3",
      postedDate: new Date().toISOString(),
    },

    // FinTechX Jobs (emp4)
    {
      id: "job7",
      title: "Full Stack Developer",
      company: "FinTechX",
      location: "Delhi NCR",
      type: "Hybrid",
      salary: "14-20 LPA",
      description: "Take structural ownership over both frontend interactive layouts and robust core transaction processing infrastructure modules.",
      requirements: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      employerId: "emp4",
      postedDate: new Date().toISOString(),
    },
    {
      id: "job8",
      title: "QA Automation Engineer",
      company: "FinTechX",
      location: "Remote",
      type: "Remote",
      salary: "6-10 LPA",
      description: "Write automated end-to-end user path simulation scripts to safeguard payment processes, find bugs, and maintain app stability.",
      requirements: ["Selenium", "JavaScript", "Jest", "Testing"],
      employerId: "emp4",
      postedDate: new Date().toISOString(),
    }
  ];

  saveUsers(users);
  saveJobs(jobs);

  localStorage.setItem("seeded", "true");
}

export function getBookmarks() {
  return JSON.parse(
    localStorage.getItem("bookmarks")
  ) || [];
}

export function saveBookmarks(bookmarks) {
  localStorage.setItem(
    "bookmarks",
    JSON.stringify(bookmarks)
  );
}