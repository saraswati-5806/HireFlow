# 🚀 HireFlow - Mini Job Portal Web Application

HireFlow is a responsive **Single Page Application (SPA)** that bridges the gap between software engineering candidates and active technical placement matrices. Built entirely on client-side architectures, the application compiles and maps state management operations straight to browser local memory cells—meaning **no isolated backend runtime engine or external database threads** are required to sustain the platform.

---

## 💡 Engineering Architecture Directive

The application is structured around client-side persistence and role-based authentication layers.

* **Zero-Backend Persistence:** Employs a structured data sync loop using `localStorage` to simulate full relational database behavior (including cascading structural deletions).
* **Role-Based Security clearance:** Dynamically switches view layouts, navigation contexts, and operational permissions depending on whether the node profile is configured as a **Candidate** or an **Employer**.
* **Automatic Seed Data Engine:** Bootstraps a pre-configured 22-listing corporate opening grid upon detection of an uninitialized browser environment.

---

## 🛠️ Tech Stack Matrix

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend Framework** | React.js (v18+) | Component-driven UI compilation and virtual DOM rendering. |
| **Routing Layer** | React Router DOM | Client-side page navigation tracking without browser reloading. |
| **State Management** | React Context API | Context trees for synchronous session auth tracking across viewports. |
| **Storage Architecture** | Web Storage API (`localStorage`) | Local data allocation cells providing zero-latency CRUD operations. |
| **Styling & Design** | Pure CSS-in-JS + Tailwind | Scalable, system-optimized typography, modal layers, and response panels. |

---

## ✨ Features Log

### 1. Unified Authentication Gate

* **Profile Sign-up:** Generates a new unique user reference pointer (`user_xxx`) while matching specialized operational clearance profiles (`candidate` or `employer`).
* **Session Token Tracing:** Matches string inputs against lower-case normalized criteria stored in browser registry slots.

### 2. Strategic Opportunities Pipeline (Jobs Interface)

* **Dynamic Query Filtration:** Searches and narrows down employment node entries by title string match or entity brand values instantly.
* **Parameter Inspection:** Dynamically routes application contexts via unique resource indexing parameters (`/jobs/:id`) to extract data logs.

### 3. Operational Control Dashboard

* **Employer Allocation Hub:** * **Create:** Inject fresh job listings into client-side arrays.
* **Read:** Streams submitted applicant arrays belonging to employer-posted criteria.
* **Update:** Modify specific field vectors on an existing job schema.
* **Delete:** Executes an absolute deletion routine that cascades across all linked application traces.


* **Candidate Tracing Hub:** Shows outgoing system placements coupled with timestamped trace loops highlighting the progress of your application payload.

---

## 📂 File System Layout

```text
src/
├── context/
│   └── AuthContext.jsx       # Global session context loop & normalization rules
├── pages/
│   ├── Admin.jsx             # Sealed internal platform admin module panel
│   ├── Dashboard.jsx         # Operational CRUD panel matching role constraints
│   ├── Home.jsx              # Landing viewport highlighting architecture goals
│   ├── JobDetail.jsx         # Unique resource indexing node specification viewer
│   ├── Jobs.jsx              # Searchable global employment opportunities listing
│   ├── Login.jsx             # Account validation form with normalized queries
│   └── Signup.jsx            # Account initialization page forcing role string values
└── utils/
    └── storage.js            # Storage Management Engine seeding 22 corporate entries

```

---

## 🚀 Deployment Instructions

Follow these instructions to run a mock local validation test or compile structural build vectors on your local machine:

### Prerequisites

Make sure you have Node.js runtime installed on your machine.

### Local Initialization Sequence

1. Clone the active repository structure:
```bash
git clone https://github.com/your-username/hireflow.git
cd hireflow

```


2. Download and map software dependencies:
```bash
npm install

```


3. Spin up the Vite development runtime execution thread:
```bash
npm run dev

```


4. Open your browser and point it to the local execution stream: `http://localhost:5173`

### Seeding Credentials

The system will automatically initialize with these pre-seeded testing profiles:

* **Employer Node Profile:**
* **Email:** `emp123@nova.com`
* **Password:** `emp123`


* **Candidate Node Profile:**
* **Email:** `ananya@nova.com`
* **Password:** `demo123`



---

## 🛡️ Structural Data Clean Routine

If you want to completely flush out modifications and reset the storage parameters back to the pristine 22-job database benchmark schema, execute this snippet directly in your browser's inspect developer tool console:

```javascript
localStorage.clear(); window.location.reload();

```