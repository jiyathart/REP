// Portfolio Interactive Features and Animations

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupParticleSystem();
        this.setupTypingAnimation();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupThemeToggle();
        this.setupContactForm();
        this.setupMobileMenu();
        this.setupSmoothScroll();
    }

    // Loading Screen
    setupLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                loadingScreen.classList.add('fade-out');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 3000);
        });
    }

    // Particle System
    setupParticleSystem() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particlesContainer);
        }

        // Create new particles periodically
        setInterval(() => {
            if (particlesContainer.children.length < particleCount) {
                this.createParticle(particlesContainer);
            }
        }, 200);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 5;
        
        particle.style.left = `${startX}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }

    // Typing Animation
    setupTypingAnimation() {
        const typingText = document.getElementById('typingText');
        const texts = [
            'Mohamed Jiyath R',
            'AI Expert',
            'Web Developer',
            'Python Programmer',
            'Data Specialist'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;

        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(typeText, typingSpeed);
        };

        typeText();
    }

    // Navigation
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active link highlighting
        const updateActiveLink = () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        };

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skills')) {
                        this.animateSkillBars();
                    }
                    
                    // Animate timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 200);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });

        observer.observe(document.querySelector('.skills'));
        observer.observe(document.querySelector('.projects'));
    }

    animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const skillLevel = item.getAttribute('data-skill');
                const progressBar = item.querySelector('.skill-progress');
                
                progressBar.style.width = `${skillLevel}%`;
            }, index * 100);
        });
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Check for saved theme preference or default to 'light'
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-color-scheme', currentTheme);
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-color-scheme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-color-scheme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        const downloadResumeBtn = document.getElementById('downloadResume');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formObject = {};
            
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }

            // Simulate form submission
            this.showNotification('Message sent successfully!', 'success');
            contactForm.reset();

            console.log('Contact form submitted:', formObject);
        });

        downloadResumeBtn.addEventListener('click', () => {
            this.showNotification('Resume download feature coming soon!', 'info');
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: var(--space-16) var(--space-20);
                    border-radius: var(--radius-base);
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    box-shadow: var(--shadow-lg);
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: transform var(--duration-normal) var(--ease-standard);
                    max-width: 300px;
                }
                .notification--success {
                    border-color: var(--color-success);
                    background: rgba(var(--color-success-rgb), 0.1);
                }
                .notification--info {
                    border-color: var(--color-info);
                    background: rgba(var(--color-info-rgb), 0.1);
                }
                .notification--error {
                    border-color: var(--color-error);
                    background: rgba(var(--color-error-rgb), 0.1);
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: var(--space-12);
                }
                .notification-message {
                    flex: 1;
                    font-size: var(--font-size-sm);
                    color: var(--color-text);
                }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: var(--font-size-lg);
                    cursor: pointer;
                    color: var(--color-text-secondary);
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        const closeBtn = notification.querySelector('.notification-close');
        const closeNotification = () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };

        closeBtn.addEventListener('click', closeNotification);
        setTimeout(closeNotification, 5000);
    }

    // Mobile Menu
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth Scroll
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll indicator
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = aboutSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}

// Additional Interactive Features
class InteractiveEffects {
    constructor() {
        this.setupCursorEffects();
        this.setupProjectCardEffects();
        this.setupParallaxEffects();
    }

    setupCursorEffects() {
        // Custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div>';
        document.body.appendChild(cursor);

        // Add cursor styles
        const cursorStyles = document.createElement('style');
        cursorStyles.textContent = `
            .custom-cursor {
                position: fixed;
                top: 0;
                left: 0;
                width: 20px;
                height: 20px;
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .cursor-dot {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: var(--gradient-primary);
                transform: scale(0);
                transition: transform 0.3s ease;
            }
            @media (hover: hover) {
                .custom-cursor {
                    opacity: 1;
                }
                .custom-cursor.active .cursor-dot {
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(cursorStyles);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor following
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('button, a, .project-card, .skill-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }

    setupProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.transformOrigin = `${x}px ${y}px`;
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transformOrigin = '';
            });
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-background, .section-header');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                if (element.classList.contains('hero-background')) {
                    element.style.transform = `translateY(${rate}px)`;
                }
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    
    // Only add interactive effects on non-touch devices
    if (!('ontouchstart' in window)) {
        new InteractiveEffects();
    }
});

// Performance optimizations
window.addEventListener('load', () => {
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

// Export for potential external use
window.PortfolioApp = { Portfolio, InteractiveEffects };