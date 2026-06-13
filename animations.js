// Reveal on scroll
(function() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => io.observe(el));
})();

// Subtle parallax on hero leaves based on mouse
(function() {
  const decor = document.querySelector('.hero-decor');
  if (!decor) return;
  const leaves = decor.querySelectorAll('.leaf');
  let raf = null;
  document.addEventListener('mousemove', (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      leaves.forEach((leaf, i) => {
        const factor = (i + 1) * 0.5;
        leaf.style.translate = `${x * factor}px ${y * factor}px`;
      });
    });
  });
})();

// Card tilt
(function() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const base = parseFloat(card.dataset.tilt) || 0;
      card.style.transform = `perspective(900px) rotateY(${base + x * 6}deg) rotateX(${-y * 6}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      const base = parseFloat(card.dataset.tilt) || 0;
      card.style.transform = '';
    });
  });
})();
