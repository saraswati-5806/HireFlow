const API_URL = "http://localhost:5000/api";

// 1. DATA READ ENDPOINTS
export async function getJobs() {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
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
   🎨 INJECT CUSTOM "COOL WATERS" COLOR PALETTE STYLES
   ========================================================================== */
if (typeof document !== "undefined") {
  // Remove any previously appended style blocks to prevent color clashing
  const existingStyles = document.querySelectorAll("style[data-theme='cool-waters']");
  existingStyles.forEach(el => el.remove());

  const style = document.createElement("style");
  style.setAttribute("data-theme", "cool-waters");
  style.innerHTML = `
    :root {
      --primary-teal: #0d9488 !important;   /* Vibrant Teal Accent */
      --dark-teal: #115e59 !important;      /* Deep Teal Hover State */
      --slate-dark: #0f172a !important;     /* Clean Text Dark */
      --ice-blue: #e0f2fe !important;       /* Premium Light Navbar Background */
      --bg-canvas: #f8fafc !important;      /* Soft Ice White Base Canvas */
    }
    
    body {
      background-color: var(--bg-canvas) !important;
      color: var(--slate-dark) !important;
      font-family: 'Inter', sans-serif !important;
    }

    /* Navbar explicitly styled in the light Ice Blue instead of Dark Slate */
    nav, .navbar {
      background-color: var(--ice-blue) !important;
      border-bottom: 2px solid var(--primary-teal) !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04) !important;
    }

    nav a, .navbar-brand, .nav-link {
      color: var(--dark-teal) !important;
      font-weight: 600 !important;
    }

    nav a:hover {
      color: var(--primary-teal) !important;
    }

    .card, .job-card, .container {
      background: #ffffff !important;
      border-radius: 12px !important;
      border: 1px solid #e2e8f0 !important;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
    }

    .btn-primary, button, input[type="submit"], .btn {
      background-color: var(--primary-teal) !important;
      border: none !important;
      color: white !important;
      border-radius: 6px !important;
      font-weight: 600 !important;
      transition: all 0.2s ease !important;
    }

    .btn-primary:hover, button:hover {
      background-color: var(--dark-teal) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25) !important;
    }

    input, select, textarea {
      border: 1px solid #cbd5e1 !important;
      border-radius: 6px !important;
      padding: 0.6rem !important;
      background-color: #ffffff !important;
    }

    input:focus, select:focus {
      outline: 2px solid var(--primary-teal) !important;
    }

    h1, h2, h3 {
      color: var(--dark-teal) !important;
      font-weight: 700 !important;
    }
  `;
  document.head.appendChild(style);
}