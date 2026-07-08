/* ==========================================
   SHADOWPROFILE ANIMATIONS
========================================== */
// Floating animation for hero card
const heroCard = document.querySelector(".glass-card");
if (heroCard) {
    window.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;
        heroCard.style.transform =
            `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    window.addEventListener("mouseleave", () => {
        heroCard.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
}
/* ==========================================
   FLOATING PARTICLES
========================================== */
const particles = document.querySelectorAll(".particles span");
particles.forEach((particle, index) => {
    particle.style.animationDuration =
        `${8 + Math.random() * 10}s`;
    particle.style.animationDelay =
        `${Math.random() * 5}s`;
});
/* ==========================================
   HERO IMAGE FLOAT
========================================== */
function floatingHero() {
    const image = document.querySelector(".hero-image");
    if (!image) return;
    let time = 0;
    setInterval(() => {
        time += 0.05;
        image.style.transform =
            `translateY(${Math.sin(time) * 10}px)`;
    }, 30);
}
floatingHero();
/* ==========================================
   FEATURE CARD STAGGER
========================================== */
const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 120}ms`;
});
/* ==========================================
   GLOW EFFECT
========================================== */
setInterval(() => {
    document.querySelectorAll(".feature-icon").forEach(icon => {
        icon.style.boxShadow =
            `0 0 ${20 + Math.random() * 15}px rgba(255,122,0,.5)`;
    });
}, 1800);
/* ==========================================
   RANDOM PULSE
========================================== */
setInterval(() => {
    const cards = document.querySelectorAll(".workflow-card");
    const random = Math.floor(Math.random() * cards.length);
    cards[random].classList.add("pulse-card");
    setTimeout(() => {
        cards[random].classList.remove("pulse-card");
    }, 1000);
}, 2500);
/* ==========================================
   HERO TITLE FADE
========================================== */
const heroTitle = document.querySelector(".display-3");
if (heroTitle) {
    heroTitle.animate(
        [
            { opacity: 0, transform: "translateY(40px)" },
            { opacity: 1, transform: "translateY(0px)" }
        ],
        {
            duration: 1200,
            easing: "ease-out"
        }
    );
}
/* ==========================================
   BUTTON GLOW
========================================== */
document.querySelectorAll(".btn-warning").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.boxShadow =
            "0 0 30px rgba(255,122,0,.5)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.boxShadow = "";
    });
});
/* ==========================================
   PAGE LOADED
========================================== */
window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});
/* ==========================================
   END
========================================== */