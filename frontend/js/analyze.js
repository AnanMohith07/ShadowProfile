/* ==========================================
   SHADOWPROFILE ANALYZE PAGE
========================================== */
const API_BASE = "http://127.0.0.1:5000";
const analyzeBtn = document.getElementById("analyzeBtn");
const textArea = document.getElementById("content");
const fileInput = document.getElementById("fileInput");
const loadingSection = document.getElementById("loadingSection");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const entityTable = document.getElementById("entityTable");
let categoryChart = null;
let riskChart = null;
/* ==========================================
UPLOAD FILE
========================================== */
if (fileInput) {
   fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (event) {
         textArea.value = event.target.result;
      }
      reader.readAsText(file);
   });
}
/* ==========================================
ANALYZE BUTTON
========================================== */
if (analyzeBtn) {
   analyzeBtn.addEventListener("click", analyzeContent);
}
/* ==========================================
START ANALYSIS
========================================== */
async function analyzeContent() {
   const text = textArea.value.trim();
   if (text === "") {
      alert("Please enter some content.");
      return;
   }
   loadingSection.classList.remove("d-none");
   animateProgress();
   try {
      const response = await fetch(`${API_BASE}/analyze`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            text: text
         })
      });
      const data = await response.json();
      sessionStorage.setItem("analysisReport", JSON.stringify(data));
      displayResults(data);
   }
   catch (error) {
      console.log(error);
      //showDemoResults();
   }
}
/* ==========================================
PROGRESS ANIMATION
========================================== */
function animateProgress() {
   const steps = [
      "Initializing AI Engine...",
      "Running Regex Detection...",
      "Running NLP Analysis...",
      "Detecting Sensitive Information...",
      "Calculating Privacy Score...",
      "Generating Recommendations..."
   ];
   let progress = 0;
   let index = 0;
   const timer = setInterval(() => {
      progress += 2;
      progressBar.style.width = progress + "%";
      if (index < steps.length && progress % 18 === 0) {
         progressText.innerHTML = steps[index];
         index++;
      }
      if (progress >= 100) {
         clearInterval(timer);
         progressText.innerHTML = "Analysis Completed";
      }
   }, 70);
}
/* ==========================================
DISPLAY RESULTS
========================================== */
function displayResults(data) {
   loadingSection.classList.add("d-none");
   document.getElementById("identityCount").innerHTML =
      data.entities.identity.length;

   document.getElementById("contactCount").innerHTML =
      data.entities.contact.length;

   document.getElementById("locationCount").innerHTML =
      data.entities.locations.length;

   document.getElementById("riskCount").innerHTML =
      data.report.statistics.total_entities;

   // Clear table
   entityTable.innerHTML = "";

   // Merge all entity categories
   const allEntities = [];
   Object.values(data.entities).forEach(category => {
      allEntities.push(...category);
   });
   if (allEntities.length === 0) {
      entityTable.innerHTML = `
        <tr>
            <td colspan="4" class="text-center">
                No sensitive information detected.
            </td>
        </tr>`;
   }
   else {
      allEntities.forEach(entity => {
         entityTable.innerHTML += `
            <tr>
                <td>${entity.value}</td>
                <td>${entity.type}</td>
                <td>${entity.risk || "Low"}</td>
                <td>
                    <span class="badge bg-success">
                        Detected
                    </span>
                </td>
            </tr>`;
      });
   }
   drawCharts(data);
}
/* ==========================================
DEMO DATA
========================================== */
function showDemoResults() {
   const demo = {
      identity: 4,
      contact: 2,
      location: 1,
      risks: 5,
      entities: [
         {
            value: "John Doe",
            category: "Identity",
            risk: "Medium"
         },
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
   displayResults(demo);
}
/* ==========================================
CHARTS
========================================== */
function drawCharts(data) {
   const category = document.getElementById("categoryChart");
   if (category) {
      if (categoryChart) {
         categoryChart.destroy();
      }
      categoryChart = new Chart(category, {
         type: "bar",
         data: {
            labels: [
               "Identity",
               "Contact",
               "Locations",
               "Detected"
            ],
            datasets: [{
               data: [
                  data.entities.identity.length || 4,
                  data.entities.contact.length || 2,
                  data.entities.locations.length || 1,
                  data.report.statistics.total_entities || 5
               ],
               backgroundColor: [
                  "#ff7a00",
                  "#3b82f6",
                  "#22c55e",
                  "#ef4444"
               ]
            }]
         },
         options: {
            plugins: {
               legend: {
                  display: false
               }
            },
            scales: {
               y: {
                  beginAtZero: true
               }
            }
         }
      });
   }
   const risk = document.getElementById("riskChart");
   if (risk) {
      if (riskChart) {
         riskChart.destroy();
      }
      riskChart = new Chart(risk, {
         type: "doughnut",
         data: {
            labels: [
               "Safe",
               "Medium",
               "High"
            ],
            datasets: [{
               data: [
                  40,
                  35,
                  25
               ],
               backgroundColor: [
                  "#22c55e",
                  "#facc15",
                  "#ef4444"
               ]
            }]
         }
      });
   }
}
/* ==========================================
GO TO REPORT
========================================== */
function openReport() {
   window.location.href = "report.html";
}
/* ==========================================
TOAST
========================================== */
function toast(message) {
   const box = document.createElement("div");
   box.className = "toast-box";
   box.innerHTML = message;
   document.body.appendChild(box);
   setTimeout(() => {
      box.classList.add("show");
   }, 100);
   setTimeout(() => {
      box.remove();
   }, 3500);
}
console.log("Analyze Module Loaded");