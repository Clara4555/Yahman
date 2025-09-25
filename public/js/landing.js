// Enhanced Landing Page Functionality
class LandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupAnimations();
        this.setupInteractions();
        this.setupScrollEffects();
        console.log('🚀 Yaahman Group Landing Page Initialized');
    }

    setupTheme() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('yaahman-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update theme toggle button
        this.updateThemeToggle(savedTheme);
        
        // Setup theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('yaahman-theme', newTheme);
        
        this.updateThemeToggle(newTheme);
        this.playThemeTransition();
    }

    updateThemeToggle(theme) {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }

    playThemeTransition() {
        // Add transition effect
        document.body.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    }

    setupAnimations() {
        // Animate title words sequentially
        this.animateTitle();
        
        // Setup logo 3D rotation
        this.setupLogoAnimation();
        
        // Setup service card animations
        this.setupServiceAnimations();
        
        // Setup floating particles
        this.setupParticleAnimation();
    }

    animateTitle() {
        const titleWords = document.querySelectorAll('.title-word');
        titleWords.forEach((word, index) => {
            word.style.animationDelay = `${index * 0.3}s`;
        });
    }

    setupLogoAnimation() {
        const logoContainer = document.getElementById('animatedLogo');
        const logoWrapper = logoContainer.querySelector('.logo-wrapper');
        
        // Mouse move rotation
        logoContainer.addEventListener('mousemove', (e) => {
            const rect = logoContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            logoWrapper.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
        });
        
        // Mouse leave reset
        logoContainer.addEventListener('mouseleave', () => {
            logoWrapper.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
        
        // Click animation
        logoContainer.addEventListener('click', () => {
            logoWrapper.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                logoWrapper.style.transform = 'rotateY(0deg)';
            }, 1000);
        });
    }

    setupServiceAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            // Staggered animation
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = card.classList.contains('active-service') 
                    ? 'translateY(-10px) scale(1.02)' 
                    : 'translateY(-5px) scale(1.01)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = card.classList.contains('active-service') 
                    ? 'translateY(-5px) scale(1)' 
                    : 'translateY(0) scale(1)';
            });
        });
    }

    setupParticleAnimation() {
        // Additional particle effects
        const particlesContainer = document.querySelector('.floating-particles');
        
        // Create more particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${15 + Math.random() * 15}s`;
            particle.style.background = i % 3 === 0 ? 'var(--primary-color)' : 
                                       i % 3 === 1 ? 'var(--secondary-color)' : 
                                       'var(--accent-color)';
            particlesContainer.appendChild(particle);
        }
    }

    setupInteractions() {
        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Service card clicks
        const refreshmentCard = document.getElementById('refreshmentCard');
        if (refreshmentCard) {
            refreshmentCard.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToService('refreshment');
            });
        }
        
        const foodsCard = document.getElementById('foodsCard');
        if (foodsCard) {
            foodsCard.addEventListener('click', () => {
                this.showComingSoonMessage();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    navigateToService(service) {
        // Add loading state to the button
        const card = document.getElementById(`${service}Card`);
        const arrow = card.querySelector('.service-arrow');
        
        arrow.textContent = '⏳';
        card.style.pointerEvents = 'none';
        
        // Simulate loading and navigate
        setTimeout(() => {
            window.location.href = service === 'refreshment' ? 'home.html' : '#';
        }, 800);
    }

    showComingSoonMessage() {
        // Create a nice coming soon notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 2rem 3rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-heavy);
            z-index: 10000;
            text-align: center;
            animation: fadeInUp 0.5s ease;
        `;
        
        notification.innerHTML = `
            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">🍽️ Coming Soon!</h3>
            <p style="margin-bottom: 1.5rem;">Yaahman Foods is currently in development.</p>
            <button onclick="this.parentElement.remove()" 
                    style="background: rgba(255,255,255,0.2); 
                           border: 2px solid white; 
                           color: white; 
                           padding: 0.5rem 1.5rem; 
                           border-radius: 25px; 
                           cursor: pointer;">
                Got it!
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    setupScrollEffects() {
        // Parallax effect for background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.pattern-overlay, .particle');
            
            parallaxElements.forEach((element, index) => {
                const speed = index % 2 === 0 ? 0.5 : 0.3;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Show/hide back to top button
            const backToTopBtn = document.getElementById('backToTop');
            if (backToTopBtn) {
                if (scrolled > 300) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.transform = 'scale(1)';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.transform = 'scale(0.8)';
                }
            }
        });
    }
}

// Enhanced Loader Functionality
class EnhancedLoader {
    constructor() {
        this.progress = 0;
        this.loader = document.getElementById('loader');
        this.landingPage = document.getElementById('landingPage');
        this.init();
    }

    init() {
        this.setupProgressSimulation();
        this.setupLoadingMessages();
        this.setupLoaderAnimations();
    }

    setupProgressSimulation() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const messages = [
            "Initializing systems...",
            "Loading assets...", 
            "Preparing interface...",
            "Finalizing setup...",
            "Ready to serve!"
        ];
        
        const interval = setInterval(() => {
            this.progress += Math.random() * 15;
            
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                this.completeLoading();
            }
            
            progressFill.style.width = `${this.progress}%`;
            progressText.textContent = `${messages[Math.min(Math.floor(this.progress / 20), 4)]} ${Math.round(this.progress)}%`;
            
        }, 200);
    }

    setupLoadingMessages() {
        const messages = document.querySelectorAll('.loading-message');
        let currentIndex = 0;
        
        setInterval(() => {
            messages.forEach(msg => msg.classList.remove('active'));
            messages[currentIndex].classList.add('active');
            currentIndex = (currentIndex + 1) % messages.length;
        }, 2000);
    }

    setupLoaderAnimations() {
        // Additional animation effects
        const loaderContent = document.querySelector('.loader-content');
        loaderContent.style.animation = 'fadeInUp 1s ease';
    }

    completeLoading() {
        // Final animations before transition
        const loaderContent = document.querySelector('.loader-content');
        loaderContent.style.animation = 'fadeOutUp 0.8s ease forwards';
        
        setTimeout(() => {
            this.loader.style.opacity = '0';
            this.loader.style.transition = 'opacity 0.8s ease';
            
            setTimeout(() => {
                this.loader.style.display = 'none';
                this.landingPage.classList.remove('hidden');
                this.landingPage.style.animation = 'fadeIn 1s ease';
                
                // Initialize landing page
                new LandingPage();
                
                // Add CSS for animations
                this.addAnimationStyles();
                
            }, 800);
        }, 500);
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeOutUp {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-30px); }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedLoader();
});

// Add global error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Export for potential future use
window.YaahmanApp = {
    LandingPage,
    EnhancedLoader
};