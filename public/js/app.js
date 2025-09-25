// Global variables
let currentSection = 'home';
let isLoading = true;
let galleryImages = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Show loader
        showLoader();
        
        // Initialize gallery images
        initializeGallery();
        
        // Initialize event listeners
        setupEventListeners();
        
        // Preload critical assets
        await preloadAssets();
        
        // Hide loader and show landing page
        hideLoader();
        showLandingPage();
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
        hideLoader();
        showLandingPage();
    }
}

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('hidden');
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
}

function showLandingPage() {
    const landingPage = document.getElementById('landingPage');
    if (landingPage) {
        landingPage.classList.remove('hidden');
    }
}

function showMainSite() {
    const landingPage = document.getElementById('landingPage');
    const mainSite = document.getElementById('mainSite');
    
    if (landingPage && mainSite) {
        // Hide landing page with animation
        landingPage.style.transform = 'scale(0.8)';
        landingPage.style.opacity = '0';
        
        setTimeout(() => {
            landingPage.classList.add('hidden');
            mainSite.classList.remove('hidden');
            
            // Show main site with animation
            setTimeout(() => {
                mainSite.classList.add('show');
            }, 100);
        }, 600);
    }
}

async function preloadAssets() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const assets = [
        // Preload menu PDF
        '/assets/menu.pdf',
        // Preload gallery images
        'https://images.pexels.com/photos/1267322/pexels-photo-1267322.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1267350/pexels-photo-1267350.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1283566/pexels-photo-1283566.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1304541/pexels-photo-1304541.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1304548/pexels-photo-1304548.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];
    
    let loadedCount = 0;
    const totalAssets = assets.length;
    
    const updateProgress = () => {
        const percentage = Math.round((loadedCount / totalAssets) * 100);
        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }
        if (progressText) {
            progressText.textContent = `Loading assets... ${percentage}%`;
        }
    };
    
    const loadPromises = assets.map(async (src) => {
        try {
            if (src.endsWith('.pdf')) {
                // For PDF, just make a HEAD request to check if it exists
                await fetch(src, { method: 'HEAD' });
            } else {
                // For images, preload them
                await new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if image fails
                    img.src = src;
                });
            }
        } catch (error) {
            console.warn(`Failed to preload asset: ${src}`);
        } finally {
            loadedCount++;
            updateProgress();
        }
    });
    
    // Wait for all assets with a minimum loading time
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));
    await Promise.all([Promise.all(loadPromises), minLoadTime]);
    
    // Final progress update
    if (progressFill) progressFill.style.width = '100%';
    if (progressText) progressText.textContent = 'Loading complete!';
    
    // Small delay before hiding loader
    await new Promise(resolve => setTimeout(resolve, 500));
}

function setupEventListeners() {
    // Logo click event
    const animatedLogo = document.getElementById('animatedLogo');
    if (animatedLogo) {
        animatedLogo.addEventListener('click', showMainSite);
    }
    
    // Navigation events
    setupNavigation();
    
    // Form events
    setupForms();
    
    // Modal events
    setupModals();
    
    // Smooth scrolling for navigation links
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            scrollToSection(targetId);
        }
    });
    
    // Close modals on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePDFModal();
            closeLightbox();
        }
    });
}

function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('show');
        });
    }
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navToggle) {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.main-nav')?.offsetHeight || 70;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function setupForms() {
    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    try {
        // Show loading state
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Prepare form data
        const formData = new FormData(e.target);
        
        // Send request
        const response = await axios.post('/api/book', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.data.ok) {
            showToast(response.data.message, 'success');
            e.target.reset();
        } else {
            throw new Error(response.data.message);
        }
        
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to send booking request. Please try again.';
        showToast(message, 'error');
        console.error('Booking error:', error);
        
    } finally {
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('contactSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    try {
        // Show loading state
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Prepare form data
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value
        };
        
        // Send request
        const response = await axios.post('/api/contact', formData);
        
        if (response.data.ok) {
            showToast(response.data.message, 'success');
            e.target.reset();
        } else {
            throw new Error(response.data.message);
        }
        
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to send message. Please try again.';
        showToast(message, 'error');
        console.error('Contact error:', error);
        
    } finally {
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
    }
}

function setupModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        const pdfModal = document.getElementById('pdfModal');
        const lightbox = document.getElementById('lightbox');
        
        if (e.target === pdfModal) {
            closePDFModal();
        }
        
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        
        // Update toast appearance based on type
        toast.className = `toast ${type}`;
        
        // Show toast
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Hide toast after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }, 4000);
    }
}

function initializeGallery() {
    galleryImages = [
        {
            src: 'https://images.pexels.com/photos/1267322/pexels-photo-1267322.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Wedding Reception',
            description: 'Elegant cocktails for a beautiful wedding celebration'
        },
        {
            src: 'https://images.pexels.com/photos/1267350/pexels-photo-1267350.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Corporate Event',
            description: 'Professional bartending services for corporate functions'
        },
        {
            src: 'https://images.pexels.com/photos/1283566/pexels-photo-1283566.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Birthday Celebration',
            description: 'Fun and festive drinks for birthday parties'
        },
        {
            src: 'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Signature Cocktails',
            description: 'Our expertly crafted signature drink collection'
        },
        {
            src: 'https://images.pexels.com/photos/1304541/pexels-photo-1304541.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Professional Setup',
            description: 'Complete bar setup with professional equipment'
        },
        {
            src: 'https://images.pexels.com/photos/1304548/pexels-photo-1304548.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Outdoor Event',
            description: 'Mobile bar services for outdoor celebrations'
        }
    ];
}

// Gallery and Lightbox functions
let currentLightboxIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightbox && lightboxImage && galleryImages[index]) {
        currentLightboxIndex = index;
        const image = galleryImages[index];
        
        lightboxImage.src = image.src;
        lightboxImage.alt = image.title;
        lightboxCaption.textContent = image.title;
        
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Setup navigation
        setupLightboxNavigation();
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function setupLightboxNavigation() {
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    
    if (prevBtn && nextBtn) {
        prevBtn.onclick = () => {
            currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        };
        
        nextBtn.onclick = () => {
            currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
            updateLightboxImage();
        };
    }
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const image = galleryImages[currentLightboxIndex];
    
    if (lightboxImage && lightboxCaption && image) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.title;
        lightboxCaption.textContent = image.title;
    }
}

// PDF Modal functions
function openPDFModal() {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
        
        document.body.style.overflow = 'hidden';
        
        // Load PDF
        loadPDF();
    }
}

function closePDFModal() {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
        
        document.body.style.overflow = 'auto';
    }
}

async function loadPDF() {
    const pdfViewer = document.getElementById('pdfViewer');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!pdfViewer) return;
    
    try {
        // Show loading state
        pdfViewer.innerHTML = `
            <div class="pdf-loading">
                <div class="spinner"></div>
                <p>Loading menu...</p>
            </div>
        `;
        
        // For demo purposes, we'll create a mock PDF content
        // In a real implementation, you would load the actual PDF using PDF.js
        
        setTimeout(() => {
            pdfViewer.innerHTML = `
                <div style="background: white; padding: 2rem; border-radius: 8px; text-align: center; min-height: 500px; display: flex; flex-direction: column; justify-content: center;">
                    <h2 style="color: #FF6B35; margin-bottom: 2rem;">Yaahman Foods Menu</h2>
                    <div style="text-align: left; max-width: 600px; margin: 0 auto;">
                        <h3 style="color: #4ECDC4; border-bottom: 2px solid #4ECDC4; padding-bottom: 0.5rem;">Signature Cocktails</h3>
                        <ul style="line-height: 2; margin-bottom: 2rem;">
                            <li><strong>Yaahman Special</strong> - Our house blend with tropical fruits</li>
                            <li><strong>Caribbean Sunset</strong> - Rum, pineapple, and mango</li>
                            <li><strong>Lagos Nights</strong> - Vodka-based with citrus twist</li>
                            <li><strong>Tropical Paradise</strong> - Coconut rum and passion fruit</li>
                        </ul>
                        
                        <h3 style="color: #4ECDC4; border-bottom: 2px solid #4ECDC4; padding-bottom: 0.5rem;">Premium Mocktails</h3>
                        <ul style="line-height: 2; margin-bottom: 2rem;">
                            <li><strong>Virgin Mojito</strong> - Fresh mint and lime</li>
                            <li><strong>Fruit Punch Paradise</strong> - Mixed tropical fruits</li>
                            <li><strong>Cucumber Cooler</strong> - Refreshing cucumber and herbs</li>
                            <li><strong>Berry Blast</strong> - Mixed berries and sparkling water</li>
                        </ul>
                        
                        <h3 style="color: #4ECDC4; border-bottom: 2px solid #4ECDC4; padding-bottom: 0.5rem;">Services Available</h3>
                        <ul style="line-height: 2;">
                            <li>Professional bartender services</li>
                            <li>Complete bar setup and breakdown</li>
                            <li>Custom menu development</li>
                            <li>Mobile bar rental</li>
                            <li>Event planning consultation</li>
                        </ul>
                    </div>
                    <p style="margin-top: 2rem; color: #666; font-style: italic;">Contact us for custom packages and pricing</p>
                </div>
            `;
            
            // Setup download button
            if (downloadBtn) {
                downloadBtn.onclick = () => {
                    // In a real implementation, this would download the actual PDF
                    showToast('Download feature coming soon!', 'info');
                };
            }
        }, 1500);
        
    } catch (error) {
        console.error('Failed to load PDF:', error);
        pdfViewer.innerHTML = `
            <div class="pdf-loading">
                <p style="color: red;">Failed to load menu. Please try again later.</p>
            </div>
        `;
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: debounce scroll events
window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openPDFModal = openPDFModal;
window.closePDFModal = closePDFModal;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;