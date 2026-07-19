(function () {
  const nav = document.querySelector('nav[data-section="navbar"]');
  if (nav) {
    const toggle = nav.querySelector('.absolute.z-10 .primary-button:last-child');
    const overlay = nav.querySelector('.fixed.inset-0');
    const menuItems = overlay ? overlay.querySelectorAll('a[style*="translateY"]') : [];
    let isOpen = false;

    const closeMenu = () => {
      if (!overlay) return;
      isOpen = false;
      overlay.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
      menuItems.forEach((item, i) => {
        item.style.transform = 'translateY(100%)';
        item.style.transition = `transform 0.5s cubic-bezier(0.7, 0, 0.3, 1) ${0.4 - i * 0.05}s`;
      });
    };

    const openMenu = () => {
      if (!overlay) return;
      isOpen = true;
      overlay.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
      menuItems.forEach((item, i) => {
        item.style.transform = 'translateY(0%)';
        item.style.transition = `transform 0.5s cubic-bezier(0.7, 0, 0.3, 1) ${0.1 + i * 0.05}s`;
      });
    };

    if (toggle && overlay) {
      toggle.setAttribute('role', 'button');
      toggle.setAttribute('tabindex', '0');
      toggle.setAttribute('aria-label', 'Toggle menu');
      toggle.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          isOpen ? closeMenu() : openMenu();
        }
      });
      overlay.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
      closeMenu();
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const year = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = `© ${year} Connexus Corporation`;
  });

  const footerTitle = document.querySelector('[data-footer-title]');
  if (footerTitle) {
    const updateFooterTitle = () => {
      footerTitle.style.whiteSpace = window.innerWidth < 768 ? 'normal' : 'nowrap';
    };
    updateFooterTitle();
    window.addEventListener('resize', updateFooterTitle);
  }

  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const btn = item.querySelector('[data-faq-question]');
    const answer = item.querySelector('[data-faq-answer]');
    if (!btn || !answer) return;

    answer.style.maxHeight = '0px';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease';

    btn.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      item.setAttribute('data-open', String(!isOpen));
      answer.style.maxHeight = isOpen ? '0px' : `${answer.scrollHeight + 12}px`;
    });
  });
})();
