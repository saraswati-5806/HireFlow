// AdminDashboard.jsx

import React, { useEffect, useMemo, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  /* =========================================================
     LOCAL STORAGE STATE
  ========================================================= */

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);

  /* =========================================================
     FILTER STATES
  ========================================================= */

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  /* =========================================================
     LOAD LOCAL STORAGE DATA SAFELY
  ========================================================= */

  useEffect(() => {
    try {
      const storedJobs =
        JSON.parse(localStorage.getItem("hireflow_jobs")) || [];

      const storedApplications =
        JSON.parse(localStorage.getItem("hireflow_applications")) || [];

      const storedUsers =
        JSON.parse(localStorage.getItem("hireflow_users")) || [];

      setJobs(storedJobs);
      setApplications(storedApplications);
      setUsers(storedUsers);
    } catch (error) {
      console.error("LocalStorage parsing error:", error);

      setJobs([]);
      setApplications([]);
      setUsers([]);
    }
  }, []);

  /* =========================================================
     SAFE PROPERTY HELPERS
  ========================================================= */

  const getJobTitle = (job) =>
    job?.title || job?.designation || job?.role || "Untitled Job";

  const getJobLocation = (job) =>
    job?.location || job?.city || "Unknown";

  const getJobCategory = (job) =>
    job?.category || job?.corporateEntity || "General";

  const getCandidateName = (app) =>
    app?.name || app?.applicantName || "Unknown Candidate";

  /* =========================================================
     ACTIVE OPENINGS COUNT
  ========================================================= */

  const activeOpenings = jobs.filter(
    (job) =>
      job?.status?.toLowerCase() === "active" ||
      job?.status?.toLowerCase() === "open"
  ).length;

  /* =========================================================
     UNIQUE LOCATIONS FOR DROPDOWN
  ========================================================= */

  const uniqueLocations = [
    ...new Set(jobs.map((job) => getJobLocation(job))),
  ];

  /* =========================================================
     FILTERED JOBS
  ========================================================= */

  const filteredJobs = jobs.filter((job) => {
    const title = getJobTitle(job).toLowerCase();

    const matchesSearch = title.includes(search.toLowerCase());

    const matchesLocation =
      locationFilter === "all" ||
      getJobLocation(job) === locationFilter;

    return matchesSearch && matchesLocation;
  });

  /* =========================================================
     DELETE JOB FUNCTION
  ========================================================= */

  const handleDeleteJob = (jobToDelete) => {
    const updatedJobs = jobs.filter((job) => job !== jobToDelete);

    setJobs(updatedJobs);

    localStorage.setItem(
      "hireflow_jobs",
      JSON.stringify(updatedJobs)
    );
  };

  /* =========================================================
     BAR CHART DATA
  ========================================================= */

  const applicationAnalytics = useMemo(() => {
    return jobs.map((job) => {
      const title = getJobTitle(job);

      const count = applications.filter((app) => {
        const appliedJob =
          app?.jobTitle ||
          app?.title ||
          app?.appliedFor ||
          "";

        return appliedJob === title;
      }).length;

      return {
        title,
        applications: count,
      };
    });
  }, [jobs, applications]);

  /* =========================================================
     PIE CHART DATA
  ========================================================= */

  const locationAnalytics = useMemo(() => {
    const locationMap = {};

    jobs.forEach((job) => {
      const location = getJobLocation(job);

      if (locationMap[location]) {
        locationMap[location] += 1;
      } else {
        locationMap[location] = 1;
      }
    });

    return Object.keys(locationMap).map((location) => ({
      name: location,
      value: locationMap[location],
    }));
  }, [jobs]);

  /* =========================================================
     PIE COLORS
  ========================================================= */

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",
  ];

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        style={{
          width: "260px",
          background: "#111827",
          padding: "25px",
          borderRight: "1px solid #1f2937",
        }}
      >
        <h2
          style={{
            marginBottom: "40px",
            fontSize: "28px",
            color: "#60a5fa",
          }}
        >
          HireFlow
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {[
            "Dashboard",
            "Jobs",
            "Applications",
            "Users",
            "Analytics",
            "Settings",
          ].map((item) => (
            <button
              key={item}
              style={{
                background: "#1f2937",
                color: "#fff",
                border: "none",
                padding: "14px",
                borderRadius: "10px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "15px",
                transition: "0.3s",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#f8fafc",
          color: "#111827",
        }}
      >
        {/* =================================================
            NAVBAR
        ================================================= */}

        <div
          style={{
            background: "#ffffff",
            padding: "22px 35px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              Welcome Admin 👋
            </h1>

            <p
              style={{
                marginTop: "6px",
                color: "#6b7280",
              }}
            >
              HireFlow Analytics Dashboard
            </p>
          </div>

          <div
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            Admin Panel
          </div>
        </div>

        {/* =================================================
            DASHBOARD BODY
        ================================================= */}

        <div style={{ padding: "30px" }}>
          {/* =============================================
              KPI CARDS
          ============================================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            {/* CARD 1 */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#fff",
                padding: "24px",
                borderRadius: "18px",
              }}
            >
              <h3>Total Jobs</h3>
              <h1>{jobs.length}</h1>
            </div>

            {/* CARD 2 */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                padding: "24px",
                borderRadius: "18px",
              }}
            >
              <h3>Total Applications</h3>
              <h1>{applications.length}</h1>
            </div>

            {/* CARD 3 */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                color: "#fff",
                padding: "24px",
                borderRadius: "18px",
              }}
            >
              <h3>Registered Users</h3>
              <h1>{users.length}</h1>
            </div>

            {/* CARD 4 */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #f97316, #ea580c)",
                color: "#fff",
                padding: "24px",
                borderRadius: "18px",
              }}
            >
              <h3>Active Openings</h3>
              <h1>{activeOpenings}</h1>
            </div>
          </div>

          {/* =============================================
              SEARCH + FILTER
          ============================================= */}

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              placeholder="Search jobs by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
              }}
            />

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                minWidth: "220px",
                fontSize: "15px",
              }}
            >
              <option value="all">All Locations</option>

              {uniqueLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* =============================================
              BOTTOM GRID
          ============================================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "25px",
            }}
          >
            {/* =========================================
                LEFT SIDE - JOB LIST
            ========================================= */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {filteredJobs.length === 0 ? (
                <div
                  style={{
                    background: "#fff",
                    padding: "25px",
                    borderRadius: "18px",
                  }}
                >
                  No jobs found.
                </div>
              ) : (
                filteredJobs.map((job, index) => {
                  const title = getJobTitle(job);

                  const candidates = applications.filter((app) => {
                    const appliedJob =
                      app?.jobTitle ||
                      app?.title ||
                      app?.appliedFor ||
                      "";

                    return appliedJob === title;
                  });

                  return (
                    <div
                      key={index}
                      style={{
                        background: "#fff",
                        padding: "25px",
                        borderRadius: "18px",
                        boxShadow:
                          "0 4px 10px rgba(0,0,0,0.05)",
                      }}
                    >
                      {/* JOB HEADER */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: "15px",
                        }}
                      >
                        <div>
                          <h2
                            style={{
                              marginBottom: "8px",
                            }}
                          >
                            {title}
                          </h2>

                          <p
                            style={{
                              color: "#6b7280",
                              marginBottom: "6px",
                            }}
                          >
                            <strong>Company:</strong>{" "}
                            {job?.company ||
                              job?.companyName ||
                              "Unknown Company"}
                          </p>

                          <p
                            style={{
                              color: "#6b7280",
                              marginBottom: "6px",
                            }}
                          >
                            <strong>Location:</strong>{" "}
                            {getJobLocation(job)}
                          </p>

                          <p
                            style={{
                              color: "#6b7280",
                              marginBottom: "6px",
                            }}
                          >
                            <strong>Category:</strong>{" "}
                            {getJobCategory(job)}
                          </p>

                          <p
                            style={{
                              color: "#6b7280",
                            }}
                          >
                            <strong>Salary:</strong>{" "}
                            {job?.salary || "Not Mentioned"}
                          </p>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <button
                            style={{
                              background: "#2563eb",
                              color: "#fff",
                              border: "none",
                              padding: "10px 16px",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteJob(job)
                            }
                            style={{
                              background: "#ef4444",
                              color: "#fff",
                              border: "none",
                              padding: "10px 16px",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* CANDIDATE SUB LIST */}
                      <div
                        style={{
                          marginTop: "22px",
                          paddingTop: "18px",
                          borderTop: "1px solid #e5e7eb",
                        }}
                      >
                        <h4
                          style={{
                            marginBottom: "12px",
                          }}
                        >
                          Candidates Applied
                        </h4>

                        {candidates.length === 0 ? (
                          <p
                            style={{
                              color: "#9ca3af",
                            }}
                          >
                            No candidates applied yet.
                          </p>
                        ) : (
                          <ul
                            style={{
                              paddingLeft: "20px",
                              color: "#374151",
                            }}
                          >
                            {candidates.map((candidate, idx) => (
                              <li
                                key={idx}
                                style={{
                                  marginBottom: "8px",
                                }}
                              >
                                {getCandidateName(candidate)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* =========================================
                RIGHT SIDE - CHARTS
            ========================================= */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
              }}
            >
              {/* BAR CHART */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "25px",
                  height: "420px",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.05)",
                }}
              >
                <h2
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  Job Applications Analytics
                </h2>

                <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={applicationAnalytics}>
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />

                    <Bar
                      dataKey="applications"
                      fill="#3b82f6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* PIE CHART */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "25px",
                  height: "420px",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.05)",
                }}
              >
                <h2
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  Jobs by Location
                </h2>

                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie
                      data={locationAnalytics}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      label
                    >
                      {locationAnalytics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[index % COLORS.length]
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;