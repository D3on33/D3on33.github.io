/* site.js — behaviour shared by every page: theme, nav overlay, scroll progress,
   reveal-on-scroll, back-to-top. Loaded with `defer`. The initial theme is set by a
   tiny inline script in <head> so there is no flash of the wrong theme. */
(function () {
  'use strict';

  var html = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  /* ── THEME ── */
  var tBtn = document.getElementById('themeToggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var darkMq = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    if (themeMeta) themeMeta.content = t === 'dark' ? '#121016' : '#FBF9F4';
    if (tBtn) {
      var icon = tBtn.querySelector('.theme-icon') || tBtn;
      icon.textContent = t === 'dark' ? '☾' : '☀';
      icon.setAttribute('aria-hidden', 'true');
      tBtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
    }
  }
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  if (tBtn) {
    tBtn.addEventListener('click', function () {
      var t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      store('dm-theme', t);
      applyTheme(t);
    });
  }
  darkMq.addEventListener('change', function (e) {
    if (!store('dm-theme')) applyTheme(e.matches ? 'dark' : 'light');
  });

  /* ── MOBILE NAV OVERLAY — focus trap, inert page behind, focus restore ── */
  var hmb = document.getElementById('navHamburger');
  var ov = document.getElementById('nav-overlay');
  var main = document.getElementById('main-content');

  if (hmb && ov) {
    var focusables = function () {
      return [hmb].concat(Array.prototype.slice.call(ov.querySelectorAll('a[href], button:not([disabled])')));
    };
    var trap = function (e) {
      if (e.key !== 'Tab') return;
      var els = focusables(), first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    var setNav = function (open) {
      ov.classList.toggle('is-open', open);
      hmb.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      hmb.setAttribute('aria-expanded', open ? 'true' : 'false');
      hmb.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      if (main) main.inert = open;
      if (open) {
        document.addEventListener('keydown', trap);
        var links = ov.querySelector('a[href]');
        if (links) links.focus();
      } else {
        document.removeEventListener('keydown', trap);
      }
    };
    hmb.addEventListener('click', function () { setNav(!ov.classList.contains('is-open')); });
    ov.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ov.classList.contains('is-open')) { setNav(false); hmb.focus(); }
    });
    /* leaving mobile width while open would strand a hidden overlay */
    window.matchMedia('(min-width: 769px)').addEventListener('change', function (e) {
      if (e.matches && ov.classList.contains('is-open')) setNav(false);
    });
  }

  /* ── SCROLL PROGRESS + BACK-TO-TOP (one rAF-throttled listener) ── */
  var fill = document.getElementById('scroll-fill');
  var btt = document.getElementById('btt');
  var ticking = false;

  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    if (fill) {
      var max = html.scrollHeight - window.innerHeight;
      fill.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    }
    if (btt) btt.classList.toggle('visible', y > 500);
  }
  if (fill || btt) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }
  if (btt) {
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ── REVEAL ON SCROLL ── */
  var reveals = document.querySelectorAll('.reveal');
  var nodes = document.querySelectorAll('.history-node');

  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        ro.unobserve(e.target);
      });
    }, { threshold: 0.07 });
    reveals.forEach(function (el) { ro.observe(el); });

    var no = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = Array.prototype.indexOf.call(nodes, e.target);
        setTimeout(function () { e.target.classList.add('in'); }, reduceMotion ? 0 : i * 80);
        no.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    nodes.forEach(function (el) { no.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
    nodes.forEach(function (el) { el.classList.add('in'); });
  }
})();
