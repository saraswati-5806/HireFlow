const API_URL = "http://localhost:5000/api";

// Helper function to bundle headers with user authentication token
function getAuthHeaders() {
  const token = localStorage.getItem("hireflow_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };
}

/* ==========================================================================
   🔐 AUTHENTICATION INTEGRATION FUNCTIONS
   ========================================================================== */

// 1. LOGIN API CALL
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Login failed");
  
  // Store the session token securely in the browser environment
  localStorage.setItem("hireflow_token", data.token);
  localStorage.setItem("currentUser", JSON.stringify(data.user));
  return data.user;
}

// 2. SIGNUP API CALL
export async function signupUser(userData) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Signup failed");
  
  localStorage.setItem("hireflow_token", data.token);
  localStorage.setItem("currentUser", JSON.stringify(data.user));
  return data.user;
}

// 3. LOGOUT CLEANUP
export function logoutUser() {
  localStorage.removeItem("hireflow_token");
  localStorage.removeItem("currentUser");
}

// 4. RETRIEVE PERSISTENT PROFILE SESSION
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

/* ==========================================================================
   💼 JOBS INTEGRATION FUNCTIONS
   ========================================================================== */

// 1. FETCH ALL JOBS FROM SQLITE
export async function getJobs() {
  const response = await fetch(`${API_URL}/jobs`);
  if (!response.ok) throw new Error("Could not fetch jobs dataset.");
  return await response.json();
}

// 2. FETCH SPECIFIC SINGLE JOB DETAILS
export async function getJobById(id) {
  const response = await fetch(`${API_URL}/jobs/${id}`);
  if (!response.ok) throw new Error("Job listing not found.");
  return await response.json();
}

// 3. SEED INITIAL FRONTEND FALLBACK DATA (No longer needed since server seeds automatically)
export function seedDemoData() {
  // Left blank intentionally because the backend server auto-seeds SQLite table rows on boot!
}

/* ==========================================================================
   🔄 BACKWARD COMPATIBILITY EXPORTS FOR PRODUCTION BUILD
   ========================================================================== */

// 1. Fake application mocks for compilation safety (We will link these to real API endpoints next)
export async function addApplication(app) {
  console.log("Mock application saved locally:", app);
  return { success: true };
}

export async function hasApplied(jobId, candidateId) {
  return false; // Default fallback for initial build stability
}

// 2. User data utilities expected by old login/signup views
export function getUsers() {
  return []; 
}

export function saveUsers(users) {
  // Handled directly via the backend API signups now!
}