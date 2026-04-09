// =============================================
// STICKY HEADER
// =============================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// =============================================
// MOBILE MENU
// =============================================
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when clicking a nav link
mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!header.contains(e.target) && mainNav.classList.contains('open')) {
    mainNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// =============================================
// FAQ ACCORDION
// =============================================
const accordionItems = document.querySelectorAll('.accordion__item');

accordionItems.forEach(item => {
  const trigger = item.querySelector('.accordion__trigger');
  const panel = item.querySelector('.accordion__panel');

  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    accordionItems.forEach(other => {
      other.classList.remove('open');
      other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
      other.querySelector('.accordion__panel').classList.remove('open');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.classList.add('open');
    }
  });
});

// =============================================
// SMOOTH SCROLL (fallback for older browsers)
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(sec => observer.observe(sec));

// =============================================
// ENTRANCE ANIMATIONS (Intersection Observer)
// =============================================
const animateTargets = document.querySelectorAll(
  '.feature-card, .service-card, .why-card, .condition-item, .accordion__item, .enfoque__item, .doctor__content, .hero__content, .hero__visual'
);

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

animateTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.55s ease ${(i % 6) * 0.07}s, transform 0.55s ease ${(i % 6) * 0.07}s`;
  animObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});

// Inject .visible class trigger
const styleSheet = document.createElement('style');
styleSheet.textContent = `.visible { opacity: 1 !important; transform: none !important; } .nav-link.active { color: var(--blue-main); background: var(--blue-soft); }`;
document.head.appendChild(styleSheet);

// =============================================
// STICKY CTA VISIBILITY
// =============================================
const stickyCta = document.getElementById('stickyCta');
if (stickyCta) {
  window.addEventListener('scroll', () => {
    stickyCta.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}
