/**
 * particles.js — Background Animation
 * Portfolio of Kartikey Singh Suryavanshi
 *
 * WHAT THIS FILE HANDLES:
 *  1. Interactive Mouse Parallax for gradient orbs
 *     (orbs subtly drift toward/away from cursor)
 *  2. Optional: dynamic canvas particle system (disabled by
 *     default — see ENABLE_CANVAS_PARTICLES below)
 *
 * The four gradient orbs (.orb-1 through .orb-4) are already
 * animated via CSS keyframes in animations.css. This script
 * adds a subtle extra parallax layer on mouse movement.
 *
 * TO DISABLE ALL ORBS:
 *   Set ENABLE_ORB_PARALLAX = false below.
 */

/* ─── Wait for DOM to be fully loaded ─── */
document.addEventListener('DOMContentLoaded', () => {


  /* ============================================================
     CONFIGURATION — Change these to tune the background effect
     ============================================================ */

  // Set to false to disable orb parallax on mouse move
  const ENABLE_ORB_PARALLAX = true;

  // How strongly each orb responds to mouse movement (px)
  // Lower = subtler. Negative = moves opposite to cursor.
  const ORB_PARALLAX_FACTORS = {
    orb1:  0.015,   // Teal orb (top-left)
    orb2: -0.010,   // Purple orb (middle-right) — moves opposite
    orb3:  0.008,   // Blue orb (bottom-center)
    orb4: -0.012,   // Pink orb (bottom-right) — moves opposite
  };

  // Smooth interpolation factor (0 = no movement, 1 = instant snap)
  const LERP_FACTOR = 0.06;


  /* ============================================================
     1. MOUSE PARALLAX FOR GRADIENT ORBS
     ── Each orb moves a small amount in the direction of (or
        opposite to) the mouse cursor for a depth illusion.
     ============================================================ */

  if (ENABLE_ORB_PARALLAX) {
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');
    const orb4 = document.querySelector('.orb-4');

    if (!orb1 || !orb2 || !orb3 || !orb4) {
      // Elements not found — nothing to do
      return;
    }

    // Current smoothed mouse position (relative to viewport center)
    let smoothX = 0;
    let smoothY = 0;
    // Raw mouse position
    let targetX = 0;
    let targetY = 0;

    // Track mouse position relative to viewport center
    document.addEventListener('mousemove', (e) => {
      // Normalize: center = (0,0), edges = (±0.5, ±0.5) approx
      targetX = e.clientX - window.innerWidth  / 2;
      targetY = e.clientY - window.innerHeight / 2;
    });

    // Animation loop — smoothly interpolates toward target
    function orbParallaxLoop() {
      // Lerp (linear interpolation) toward target position
      smoothX += (targetX - smoothX) * LERP_FACTOR;
      smoothY += (targetY - smoothY) * LERP_FACTOR;

      const f1 = ORB_PARALLAX_FACTORS.orb1;
      const f2 = ORB_PARALLAX_FACTORS.orb2;
      const f3 = ORB_PARALLAX_FACTORS.orb3;
      const f4 = ORB_PARALLAX_FACTORS.orb4;

      // Apply extra offset via CSS transform
      // The CSS keyframe drift animation still runs independently
      orb1.style.transform = `translate(${smoothX * f1 * 100}px, ${smoothY * f1 * 100}px)`;
      orb2.style.transform = `translate(${smoothX * f2 * 100}px, ${smoothY * f2 * 100}px)`;
      orb3.style.transform = `translate(${smoothX * f3 * 100}px, ${smoothY * f3 * 100}px)`;
      orb4.style.transform = `translate(${smoothX * f4 * 100}px, ${smoothY * f4 * 100}px)`;

      requestAnimationFrame(orbParallaxLoop);
    }

    orbParallaxLoop();
  }


  /* ============================================================
     2. OPTIONAL: CANVAS PARTICLE SYSTEM
     ── Disabled by default. Set ENABLE_CANVAS_PARTICLES = true
        to activate a lightweight floating dot field.
     ============================================================ */

  const ENABLE_CANVAS_PARTICLES = false; // ← Change to true to enable

  if (ENABLE_CANVAS_PARTICLES) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed; inset: 0; z-index: -1;
      pointer-events: none; opacity: 0.35;
    `;
    document.body.appendChild(canvas);

    const ctx  = canvas.getContext('2d');
    const dots = [];

    // Resize canvas to fill viewport
    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create dots
    const DOT_COUNT = 60;
    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        x:   Math.random() * canvas.width,
        y:   Math.random() * canvas.height,
        r:   Math.random() * 1.5 + 0.5,    // Radius 0.5–2px
        vx:  (Math.random() - 0.5) * 0.3,  // Velocity X
        vy:  (Math.random() - 0.5) * 0.3,  // Velocity Y
        // Random color from brand palette
        color: ['#5EEAD4', '#8B5CF6', '#60A5FA'][Math.floor(Math.random() * 3)],
      });
    }

    // Animation loop
    function animateDots() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(dot => {
        // Move
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Wrap around edges
        if (dot.x < 0)             dot.x = canvas.width;
        if (dot.x > canvas.width)  dot.x = 0;
        if (dot.y < 0)             dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      requestAnimationFrame(animateDots);
    }
    animateDots();
  }


}); /* end DOMContentLoaded */
