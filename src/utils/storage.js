const API_URL = "http://localhost:5000/api";

// 1. DATA READ ENDPOINTS
async function getJobs() {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function getJobById(id) {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    return response.ok ? await response.json() : null;
  } catch (error) {
    return null;
  }
}

// 2. DATA WRITE ENDPOINTS
async function addJob(jobData) {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function addApplication(appData) {
  try {
    const response = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getEmployerDashboard(employerId) {
  try {
    const response = await fetch(`${API_URL}/dashboard/employer/${employerId}`);
    return await response.json();
  } catch (error) {
    return { totalJobs: 0, totalApplications: 0, applications: [] };
  }
}

// 3. AUTHENTICATION COMPATIBILITY STUBS
function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Fixed syntax: Standard function declarations
function clearCurrentUser() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("hireflow_token");
}

// 4. BACKWARD COMPATIBILITY STUBS
async function hasApplied() { return false; }
function getUsers() { return []; }
function saveUsers() {}
function seedDemoData() {}
async function deleteJob() { return { success: true }; }
async function updateJob() { return { success: true }; }
async function getApplicationsByCandidate() { return []; }
async function getApplicationsByJob() { return []; }

// 5. UNIFIED NAMED EXPORTS Block (Ensures compiler matches items perfectly)
export {
  getJobs,
  getJobById,
  addJob,
  addApplication,
  getEmployerDashboard,
  setCurrentUser,
  clearCurrentUser,
  hasApplied,
  getUsers,
  saveUsers,
  seedDemoData,
  deleteJob,
  updateJob,
  getApplicationsByCandidate,
  getApplicationsByJob
};

/* ==========================================================================
   🎨 INJECT CUSTOM COLOR PALETTE STYLES
   ========================================================================== */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    :root {
      --primary-color: #7c3aed !important;
      --primary-dark: #6d28d9 !important;
      --bg-dark: #111827 !important;
      --bg-light: #f8fafc !important;
      --text-dark: #0f172a !important;
      --accent: #a78bfa !important;
    }
    body {
      background-color: var(--bg-light) !important;
      color: var(--text-dark) !important;
    }
    nav, .navbar {
      background-color: var(--bg-dark) !important;
      border-bottom: 3px solid var(--primary-color) !important;
    }
    .btn-primary, button {
      background-color: var(--primary-color) !important;
      border: none !important;
    }
    .btn-primary:hover, button:hover {
      background-color: var(--primary-dark) !important;
    }
  `;
  document.head.appendChild(style);
}