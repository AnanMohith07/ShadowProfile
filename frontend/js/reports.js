/* ==========================================
   SHADOWPROFILE REPORTS PAGE
========================================== */
const API_BASE = "http://127.0.0.1:5000";
let reports = [];
/* ==========================================
LOAD REPORTS
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    loadReports();
});
/* ==========================================
FETCH REPORTS
========================================== */
async function loadReports() {
    try {
        const response = await fetch(`${API_BASE}/reports`);
        reports = await response.json();
        renderTable(reports);
        createCharts(reports);
    }
    catch (error) {
        console.log("Loading demo reports...");
        loadDemoReports();
    }
}
/* ==========================================
DEMO DATA
========================================== */
function loadDemoReports() {
    reports = [
        {
            id: "SP-1001",
            date: "04 Jul 2026",
            score: 92,
            risk: "Low",
            status: "Completed"
        },
        {
            id: "SP-1002",
            date: "03 Jul 2026",
            score: 71,
            risk: "Medium",
            status: "Completed"
        },
        {
            id: "SP-1003",
            date: "01 Jul 2026",
            score: 48,
            risk: "High",
            status: "Completed"
        }
    ];
    renderTable(reports);
    createCharts(reports);
}
/* ==========================================
TABLE
========================================== */
function renderTable(data) {
    const table = document.getElementById("reportTable");
    table.innerHTML = "";
    data.forEach(report => {
        let badge = "success";
        if (report.risk === "Medium") badge = "warning";
        if (report.risk === "High") badge = "danger";
        table.innerHTML += `
<tr>
<td>${report.id}</td>
<td>${report.date}</td>
<td>${report.score}%</td>
<td>
<span class="badge bg-${badge}">
${report.risk}
</span>
</td>
<td>${report.status}</td>
<td>
<button
class="btn btn-sm btn-warning"
onclick="viewReport('${report.id}')">
View
</button>
<button
class="btn btn-sm btn-outline-light"
onclick="downloadReport('${report.id}')">
Download
</button>
</td>
</tr>
`;
    });
}
/* ==========================================
SEARCH
========================================== */
const search = document.getElementById("searchReport");
if (search) {
    search.addEventListener("keyup", () => {
        const value = search.value.toLowerCase();
        const filtered = reports.filter(r => {
            return (
                r.id.toLowerCase().includes(value) ||
                r.date.toLowerCase().includes(value) ||
                r.risk.toLowerCase().includes(value)
            );
        });
        renderTable(filtered);
    });
}
/* ==========================================
FILTER
========================================== */
const filter = document.getElementById("filterRisk");
if (filter) {
    filter.addEventListener("change", () => {
        const risk = filter.value;
        if (risk === "All Risks") {
            renderTable(reports);
            return;
        }
        const filtered = reports.filter(r => {
            return r.risk === risk;
        });
        renderTable(filtered);
    });
}
/* ==========================================
CHARTS
========================================== */
function createCharts() {
    const history = document.getElementById("historyChart");
    if (history) {
        new Chart(history, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [{
                    label: "Privacy Score",
                    data: [62, 68, 71, 75, 82, 86, 92],
                    borderColor: "#ff7a00",
                    backgroundColor: "rgba(255,122,0,.15)",
                    fill: true,
                    tension: .4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: "#fff"
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: "#fff"
                        }
                    },
                    y: {
                        ticks: {
                            color: "#fff"
                        }
                    }
                }
            }
        });
    }
    const risk = document.getElementById("riskChart");
    if (risk) {
        new Chart(risk, {
            type: "doughnut",
            data: {
                labels: [
                    "Low",
                    "Medium",
                    "High"
                ],
                datasets: [{
                    data: [14, 8, 6],
                    backgroundColor: [
                        "#22c55e",
                        "#facc15",
                        "#ef4444"
                    ]
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#fff"
                        }
                    }
                }
            }
        });
    }
}
/* ==========================================
VIEW REPORT
========================================== */
function viewReport(id) {
    window.location.href = "report.html?id=" + id;
}
/* ==========================================
DOWNLOAD REPORT
========================================== */
function downloadReport(id) {
    alert(
        "Downloading report: " + id
    );
}
/* ==========================================
EXPORT ALL
========================================== */
document.querySelector(".topbar .btn-warning")
    .addEventListener("click", () => {
        alert(
            "Export All Reports feature will be connected to Flask."
        );
    });
/* ==========================================
TOAST
========================================== */
setTimeout(() => {
    toast("Reports loaded successfully.");
}, 1200);
function toast(message) {
    const div = document.createElement("div");
    div.className = "toast-box";
    div.innerHTML = `
<i class="bi bi-check-circle-fill"></i>
${message}
`;
    document.body.appendChild(div);
    setTimeout(() => {
        div.classList.add("show");
    }, 100);
    setTimeout(() => {
        div.remove();
    }, 4000);
}
console.log("Reports Module Loaded");