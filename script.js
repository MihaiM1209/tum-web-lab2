(function () {
  'use strict';

  const HEADER_SCROLL_THRESHOLD = 60;
  const BACK_TO_TOP_THRESHOLD = 400;
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');
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
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', function () {
    updateHeader();
    updateBackToTop();
    initReveal();
  });
})();
