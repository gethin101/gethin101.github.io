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

// Change carousel slide
function changeCarouselSlide(e, slideIndex) {
    const carousel = e.target.closest('.project-image-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

// Change modal gallery slide
function changeModalSlide(slideIndex) {
    const modal = document.getElementById('projectModal');
    const slides = modal.querySelectorAll('.modal-gallery-slide');
    const dots = modal.querySelectorAll('.modal-gallery-dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

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

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
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