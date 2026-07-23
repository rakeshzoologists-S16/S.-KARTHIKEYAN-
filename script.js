/* ══════════════════════════════════════════
   S. KARTHIKEYAN RÉSUMÉ — script.js
   Handles: scroll animations, active nav, skill bars
══════════════════════════════════════════ */

'use strict';

// ─── Intersection Observer: animate sections on scroll ─────────────────────
const animateEls = document.querySelectorAll('[data-animate]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;
          setTimeout(() => el.classList.add('visible'), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animateEls.forEach((el) => observer.observe(el));
} else {
  // fallback: show all
  animateEls.forEach((el) => el.classList.add('visible'));
}

// ─── Active side-nav link ──────────────────────────────────────────────────
const navLinks  = document.querySelectorAll('.sidenav-link');
const sections  = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.dataset.section === entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
);

sections.forEach((s) => navObserver.observe(s));

// ─── Skill bars: animate width when visible ────────────────────────────────
const skillBars = document.querySelectorAll('.skill-bar, .edu-progress-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => {
  bar.style.animationPlayState = 'paused';
  barObserver.observe(bar);
});

// ─── Smooth hide/show header on scroll (only on large screens) ────────────
let lastScroll = 0;
const header   = document.querySelector('header');

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  lastScroll = current;
}, { passive: true });

// ─── Print: ensure everything is visible ──────────────────────────────────
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('[data-animate]').forEach((el) => {
    el.classList.add('visible');
  });
});
