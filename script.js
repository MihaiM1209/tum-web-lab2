(function () {
  'use strict';

  const HEADER_SCROLL_THRESHOLD = 60;
  const BACK_TO_TOP_THRESHOLD = 400;
  const STICKY_CTA_THRESHOLD = 500;
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');
  const stickyCta = document.querySelector('.sticky-cta');
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
    if (window.scrollY > STICKY_CTA_THRESHOLD) {
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

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', function () {
    updateHeader();
    updateBackToTop();
    updateStickyCta();
    initReveal();
    initContactForm();
  });
})();
