/* ============================================================
   PORTFOLIO — script.js
   Features: Loader, Custom Cursor, Navbar scroll,
             Mobile menu, Typewriter, Scroll Reveal,
             Counter animation, Skill bars, Contact form
   ============================================================ */

'use strict';

/* ===================== 1. LOADER ===================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1600); // Loader visible for ~1.6s
});
document.body.style.overflow = 'hidden'; // Prevent scroll during load

/* ===================== 2. CUSTOM CURSOR ===================== */
const cursorDot     = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth trailing effect for outline
function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.12;
  outlineY += (mouseY - outlineY) * 0.12;
  cursorOutline.style.left = outlineX + 'px';
  cursorOutline.style.top  = outlineY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Scale cursor on hover over links / buttons
document.querySelectorAll('a, button, .project-card, .interest-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.8)');
  el.addEventListener('mouseleave', () => cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)');
});

/* ===================== 3. NAVBAR SCROLL ===================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===================== 4. MOBILE HAMBURGER MENU ===================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===================== 5. TYPEWRITER ===================== */
const typewriterEl = document.getElementById('typewriter');

// ==============================
// TYPEWRITER ROLES — Add your own roles here
// ==============================
const roles = [
  'elegant solutions.',
  'web applications.',
  'data structures.',
  'clean C programs.',
  'scalable systems.',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const TYPING_SPEED  = 80;   // ms per character (typing)
const DELETING_SPEED= 45;   // ms per character (deleting)
const PAUSE_AFTER   = 1800; // pause before deleting (ms)

function type() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typewriterEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, PAUSE_AFTER);
      return;
    }
  } else {
    typewriterEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? DELETING_SPEED : TYPING_SPEED);
}
setTimeout(type, 2800); // start after loader

/* ===================== 6. INTERSECTION OBSERVER (Scroll Reveal) ===================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay based on position among siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const i = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${i * 0.1}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

/* ===================== 7. COUNTER ANIMATION ===================== */
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1500; // ms
  const steps    = 50;
  const increment= target / steps;
  let current    = 0;
  const interval = duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, interval);
}

/* ===================== 8. SKILL BARS ANIMATION ===================== */
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(el => barObserver.observe(el));

/* ===================== 9. ACTIVE NAV LINK (Scroll Spy) ===================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors= document.querySelectorAll('.nav-links a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => spyObserver.observe(s));

// Active link style (add to CSS if you want a persistent highlight)
const styleTag = document.createElement('style');
styleTag.textContent = `.nav-links a.active { color: var(--accent); }`;
document.head.appendChild(styleTag);

/* ===================== 10. SMOOTH FOOTER YEAR ===================== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===================== 11. CONTACT FORM ===================== */
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line"></i> Sending…';

  // Simulate sending delay (replace with real EmailJS / Formspree / backend call)
  // ==============================
  // TO SEND REAL EMAILS: integrate EmailJS (https://emailjs.com)
  // or Formspree (https://formspree.io)
  // See README comments below this block.
  // ==============================
  await new Promise(r => setTimeout(r, 1500));

  formNote.textContent = '✓ Message received! I\'ll get back to you soon.';
  contactForm.reset();
  btn.disabled = false;
  btn.innerHTML = '<i class="ri-send-plane-line"></i> Send Message';

  setTimeout(() => { formNote.textContent = ''; }, 5000);
});

/*
  ==============================
  HOW TO CONNECT A REAL FORM (EmailJS)
  1. Sign up at https://emailjs.com
  2. Create a Service, Template, and get your Public Key
  3. Replace the await/simulate block above with:

  import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/es/emailjs.js';

  emailjs.init('YOUR_PUBLIC_KEY'); // ← Replace

  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
    .then(() => { formNote.textContent = '✓ Sent!'; })
    .catch(() => { formNote.textContent = '✗ Something went wrong.'; });
  ==============================
*/

/* ===================== 12. CURSOR HIDE ON LEAVE ===================== */
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity    = '0';
  cursorOutline.style.opacity= '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity    = '1';
  cursorOutline.style.opacity= '1';
});
