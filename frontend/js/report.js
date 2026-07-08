/* ==========================================
   SHADOWPROFILE REPORT PAGE
========================================== */
const API_BASE = "http://127.0.0.1:5000";
/* ==========================================
LOAD REPORT
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    loadReport();
});
/* ==========================================
FETCH REPORT
========================================== */
async function loadReport() {
    try {
        const response = await fetch(`${API_BASE}/report`);
        const data = await response.json();
        updateDashboard(data);
    }
    catch (error) {
        console.log("Using demo report...");
        loadDemoReport();
    }
}
/* ==========================================
DEMO DATA
========================================== */
function loadDemoReport() {
    const demo = {
        score: 87,
        identity: 4,
        contact: 2,
        risks: 5,
        entities: [
            {
                value: "john@gmail.com",
                category: "Email",
                risk: "High"
            },
            {
                value: "+91 9876543210",
                category: "Phone",
                risk: "High"
            },
            {
                value: "Mangalore",
                category: "Location",
                risk: "Medium"
            },
            {
                value: "XYZ College",
                category: "Organization",
                risk: "Low"
            }
        ]
    };
    updateDashboard(demo);
}
/* ==========================================
UPDATE PAGE
========================================== */
function updateDashboard(data) {
    animateScore(data.score);
    loadTable(data.entities);
    createCharts(data);
}
/* ==========================================
ANIMATE SCORE
========================================== */
function animateScore(target) {
    const score = document.getElementById("scoreValue");
    let current = 0;
    const timer = setInterval(() => {
        current++;
        score.innerHTML = current + "%";
        if (current >= target) {
            clearInterval(timer);
        }
    }, 18);
}
/* ==========================================
TABLE
========================================== */
function loadTable(list) {
    const table = document.getElementById("entityTable");
    if (!table) return;
    table.innerHTML = "";
    list.forEach(item => {
        let badge = "success";
        if (item.risk === "Medium") {
            badge = "warning";
        }
        if (item.risk === "High") {
            badge = "danger";
        }
        table.innerHTML += `
        <tr>
        <td>${item.value}</td>
        <td>${item.category}</td>
        <td>
        <span class="badge bg-${badge}">
        ${item.risk}
        </span>
        </td>
        <td>
        Detected
        </td>
        </tr>
        `;
    });
}
/* ==========================================
CHARTS
========================================== */
function createCharts(data) {
    createCategoryChart(data);
    createRiskChart();
}
/* ---------- Category Chart ---------- */
function createCategoryChart(data) {
    const chart = document.getElementById("categoryChart");
    if (!chart) return;
    new Chart(chart, {
        type: "bar",
        data: {
            labels: [
                "Identity",
                "Contact",
                "Risk Alerts"
            ],
            datasets: [{
                data: [
                    data.identity,
                    data.contact,
                    data.risks
                ],
                backgroundColor: [
                    "#ff7a00",
                    "#3b82f6",
                    "#ef4444"
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#ffffff"
                    },
                    grid: {
                        color: "rgba(255,255,255,.05)"
                    }
                },
                x: {
                    ticks: {
                        color: "#ffffff"
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}
/* ---------- Doughnut Chart ---------- */
function createRiskChart() {
    const chart = document.getElementById("riskChart");
    if (!chart) return;
    new Chart(chart, {
        type: "doughnut",
        data: {
            labels: [
                "Low",
                "Medium",
                "High"
            ],
            datasets: [{
                data: [
                    45,
                    35,
                    20
                ],
                backgroundColor: [
                    "#22c55e",
                    "#facc15",
                    "#ef4444"
                ],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#ffffff"
                    }
                }
            },
            cutout: "70%"
        }
    });
}
/* ==========================================
PRINT REPORT
========================================== */
document.querySelectorAll(".btn-outline-light")
    .forEach(button => {
        button.addEventListener("click", () => {
            window.print();
        });
    });
/* ==========================================
DOWNLOAD PDF (Placeholder)
========================================== */
document.querySelectorAll(".btn-warning")
    .forEach(button => {
        if (button.innerText.includes("Download")) {
            button.addEventListener("click", () => {
                alert(
                    "PDF export will be connected with the Flask backend."
                );
            });
        }
    });
/* ==========================================
HOVER ANIMATION
========================================== */
document.querySelectorAll(
    ".report-card"
).forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-6px)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px)";
    });
});
/* ==========================================
TOAST
========================================== */
setTimeout(() => {
    showToast(
        "Analysis report loaded successfully."
    );
}, 1200);
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-box";
    toast.innerHTML = `
<i class="bi bi-check-circle-fill"></i>
${message}
`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);
    setTimeout(() => {
        toast.remove();
    }, 4000);
}
console.log("ShadowProfile Report Loaded");