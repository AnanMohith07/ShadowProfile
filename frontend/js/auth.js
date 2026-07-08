/* ==========================================
   SHADOWPROFILE AUTHENTICATION
========================================== */
const API_BASE = "http://127.0.0.1:5000";
/* ==========================================
   LOGIN
========================================== */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");
        const button = document.querySelector(".login-btn");
        message.innerHTML = "";
        button.disabled = true;
        button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Logging in...
        `;
        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            if (response.ok) {
                message.innerHTML =
                    `<div class="alert alert-success">${data.message}</div>`;
                // Store only token (optional)
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1200);
            }
            else {
                message.innerHTML =
                    `<div class="alert alert-danger">${data.message}</div>`;
            }
        }
        catch (error) {
            message.innerHTML =
                `<div class="alert alert-danger">
                    Unable to connect to the server.
                </div>`;
        }
        button.disabled = false;
        button.innerHTML = "Login";
    });
}
/* ==========================================
   REGISTER
========================================== */
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const fullname =
            document.getElementById("fullname").value.trim();
        const email =
            document.getElementById("email").value.trim();
        const password =
            document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;
        const message =
            document.getElementById("registerMessage");
        if (password !== confirmPassword) {
            message.innerHTML =
                `<div class="alert alert-danger">
                    Passwords do not match.
                </div>`;
            return;
        }
        const button =
            document.querySelector(".register-btn");
        button.disabled = true;
        button.innerHTML =
            `<span class="spinner-border spinner-border-sm me-2"></span>
            Creating Account...`;
        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    password
                })
            });
            const data = await response.json();
            if (response.ok) {
                message.innerHTML =
                    `<div class="alert alert-success">
                        ${data.message}
                    </div>`;
                registerForm.reset();
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            }
            else {
                message.innerHTML =
                    `<div class="alert alert-danger">
                        ${data.message}
                    </div>`;
            }
        }
        catch (error) {
            message.innerHTML =
                `<div class="alert alert-danger">
                    Server connection failed.
                </div>`;
        }
        button.disabled = false;
        button.innerHTML = "Create Account";
    });
}
/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */
const togglePassword =
    document.getElementById("togglePassword");
if (togglePassword) {
    togglePassword.addEventListener("click", () => {
        const password =
            document.getElementById("password");
        const icon =
            togglePassword.querySelector("i");
        if (password.type === "password") {
            password.type = "text";
            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");
        }
        else {
            password.type = "password";
            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");
        }
    });
}
/* ==========================================
   PASSWORD STRENGTH
========================================== */
const passwordField =
    document.getElementById("password");
if (passwordField && document.getElementById("strengthBar")) {
    passwordField.addEventListener("input", () => {
        const value = passwordField.value;
        const bar =
            document.getElementById("strengthBar");
        let strength = 0;
        if (value.length >= 8) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[^A-Za-z0-9]/.test(value)) strength++;
        const widths = [0, 25, 50, 75, 100];
        const colors = [
            "#ccc",
            "#dc3545",
            "#ffc107",
            "#0dcaf0",
            "#198754"
        ];
        bar.style.width = widths[strength] + "%";
        bar.style.background = colors[strength];
    });
}
/* ==========================================
   EMAIL VALIDATION
========================================== */
const emailInput =
    document.getElementById("email");
if (emailInput) {
    emailInput.addEventListener("blur", () => {
        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(emailInput.value)) {
            emailInput.classList.add("is-invalid");
        }
        else {
            emailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");
        }
    });
}
/* ==========================================
   CONSOLE
========================================== */
console.log("ShadowProfile Authentication Loaded");
