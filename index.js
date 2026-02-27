/* ============================================
   Portfolio JavaScript - Pon Prabhakar K
   Production-Grade AI/ML Engineer
   ============================================ */

// ============================================
// PARTICLE CONSTELLATION BACKGROUND
// ============================================
(function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const PARTICLE_COUNT = 50;
    const CONNECTION_DISTANCE = 150;
    const MOUSE_RADIUS = 200;
    let mouse = { x: -1000, y: -1000 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
        };
    }

    function init() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DISTANCE) {
                    const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.1;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
                const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                p.vx -= (dx / dist) * force * 0.015;
                p.vy -= (dy / dist) * force * 0.015;
            }

            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.999;
            p.vy *= 0.999;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    resize();
    init();
    draw();
})();


// ============================================
// NAVBAR
// ============================================
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
})();


// ============================================
// SCROLL REVEAL
// ============================================
(function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                const children = entry.target.querySelectorAll(
                    '.focus-card, .project-card, .process-stage, .repo-card, .edu-item, .principle-tag'
                );
                children.forEach((child, i) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        child.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, i * 80 + 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
})();


// ============================================
// PROJECT FILTER
// ============================================
(function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeInUp 0.4s ease-out ${index * 0.05}s backwards`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();


// ============================================
// SMOOTH SCROLL
// ============================================
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();


// ============================================
// ACTIVE NAV LINK
// ============================================
(function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#e8e8f0';
            }
        });
    });
})();
