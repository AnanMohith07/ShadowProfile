/* ==========================================
   SHADOWPROFILE DASHBOARD
========================================== */
const API_BASE = "http://127.0.0.1:5000";
/* ==========================================
   LOAD DASHBOARD
========================================== */
document.addEventListener("DOMContentLoaded", () => {
   loadDashboard();
   animateCards();
   const userName = sessionStorage.getItem("userName");
   if (userName) {
      document.getElementById("userName").textContent = userName;
   }
});
/* ==========================================
   FETCH DASHBOARD DATA
========================================== */
function loadDashboard() {
   const stored = sessionStorage.getItem("analysisReport");

   if (!stored) {
      return;
   }

   const data = JSON.parse(stored);

   updateDashboard(data);
}
function updateDashboard(data) {
   const scores = Object.values(data.category_scores);
   const avg = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length
   );
   const privacyScore = Math.max(
      0,
      Math.min(100, 100 - avg)
   );
   animatePrivacyScore(privacyScore);
   document.getElementById("overallRisk").textContent =
      data.recommendations.overall.level;

   document.getElementById("riskCount").textContent =
      data.report.statistics.high +
      data.report.statistics.critical;

   document.getElementById("recommendationCount").textContent =
      data.recommendations.entity_recommendations.length;

   document.getElementById("analysisCount").textContent = 1;
   document.getElementById("reportCount").textContent = 1;

   const table = document.getElementById("recentAnalysisTable");
   table.innerHTML = `
      <tr>
         <td>${new Date(data.report.summary.generated_at).toLocaleDateString()
         }</td>
         <td>${privacyScore}%</td>
         <td>
            <span class="badge bg-danger">
               ${data.recommendations.overall.level}
            </span>
         </td>
         <td>Completed</td>
         <td>
            <a href="report.html"class="btn btn-warning btn-sm">View</a>
         </td>
      </tr>
   `;
   initializeCharts(data);
}
/* ==========================================
   LINE CHART
========================================== */
function initializeCharts(data) {
   const ctx = document.getElementById("privacyChart");
   if (ctx) {
      new Chart(ctx, {
         type: "line",
         data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [{
               label: "Privacy Score",
               data: [58, 63, 69, 72, 80, 86, 92],
               borderColor: "#ff7a00",
               backgroundColor: "rgba(255,122,0,.15)",
               fill: true,
               tension: .4,
               borderWidth: 3,
               pointRadius: 5,
               pointBackgroundColor: "#fff"
            }]
         },
         options: {
            responsive: true,
            plugins: {
               legend: {
                  labels: {
                     color: "#ffffff"
                  }
               }
            },
            scales: {
               x: {
                  ticks: {
                     color: "#cbd5e1"
                  },
                  grid: {
                     color: "rgba(255,255,255,.05)"
                  }
               },
               y: {
                  ticks: {
                     color: "#cbd5e1"
                  },
                  grid: {
                     color: "rgba(255,255,255,.05)"
                  }
               }
            }
         }
      });
   }
   /* ==========================================
      PIE CHART
   ========================================== */
   const pie = document.getElementById("riskChart");
   if (pie) {
      new Chart(pie, {
         type: "doughnut",
         data: {
            labels: [
               "Identity",
               "Contact",
               "Location",
               "Credentials"
            ],
            datasets: [{
               data: [
                  data.entities.identity.length,
                  data.entities.contact.length,
                  data.entities.credentials.length,
                  data.entities.platforms.length
               ],
               backgroundColor: [
                  "#ff7a00",
                  "#3b82f6",
                  "#22c55e",
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
            }
         }
      });
   }
}
/* ==========================================
   ANIMATE NUMBERS
========================================== */
function animateCards() {
   const numbers = document.querySelectorAll(
      ".stat-card h3"
   );
   numbers.forEach(number => {
      const target = +number.innerHTML;
      let count = 0;
      const speed = 25;
      const update = () => {
         if (count < target) {
            count++;
            number.innerHTML = count;
            setTimeout(update, speed);
         } else {
            number.innerHTML = target;
         }
      }
      update();
   });
}
/* ==========================================
   SCORE ANIMATION
========================================== */
function animatePrivacyScore(target) {
   const score = document.getElementById("privacyScore");
   let current = 0;
   const timer =
      setInterval(() => {
         current++;
         score.innerHTML = current + "%";
         if (current >= target) {
            clearInterval(timer);
         }
      }, 20);
}
/* ==========================================
   HOVER EFFECT
========================================== */
document.querySelectorAll(
   ".dashboard-card"
).forEach(card => {
   card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
   });
   card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0px)";
   });
});
/* ==========================================
   QUICK ACTION BUTTONS
========================================== */
document.querySelectorAll(
   ".action-card button"
).forEach(button => {
   button.addEventListener("click", () => {
      alert("Feature coming soon!");
   });
});
/* ==========================================
   NOTIFICATION
========================================== */
setTimeout(() => {
   showToast(
      "Privacy report updated successfully."
   );
}, 2000);
/* ==========================================
   TOAST
========================================== */
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
   }, 4500);
}
/* ==========================================
   SIDEBAR ACTIVE
========================================== */
document.querySelectorAll(
   ".sidebar li"
).forEach(item => {
   item.addEventListener("click", () => {
      document.querySelectorAll(
         ".sidebar li"
      ).forEach(i => {
         i.classList.remove("active");
      });
      item.classList.add("active");
   });
});
/* ==========================================
   SEARCH (placeholder)
========================================== */
function searchDashboard() {
   console.log("Search functionality");
}
/* ==========================================
   LOGOUT
========================================== */
function logout() {
   localStorage.removeItem("token");
   window.location.href = "login.html";
}
console.log("Dashboard Loaded Successfully");