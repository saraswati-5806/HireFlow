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

// APPLICATIONS
export function getApplications() {
  return JSON.parse(localStorage.getItem("applications")) || [];
}

export function saveApplications(apps) {
  localStorage.setItem("applications", JSON.stringify(apps));
}

// DEMO DATA
export function seedDemoData() {
  if (localStorage.getItem("seeded")) return;

  const users = [
    {
      id: "1",
      name: "Rajesh",
      email: "employer@test.com",
      password: "123456",
      role: "employer",
      company: "TechCorp",
    },
    {
      id: "2",
      name: "Priya",
      email: "candidate@test.com",
      password: "123456",
      role: "candidate",
    },
  ];

  const jobs = [
    {
      id: "101",
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Mumbai",
      type: "Full Time",
      salary: "8 LPA",
      description: "React Developer Required",
      requirements: ["React", "CSS", "Git"],
      employerId: "1",
    },
  ];

  saveUsers(users);
  saveJobs(jobs);

  localStorage.setItem("seeded", "true");
}