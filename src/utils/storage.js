const API_URL = "http://localhost:5000/api";

// 1. DATA READ ENDPOINTS
export async function getJobs() {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function getJobById(id) {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    return response.ok ? await response.json() : null;
  } catch (error) {
    return null;
  }
}

// 2. DATA WRITE ENDPOINTS
export async function addJob(jobData) {
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

export async function addApplication(appData) {
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

export async function getEmployerDashboard(employerId) {
  try {
    const response = await fetch(`${API_URL}/dashboard/employer/${employerId}`);
    return await response.json();
  } catch (error) {
    return { totalJobs: 0, totalApplications: 0, applications: [] };
  }
}

// 3. AUTHENTICATION COMPATIBILITY STUBS
export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("hireflow_token");
}

// 4. BACKWARD COMPATIBILITY STUBS
export async function hasApplied() { return false; }
export function getUsers() { return []; }
export function saveUsers() {}
export function seedDemoData() {}
export async function deleteJob() { return { success: true }; }
export async function updateJob() { return { success: true }; }
export async function getApplicationsByCandidate() { return []; }
export async function getApplicationsByJob() { return []; }

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