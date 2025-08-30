// Theme toggle with localStorage
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Animate skill bars after they enter view
document.querySelectorAll('.skill .bar i').forEach((bar) => {
  const width = bar.style.width || '80%';
  bar.style.setProperty('--w', width);
  bar.style.width = '0';
});

// Simple typewriter for the subtitle
const typingEl = document.querySelector('.typing');
if (typingEl) {
  const full = typingEl.getAttribute('data-text') || '';
  let i = 0;
  function type() {
    typingEl.textContent = full.slice(0, i);
    i = i < full.length ? i + 1 : 0; // loop
    setTimeout(type, i === 0 ? 1200 : 70);
  }
  type();
}

// Smooth-scroll for nav links (improves default)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    }
  });
});
