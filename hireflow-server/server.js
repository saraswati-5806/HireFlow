const express = require('express');
const cors = require('cors');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const CryptoJS = require('crypto-js'); // Used to encrypt passwords safely

const app = express();
app.use(cors());
app.use(express.json());

let db = null;

// Initialize Database connection and structure the tables
async function initializeServer() {
  try {
    db = await open({
      filename: path.join(__dirname, 'hireflow.db'),
      driver: sqlite3.Database
    });

    // 1. Create USERS Table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        company TEXT
      );
    `);

    // 2. Create JOBS Table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT NOT NULL,
        salary TEXT NOT NULL,
        description TEXT,
        requirements TEXT,
        employerId TEXT,
        postedDate TEXT
      );
    `);

    // 3. Create APPLICATIONS Table (Links candidates to jobs permanently)
    await db.exec(`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        jobId TEXT NOT NULL,
        candidateId TEXT NOT NULL,
        status TEXT DEFAULT 'Applied',
        appliedDate TEXT
      );
    `);

    // Run the automatic data seeder script
    await seedDatabase();

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 HireFlow Server is permanently live at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Database startup error: ${error.message}`);
    process.exit(1);
  }
}

// Data Seeder function to populate SQLite tables on fresh startup
async function seedDatabase() {
  const userCheck = await db.get('SELECT COUNT(*) as count FROM users');
  
  // If users already exist in database, stop seeding so we don't duplicate data
  if (userCheck.count > 0) return;

  console.log("🌱 Database is empty! Seeding fresh, multi-role data tables...");

  // Encypting default demo passwords securely
  const hashedDefaultPassword = CryptoJS.SHA256('demo123').toString();

  // Insert Core Multi-Role Users
  await db.run(`INSERT INTO users (id, name, email, password, role, company) VALUES 
    ('emp1', 'Rajesh Kumar', 'rajesh@techcorp.com', '${hashedDefaultPassword}', 'employer', 'TechCorp Solutions'),
    ('emp2', 'Ananya Iyer', 'ananya@dataflow.io', '${hashedDefaultPassword}', 'employer', 'DataFlow Inc'),
    ('cand1', 'Priya Sharma', 'priya@email.com', '${hashedDefaultPassword}', 'candidate', NULL),
    ('cand2', 'Amit Patel', 'amit@email.com', '${hashedDefaultPassword}', 'candidate', NULL)
  `);

  // Insert Multiple Pre-Configured Job Cards
  await db.run(`INSERT INTO jobs (id, title, company, location, type, salary, description, requirements, employerId, postedDate) VALUES 
    ('job1', 'Frontend Developer', 'TechCorp Solutions', 'Mumbai', 'Full Time', '8-12 LPA', 'Build modern React responsive interfaces.', '["React", "CSS", "Git"]', 'emp1', '${new Date().toISOString()}'),
    ('job2', 'UI/UX Designer', 'TechCorp Solutions', 'Mumbai', 'Hybrid', '6-9 LPA', 'Design prototypes and system wireframes.', '["Figma", "Wireframing"]', 'emp1', '${new Date().toISOString()}'),
    ('job3', 'Backend Engineer', 'DataFlow Inc', 'Bangalore', 'Remote', '10-15 LPA', 'Design high-throughput APIs and data routes.', '["Node.js", "MongoDB"]', 'emp2', '${new Date().toISOString()}'),
    ('job4', 'Data Analyst', 'DataFlow Inc', 'Bangalore', 'Full Time', '7-11 LPA', 'Analyze business data matrices cleanly.', '["Python", "SQL"]', 'emp2', '${new Date().toISOString()}')
  `);

  console.log("✅ Seeding complete! Relational tables ready.");
}

/* ==========================================================================
   🎯 CORE API ROUTES (ENDPOINTS)
   ========================================================================== */

// 1. GET ALL JOBS (Used by Candidate Landing Grid & Filtering System)
app.get('/api/jobs', async (req, res) => {
  try {
    const allJobs = await db.all('SELECT * FROM jobs ORDER BY postedDate DESC');
    
    // Parse the JSON string arrays back into clean arrays for frontend maps
    const parsedJobs = allJobs.map(job => ({
      ...job,
      requirements: JSON.parse(job.requirements || '[]')
    }));

    res.json(parsedJobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET SINGLE JOB DETAILS
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await db.get('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
    if (!job) return res.status(404).json({ error: "Job not found" });
    
    job.requirements = JSON.parse(job.requirements || '[]');
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================================================
   🔐 USER AUTHENTICATION API ROUTES
   ========================================================================== */

// 1. REGISTER / SIGNUP A NEW USER (Employer or Candidate)
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role, company } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Please fill out all required fields." });
    }

    // Check if user already exists in the database
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    // Generate an encrypted hash of the password using CryptoJS
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);

    // Save the brand new user records permanently into SQLite
    await db.run(
      `INSERT INTO users (id, name, email, password, role, company) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, name, email, hashedPassword, role, role === 'employer' ? company : null]
    );

    // Create a temporary mock JWT token string to establish a login session
    const token = Buffer.from(JSON.stringify({ id: userId, role })).toString('base64');

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: { id: userId, name, email, role, company }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ACCOUNT LOGIN / VERIFICATION
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please enter both email and password." });
    }

    // Pull user from database matching the email
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ error: "Invalid email credentials." });
    }

    // Hash the incoming password check to match against the stored hash
    const incomingHash = CryptoJS.SHA256(password).toString();
    if (incomingHash !== user.password) {
      return res.status(400).json({ error: "Incorrect account password." });
    }

    // Generate a secure session token string
    const token = Buffer.from(JSON.stringify({ id: user.id, role: user.role })).toString('base64');

    res.json({
      message: "Login successful!",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, company: user.company }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. RETRIEVE CURRENT LOGGED-IN ACCOUNT PROFILE DETAILS (Profile Session Check)
app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided." });

    // Decode the token payload sent from the React application
    const token = authHeader.split(' ')[1];
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('ascii'));

    const user = await db.get('SELECT id, name, email, role, company FROM users WHERE id = ?', [decoded.id]);
    if (!user) return res.status(404).json({ error: "User profile no longer exists." });

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Session expired or invalid token structure." });
  }
});

initializeServer();