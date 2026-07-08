/* ==========================================
   SHADOWPROFILE MAIN JAVASCRIPT
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    navbarScroll();
    smoothScrolling();
    animateCounters();
    activeNavigation();
    revealCards();
    createScrollButton();
});
/* ==========================================
   STICKY NAVBAR
========================================== */
function navbarScroll() {
    const navbar = document.querySelector(".custom-navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        }
        else {
            navbar.classList.remove("scrolled");
        }
    });
}
/* ==========================================
   SMOOTH SCROLL
========================================== */
function smoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
}
/* ==========================================
   COUNTER
========================================== */
function animateCounters() {
    const counters = document.querySelectorAll(".counter");
    const speed = 150;
    counters.forEach(counter => {
        const update = () => {
            const target = counter.innerText.replace(/\D/g, '');
            const count = +counter.getAttribute("data-count") || target;
            const current = +counter.innerText.replace(/\D/g, '');
            const increment = Math.ceil(count / speed);
            if (current < count) {
                counter.innerText = (current + increment);
                setTimeout(update, 20);
            } else {
                counter.innerText = count;
            }
        }
        update();
    });
}
/* ==========================================
ACTIVE NAV LINK
========================================== */
function activeNavigation() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const height = section.clientHeight;
            if (pageYOffset >= top) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
}
/* ==========================================
SCROLL REVEAL
========================================== */
function revealCards() {
    const cards = document.querySelectorAll(".feature-card,.workflow-card,.glass-card");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    });
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(60px)";
        card.style.transition = ".8s";
        observer.observe(card);
    });
}
/* ==========================================
SCROLL TO TOP BUTTON
========================================== */
function createScrollButton() {
    const button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "scrollTop";
    document.body.appendChild(button);
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }
    });
    button.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}
/* ==========================================
BUTTON RIPPLE
========================================== */
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left + "px";
        ripple.style.top = e.clientY - rect.top + "px";
        ripple.classList.add("ripple");
        this.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
/* ==========================================
PARALLAX HERO
========================================== */
document.addEventListener("mousemove", (e) => {
    const hero = document.querySelector(".hero-image");
    const x = (window.innerWidth / 2 - e.pageX) / 35;
    const y = (window.innerHeight / 2 - e.pageY) / 35;
    hero.style.transform = `translate(${x}px,${y}px)`;
});
/* ==========================================
TYPING EFFECT
========================================== */
const text = "Digital Footprint";
const target = document.querySelector(".gradient-text");
if (target) {
    let index = 0;
    target.innerHTML = "";
    function type() {
        if (index < text.length) {
            target.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 90);
        }
    }
    type();
}
/* ==========================================
FEATURE CARD HOVER
========================================== */
document.querySelectorAll(".feature-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px) scale(1.03)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
    });
});
/* ==========================================
LOADING SCREEN
========================================== */
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});
/* ==========================================
CONSOLE MESSAGE
========================================== */
console.log("%cShadowProfile", "color:#ff7a00;font-size:26px;font-weight:bold");
console.log("AI Powered Privacy Risk Analyzer");