
        document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Style & Color Change on Scroll ---
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        // Scrolled class for background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Dark theme for header when over dark sections
        const scrollPosition = window.scrollY + header.offsetHeight;
        document.querySelectorAll('.bg-dark').forEach(section => {
            if (scrollPosition > section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                header.classList.add('bg-dark');
            } else {
                // Special check for hero section
                if (scrollPosition < heroSection.offsetHeight) {
                   header.classList.remove('bg-dark');
                }
            }
        });
    });

    // --- Hamburger Menu Toggle ---
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('is-active');
    });
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('is-active');
        });
    });

    // --- Hero Canvas Animation (unchanged) ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const setCanvasSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        class Particle {
            constructor(x, y) {
                this.x = x; this.y = y;
                this.size = Math.random() * 2 + 1;
                this.speedY = Math.random() * -1 - 0.2;
                this.opacity = 1;
            }
            update() { this.y += this.speedY; this.opacity -= 0.005; }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(26, 26, 26, ${this.opacity})`;
                ctx.fill();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Math.random() > 0.8 && particles.length < 150) {
                particles.push(new Particle(Math.random() * canvas.width, canvas.height));
            }
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].opacity <= 0) { particles.splice(i, 1); }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- Content Sections Fade-in on Scroll (unchanged) ---
    const contentSections = document.querySelectorAll('.content-section');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    contentSections.forEach(section => { fadeObserver.observe(section); });


    // --- Active Nav Link on Scroll (unchanged) ---
    const navLinkElements = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[data-section]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { root: null, rootMargin: "-50% 0px -50% 0px" });
    sections.forEach(section => { navObserver.observe(section); });

    // --- "Show More" Projects Logic ---
    const showMoreBtn = document.getElementById('show-more-btn');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            const hiddenProjects = document.querySelectorAll('.hidden-project');
            hiddenProjects.forEach(project => {
                project.style.display = 'flex'; // Use flex to match original card style
                // Add fade-in effect
                project.style.animation = 'fadeIn 0.8s ease forwards';
            });
            // Hide the button after click
            showMoreBtn.style.display = 'none';
        });
    }

});
