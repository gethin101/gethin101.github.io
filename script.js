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
    if (!modal) return;
    const slides = modal.querySelectorAll('.modal-gallery-slide');
    const dots = modal.querySelectorAll('.modal-gallery-dot');
    if (!slides.length) return;

    const normalizedIndex = (index + slides.length) % slides.length;

    slides.forEach((s, i) => s.classList.toggle('active', i === normalizedIndex));
    dots.forEach((d, i) => d.classList.toggle('active', i === normalizedIndex));
}

function changeModalSlideBy(direction) {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const slides = modal.querySelectorAll('.modal-gallery-slide');
    if (!slides.length) return;

    const activeIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    const currentIndex = activeIndex >= 0 ? activeIndex : 0;

    changeModalSlide(currentIndex + direction);
}


let currentModalImages = [];


// =====================
// OPEN MODAL
// =====================
function openProjectModal(card) {
    const modal = document.getElementById("projectModal");
    if (!modal || !card) return;

    const { title, description, details, role, timeline } = card.dataset;
    const techStack = (card.dataset.techStack || "").split("|").filter(Boolean);
    const images = (card.dataset.images || "").split("|").filter(Boolean);

    currentModalImages = images.length ? images : [""];

    document.getElementById("modalTitle").textContent = title || "";
    document.getElementById("modalDescription").textContent = description || "";
    document.getElementById("modalDetails").textContent = details || "";
    document.getElementById("modalRole").textContent = role || "";
    document.getElementById("modalTimeline").textContent = timeline || "";

    const tech = document.getElementById("modalTechStack");
    tech.innerHTML = "";
    techStack.forEach(t => {
        const span = document.createElement("span");
        span.className = "tech-badge";
        span.textContent = t;
        tech.appendChild(span);
    });

    const modalImages = [
        document.getElementById("modalImage1"),
        document.getElementById("modalImage2"),
        document.getElementById("modalImage3")
    ];
    const thumbs = [
        document.getElementById("modalGalleryThumb1"),
        document.getElementById("modalGalleryThumb2"),
        document.getElementById("modalGalleryThumb3")
    ];

    modalImages.forEach((img, i) => {
        const src = currentModalImages[i] || currentModalImages[0] || "";
        img.src = src;
        img.alt = `${title || "Project"} image ${i + 1}`;
    });

    thumbs.forEach((img, i) => {
        const src = currentModalImages[i] || currentModalImages[0] || "";
        img.src = src;
        img.alt = `${title || "Project"} gallery image ${i + 1}`;
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
    const image = document.getElementById("popupImage");
    const src = currentModalImages[index] || currentModalImages[0] || "";
    image.src = src;
    image.alt = `Project gallery image ${index + 1}`;

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
