/* ==========================================
   BALACHANDRAN SCHOOL — script.js
   ========================================== */

// ---- LOADER ----
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 900);
});

// ---- SMOOTH SCROLL ----
function smoothScroll(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Nav link smooth scroll
document.querySelectorAll('.nav-link, .mobile-link, .mobile-cta').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const section = href.substring(1);
      smoothScroll(section);
      // Close mobile menu
      closeMobileMenu();
    }
  });
});

// ---- STICKY HEADER ----
const header = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const curr = window.scrollY;
  if (curr > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScroll = curr;
});

// ---- ACTIVE NAV HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -50% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active',
          link.getAttribute('data-section') === entry.target.id
        );
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ---- SCROLL REVEAL ANIMATION ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- HAMBURGER / MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

function openMobileMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on outside click
document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

// ---- BACK TO TOP ----
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
});

// ---- ENQUIRY FORM VALIDATION & SUBMISSION ----
const form = document.getElementById('formData');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnLoader = document.getElementById('btn-loader');
const successMsg = document.getElementById('success-msg');

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('error');
  error.textContent = message;
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.remove('error');
  error.textContent = '';
}

function validateForm() {
  let valid = true;

  // Name validation
  const name = document.getElementById('name').value.trim();
  if (!name) {
    showError('name', 'name-error', 'Please enter your full name.');
    valid = false;
  } else if (name.length < 3) {
    showError('name', 'name-error', 'Name must be at least 3 characters.');
    valid = false;
  } else {
    clearError('name', 'name-error');
  }

  // Mobile validation
  const mobile = document.getElementById('mobile').value.trim();
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobile) {
    showError('mobile', 'mobile-error', 'Please enter your mobile number.');
    valid = false;
  } else if (!mobileRegex.test(mobile)) {
    showError('mobile', 'mobile-error', 'Enter a valid 10-digit Indian mobile number.');
    valid = false;
  } else {
    clearError('mobile', 'mobile-error');
  }

  // Class validation
  const classname = document.getElementById('classname').value;
  if (!classname) {
    showError('classname', 'class-error', 'Please select a class.');
    valid = false;
  } else {
    clearError('classname', 'class-error');
  }

  return valid;
}

// Real-time input clearing of errors
['name', 'mobile', 'classname'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const errorId = id === 'classname' ? 'class-error' : `${id}-error`;
    clearError(id, errorId);
  });
});

// Mobile number: only allow digits
document.getElementById('mobile').addEventListener('keypress', (e) => {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
});

// Form submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  // Show loading state
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';
  submitBtn.disabled = true;

  // Simulate async submission
  setTimeout(() => {
    form.style.display = 'none';
    successMsg.classList.add('show');

    // Scroll to success message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1400);
});

// ---- COUNTER ANIMATION for stats ----
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current + suffix;
  }, 25);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      const values = [2500, 120, 25, 98];
      const suffixes = ['+', '+', '', '%'];
      nums.forEach((el, i) => animateCounter(el, values[i], suffixes[i]));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);