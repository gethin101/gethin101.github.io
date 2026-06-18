// Typewriter animation
const typewriterElement = document.getElementById('typewriter');
const typewriterText = 'Hi, I\'m Gethin';
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

// Image carousel navigation
let currentImageSlide = 0;

function showImageSlide(index) {
    const items = document.querySelectorAll('.carousel-image-item');
    if (index >= items.length) {
        currentImageSlide = 0;
    } else if (index < 0) {
        currentImageSlide = items.length - 1;
    } else {
        currentImageSlide = index;
    }

    const track = document.querySelector('.carousel-track');
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

// Auto-scroll image carousel
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        nextImageSlide();
    }, 5000);
});

// Change project carousel slide
function changeCarouselSlide(e, direction, card) {
    const slides = card.querySelectorAll('.carousel-slide');
    const dots = card.querySelectorAll('.dot');
    let currentIndex = 0;

    // Find current active slide
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });

    // Calculate new index
    let newIndex;
    if (typeof direction === 'number' && direction >= 0 && direction < slides.length) {
        newIndex = direction;
    } else if (direction === -1) {
        newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    } else if (direction === 1) {
        newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    }

    // Update slides and dots
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === newIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === newIndex);
    });
}

// Change modal gallery slide
function changeModalSlide(slideIndex) {
    const modal = document.getElementById('projectModal');
    const slides = modal.querySelectorAll('.modal-gallery-slide');
    const dots = modal.querySelectorAll('.modal-gallery-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

// Project data for modal
const projectsData = {
    1: {
        title: 'Project One',
        description: 'A revolutionary web application that transforms user engagement and drives measurable results through innovative design.',
        details: 'This project showcases my ability to build scalable, user-centric applications. I led the entire development process, from conception through deployment, working with cross-functional teams to deliver an exceptional product that exceeded performance expectations.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
        role: 'Full Stack Developer',
        timeline: '3 months'
    },
    2: {
        title: 'Project Two',
        description: 'An intelligent system designed to streamline workflows and boost productivity across teams through smart automation.',
        details: 'Built with a focus on user experience and scalability, this application reduces manual work by 70% and increases efficiency. The backend handles thousands of requests daily with optimized performance and zero downtime, utilizing best practices in architecture.',
        techStack: ['Python', 'PostgreSQL', 'React', 'Django', 'Redis'],
        role: 'Lead Developer',
        timeline: '4 months'
    },
    3: {
        title: 'Project Three',
        description: 'A cutting-edge platform combining AI and real-time analytics for actionable insights and data-driven decision making.',
        details: 'This project demonstrates advanced technical skills including machine learning integration, real-time data processing, and cloud infrastructure management. The platform processes massive datasets daily with intelligent caching and optimized queries for maximum performance.',
        techStack: ['TypeScript', 'AWS', 'Docker', 'TensorFlow', 'GraphQL'],
        role: 'Full Stack Developer',
        timeline: '5 months'
    },
    4: {
        title: 'Project Four',
        description: 'An immersive experience that bridges the gap between design and functionality seamlessly for users.',
        details: 'This application focuses on creating delightful user experiences through smooth animations, intuitive navigation, and responsive design principles. Every interaction has been carefully crafted to delight users and encourage engagement across all platforms.',
        techStack: ['Vue.js', 'Firebase', 'GraphQL', 'Webpack', 'Jest'],
        role: 'Frontend Lead',
        timeline: '2 months'
    },
    5: {
        title: 'Project Five',
        description: 'An enterprise-grade solution built for scalability and performance with cutting-edge architecture.',
        details: 'Designed to handle enterprise-level demands, this solution features robust error handling, comprehensive logging, and advanced monitoring. Built with modularity in mind, it scales effortlessly as business requirements grow and evolve over time.',
        techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'Vercel', 'TypeScript'],
        role: 'Full Stack Developer',
        timeline: '6 months'
    },
    6: {
        title: 'Project Six',
        description: 'A mobile-first progressive web app delivering seamless experiences across all devices and platforms.',
        details: 'This PWA demonstrates expertise in modern web technologies, offline functionality, and progressive enhancement. Optimized for performance on slow networks, it maintains 90+ Lighthouse scores and provides native-like experiences on mobile devices.',
        techStack: ['React Native', 'Redux', 'Firebase', 'API Design', 'PWA'],
        role: 'Frontend Lead',
        timeline: '3 months'
    }
};

// Open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectsData[projectId];

    // Update modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalImageText').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalDetails').textContent = project.details;
    document.getElementById('modalRole').textContent = project.role;
    document.getElementById('modalTimeline').textContent = project.timeline;

    // Update tech stack
    const techStackContainer = document.getElementById('modalTechStack');
    techStackContainer.innerHTML = '';
    project.techStack.forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = tech;
        techStackContainer.appendChild(badge);
    });

    // Reset gallery slides
    const slides = modal.querySelectorAll('.modal-gallery-slide');
    const dots = modal.querySelectorAll('.modal-gallery-dot');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Open gallery image popup
function openGalleryImage(index) {
    const popup = document.getElementById('galleryPopup');
    const screenshotNumbers = ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'];
    document.getElementById('popupImageText').textContent = screenshotNumbers[index] || 'Screenshot';
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close gallery image popup
function closeGalleryImage() {
    const popup = document.getElementById('galleryPopup');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modals when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('projectModal');
    const galleryPopup = document.getElementById('galleryPopup');

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    galleryPopup.addEventListener('click', (e) => {
        if (e.target === galleryPopup) {
            closeGalleryImage();
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeGalleryImage();
        }
    });
});

// Smooth scroll animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and about cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card, .about-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});