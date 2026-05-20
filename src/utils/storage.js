const API_URL = "http://localhost:5000/api";

// Live Fetch Readers
export async function getJobs() {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

export async function getJobById(id) {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    return response.ok ? await response.json() : null;
  } catch { return null; }
}

// Live DB Write Operations
export async function addJob(jobData) {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });
    return await response.json();
  } catch (error) { console.error(error); }
}

export async function addApplication(appData) {
  try {
    const response = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData),
    });
    return await response.json();
  } catch (error) { console.error(error); }
}

// Dashboard Live Connector
export async function getEmployerDashboard(employerId) {
  try {
    const response = await fetch(`${API_URL}/dashboard/employer/${employerId}`);
    return await response.json();
  } catch { return { totalJobs: 0, totalApplications: 0, applications: [] }; }
}

// Backward Compatibility Stubs
export async function hasApplied() { return false; }
export function getUsers() { return []; }
export function saveUsers() {}
export function seedDemoData() {}
export async function deleteJob() { return { success: true }; }
export async function updateJob() { return { success: true }; }
export async function getApplicationsByCandidate() { return []; }
export async function getApplicationsByJob() { return []; }

/* ==========================================================================
   🎨 INJECT PURPLE, CHARCOAL & ICE NEON CUSTOM COLOR PALETTE STYLES
   ========================================================================== */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    :root {
      --primary-color: #7c3aed !important; /* Premium Vibrant Purple */
      --primary-dark: #6d28d9 !important;
      --bg-dark: #111827 !important;       /* Dark Navy Charcoal Nav */
      --bg-light: #f8fafc !important;      /* Ice Gray Background */
      --text-dark: #0f172a !important;     /* High Contrast Text */
      --accent: #a78bfa !important;        /* Purple Muted Tint */
    }
    
    body {
      background-color: var(--bg-light) !important;
      color: var(--text-dark) !important;
      font-family: 'Inter', sans-serif !important;
    }

    navbar, .navbar, nav {
      background-color: var(--bg-dark) !important;
      border-bottom: 3px solid var(--primary-color) !important;
    }

    nav a, .navbar-brand, .nav-link {
      color: #f1f5f9 !important;
    }

    nav a:hover {
      color: var(--accent) !important;
    }

    .card, .job-card, .container {
      background: #ffffff !important;
      border-radius: 12px !important;
      border: 1px solid #e2e8f0 !important;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
    }

    .btn-primary, button, input[type="submit"], .btn {
      background-color: var(--primary-color) !important;
      border: none !important;
      color: white !important;
      border-radius: 6px !important;
      transition: all 0.2s ease !important;
    }

    .btn-primary:hover, button:hover {
      background-color: var(--primary-dark) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3) !important;
    }

    input, select, textarea {
      border: 1px solid #cbd5e1 !important;
      border-radius: 6px !important;
      padding: 0.6rem !important;
    }

    input:focus, select:focus {
      outline: 2px solid var(--primary-color) !important;
    }

    h1, h2, h3 {
      color: var(--bg-dark) !important;
      font-weight: 700 !important;
    }
  `;
  document.head.appendChild(style);
}