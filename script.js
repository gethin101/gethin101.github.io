// ============================
// TYPEWRITER
// ============================
const typewriterElement = document.getElementById('typewriter');
const typewriterText = "Hi, I'm Gethin";
let typewriterIndex = 0;
let isDeleting = false;

function typewriter() {
    if (!typewriterElement) return;

    if (!isDeleting && typewriterIndex < typewriterText.length) {
        typewriterElement.textContent = typewriterText.substring(0, typewriterIndex + 1);
        typewriterIndex++;
        setTimeout(typewriter, 100);

    } else if (isDeleting && typewriterIndex > 0) {
        typewriterElement.textContent = typewriterText.substring(0, typewriterIndex - 1);
        typewriterIndex--;
        setTimeout(typewriter, 50);

    } else if (!isDeleting && typewriterIndex === typewriterText.length) {
        isDeleting = true;
        setTimeout(typewriter, 2000);

    } else if (isDeleting && typewriterIndex === 0) {
        isDeleting = false;
        setTimeout(typewriter, 500);
    }
}

document.addEventListener("DOMContentLoaded", typewriter);



// ============================
// IMAGE CAROUSEL (HERO)
// ============================
let currentImageSlide = 0;

function showImageSlide(index) {
    const items = document.querySelectorAll('.carousel-image-item');
    const track = document.querySelector('.carousel-track');

    if (!items.length || !track) return;

    currentImageSlide = (index + items.length) % items.length;

    track.style.transform = `translateX(-${currentImageSlide * 100}%)`;

    items.forEach((item, i) => {
        item.classList.toggle('active', i === currentImageSlide);
    });
}

function nextImageSlide() {
    showImageSlide(currentImageSlide + 1);
}

function prevImageSlide() {
    showImageSlide(currentImageSlide - 1);
}

// autoplay hero carousel
document.addEventListener("DOMContentLoaded", () => {
    setInterval(nextImageSlide, 5000);
});



// ============================
// PROJECT CAROUSEL (FIXED LOOP)
// ============================
function changeCarouselSlide(e, dir, card) {
    const slides = card.querySelectorAll(".carousel-slide");
    const dots = card.querySelectorAll(".dot");

    let index = [...slides].findIndex(s => s.classList.contains("active"));

    // FIXED LOOP LOGIC (1→2→3→1 and reverse)
    index = (index + dir + slides.length) % slides.length;

    slides.forEach((s, i) => {
        s.classList.toggle("active", i === index);
    });

    dots.forEach((d, i) => {
        d.classList.toggle("active", i === index);
    });
}



// ============================
// MODAL IMAGE SYSTEM (REAL IMAGES)
// ============================
const projectImages = {
    1: ["assets/projects/hackpad/1.jpg","assets/projects/hackpad/2.jpg","assets/projects/hackpad/3.jpg"],
    2: ["assets/projects/robot/1.jpg","assets/projects/robot/2.jpg","assets/projects/robot/3.jpg"],
    3: ["assets/projects/keyboard/1.jpg","assets/projects/keyboard/2.jpg","assets/projects/keyboard/3.jpg"],
    4: ["assets/projects/ghost/1.jpg","assets/projects/ghost/2.jpg","assets/projects/ghost/3.jpg"],
    5: ["assets/projects/camera/1.jpg","assets/projects/camera/2.jpg","assets/projects/camera/3.jpg"],
    6: ["assets/projects/blinky/1.jpg","assets/projects/blinky/2.jpg","assets/projects/blinky/3.jpg"]
};

function openProjectModal(projectId) {
    const modal = document.getElementById("projectModal");

    const imgs = projectImages[projectId];
    if (!imgs) return;

    document.getElementById("modalImg1").src = imgs[0];
    document.getElementById("modalImg2").src = imgs[1];
    document.getElementById("modalImg3").src = imgs[2];

    changeModalSlide(0);

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}



// ============================
// MODAL SLIDES
// ============================
function changeModalSlide(slideIndex) {
    const modal = document.getElementById("projectModal");
    if (!modal) return;

    const slides = modal.querySelectorAll(".modal-gallery-slide");
    const dots = modal.querySelectorAll(".modal-gallery-dot");

    slides.forEach((s, i) => {
        s.classList.toggle("active", i === slideIndex);
    });

    dots.forEach((d, i) => {
        d.classList.toggle("active", i === slideIndex);
    });
}



// ============================
// CLICK OUTSIDE TO CLOSE
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("projectModal");

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeProjectModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeProjectModal();
    });
});



// ============================
// SCROLL ANIMATION
// ============================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.6s ease forwards";
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".project-card, .about-card").forEach(card => {
        card.style.opacity = "0";
        observer.observe(card);
    });
});
