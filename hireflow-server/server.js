const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const db = new sqlite3.Database('./hireflow.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the SQLite database.');
});

// Create tables with relationships
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT,
    company TEXT,
    location TEXT,
    type TEXT,
    salary TEXT,
    description TEXT,
    requirements TEXT,
    posted_by TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    job_id TEXT,
    candidate_id TEXT,
    candidate_name TEXT,
    candidate_email TEXT,
    status TEXT DEFAULT 'Pending',
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// AUTHENTICATION ROUTES
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password, role } = req.body;
  const id = 'user_' + Math.random().toString(36).substr(2, 9);
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  db.run(`INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)`,
    [id, name, email, hashedPassword, role],
    function(err) {
      if (err) return res.status(400).json({ error: 'Email already exists' });
      res.json({ id, name, email, role });
    }
  );
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, hashedPassword], (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Invalid credentials' });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  });
});

// JOB MANAGEMENT ROUTES
app.get('/api/jobs', (req, res) => {
  db.all(`SELECT * FROM jobs`, [], (err, rows) => {
    if (err) return res.status(500).json([]);
    const parsedRows = rows.map(r => ({ ...r, requirements: JSON.parse(r.requirements || '[]') }));
    res.json(parsedRows);
  });
});

app.get('/api/jobs/:id', (req, res) => {
  db.get(`SELECT * FROM jobs WHERE id = ?`, [req.params.id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Job not found' });
    row.requirements = JSON.parse(row.requirements || '[]');
    res.json(row);
  });
});

app.post('/api/jobs', (req, res) => {
  const { title, company, location, type, salary, description, requirements, postedBy } = req.body;
  const id = 'job_' + Math.random().toString(36).substr(2, 9);
  const reqString = JSON.stringify(requirements || []);

  db.run(`INSERT INTO jobs (id, title, company, location, type, salary, description, requirements, posted_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, title, company, location, type, salary, description, reqString, postedBy],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, title, company, location, type, salary });
    }
  );
});

// JOB APPLICATION ROUTES
app.post('/api/applications', (req, res) => {
  const { jobId, candidateId, candidateName, candidateEmail } = req.body;
  const id = 'app_' + Math.random().toString(36).substr(2, 9);

  db.run(`INSERT INTO applications (id, job_id, candidate_id, candidate_name, candidate_email) VALUES (?, ?, ?, ?, ?)`,
    [id, jobId, candidateId, candidateName, candidateEmail],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

// DASHBOARD AGGREGATION METRICS ROUTE
app.get('/api/dashboard/employer/:userId', (req, res) => {
  const employerId = req.params.userId;
  
  db.all(`SELECT * FROM jobs WHERE posted_by = ?`, [employerId], (err, jobs) => {
    if (err) return res.status(500).json({ totalJobs: 0, applications: [] });
    
    db.all(`SELECT a.*, j.title as job_title FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.posted_by = ?`, [employerId], (err, apps) => {
      if (err) return res.status(500).json({ totalJobs: jobs.length, applications: [] });
      res.json({
        totalJobs: jobs.length,
        totalApplications: apps.length,
        applications: apps
      });
    });
  });
});

app.listen(5000, () => console.log('🚀 Server is running on http://localhost:5000'));