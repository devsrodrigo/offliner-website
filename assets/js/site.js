/* Offliner site. Vanilla, no dependencies, ~2 KB.
   Everything here is progressive enhancement. The site works with JS disabled. */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Header shadow on scroll, and the sticky mobile CTA ---------------- */

  var header = document.querySelector('.header');
  var sticky = document.querySelector('.sticky-cta');

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 16);
    if (sticky) sticky.classList.toggle('is-in', y > 520);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  /* ---- Mobile menu ------------------------------------------------------- */

  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        burger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) burger.click();
    });
  }

  /* ---- Reveal on scroll -------------------------------------------------- */

  var targets = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Marquee: duplicate the track so the loop is seamless -------------- */

  var track = document.querySelector('.marquee__track');
  if (track && !reduced) {
    track.innerHTML += track.innerHTML;
  }

  /* ---- Accordion: only one symptom open at a time ------------------------ */

  var accs = document.querySelectorAll('.acc');
  accs.forEach(function (acc) {
    var items = acc.querySelectorAll('details');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  });

  /* ---- Suggestion box: compose a mailto so there is no backend to run ---- */

  var form = document.querySelector('[data-mailto]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var to = form.getAttribute('data-mailto');
      var subject = (form.querySelector('[name="subject"]') || {}).value || 'Suggestion for Offliner';
      var body = (form.querySelector('[name="message"]') || {}).value || '';
      var from = (form.querySelector('[name="email"]') || {}).value || '';
      if (from) body += '\n\nReply to: ' + from;
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      var note = form.querySelector('[data-form-note]');
      if (note) note.textContent = 'Your email app should be opening now. If it did not, write to ' + to + ' directly.';
    });
  }

  /* ---- Current year in the footer ---------------------------------------- */

  var years = document.querySelectorAll('[data-year]');
  years.forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
