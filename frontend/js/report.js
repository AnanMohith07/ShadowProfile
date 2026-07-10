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
function loadReport() {
    const stored = sessionStorage.getItem("analysisReport");
    if (!stored) {
        alert("No analysis found. Please analyze some content first.");
        window.location.href = "analyze.html";
        return;
    }
    const data = JSON.parse(stored);
    updateDashboard(data);
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
    document.getElementById("identityCount").innerHTML =
        data.entities.identity.length;

    document.getElementById("contactCount").innerHTML =
        data.entities.contact.length;
    const allEntities = [];

    Object.values(data.entities).forEach(group => {
        allEntities.push(...group);
    });
    const riskAlerts = allEntities.filter(entity =>
        entity.risk === "High" ||
        entity.risk === "Critical"
    ).length;
    document.getElementById("riskCount").innerHTML =
        riskAlerts;

    const highRisk = allEntities.filter(entity =>
        entity.risk === "High" ||
        entity.risk === "Critical"
    ).length;


    const mediumRisk = allEntities.filter(entity =>
        entity.risk === "Medium"
    ).length;


    const lowRisk = allEntities.filter(entity =>
        entity.risk === "Low"
    ).length;


    document.getElementById("highRiskCount").innerHTML = highRisk;
    document.getElementById("mediumRiskCount").innerHTML = mediumRisk;
    document.getElementById("lowRiskCount").innerHTML = lowRisk;

    // Simple privacy score
    const scores = Object.values(data.category_scores);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const privacyScore = Math.max(0, Math.min(100, 100 - avg));
    animateScore(privacyScore);

    const list = document.getElementById("recommendationList");
    if (list) {
        list.innerHTML = "";
        data.recommendations.entity_recommendations.forEach(rec => {
            list.innerHTML += `
            <div class="recommendation warning">
                <i class="bi bi-lightbulb-fill"></i>
                <div>
                    <h5>${rec.type} - ${rec.risk}</h5>
                    <p>${rec.recommendation}</p>
                </div>
            </div>`;
        });
    }

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
function loadTable(groups) {
    const table = document.getElementById("entityTable");
    table.innerHTML = "";
    const all = [];
    Object.values(groups).forEach(group => {
        all.push(...group);
    });

    all.forEach(item => {
        let risk =
            item.risk ||
            item.risk_key ||
            "Low";

        let badge = "success";

        if (risk === "Medium")
            badge = "warning";

        if (risk === "High")
            badge = "danger";

        table.innerHTML += `
        <tr>
            <td>${item.value}</td>
            <td>${item.type}</td>
            <td>
                <span class="badge bg-${badge}">
                    ${risk}
                </span>
            </td>
            <td>Detected</td>
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
                "Credentials",
                "Financial",
                "Government IDs",
                "Locations",
                "Organizations",
                "Platforms"
            ],
            datasets: [{
                data: [
                    data.entities.identity.length,
                    data.entities.contact.length,
                    data.entities.credentials.length,
                    data.entities.financial.length,
                    data.entities.government_ids.length,
                    data.entities.locations.length,
                    data.entities.organizations.length,
                    data.entities.platforms.length
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
                fetch(`${API_BASE}/report/download`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: sessionStorage.getItem("analysisReport")
                })
                    .then(response => response.blob())
                    .then(blob => {

                        const url = window.URL.createObjectURL(blob);

                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "ShadowProfile_Report.pdf";
                        a.click();

                        window.URL.revokeObjectURL(url);
                    });
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