document.addEventListener('DOMContentLoaded', function () {
    
    // 1. FETCH ACTUAL STORAGE VALUES
    let jobs = JSON.parse(localStorage.getItem('hireflow_jobs')) || [];
    let applications = JSON.parse(localStorage.getItem('hireflow_applications')) || [];
    let users = JSON.parse(localStorage.getItem('hireflow_users')) || [];

    let applicationsChart = null;
    let categoryChart = null;

    // 2. COUNTER FUNCTION WITH FALLBACK PROTECTION
    function updateKPICards() {
        const totalJobsEl = document.getElementById('total-jobs');
        const totalAppsEl = document.getElementById('total-apps');
        const totalUsersEl = document.getElementById('total-users');
        const activeJobsEl = document.getElementById('active-jobs');

        if (totalJobsEl) totalJobsEl.innerText = jobs.length;
        if (totalAppsEl) totalAppsEl.innerText = applications.length;
        if (totalUsersEl) totalUsersEl.innerText = users.length;
        
        if (activeJobsEl) {
            const activeCount = jobs.filter(job => !job.status || job.status.toLowerCase() === 'active' || job.status.toLowerCase() === 'open').length;
            activeJobsEl.innerText = activeCount;
        }
    }

    // 3. TABLE RENDERING SYSTEM (MAPPED DIRECTLY TO YOUR VALUES)
    function renderTables() {
        // --- Jobs Table ---
        const jobsTableBody = document.getElementById('jobs-table-body');
        if (jobsTableBody) {
            jobsTableBody.innerHTML = ''; 
            jobs.forEach((job, index) => {
                const displayId = job.id || (index + 1);
                const displayTitle = job.title || job.designation || 'Untitled Position';
                const displayCategory = job.category || 'General';
                const displayStatus = job.status || 'Active';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>#${displayId}</td>
                    <td><strong>${displayTitle}</strong></td>
                    <td>${displayCategory}</td>
                    <td><span style="color: ${displayStatus.toLowerCase() === 'active' ? '#4caf50' : '#e74c3c'}">${displayStatus.toUpperCase()}</span></td>
                    <td><button class="logout-btn" style="padding: 4px 8px; font-size: 0.8rem; margin: 0; background-color: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="deleteJob('${displayId}')">Delete</button></td>
                `;
                jobsTableBody.appendChild(row);
            });
        }

        // --- Applicants Table ---
        const appsTableBody = document.getElementById('apps-table-body');
        if (appsTableBody) {
            appsTableBody.innerHTML = ''; // Clear previous contents
            
            if (applications.length === 0) {
                appsTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 15px; color: #888;">No applications submitted yet.</td></tr>`;
            } else {
                applications.forEach(app => {
                    // Pulling directly from your 'name', 'email', and 'appliedFor' keys
                    const displayAppName = app.name || 'Anonymous Candidate';
                    const displayEmail = app.email || 'No Email';
                    const displayAppliedJob = app.appliedFor || 'Not Specified';

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><strong>${displayAppName}</strong></td>
                        <td>${displayEmail}</td>
                        <td><span style="background: #eef2f7; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">${displayAppliedJob}</span></td>
                    `;
                    appsTableBody.appendChild(row);
                });
            }
        }
    }

    // 4. DELETION HANDLING CONTROL
    window.deleteJob = function(jobId) {
        jobs = jobs.filter((job, index) => String(job.id || (index + 1)) !== String(jobId));
        localStorage.setItem('hireflow_jobs', JSON.stringify(jobs));
        
        updateKPICards();
        renderTables();
        generateCharts(); 
    };

    // 5. CHART VISUAL ENGINE
    function generateCharts() {
        if (applicationsChart) applicationsChart.destroy();
        if (categoryChart) categoryChart.destroy();

        const jobTitles = jobs.map(j => j.title || j.designation || 'Untitled');
        const appCounts = jobTitles.map(title => {
            return applications.filter(app => app.appliedFor === title).length;
        });

        const categories = [...new Set(jobs.map(j => j.category || 'General'))];
        const categoryCounts = categories.map(cat => {
            return jobs.filter(job => (job.category || 'General') === cat).length;
        });

        const ctxBar = document.getElementById('applicationsChart');
        if (ctxBar) {
            applicationsChart = new Chart(ctxBar.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: jobTitles.length ? jobTitles : ['No Active Openings'],
                    datasets: [{
                        label: 'Applications Received',
                        data: appCounts.length ? appCounts : [0],
                        backgroundColor: '#2e6da4'
                    }]
                },
                options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
            });
        }

        const ctxPie = document.getElementById('categoryChart');
        if (ctxPie) {
            categoryChart = new Chart(ctxPie.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: categories.length ? categories : ['No Data Available'],
                    datasets: [{
                        data: categoryCounts.length ? categoryCounts : [0],
                        backgroundColor: ['#2e6da4', '#4caf50', '#ff9800', '#9c27b0']
                    }]
                },
                options: { responsive: true }
            });
        }
    }

    // INITIAL SETUP RUN
    updateKPICards();
    renderTables();
    generateCharts();
});