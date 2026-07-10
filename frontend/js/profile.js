/* ==========================================
   SHADOWPROFILE PROFILE PAGE
========================================== */
const API_BASE = "http://127.0.0.1:5000";
/* ==========================================
LOAD PROFILE
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
});
/* ==========================================
FETCH PROFILE
========================================== */
function loadProfile() {
    const report =
        JSON.parse(sessionStorage.getItem("analysisReport"));
    const fullName =
        sessionStorage.getItem("userName") || "User";
    const email =
        sessionStorage.getItem("userEmail") || "-";

    document.getElementById("userName").textContent = fullName;
    document.getElementById("userEmail").textContent = email;

    document.getElementById("fullName").value = fullName;
    document.getElementById("email").value = email;

    document.getElementById("userRole").textContent =
        "ShadowProfile User";
    if(report){
        const scores =
            Object.values(report.category_scores);
        const avg =
            Math.round(
                scores.reduce((a,b)=>a+b,0)/scores.length
            );
        const privacy =
            Math.max(0,100-avg);
        const statCards =
            document.querySelectorAll(".stats-card h2");

        statCards[0].textContent = "1";
        statCards[1].textContent = "1";
        statCards[2].textContent = privacy + "%";
        statCards[3].textContent = "1";
    }

}
/* ==========================================
DEMO USER
==========================================
function loadDemoProfile() {
    displayProfile({
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 9876543210",
        location: "Mangalore",
        organization: "XYZ College",
        role: "Privacy Analyst"
    });
} */
/* ==========================================
DISPLAY PROFILE
==========================================
function displayProfile(user) {
    document.getElementById("userName").innerHTML = user.name;
    document.getElementById("userRole").innerHTML = user.role;
    document.getElementById("userEmail").innerHTML = user.email;
    document.getElementById("userPhone").innerHTML = user.phone;
    document.getElementById("userLocation").innerHTML = user.location;
    document.getElementById("userCompany").innerHTML = user.organization;
    document.getElementById("fullName").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("location").value = user.location;
    document.getElementById("organization").value = user.organization;
}*/
/* ==========================================
UPDATE PROFILE
========================================== */
const form = document.getElementById("profileForm");
if (form) {
    form.addEventListener("submit", updateProfile);
}
async function updateProfile(e) {
    e.preventDefault();
    const user = {
        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        organization: document.getElementById("organization").value
    };
    try {
        await fetch(`${API_BASE}/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        toast("Profile Updated Successfully");
    }
    catch {
        toast("Backend not connected (Demo Mode)");
    }
}
/* ==========================================
CHANGE PASSWORD
========================================== */
document.querySelector(".btn-outline-warning")
    .addEventListener("click", () => {
        toast("Password Updated Successfully");
    });
/* ==========================================
ACCOUNT SETTINGS
========================================== */
document.querySelectorAll(".form-check-input")
    .forEach(toggle => {
        toggle.addEventListener("change", () => {
            toast("Settings Updated");
        });
    });
/* ==========================================
DELETE ACCOUNT
========================================== */
document.querySelector(".btn-outline-danger")
    .addEventListener("click", () => {
        const confirmDelete = confirm(
            "Are you sure you want to delete your account?"
        );
        if (confirmDelete) {
            toast("Account deletion request sent.");
        }
    });
/* ==========================================
LOGOUT
========================================== */
function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href="login.html";
}
/* ==========================================
PROFILE IMAGE ANIMATION
========================================== */
const image = document.querySelector(".profile-image img");
if (image) {
    image.addEventListener("mouseenter", () => {
        image.style.transform = "scale(1.08) rotate(3deg)";
    });
    image.addEventListener("mouseleave", () => {
        image.style.transform = "scale(1)";
    });
}
/* ==========================================
CARD HOVER
========================================== */
document.querySelectorAll(
    ".stats-card"
).forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px)";
    });
});
/* ==========================================
TOAST
========================================== */
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
    }, 3500);
}
/* ==========================================
WELCOME
========================================== */
setTimeout(() => {
    toast("Welcome back!");
}, 1200);
console.log("Profile Module Loaded Successfully");