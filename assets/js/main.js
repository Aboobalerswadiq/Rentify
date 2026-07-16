/* ==========================================================================
   RENTIFY — Main JavaScript
   Vanilla JS only. No frameworks, no build step.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky Navbar Transition ---------- */
  var navbar = document.querySelector('.navbar-rentify');
  var scrollThreshold = 24;

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ---------- Mobile Nav Toggle ---------- */
  var navToggle = document.querySelector('.navbar-toggle');
  var navLinks = document.querySelector('.navbar-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      var icon = navToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        var icon = navToggle.querySelector('i');
        if (icon) icon.className = 'bi bi-list';
      });
    });
  }

  /* ---------- Scroll Reveal Animations ---------- */
  var animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window && animatedEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay');
          if (delay) {
            entry.target.style.transitionDelay = delay + 'ms';
          }
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Back to Top Button ---------- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Support Contact Form (front-end only) ---------- */
  var supportForm = document.getElementById('support-form');
  if (supportForm) {
    supportForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var successBox = document.getElementById('support-form-success');
      supportForm.reset();
      supportForm.classList.add('d-none');
      if (successBox) {
        successBox.classList.remove('d-none');
      }
    });
  }

  /* ---------- Current Year in Footer ---------- */
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

});
