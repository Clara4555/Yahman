// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const tabBtns = document.querySelectorAll('.tab-btn');
const categoryContents = document.querySelectorAll('.category-content');
const pdfModal = document.getElementById('pdfModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const viewFullMenuBtn = document.getElementById('viewFullMenuBtn');
const downloadMenuBtn = document.getElementById('downloadMenuBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const scrollToTopBtn = document.getElementById('backToTop'); // Fixed ID

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Category Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        categoryContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        
        // Show corresponding content
        const categoryId = btn.getAttribute('data-category');
        document.getElementById(categoryId).classList.add('active');
    });
});

// PDF Modal Functions
function openPdfModal() {
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Load actual PDF using iframe
    setTimeout(() => {
        const pdfViewer = document.getElementById('pdfViewer');
        pdfViewer.innerHTML = `
            <iframe src="./assets/Yaahman Ref Menu.pdf" width="100%" height="100%" style="border: none;">
                Your browser does not support PDFs. <a href="./assets/Yaahman Ref Menu.pdf">Download the PDF</a>.
            </iframe>
        `;
    }, 500);
}

function closePdfModal() {
    pdfModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners for PDF Modal
viewFullMenuBtn.addEventListener('click', openPdfModal);
downloadMenuBtn.addEventListener('click', openPdfModal);
modalOverlay.addEventListener('click', closePdfModal);
modalCloseBtn.addEventListener('click', closePdfModal);

// Download PDF Functionality
downloadPdfBtn.addEventListener('click', () => {
    // Create a temporary link to download the PDF
    const link = document.createElement('a');
    link.href = './assets/Yaahman Ref Menu.pdf';
    link.download = 'Yaahman-Refreshment-Menu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


// Scroll to Top - FIXED
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/Hide Scroll to Top Button - FIXED
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.style.display = 'none';
        scrollToTopBtn.classList.remove('show');
    }
});

// Ripple Effect for Floating Buttons
const floatingBtns = document.querySelectorAll('.floating-btn');
floatingBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to menu items on page load
    const menuItems = document.querySelectorAll('.menu-item, .spirit-category, .beverage-section');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});