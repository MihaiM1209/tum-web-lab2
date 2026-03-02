(function () {
  'use strict';

  const HEADER_SCROLL_THRESHOLD = 60;
  const BACK_TO_TOP_THRESHOLD = 400;
  const STICKY_CTA_THRESHOLD = 500;
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');
  const stickyCta = document.querySelector('.sticky-cta');
  const footer = document.querySelector('.site-footer');
  const sections = document.querySelectorAll('.section-reveal');

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > HEADER_SCROLL_THRESHOLD) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > BACK_TO_TOP_THRESHOLD) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  function updateStickyCta() {
    if (!stickyCta) return;
    const beyondThreshold = window.scrollY > STICKY_CTA_THRESHOLD;
    let overlappingFooter = false;

    if (footer) {
      const footerTop = footer.offsetTop;
      const viewportBottom = window.scrollY + window.innerHeight;
      overlappingFooter = viewportBottom >= footerTop - 40;
    }

    if (beyondThreshold && !overlappingFooter) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }

  function initReveal() {
    if (REDUCED_MOTION || !sections.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function onScroll() {
    updateHeader();
    updateBackToTop();
    updateStickyCta();
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit');
    const messageEl = document.getElementById('form-message');
    if (!form || !submitBtn || !messageEl) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btnText = submitBtn.querySelector('.btn-text');
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      if (btnText) btnText.textContent = 'Sending…';
      messageEl.hidden = true;
      messageEl.className = 'form-message';
      messageEl.textContent = '';

      setTimeout(function () {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        messageEl.textContent = 'Thanks! We\'ll get back to you soon.';
        messageEl.className = 'form-message success';
        messageEl.hidden = false;
        form.reset();
      }, 1200);
    });
  }

  function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setTimeout(function () {
      contactSection.classList.add('contact-highlight');
      setTimeout(function () {
        contactSection.classList.remove('contact-highlight');
      }, 1500);

      const firstField = document.querySelector('#contact-form input[name=\"name\"]');
      if (firstField) {
        firstField.focus();
      }
    }, 800);
  }

  function initNavDropdown() {
    const dropdown = document.querySelector('.nav-dropdown');
    const trigger = document.querySelector('.nav-dropdown-trigger');
    if (!dropdown || !trigger) return;

    trigger.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
        trigger.setAttribute('aria-expanded', dropdown.classList.contains('open'));
      }
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    dropdown.querySelectorAll('.nav-dropdown-menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle-btn');
    const overlay = document.getElementById('mobile-menu-overlay');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !overlay || !menu) return;

    function openMenu() {
      document.body.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      menu.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      menu.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('aria-hidden', 'true');
    }

    toggle.addEventListener('click', function () {
      if (document.body.classList.contains('menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  function initMascot() {
    const mascot = document.querySelector('.mascot');
    if (!mascot) return;

    mascot.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToContact();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', function () {
    updateHeader();
    updateBackToTop();
    updateStickyCta();
    initReveal();
    initContactForm();
    initNavDropdown();
    initMobileMenu();
    initMascot();
  });
})();
