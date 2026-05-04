/**
 * SCRIPT.JS - Main JavaScript File
 * Portfolio by Rosshed Joseph L. Bibon
 * Features: Smooth scrolling, active nav link tracking, form validation, scroll-to-top button
 */

document.addEventListener('DOMContentLoaded', function () {
  initSectionAnimations();
  initNavigation();
  initFormValidation();
  initSmoothScroll();
  initScrollToTopButton();
  updateActiveNavLink();
});

/**
 * Intersection Observer for Section Animations
 */
function initSectionAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

/**
 * Scroll to Top Button
 */
function initScrollToTopButton() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (!scrollToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Navigation Link Management & Active State
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Smooth scroll to section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active link with animation
        updateActiveNavLink();
      }
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
}

/**
 * Update Active Navigation Link Based on Scroll Position
 */
function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active-link');
      // Trigger animation
      link.style.animation = 'none';
      setTimeout(() => {
        link.style.animation = '';
      }, 10);
    }
  });
}

/**
 * Form Validation
 */
function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    validateForm();
  });
}

function validateForm() {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  let isValid = true;

  // Reset previous errors
  document.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('error');
  });

  // Validate First Name
  if (!firstName.value.trim()) {
    showFieldError(firstName, 'First name is required');
    isValid = false;
  }

  // Validate Last Name
  if (!lastName.value.trim()) {
    showFieldError(lastName, 'Last name is required');
    isValid = false;
  }

  // Validate Email
  if (!email.value.trim()) {
    showFieldError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showFieldError(email, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate Subject
  if (!subject.value.trim()) {
    showFieldError(subject, 'Subject is required');
    isValid = false;
  }

  // Validate Message
  if (!message.value.trim()) {
    showFieldError(message, 'Message is required');
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showFieldError(message, 'Message must be at least 10 characters long');
    isValid = false;
  }

  if (isValid) {
    submitForm();
  }
}

function showFieldError(input, message) {
  const formGroup = input.closest('.form-group');
  formGroup.classList.add('error');
  
  input.style.borderColor = '#e74c3c';
  
  // Show error message
  let errorMsg = formGroup.querySelector('.error-message');
  if (!errorMsg) {
    errorMsg = document.createElement('span');
    errorMsg.className = 'error-message';
    formGroup.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
  errorMsg.style.display = 'block';
  errorMsg.style.color = '#e74c3c';
  errorMsg.style.fontSize = '0.8rem';
  errorMsg.style.marginTop = '4px';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function submitForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = '⏳ Sending...';

  // Simulate form submission (replace with actual backend call)
  setTimeout(() => {
    // Reset form
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;

    // Show success message
    alert('✅ Thank you! Your message has been sent successfully.');
    
    // Clear any error styles
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
      const inputs = group.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.style.borderColor = '';
      });
    });
  }, 1000);
}

/**
 * Smooth Scroll Behavior
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Add error message styles
const style = document.createElement('style');
style.textContent = `
  .form-group.error input,
  .form-group.error textarea {
    border-color: #e74c3c !important;
    background-color: #ffebee;
  }
`;
document.head.appendChild(style);
