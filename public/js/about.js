// Import Axios for HTTP requests
// Already included via CDN in HTML

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initThemeToggle();
    initBackToTop();
    initAnimations();
    initStatsCounter();
    loadTestimonials();
    initScrollAnimations();
});

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    // Add scroll-triggered animations
    const animatedElements = document.querySelectorAll('.team-member, .value-card, .timeline-item, .certification-card, .testimonial-card');
    
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add ripple effect
            createRippleEffect(this);
        });
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = theme === 'light' ? '🌙' : '☀️';
            }
        }
    }
}

// Back to Top Functionality
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add ripple effect
            createRippleEffect(this);
        });
    }
}

// Animation Initialization
function initAnimations() {
    // Add animation classes to elements for scroll-triggered animations
    const animateOnScroll = document.querySelectorAll('.team-member, .value-card, .timeline-item, .certification-card');
    
    animateOnScroll.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Create Intersection Observer for counter animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                animateCount(target, 0, countTo, duration);
                observer.unobserve(target); // Only animate once
            }
        });
    }, observerOptions);
    
    // Observe each stat number
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Counter animation function
    function animateCount(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Load Testimonials using Axios
function loadTestimonials() {
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    
    if (!testimonialsContainer) return;
    
    // Simulate API call with Axios
    axios.get('https://jsonplaceholder.typicode.com/comments?_limit=3')
        .then(function(response) {
            // Clear loading spinner
            testimonialsContainer.innerHTML = '';
            
            // Create testimonial cards from API data
            response.data.forEach((comment, index) => {
                const testimonialCard = createTestimonialCard(comment, index);
                testimonialsContainer.appendChild(testimonialCard);
                
                // Add animation with delay
                setTimeout(() => {
                    testimonialCard.classList.add('animated');
                }, index * 200);
            });
        })
        .catch(function(error) {
            // Fallback testimonials if API fails
            console.log('API error, using fallback testimonials:', error);
            loadFallbackTestimonials();
        });
}

// Create testimonial card from API data
function createTestimonialCard(comment, index) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    // Generate random star rating (4-5 stars)
    const stars = '★★★★★'.slice(0, Math.floor(Math.random() * 2) + 4);
    
    // Generate random event type
    const events = ['Wedding', 'Corporate Event', 'Private Party', 'Birthday Celebration'];
    const eventType = events[Math.floor(Math.random() * events.length)];
    
    // Generate random author initials
    const authorInitials = comment.name.split(' ').map(word => word[0]).join('').toUpperCase();
    
    card.innerHTML = `
        <div class="stars">${stars}</div>
        <p class="testimonial-text">"${comment.body}"</p>
        <div class="testimonial-author">
            <div class="author-avatar">${authorInitials}</div>
            <div class="author-info">
                <div class="author-name">${comment.name}</div>
                <div class="author-event">${eventType}</div>
            </div>
        </div>
    `;
    
    return card;
}

// Fallback testimonials if API fails
function loadFallbackTestimonials() {
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const fallbackTestimonials = [
        {
            name: "Sarah Johnson",
            body: "Yaahman Refreshment made our wedding absolutely perfect! The signature cocktails were a huge hit with our guests.",
            event: "Wedding Celebration"
        },
        {
            name: "Michael Thompson",
            body: "Professional service and incredible cocktails. Our corporate event was elevated to a whole new level.",
            event: "Corporate Event"
        },
        {
            name: "Emily Rodriguez",
            body: "The team created amazing mocktails for our baby shower. Everyone was impressed with the creativity!",
            event: "Baby Shower"
        }
    ];
    
    testimonialsContainer.innerHTML = '';
    
    fallbackTestimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        card.innerHTML = `
            <div class="stars">★★★★★</div>
            <p class="testimonial-text">"${testimonial.body}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.name.split(' ').map(word => word[0]).join('')}</div>
                <div class="author-info">
                    <div class="author-name">${testimonial.name}</div>
                    <div class="author-event">${testimonial.event}</div>
                </div>
            </div>
        `;
        
        testimonialsContainer.appendChild(card);
        
        // Add animation with delay
        setTimeout(() => {
            card.classList.add('animated');
        }, index * 200);
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Add scroll-triggered animations to various elements
    const elementsToAnimate = document.querySelectorAll('.mission-point, .visual-card, .value-card, .timeline-item, .certification-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Ripple Effect Utility Function
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    ripple.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    ripple.classList.add('btn-ripple');
    
    // Remove existing ripples
    const existingRipples = button.querySelectorAll('.btn-ripple');
    existingRipples.forEach(ripple => ripple.remove());
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - document.querySelector('.navbar').offsetHeight;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});