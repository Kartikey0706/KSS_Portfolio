/**
 * script.js — Main JavaScript
 * Portfolio of Kartikey Singh Suryavanshi
 *
 * WHAT THIS FILE HANDLES:
 *  1. Custom Cursor (dot + ring follow mouse)
 *  2. Scroll Progress Bar (fills as you scroll)
 *  3. Navbar — scrolled style + active section highlighting
 *  4. Mobile Hamburger Menu (open / close)
 *  5. Typed Text Effect (hero subtitle cycling words)
 *  6. Counter Animations (About section numbers)
 *  7. Contact Form (mailto action on submit)
 *
 * NOTE:
 *  - Scroll-reveal & spotlight effects → js/animations.js
 *  - Background orbs movement → js/particles.js
 */

/* ─── Wait for DOM to be fully loaded before running ─── */
document.addEventListener('DOMContentLoaded', () => {


  /* ============================================================
     1. CUSTOM CURSOR
     ── A small dot + a larger ring both follow the mouse.
     ── The ring lags slightly for a smooth trailing effect.
     ============================================================ */

  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  // Ring position (smoothed/lagged)
  let ringX = 0, ringY = 0;
  // Current mouse position
  let mouseX = 0, mouseY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    }
  });

  // Animate the ring with lerp (linear interpolation) for smoothness
  function animateRing() {
    // Ease toward mouse position (0.12 = smoothing factor)
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    if (cursorRing) {
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand ring on interactive elements
  const interactiveSelectors = 'a, button, .magnetic-btn, .tech-card, .project-card, .cert-card';
  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('expanded'));
  });

  // Add cursor ring expanded state via CSS class
  const style = document.createElement('style');
  style.textContent = `.cursor-ring.expanded { width: 48px; height: 48px; border-color: var(--primary); }`;
  document.head.appendChild(style);


  /* ============================================================
     2. SCROLL PROGRESS BAR
     ── Fills from 0% → 100% as the user scrolls the page.
     ============================================================ */

  const progressBar = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!progressBar) return;
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = Math.min(scrollPercent, 100) + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });


  /* ============================================================
     3. NAVBAR
     ── Adds .scrolled class when page scrolls (changes appearance)
     ── Highlights active nav link based on current section
     ============================================================ */

  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    if (!navbar) return;

    // Add / remove scrolled style
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight the active section's nav link
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop    = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // Run once on load


  /* ============================================================
     4. MOBILE HAMBURGER MENU
     ── Toggles the mobile nav drawer open/close.
     ── Closes when a nav link is clicked.
     ============================================================ */

  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll while menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when any nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside (on the backdrop)
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  /* ============================================================
     5. TYPED TEXT EFFECT
     ── Cycles through an array of words, typing and deleting
        each one with a realistic character-by-character speed.
     ── To change the words: edit the TYPED_WORDS array below.
     ============================================================ */

  //  ↓ EDIT THESE WORDS to change what cycles in the hero subtitle
  const TYPED_WORDS = [
    'responsive web apps',
    'React interfaces',
    'practical UIs',
    'clean, functional code',
    'real-world projects',
  ];

  const typedEl = document.getElementById('typedText');

  if (typedEl) {
    let wordIndex  = 0;
    let charIndex  = 0;
    let isDeleting = false;
    let isPaused   = false;

    function typeLoop() {
      if (isPaused) return;

      const currentWord = TYPED_WORDS[wordIndex];

      if (isDeleting) {
        // Remove one character
        charIndex--;
        typedEl.textContent = currentWord.slice(0, charIndex);
      } else {
        // Add one character
        charIndex++;
        typedEl.textContent = currentWord.slice(0, charIndex);
      }

      let delay = isDeleting ? 60 : 90; // Delete faster than type

      if (!isDeleting && charIndex === currentWord.length) {
        // Finished typing: pause before deleting
        delay      = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting: move to next word
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % TYPED_WORDS.length;
        delay      = 400;
      }

      setTimeout(typeLoop, delay);
    }

    // Small initial delay before starting
    setTimeout(typeLoop, 800);
  }


  /* ============================================================
     6. COUNTER ANIMATIONS
     ── Elements with [data-target] count up from 0 to the target
        when they scroll into view.
     ── Triggered once per element using IntersectionObserver.
     ============================================================ */

  const counters = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800; // ms
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a nice deceleration
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.floor(eased * target);

      el.textContent = value + (progress < 1 ? '' : (target >= 100 ? '+' : ''));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target); // Only animate once
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }


  /* ============================================================
      7. CONTACT FORM — Mailto Action
      ── Opens the visitor's email client with the form details prefilled.
      ── No message is reported as sent because there is no backend service.
     ============================================================ */

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const subject = encodeURIComponent(formData.get('subject'));
      const body = encodeURIComponent(
        `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`
      );

      window.location.href = `mailto:prjartikey09@gmail.com?subject=${subject}&body=${body}`;
      formSuccess.classList.add('show');
    });
  }


}); /* end DOMContentLoaded */
