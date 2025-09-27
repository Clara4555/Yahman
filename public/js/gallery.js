// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initThemeToggle();
    initBackToTop();
    initGallery();
    initFilters();
    initLightbox();
    initStatsCounter();
    initScrollAnimations();
    initCarousel();
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
    const animatedElements = document.querySelectorAll('.gallery-item, .featured-event-card, .testimonial-card');
    
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

// Gallery Initialization
function initGallery() {
    loadGalleryItems();
    initLoadMore();
}

// Load Gallery Items with Images
function loadGalleryItems() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;
    
    // Clear loading spinner
    galleryGrid.innerHTML = '';
    
    // Gallery data with image paths
    const galleryData = [
        {
            id: 1,
            title: "Elegant Wedding Reception",
            description: "Beautiful outdoor wedding with custom signature cocktails",
            category: "wedding",
            date: "March 2024",
            guests: "150",
            image: "./assets/YaahmanWebPicture/img-1.jpg"
        },
        {
            id: 2,
            title: "Corporate Awards Night",
            description: "Sophisticated corporate event with branded cocktails",
            category: "corporate",
            date: "February 2024",
            guests: "200",
            image: "./assets/YaahmanWebPicture/img-2.jpg"
        },
        {
            id: 3,
            title: "Tropical Birthday Party",
            description: "Vibrant island-themed celebration with exotic drinks",
            category: "private",
            date: "January 2024",
            guests: "80",
            image: "./assets/YaahmanWebPicture/img-5.jpg"
        },
        {
            id: 4,
            title: "Cocktail Masterclass",
            description: "Interactive cocktail making session for team building",
            category: "cocktail",
            date: "December 2023",
            guests: "25",
            image: "./assets/YaahmanWebPicture/img-17.jpg"
        },
        {
            id: 5,
            title: "Garden Wedding Ceremony",
            description: "Intimate garden wedding with floral-inspired cocktails",
            category: "wedding",
            date: "November 2023",
            guests: "120",
            image: "./assets/YaahmanWebPicture/img-9.jpg"
        },
        {
            id: 6,
            title: "Product Launch Party",
            description: "Exciting product launch with innovative drink presentations",
            category: "corporate",
            date: "October 2023",
            guests: "150",
            image: "./assets/YaahmanWebPicture/img-10.jpg"
        },
        {
            id: 7,
            title: "Anniversary Celebration",
            description: "Golden anniversary party with vintage cocktail menu",
            category: "private",
            date: "September 2023",
            guests: "60",
            image: "./assets/YaahmanWebPicture/img-11.jpg"
        },
        {
            id: 8,
            title: "Signature Cocktail Bar",
            description: "Custom cocktail bar setup for special event",
            category: "cocktail",
            date: "August 2023",
            guests: "100",
            image: "./assets/YaahmanWebPicture/img-12.jpg"
        },
        {
            id: 9,
            title: "Beach Wedding Bliss",
            description: "Sunset beach ceremony with tropical cocktails",
            category: "wedding",
            date: "July 2023",
            guests: "90",
            image: "./assets/YaahmanWebPicture/img-18.jpeg"
        },
        {
            id: 10,
            title: "Holiday Office Party",
            description: "Festive Christmas celebration with seasonal drinks",
            category: "corporate",
            date: "June 2023",
            guests: "180",
            image: "./assets/YaahmanWebPicture/img-20.jpg"
        },
        {
            id: 11,
            title: "Graduation Celebration",
            description: "Family graduation party with custom mocktails",
            category: "private",
            date: "May 2023",
            guests: "50",
            image: "./assets/YaahmanWebPicture/img-22.jpeg"
        },
        {
            id: 12,
            title: "Mixology Competition",
            description: "Bartender showdown with creative cocktails",
            category: "cocktail",
            date: "April 2023",
            guests: "75",
            image: "./assets/YaahmanWebPicture/img-23.jpg"
        }
    ];
    
    // Create gallery items
    galleryData.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index);
        galleryGrid.appendChild(galleryItem);
        
        // Add animation with delay
        setTimeout(() => {
            galleryItem.classList.add('animated');
        }, index * 100);
    });
}

// Create Gallery Item with Image
function createGalleryItem(item, index) {
    const itemElement = document.createElement('div');
    itemElement.className = `gallery-item ${item.category}`;
    itemElement.setAttribute('data-category', item.category);
    itemElement.setAttribute('data-index', index);
    
    itemElement.innerHTML = `
        <div class="gallery-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="image-overlay"></div>
        </div>
        <div class="gallery-content">
            <span class="gallery-category ${item.category}">${item.category}</span>
            <h3 class="gallery-title">${item.title}</h3>
            <p class="gallery-description">${item.description}</p>
            <div class="gallery-meta">
                <span class="gallery-date">${item.date}</span>
                <span class="gallery-guests">${item.guests} guests</span>
            </div>
        </div>
    `;
    
    // Add click event for lightbox
    itemElement.addEventListener('click', function() {
        openLightbox(item, index);
    });
    
    return itemElement;
}

// Filter Functionality
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('gallerySearch');
    
    // Filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            filterGalleryItems(filterValue);
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterGalleryItemsBySearch(searchTerm);
        });
    }
}

// Filter gallery items by category
function filterGalleryItems(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.add('animated');
            }, 100);
        } else {
            item.style.display = 'none';
            item.classList.remove('animated');
        }
    });
}

// Filter gallery items by search term
function filterGalleryItemsBySearch(searchTerm) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const title = item.querySelector('.gallery-title').textContent.toLowerCase();
        const description = item.querySelector('.gallery-description').textContent.toLowerCase();
        const category = item.getAttribute('data-category');
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.add('animated');
            }, 100);
        } else {
            item.style.display = 'none';
            item.classList.remove('animated');
        }
    });
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentItems = 12;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadAdditionalItems();
            currentItems += 4;
            
            // Hide button if we've loaded all items
            if (currentItems >= 20) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
}

// Load Additional Items
function loadAdditionalItems() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    const additionalData = [
        {
            id: 13,
            title: "Vintage Wedding Theme",
            description: "1920s inspired wedding with classic cocktails",
            category: "wedding",
            date: "March 2023",
            guests: "110",
            image: "./assets/YaahmanWebPicture/img-3.jpg"
        },
        {
            id: 14,
            title: "Summer Corporate Retreat",
            description: "Outdoor team building with refreshing drinks",
            category: "corporate",
            date: "February 2023",
            guests: "120",
            image: "./assets/YaahmanWebPicture/img-1.jpg"
        },
        {
            id: 15,
            title: "Engagement Party",
            description: "Romantic celebration with champagne cocktails",
            category: "private",
            date: "January 2023",
            guests: "70",
            image: "./assets/YaahmanWebPicture/img-5.jpg"
        },
        {
            id: 16,
            title: "Craft Cocktail Workshop",
            description: "Hands-on cocktail making experience",
            category: "cocktail",
            date: "December 2022",
            guests: "30",
            image: "./assets/YaahmanWebPicture/img-6.jpg"
        }
    ];
    
    additionalData.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, currentItems + index);
        galleryGrid.appendChild(galleryItem);
        
        // Add animation with delay
        setTimeout(() => {
            galleryItem.classList.add('animated');
        }, index * 100);
    });
}

// Lightbox Functionality
function initLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Close lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxModal);
    }
    
    // Navigate lightbox
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            navigateLightbox('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            navigateLightbox('next');
        });
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightboxModal();
        }
    });
    
    // Close on backdrop click
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                closeLightboxModal();
            }
        });
    }
}

// Open Lightbox
function openLightbox(item, index) {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.querySelector('.lightbox-image-container');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxDate = document.getElementById('lightboxDate');
    
    if (lightboxModal) {
        // Set lightbox content
        lightboxTitle.textContent = item.title;
        lightboxDescription.textContent = item.description;
        lightboxCategory.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
        lightboxDate.textContent = item.date;
        
        // Set image
        lightboxImage.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="lightbox-image-overlay"></div>
        `;
        
        // Store current item index
        lightboxModal.setAttribute('data-current-index', index);
        
        // Show lightbox
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close Lightbox
function closeLightboxModal() {
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Navigate Lightbox
function navigateLightbox(direction) {
    const lightboxModal = document.getElementById('lightboxModal');
    const currentIndex = parseInt(lightboxModal.getAttribute('data-current-index'));
    const galleryItems = document.querySelectorAll('.gallery-item');
    let newIndex;
    
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
    } else {
        newIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    // Get item data from the gallery item
    const newItemElement = galleryItems[newIndex];
    const category = newItemElement.getAttribute('data-category');
    const title = newItemElement.querySelector('.gallery-title').textContent;
    const description = newItemElement.querySelector('.gallery-description').textContent;
    const date = newItemElement.querySelector('.gallery-date').textContent;
    const image = newItemElement.querySelector('img').src;
    
    const newItem = {
        title: title,
        description: description,
        category: category,
        date: date,
        image: image
    };
    
    openLightbox(newItem, newIndex);
}

// Stats Counter Animation - FIXED
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
                const duration = 2000;
                animateCount(target, 0, countTo, duration);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe each stat number
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Counter animation function - FIXED
    function animateCount(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Carousel/Slider Functionality
function initCarousel() {
    const carousel = document.querySelector('.gallery-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Navigation functions
    function goToSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            dotsContainer.children[index].classList.remove('active');
        });
        
        slides[slideIndex].classList.add('active');
        dotsContainer.children[slideIndex].classList.add('active');
        currentSlide = slideIndex;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance slides
    setInterval(nextSlide, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.gallery-item, .featured-event-card, .testimonial-card');
    
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
    
    const existingRipples = button.querySelectorAll('.btn-ripple');
    existingRipples.forEach(ripple => ripple.remove());
    
    button.appendChild(ripple);
    
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