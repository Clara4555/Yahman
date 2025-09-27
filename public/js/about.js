// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initScrollEffects();
  initThemeToggle();
  initBackToTop();
  initAnimations();
  initStatsCounter();
  loadTestimonials();       // now uses hard-coded data
  initScrollAnimations();
});

// ------------------- Navigation -------------------
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navbar = document.getElementById('navbar');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ------------------- Scroll Effects -------------------
function initScrollEffects() {
  const animatedElements = document.querySelectorAll(
    '.team-member, .value-card, .timeline-item, .certification-card, .testimonial-card'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
}

// ------------------- Theme Toggle -------------------
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function (event) {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      createRippleEffect(event, this);
    });
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('.theme-icon');
    if (icon) icon.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

// ------------------- Back to Top -------------------
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');

  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  backToTop.addEventListener('click', function (event) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    createRippleEffect(event, this);
  });
}

// ------------------- Initial Animations -------------------
function initAnimations() {
  document.querySelectorAll(
    '.team-member, .value-card, .timeline-item, .certification-card'
  ).forEach(el => el.classList.add('animate-on-scroll'));
}

// ------------------- Stats Counter -------------------
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target, 0, parseInt(entry.target.dataset.count), 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));

  function animateCount(element, start, end, duration) {
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
}

// ------------------- Testimonials (Hard-coded) -------------------
function loadTestimonials() {
  const container = document.getElementById('testimonialsContainer');
  if (!container) return;

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Yaahman Refreshment made our wedding absolutely perfect! The signature cocktails were a huge hit with our guests.',
      event: 'Wedding Celebration'
    },
    {
      name: 'Michael Thompson',
      text: 'Professional service and incredible cocktails. Our corporate event was elevated to a whole new level.',
      event: 'Corporate Event'
    },
    {
      name: 'Emily Rodriguez',
      text: 'The team created amazing mocktails for our baby shower. Everyone was impressed with the creativity!',
      event: 'Baby Shower'
    }
  ];

  container.innerHTML = '';

  testimonials.forEach((t, index) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="stars">★★★★★</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.name.split(' ').map(w => w[0]).join('')}</div>
        <div class="author-info">
          <div class="author-name">${t.name}</div>
          <div class="author-event">${t.event}</div>
        </div>
      </div>
    `;
    container.appendChild(card);
    setTimeout(() => card.classList.add('animated'), index * 200);
  });
}

// ------------------- Scroll Animations -------------------
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.mission-point, .visual-card, .value-card, .timeline-item, .certification-card'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ------------------- Ripple Effect -------------------
function createRippleEffect(event, button) {
  const ripple = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  ripple.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  ripple.classList.add('btn-ripple');

  button.querySelectorAll('.btn-ripple').forEach(r => r.remove());
  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// ------------------- Smooth Scrolling -------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      const offset = document.querySelector('.navbar').offsetHeight;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// ------------------- Page Loaded -------------------
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
