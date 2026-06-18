// Project data for modal
const projectsData = {
    1: {
        title: 'Project One',
        description: 'A revolutionary web application that transforms user engagement and drives measurable results through innovative design and powerful features.',
        details: 'This project showcases my ability to build scalable, user-centric applications. I led the entire development process, from conception through deployment, working with cross-functional teams to deliver an exceptional product.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
        role: 'Full Stack Developer',
        timeline: '3 months'
    },
    2: {
        title: 'Project Two',
        description: 'An intelligent system designed to streamline workflows and boost productivity across teams through smart automation.',
        details: 'Built with a focus on user experience, this application reduces manual work by 70% and increases efficiency. The backend handles millions of requests daily with zero downtime.',
        techStack: ['Python', 'PostgreSQL', 'React', 'Django', 'Redis'],
        role: 'Lead Developer',
        timeline: '4 months'
    },
    3: {
        title: 'Project Three',
        description: 'A cutting-edge platform combining AI and real-time analytics for actionable insights.',
        details: 'This project demonstrates advanced technical skills including machine learning integration, real-time data processing, and cloud infrastructure management. The platform processes terabytes of data daily.',
        techStack: ['TypeScript', 'AWS', 'Docker', 'TensorFlow', 'GraphQL'],
        role: 'Full Stack Developer',
        timeline: '5 months'
    },
    4: {
        title: 'Project Four',
        description: 'An immersive experience that bridges the gap between design and functionality seamlessly.',
        details: 'This application focuses on creating delightful user experiences through smooth animations, intuitive navigation, and responsive design. It won an award for innovation in digital design.',
        techStack: ['Vue.js', 'Firebase', 'GraphQL', 'Webpack', 'Jest'],
        role: 'Frontend Lead',
        timeline: '2 months'
    }
};

// Open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectsData[projectId];
    
    // Update modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalImageText').textContent = project.title + ' - Main Image';
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
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});