/* ============================================================
   SIMR VIRK PORTFOLIO — script.js
   Handles: typewriter, nav scroll, canvas grid, scroll
   animations, skill bars, project filters, mobile menu
   ============================================================ */

/* ──────────────────────────────────────────────────────
   1. TYPEWRITER EFFECT
   Edit the phrases array to change what cycles in the hero.
   ────────────────────────────────────────────────────── */
const TYPEWRITER_PHRASES = [
  'robotic systems.',
  'embedded firmware.',
  'mechatronic designs.',
  'computer vision.',
  'precision mechanisms.',
  'engineering solutions.',
];

let tw_phraseIdx  = 0;
let tw_charIdx    = 0;
let tw_deleting   = false;
let tw_speed      = 80;

function runTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrase = TYPEWRITER_PHRASES[tw_phraseIdx];

  if (!tw_deleting) {
    // Typing forward
    el.textContent = phrase.slice(0, tw_charIdx + 1);
    tw_charIdx++;

    if (tw_charIdx === phrase.length) {
      tw_deleting = true;
      tw_speed = 2600; // pause before deleting
    } else {
      tw_speed = 80 + Math.random() * 30; // slight natural variance
    }
  } else {
    // Deleting
    el.textContent = phrase.slice(0, tw_charIdx - 1);
    tw_charIdx--;
    tw_speed = 38;

    if (tw_charIdx === 0) {
      tw_deleting   = false;
      tw_phraseIdx  = (tw_phraseIdx + 1) % TYPEWRITER_PHRASES.length;
      tw_speed      = 320;
    }
  }

  setTimeout(runTypewriter, tw_speed);
}


/* ──────────────────────────────────────────────────────
   2. NAVBAR — add glass background on scroll
   ────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function update() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ──────────────────────────────────────────────────────
   3. MOBILE NAV TOGGLE
   ────────────────────────────────────────────────────── */
function initMobileNav() {
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const navResume = document.querySelector('.nav-resume');

  if (!toggle || !navLinks) return;

  let open = false;

  toggle.addEventListener('click', () => {
    open = !open;

    if (open) {
      navLinks.style.cssText = `
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 68px; left: 0; right: 0;
        background: rgba(9,9,15,0.97);
        backdrop-filter: blur(20px);
        padding: 32px 24px 24px;
        gap: 24px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
        z-index: 998;
      `;
      if (navResume) navResume.style.display = 'inline-flex';
    } else {
      navLinks.style.cssText = 'display: none;';
      if (navResume) navResume.style.display = '';
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      open = false;
      navLinks.style.cssText = 'display: none;';
    });
  });
}


/* ──────────────────────────────────────────────────────
   4. BLUEPRINT CANVAS BACKGROUND
   Draws an engineering-grid (lines + dots) in the hero.
   ────────────────────────────────────────────────────── */
function initCanvas() {
  const canvas = document.getElementById('grid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SPACING    = 44;
  const LINE_COLOR = 'rgba(0, 229, 255, 0.55)';
  const DOT_COLOR  = 'rgba(0, 229, 255, 0.8)';

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Minor grid lines
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth   = 0.3;
    for (let x = 0; x <= canvas.width; x += SPACING) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += SPACING) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Major grid lines (every 4th)
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
    ctx.lineWidth   = 0.6;
    for (let x = 0; x <= canvas.width; x += SPACING * 4) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += SPACING * 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Intersection dots (every 4 grid cells)
    ctx.fillStyle = DOT_COLOR;
    for (let x = 0; x <= canvas.width; x += SPACING * 4) {
      for (let y = 0; y <= canvas.height; y += SPACING * 4) {
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Crosshair markers at corners & midpoints (decorative)
    const marks = [
      { x: SPACING * 8, y: SPACING * 6 },
      { x: canvas.width - SPACING * 8, y: SPACING * 6 },
    ];
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
    ctx.lineWidth   = 0.8;
    marks.forEach(({ x, y }) => {
      const s = 10;
      ctx.beginPath();
      ctx.moveTo(x - s, y); ctx.lineTo(x + s, y);
      ctx.moveTo(x, y - s); ctx.lineTo(x, y + s);
      ctx.stroke();
      // circle
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
}


/* ──────────────────────────────────────────────────────
   5. SCROLL-TRIGGERED ANIMATIONS
   Elements with class "fade-up" animate when they enter
   the viewport.
   ────────────────────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay based on sibling index
          const siblings = Array.from(entry.target.parentElement?.children || []);
          const index    = siblings.indexOf(entry.target);
          const delay    = Math.min(index * 0.08, 0.5);

          entry.target.style.transitionDelay = delay + 's';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}


/* ──────────────────────────────────────────────────────
   6. SKILL BAR ANIMATIONS
   Bars fill when the #skills section scrolls into view.
   ────────────────────────────────────────────────────── */
function initSkillBars() {
  const section = document.getElementById('skills');
  if (!section) return;

  const skillObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.querySelectorAll('.skill-fill').forEach((bar, i) => {
          bar.style.transitionDelay = (i * 0.06) + 's';
          bar.classList.add('animated');
        });
        skillObserver.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  skillObserver.observe(section);
}


/* ──────────────────────────────────────────────────────
   7. PROJECT FILTER BUTTONS
   Click a filter button to show/hide project cards by
   category. The cards animate in and out.
   ────────────────────────────────────────────────────── */
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.project-card');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;

        if (show) {
          card.style.display = 'flex';
          // Fade in
          requestAnimationFrame(() => {
            card.style.opacity          = '0';
            card.style.transform        = 'translateY(16px)';
            card.style.transition       = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.transitionDelay  = (i * 0.05) + 's';

            requestAnimationFrame(() => {
              card.style.opacity   = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.opacity   = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            if (filter !== 'all' && card.dataset.category !== filter) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}


/* ──────────────────────────────────────────────────────
   8. ACTIVE NAV LINK HIGHLIGHTING (scroll spy)
   Highlights the nav link matching the current section.
   ────────────────────────────────────────────────────── */
function initScrollSpy() {
  const sections  = document.querySelectorAll('section[id], footer[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.style.color = 'var(--accent)';
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => spy.observe(s));
}


/* ──────────────────────────────────────────────────────
   9. IMAGE LIGHTBOX (for project pages)
   Click any .gallery-item to open a full-screen lightbox.
   ────────────────────────────────────────────────────── */
function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.style.cssText = `
    display: none; position: fixed; inset: 0; z-index: 9999;
    background: rgba(9,9,15,0.95); backdrop-filter: blur(12px);
    align-items: center; justify-content: center; cursor: zoom-out;
    padding: 40px;
  `;
  const img = document.createElement('img');
  img.style.cssText = `
    max-width: 90vw; max-height: 85vh; object-fit: contain;
    border-radius: 8px; border: 1px solid rgba(0,229,255,0.2);
  `;
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (!src) return;
      img.src = src;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}


/* ──────────────────────────────────────────────────────
   INIT — Run everything after DOM is ready
   ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Small delay before typewriter so page loads first
  setTimeout(runTypewriter, 900);

  initNavbar();
  initMobileNav();
  initCanvas();
  initScrollAnimations();
  initSkillBars();
  initFilters();
  initScrollSpy();
  initLightbox();

  // Log a little easter egg for engineers who inspect the console
  console.log(
    '%c SIMR VIRK — Engineering Portfolio',
    'color: #00e5ff; font-family: monospace; font-size: 14px; font-weight: bold;'
  );
  console.log(
    '%c Built with HTML, CSS & vanilla JS.',
    'color: #8a8aaa; font-family: monospace; font-size: 11px;'
  );
});
