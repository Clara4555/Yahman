// Landing page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeLandingPage();
});

async function initializeLandingPage() {
    try {
        // Show loader
        showLoader();
        
        // Preload critical assets
        await preloadAssets();
        
        // Hide loader and show landing page
        hideLoader();
        showLandingPage();
        
        // Initialize floating controls
        initializeFloatingControls();
        
    } catch (error) {
        console.error('Failed to initialize landing page:', error);
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

async function preloadAssets() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const assets = [
        // Preload images for landing page
        'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600'
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
            // Preload images
            await new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // Continue even if image fails
                img.src = src;
            });
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

function initializeFloatingControls() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Back to top functionality
    const backToTop = document.getElementById('backToTop');
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Initially hide back to top button
    backToTop.style.display = 'none';
}

// Logo animation
const animatedLogo = document.getElementById('animatedLogo');
if (animatedLogo) {
    animatedLogo.addEventListener('click', function() {
        const logoWrapper = this.querySelector('.logo-wrapper');
        logoWrapper.style.transform = 'rotateY(180deg) scale(1.1)';
        
        setTimeout(() => {
            logoWrapper.style.transform = 'rotateY(0deg) scale(1)';
        }, 600);
    });
}

// Coming soon button behavior
const comingSoonBtn = document.querySelector('.coming-soon');
if (comingSoonBtn) {
    comingSoonBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: var(--text-white);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-medium);
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        toast.textContent = 'Yaahman Foods - Coming Soon!';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    });
}