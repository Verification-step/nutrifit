// Main JS — Navbar scroll, waitlist form, footer
(function() {
  // Navbar scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 10) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Waitlist forms (any form with id waitlistForm* or .waitlist-form)
  document.querySelectorAll('.waitlist-form, form[id^="waitlistForm"], #waitlistForm, #waitlistFormFull, #waitlistFormHero').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.value) return;
      const email = emailInput.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.focus();
        return;
      }
      // Save to localStorage
      try {
        const list = JSON.parse(localStorage.getItem('nuttifit_waitlist') || '[]');
        if (!list.includes(email)) list.push(email);
        localStorage.setItem('nuttifit_waitlist', JSON.stringify(list));
      } catch (err) {}

      // Show success state
      const card = form.closest('.waitlist-card, .waitlist-wrap, .waitlist-form-wrap') || form.parentElement;
      const success = card ? card.querySelector('.success-state, .success-msg') : null;
      if (success) {
        form.style.display = 'none';
        const trust = card.querySelector('.trust-line');
        if (trust) trust.style.display = 'none';
        success.hidden = false;
        success.style.display = 'block';
      } else {
        alert('Thanks! You\'re on the waitlist: ' + email);
      }
      emailInput.value = '';
    });
  });
})();
