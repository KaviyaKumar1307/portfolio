// ── TYPEWRITER effect ─────────────────────────────────────
const phrases = ['Full Stack Developer', 'Cloud Enthusiast'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    // Type one character
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      // Finished typing — pause then start deleting
      isDeleting = true;
      setTimeout(type, 1600);
      return;
    }
    setTimeout(type, 80);
  } else {
    // Delete one character from the end
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      // Finished deleting — move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 45);
  }
}

// Start typewriter after hero animation (0.9s delay)
setTimeout(type, 1000);

// ── NAVBAR scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(10,10,10,0.98)'
    : 'rgba(10,10,10,0.85)';
});

// ── HAMBURGER ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display   = open ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position  = 'absolute';
  navLinks.style.top       = '70px';
  navLinks.style.left      = '0';
  navLinks.style.width     = '100%';
  navLinks.style.background = 'rgba(10,10,10,0.98)';
  navLinks.style.padding   = '1rem 5%';
  navLinks.style.gap       = '1rem';
  navLinks.style.borderBottom = '1px solid #1a1a1a';
});

// ── ACTIVE NAV LINK ───────────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#ff2d78' : '';
  });
});

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .cert-pill, .achievement-banner, .intern-card, .about-grid, .contact-grid'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ── CONTACT FORM ──────────────────────────────────────────
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-primary');
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';

  try {
    const res = await fetch('https://portfolio-backend-8j1r.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:    form.querySelector('input[type="text"]').value,
        email:   form.querySelector('input[type="email"]').value,
        message: form.querySelector('textarea').value,
      })
    });
    if (res.ok) {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#1a1a1a';
      btn.style.color = '#ff2d78';
      form.reset();
    } else throw new Error();
  } catch {
    btn.textContent = 'Send Message';
    btn.style.opacity = '1';
    alert('Backend not connected yet — see Phase 3 to wire this up!');
  }
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.opacity = '1';
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
});

// ── FETCH PROJECTS from backend ───────────────────────────
async function loadProjects() {
  try {
    const res = await fetch('https://portfolio-backend-8j1r.onrender.com/api/projects');
    if (!res.ok) return;
    const projects = await res.json();
    console.log('Projects loaded from DB:', projects);
  } catch {
    console.log('Backend not connected yet — showing static projects.');
  }
}
loadProjects();
