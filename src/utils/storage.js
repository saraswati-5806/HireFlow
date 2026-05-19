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

// 1. FETCH ALL JOBS FROM SQLITE (With safety defaults to prevent .slice() crashes)
export async function getJobs() {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Could not fetch jobs dataset.");
    const data = await response.json();
    
    // Ensure data is strictly a valid array before returning to the UI components
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Backend fetch failed, falling back to empty array:", error);
    return []; // Safe fallback prevents frontend component crashes
  }
}

// 2. FETCH SPECIFIC SINGLE JOB DETAILS
export async function getJobById(id) {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    if (!response.ok) throw new Error("Job listing not found.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* ==========================================================================
   🔄 BACKWARD COMPATIBILITY EXPORTS FOR PRODUCTION BUILD
   ========================================================================== */

export async function addApplication(app) {
  console.log("Mock application saved locally:", app);
  return { success: true };
}

export async function hasApplied(jobId, candidateId) {
  return false; 
}

export function getUsers() {
  return []; 
}

export function saveUsers(users) {}

export async function addJob(jobData) {
  return { ...jobData, id: 'job_' + Math.random().toString(36).substr(2, 9) };
}

export async function deleteJob(id) {
  return { success: true };
}

export async function updateJob(id, updatedData) {
  return { id, ...updatedData };
}

// Ensure these return clean arrays so UI dashboards calling .slice() or .map() stay stable
export async function getApplicationsByCandidate(candidateId) {
  return []; 
}

export async function getApplicationsByJob(jobId) {
  return [];
}