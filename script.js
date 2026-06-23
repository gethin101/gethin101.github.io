// =====================
// TYPEWRITER
// =====================
const typewriterElement = document.getElementById('typewriter');
const typewriterText = "Hi, I'm Gethin";
let typeIndex = 0;
let deleting = false;

function typewriter() {
    if (!typewriterElement) return;

    if (!deleting && typeIndex < typewriterText.length) {
        typewriterElement.textContent = typewriterText.substring(0, typeIndex + 1);
        typeIndex++;
        setTimeout(typewriter, 100);
    } 
    else if (deleting && typeIndex > 0) {
        typewriterElement.textContent = typewriterText.substring(0, typeIndex - 1);
        typeIndex--;
        setTimeout(typewriter, 50);
    } 
    else if (!deleting && typeIndex === typewriterText.length) {
        deleting = true;
        setTimeout(typewriter, 2000);
    } 
    else if (deleting && typeIndex === 0) {
        deleting = false;
        setTimeout(typewriter, 500);
    }
}

document.addEventListener("DOMContentLoaded", typewriter);


// =====================
// MAIN IMAGE CAROUSEL (top gallery)
// =====================
let currentImageSlide = 0;

function showImageSlide(index) {
    const items = document.querySelectorAll('.carousel-image-item');
    const track = document.querySelector('.carousel-track');

    if (!items.length || !track) return;

    if (index >= items.length) currentImageSlide = 0;
    else if (index < 0) currentImageSlide = items.length - 1;
    else currentImageSlide = index;

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

document.addEventListener("DOMContentLoaded", () => {
    setInterval(nextImageSlide, 5000);
});


// =====================
// PROJECT CARD CAROUSEL (FIXED LOOP)
// =====================
function changeCarouselSlide(e, direction, card) {
    const slides = card.querySelectorAll('.carousel-slide');
    const dots = card.querySelectorAll('.dot');

    if (!slides.length) return;

    let currentIndex = 0;

    slides.forEach((slide, i) => {
        if (slide.classList.contains('active')) currentIndex = i;
    });

    let newIndex;

    if (direction === -1) {
        newIndex = (currentIndex - 1 + slides.length) % slides.length;
    } 
    else if (direction === 1) {
        newIndex = (currentIndex + 1) % slides.length;
    } 
    else {
        newIndex = direction;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === newIndex);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === newIndex);
    });
}


// =====================
// MODAL SLIDES
// =====================
function changeModalSlide(index) {
    const modal = document.getElementById('projectModal');
    const slides = modal.querySelectorAll('.modal-gallery-slide');
    const dots = modal.querySelectorAll('.modal-gallery-dot');

    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}


// =====================
// PROJECT DATA
// =====================
const projectsData = {
    1: {
        title: "Gethin Hackpad v1",
        description: "A 3x3 macropad with OLED display and RP2040 microcontroller.",
        details: "Built as a custom shortcut keypad using CircuitPython and KiCad.",
        techStack: ["KiCad", "CircuitPython", "Fusion360"],
        role: "Designer + Developer",
        timeline: "2025"
    },
    2: {
        title: "GG Battle Robot",
        description: "Combat robot with servo axe and Pico control.",
        details: "WiFi-controlled battle robot designed in Fusion360.",
        techStack: ["MicroPython", "Fusion360", "KiCad"],
        role: "Full Build",
        timeline: "2025"
    },
    3: {
        title: "Gethin-75 Keyboard",
        description: "Custom 75% mechanical keyboard.",
        details: "PCB + case design with macro layers.",
        techStack: ["KiCad", "CircuitPython", "Fusion360"],
        role: "Full Stack Maker",
        timeline: "2025"
    },
    4: {
        title: "Ghost One",
        description: "ESP32 pentesting multi-tool device.",
        details: "Security tool inspired by Flipper Zero.",
        techStack: ["ESP32", "KiCad", "Firmware"],
        role: "Hardware Dev",
        timeline: "2025"
    },
    5: {
        title: "A1 Mini Camera System",
        description: "Timelapse system for 3D printer.",
        details: "Automated camera rig for Bambu Lab A1 Mini.",
        techStack: ["Python", "Fusion360", "G-code"],
        role: "Designer",
        timeline: "2025"
    },
    6: {
        title: "IC 555 Blinky",
        description: "Classic LED flasher circuit.",
        details: "Simple astable 555 timer PCB project.",
        techStack: ["KiCad", "PCB", "Electronics"],
        role: "Beginner Electronics",
        timeline: "2024"
    }
};


// =====================
// OPEN MODAL
// =====================
function openProjectModal(id) {
    const modal = document.getElementById("projectModal");
    const data = projectsData[id];

    if (!modal || !data) return;

    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalDescription").textContent = data.description;
    document.getElementById("modalDetails").textContent = data.details;
    document.getElementById("modalRole").textContent = data.role;
    document.getElementById("modalTimeline").textContent = data.timeline;

    const tech = document.getElementById("modalTechStack");
    tech.innerHTML = "";
    data.techStack.forEach(t => {
        const span = document.createElement("span");
        span.className = "tech-badge";
        span.textContent = t;
        tech.appendChild(span);
    });

    // reset modal slides
    const slides = modal.querySelectorAll('.modal-gallery-slide');
    const dots = modal.querySelectorAll('.modal-gallery-dot');

    slides.forEach((s, i) => s.classList.toggle('active', i === 0));
    dots.forEach((d, i) => d.classList.toggle('active', i === 0));

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}


// =====================
// CLOSE MODAL
// =====================
function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}


// =====================
// GALLERY POPUP
// =====================
function openGalleryImage(index) {
    const popup = document.getElementById("galleryPopup");
    const text = document.getElementById("popupImageText");

    const labels = ["Screenshot 1", "Screenshot 2", "Screenshot 3"];

    text.textContent = labels[index] || "Screenshot";

    popup.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeGalleryImage() {
    const popup = document.getElementById("galleryPopup");
    popup.classList.remove("active");
    document.body.style.overflow = "auto";
}


// =====================
// CLICK OUTSIDE CLOSE
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("projectModal");
    const popup = document.getElementById("galleryPopup");

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) closeProjectModal();
    });

    popup?.addEventListener("click", (e) => {
        if (e.target === popup) closeGalleryImage();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeProjectModal();
            closeGalleryImage();
        }
    });
});


// =====================
// ANIMATION ON SCROLL
// =====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.6s ease forwards";
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.project-card, .about-card')
        .forEach(el => {
            el.style.opacity = 0;
            observer.observe(el);
        });
});
