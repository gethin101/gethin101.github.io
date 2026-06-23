// TYPEWRITER (unchanged)
const typewriterElement = document.getElementById('typewriter');
const typewriterText = "Hi, I'm Gethin";
let typewriterIndex = 0;
let isDeleting = false;

function typewriter() {
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

document.addEventListener('DOMContentLoaded', typewriter);


// IMAGE CAROUSEL
let currentImageSlide = 0;

function showImageSlide(index) {
    const items = document.querySelectorAll('.carousel-image-item');
    const track = document.querySelector('.carousel-track');

    if (!items.length) return;

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

document.addEventListener('DOMContentLoaded', () => {
    setInterval(nextImageSlide, 5000);
});


// MODAL OPEN (NEW CLEAN VERSION)
function openProjectModal(card) {
    const modal = document.getElementById('projectModal');

    // Get data from clicked card
    const title = card.querySelector('h3')?.textContent || '';
    const description = card.querySelector('.project-info p')?.textContent || '';

    const techStack = card.querySelectorAll('.tech-badge');

    // Fill modal
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalDetails').textContent = "More details coming soon...";

    // Tech stack
    const techContainer = document.getElementById('modalTechStack');
    techContainer.innerHTML = '';
    techStack.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-badge';
        span.textContent = t.textContent;
        techContainer.appendChild(span);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}


// CLOSE MODAL
function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}


// CLICK OUTSIDE CLOSE
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });
});


// CAROUSEL INSIDE PROJECT CARDS
function changeCarouselSlide(event, direction, card) {
    const slides = card.querySelectorAll('.carousel-slide');
    const dots = card.querySelectorAll('.dot');

    let currentIndex = 0;

    slides.forEach((slide, i) => {
        if (slide.classList.contains('active')) currentIndex = i;
    });

    let newIndex;

    if (typeof direction === 'number') {
        newIndex = direction;
    } else if (direction === -1) {
        newIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    } else {
        newIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    }

    slides.forEach((s, i) => s.classList.toggle('active', i === newIndex));
    dots.forEach((d, i) => d.classList.toggle('active', i === newIndex));
}
