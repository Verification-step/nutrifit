// FAQ accordion — one open at a time
(function() {
  const items = document.querySelectorAll('.acc-item');
  items.forEach(item => {
    const trigger = item.querySelector('.acc-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Sidebar active state on scroll
  const sidebarLinks = document.querySelectorAll('.faq-sidebar a[href^="#"]');
  const categories = document.querySelectorAll('.faq-category');
  if (sidebarLinks.length && categories.length) {
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }
})();
