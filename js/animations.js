/**
 * animations.js — Scroll Animations & Interactive Effects
 * Portfolio of Kartikey Singh Suryavanshi
 *
 * WHAT THIS FILE HANDLES:
 *  1. Scroll-Reveal — IntersectionObserver adds .visible to
 *     elements with .reveal-up / .reveal-left / .reveal-right
 *  2. Spotlight Cards — Radial glow follows mouse on .spotlight-card
 *  3. Magnetic Buttons — .magnetic-btn subtly follows the cursor
 *
 * DEPENDS ON:
 *  - css/animations.css for the actual animation keyframes/classes
 *  - css/style.css for the .spotlight-card::before pseudo-element
 */

/* ─── Wait for DOM to be fully loaded ─── */
document.addEventListener('DOMContentLoaded', () => {


  /* ============================================================
     1. SCROLL-REVEAL (IntersectionObserver)
     ── Watches all .reveal-up / .reveal-left / .reveal-right
        elements. When they enter the viewport, .visible is added
        which triggers the CSS transition in animations.css.
     ============================================================ */

  const revealElements = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  // Trigger when at least 12% of the element is visible
  const revealObserverOptions = {
    threshold:  0.12,
    rootMargin: '0px 0px -60px 0px', // Slightly before entering viewport
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop watching once revealed (one-time animation)
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));


  /* ============================================================
     2. SPOTLIGHT CARDS
     ── When the mouse moves over a .spotlight-card, the
        CSS variables --x and --y update to match the cursor
        position relative to the card.
     ── style.css uses those variables to draw a radial glow via
        the ::before pseudo-element on .spotlight-card.
     ============================================================ */

  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      // Cursor position relative to the card's top-left corner
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // CSS variables control the ::before pseudo-element position
      card.style.setProperty('--x', x + 'px');
      card.style.setProperty('--y', y + 'px');
    });

    // Reset when the mouse leaves the card
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--x', '-100px');
      card.style.setProperty('--y', '-100px');
    });
  });


  /* ============================================================
     3. MAGNETIC BUTTONS
     ── .magnetic-btn elements move slightly toward the cursor
        to give a satisfying "pull" feel.
     ── Maximum movement is capped at magnetStrength px.
     ── Movement resets smoothly on mouse leave.
     ============================================================ */

  const magneticButtons = document.querySelectorAll('.magnetic-btn');

  const magnetStrength = 12; // Max px to move in any direction

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect    = btn.getBoundingClientRect();
      // Center of the button
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      // Distance from center (normalized -0.5 → 0.5)
      const deltaX  = (e.clientX - centerX) / rect.width;
      const deltaY  = (e.clientY - centerY) / rect.height;
      // Apply magnetic translation
      btn.style.transform = `translate(${deltaX * magnetStrength * 2}px, ${deltaY * magnetStrength * 2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Smoothly return to original position
      btn.style.transform = '';
    });
  });


}); /* end DOMContentLoaded */
