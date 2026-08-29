// ===== TYPING EFFECT =====
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const words = ['E-commerce Expert', 'Full-Stack Developer', 'Top-rated Upwork bidder', 'React & Node.js', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typedTextSpan.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 120);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 60);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 1200);
    }
}
typeEffect();

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== PROJECTS DATA =====
const projects = [
    {
        title: 'E-Commerce Store',
        description: 'A fully responsive online store with cart functionality and local storage.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        demo: 'https://zohaib301.github.io/Ecommerce-Website-/',
        code: '#',
        image: 'projects/ecommerce.svg'
    },
    {
        title: 'Weather App',
        description: 'Real-time weather app using OpenWeatherMap API with search and geolocation.',
        tags: ['JavaScript', 'API', 'CSS'],
        demo: '#',
        code: '#',
        image: 'projects/weather.svg'
    },
    // {
    //     title: 'Task Manager',
    //     description: 'A productivity tool with drag-and-drop, task filtering, and local storage.',
    //     tags: ['HTML', 'CSS', 'JavaScript'],
    //     demo: '#',
    //     code: '#',
    //     image: 'projects/task.svg'
    // },
    {
        title: 'Portfolio Website',
        description: 'This very portfolio — fully responsive with dark mode and animations.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        demo: '#',
        code: '#',
        image: 'projects/portfolio.svg'
    },
    {
        title: 'Quiz App',
        description: 'Interactive quiz with timer, score tracking, and multiple categories.',
        tags: ['JavaScript', 'CSS', 'HTML'],
        demo: '#',
        code: '#',
        image: 'projects/quiz.svg'
    },
    {
        title: 'Landing Page',
        description: 'Modern SaaS landing page with smooth animations and responsive design.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        demo: '#',
        code: '#',
        image: 'projects/landing.svg'
    }
    ,{
        title: 'SaaS Platform',
        description: 'Custom software-as-a-service solutions: multi-tenant apps, dashboards and APIs.',
        tags: ['Node.js', 'Express', 'MongoDB'],
        demo: '#',
        code: '#',
        image: 'projects\OIP.jpg'
    }
];

// ===== RENDER PROJECTS =====
const projectsGrid = document.getElementById('projectsGrid');

projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    // Emoji/icon based on title
    const icons = {
        'E-Commerce Store': '🛒',
        'Weather App': '🌤️',
        'Task Manager': '📋',
        'Portfolio Website': '💼',
        'Quiz App': '🧠',
        'Landing Page': '🚀'
    };

    card.innerHTML = `
        <div class="project-icon">${icons[project.title] || '📁'}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
    `;

    projectsGrid.appendChild(card);
});

// ===== SIMPLE PROJECTS SLIDER =====
const sliderContainer = document.getElementById('projectsSlider');
if (sliderContainer) {
    const slidesEl = sliderContainer.querySelector('.slides');
    const dotsEl = sliderContainer.querySelector('.slider-dots');

    projects.forEach((project, i) => {
        const slide = document.createElement('div');
        slide.className = 'slide';

        if (project.image) {
            const img = document.createElement('img');
            let src = project.image.replace(/\\/g, '/');
            if (!src.startsWith('./')) src = './' + src; // normalize backslashes and ensure relative path
            img.src = src;
            img.alt = project.title;
            img.loading = 'lazy';
            img.addEventListener('error', () => {
                console.error('Failed to load project image:', img.src);
                img.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.style.height = '160px';
                placeholder.style.display = 'grid';
                placeholder.style.placeItems = 'center';
                placeholder.textContent = 'Image not found';
                slide.insertBefore(placeholder, img);
            });
            slide.appendChild(img);
        } else {
            const placeholder = document.createElement('div');
            placeholder.style.height = '160px';
            placeholder.style.display = 'grid';
            placeholder.style.placeItems = 'center';
            placeholder.textContent = 'No image';
            slide.appendChild(placeholder);
        }

        const title = document.createElement('div');
        title.className = 'slide-title';
        title.textContent = project.title;
        slide.appendChild(title);

        slidesEl.appendChild(slide);

        const dot = document.createElement('button');
        dot.addEventListener('click', () => showSlide(i));
        dotsEl.appendChild(dot);
    });

    const prevBtn = sliderContainer.querySelector('.slider-prev');
    const nextBtn = sliderContainer.querySelector('.slider-next');
    let currentIndex = 0;
    let autoplayId = null;

    function updateDots() {
        dotsEl.querySelectorAll('button').forEach((b, idx) => {
            b.classList.toggle('active', idx === currentIndex);
        });
    }

    function showSlide(index) {
        const slides = slidesEl.children.length;
        currentIndex = (index + slides) % slides;
        const offset = -(currentIndex * (slidesEl.children[0].getBoundingClientRect().width + 16));
        slidesEl.style.transform = `translateX(${offset}px)`;
        updateDots();
    }

    function next() { showSlide(currentIndex + 1); }
    function prev() { showSlide(currentIndex - 1); }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayId = setInterval(next, 3000);
    }
    function stopAutoplay() { if (autoplayId) clearInterval(autoplayId); }

    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    // initial
    // ensure slide widths calculated after images/load; use requestAnimationFrame
    requestAnimationFrame(() => {
        showSlide(0);
        startAutoplay();
    });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const subject = contactForm.querySelector('input[placeholder="Subject"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }

    // WhatsApp number (use full international number without plus)
    let phone = '923256480361';

    // Build the message
    const text = `Hello Muhammad Zohaib\n\nMessage from portfolio site:\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp (web or app) in a new tab/window
    window.open(waUrl, '_blank');
    contactForm.reset();
});

// ===== SMOOTH SCROLL FOR NAV LINKS (fallback) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== REVEAL ANIMATION ON SCROLL (optional) =====
// Simple intersection observer for fade-in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('section, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('🚀 Portfolio website loaded successfully!');

// ===== IMAGE DIAGNOSTICS (shows missing project images) =====
(function runImageDiagnostics() {
    const missing = [];
    function reportMissing(src) {
        if (!missing.includes(src)) missing.push(src);
    }

    projects.forEach(p => {
        if (!p.image) return;
        const raw = p.image.replace(/\\/g, '/');
        const src = raw.startsWith('./') ? raw : './' + raw;
        const tester = new Image();
        tester.onload = () => console.log('Image OK:', src);
        tester.onerror = () => {
            console.error('Missing project image:', src);
            reportMissing(src);
            renderMissingReport();
        };
        // start load
        tester.src = src + (src.includes('?') ? '&_=' : '?_=') + Date.now();
    });

    function renderMissingReport() {
        let el = document.getElementById('imageIssues');
        if (!el) {
            el = document.createElement('div');
            el.id = 'imageIssues';
            el.style.position = 'fixed';
            el.style.right = '16px';
            el.style.bottom = '16px';
            el.style.zIndex = '2000';
            el.style.background = 'rgba(220,60,60,0.95)';
            el.style.color = '#fff';
            el.style.padding = '12px 16px';
            el.style.borderRadius = '8px';
            el.style.fontFamily = 'Segoe UI, Roboto, sans-serif';
            el.style.fontSize = '13px';
            el.style.maxWidth = '320px';
            el.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)';
            document.body.appendChild(el);
        }
        if (missing.length === 0) {
            if (el) el.remove();
            return;
        }
        el.innerHTML = `<strong>Missing images:</strong><ul style="margin:8px 0 0 18px;padding:0;">${missing.map(s => `<li>${s}</li>`).join('')}</ul><div style="margin-top:8px;font-size:12px;opacity:0.9">Tip: place files into the <code>projects/</code> folder and refresh.</div>`;
    }
})();