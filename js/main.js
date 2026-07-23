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
  /* ---------- Current Year in Footer ---------- */
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });


  /* ---------- How it works removed feature ---------- */
  // var canvas = document.getElementById('workflowCanvas');
  // if (!canvas) return;

  // var svg = canvas.querySelector('.workflow-svg');
  // if (!svg) return;

  // var lines = Array.prototype.slice.call(svg.querySelectorAll('.workflow-line'));
  // var dots = Array.prototype.slice.call(svg.querySelectorAll('.workflow-dot'));

  // lines.forEach(function (path) {
  //   var length = path.getTotalLength();
  //   path.style.strokeDasharray = length;
  //   path.style.strokeDashoffset = length;
  // });

  // function reveal() {
  //   lines.forEach(function (path, index) {
  //     path.style.transitionDelay = (index * 55) + 'ms';
  //     path.style.strokeDashoffset = '0';
  //   });
  //   window.setTimeout(function () {
  //     dots.forEach(function (dot, index) {
  //       dot.style.transitionDelay = (index * 45) + 'ms';
  //       dot.classList.add('is-visible');
  //     });
  //   }, 260);
  // }

  // if (!('IntersectionObserver' in window)) {
  //   reveal();
  //   return;
  // }

  // var workflowObserver = new IntersectionObserver(function (entries) {
  //   entries.forEach(function (entry) {
  //     if (entry.isIntersecting) {
  //       reveal();
  //       workflowObserver.unobserve(entry.target);
  //     }
  //   });
  // }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  // workflowObserver.observe(canvas);

  /* ---------- FAQ ---------- */
  var tabsNav = document.querySelector('.faq-tabs-nav');
  if (!tabsNav) return;

  var tabs = Array.prototype.slice.call(tabsNav.querySelectorAll('.faq-tab-item'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.faq-panel-block'));

  function activate(tab, focusTab) {
    var targetId = tab.getAttribute('data-target');
    if (!targetId || tab.classList.contains('is-active')) {
      if (focusTab) tab.focus();
      return;
    }

    tabs.forEach(function (t) {
      var isActive = t === tab;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      t.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach(function (panel) {
      var show = panel.id === targetId;
      panel.classList.toggle('active', show);
      panel.hidden = !show;
    });

    if (focusTab) tab.focus();
  }

  tabsNav.addEventListener('click', function (event) {
    var tab = event.target.closest('.faq-tab-item');
    if (tab) activate(tab, false);
  });

  tabsNav.addEventListener('keydown', function (event) {
    var currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    var targetIndex = null;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        targetIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    activate(tabs[targetIndex], true);
  });
});



// document.addEventListener('DOMContentLoaded', function () {
//   var tabsNav = document.querySelector('.faq-tabs-nav');
//   if (!tabsNav) return;

//   var tabs = Array.prototype.slice.call(tabsNav.querySelectorAll('.faq-tab-item'));
//   var panels = Array.prototype.slice.call(document.querySelectorAll('.faq-panel-block'));

//   function activate(tab, focusTab) {
//     var targetId = tab.getAttribute('data-target');
//     if (!targetId || tab.classList.contains('is-active')) {
//       if (focusTab) tab.focus();
//       return;
//     }

//     tabs.forEach(function (t) {
//       var isActive = t === tab;
//       t.classList.toggle('is-active', isActive);
//       t.setAttribute('aria-selected', isActive ? 'true' : 'false');
//       t.tabIndex = isActive ? 0 : -1;
//     });

//     panels.forEach(function (panel) {
//       var show = panel.id === targetId;
//       panel.classList.toggle('active', show);
//       panel.hidden = !show;
//     });

//     if (focusTab) tab.focus();
//   }

//   tabsNav.addEventListener('click', function (event) {
//     var tab = event.target.closest('.faq-tab-item');
//     if (tab) activate(tab, false);
//   });

//   tabsNav.addEventListener('keydown', function (event) {
//     var currentIndex = tabs.indexOf(document.activeElement);
//     if (currentIndex === -1) return;

//     var targetIndex = null;

//     switch (event.key) {
//       case 'ArrowDown':
//       case 'ArrowRight':
//         targetIndex = (currentIndex + 1) % tabs.length;
//         break;
//       case 'ArrowUp':
//       case 'ArrowLeft':
//         targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
//         break;
//       case 'Home':
//         targetIndex = 0;
//         break;
//       case 'End':
//         targetIndex = tabs.length - 1;
//         break;
//       default:
//         return;
//     }

//     event.preventDefault();
//     activate(tabs[targetIndex], true);
//   });
// });


