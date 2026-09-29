/* case.js — behaviour for the four case-study pages: sidebar section tracking and the
   before/after comparison slider (pointer + keyboard). Loaded after site.js, deferred. */
(function () {
  'use strict';

  /* ── SIDEBAR — active section follows the reader ── */
  var links = Array.prototype.slice.call(document.querySelectorAll('.sidebar-link'));
  var pairs = links.map(function (link) {
    return { link: link, target: document.querySelector(link.getAttribute('href')) };
  }).filter(function (p) { return p.target; });

  if (pairs.length) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var threshold = Math.max(100, window.innerHeight * 0.25);
      var found = null;
      pairs.forEach(function (p) {
        if (p.target.getBoundingClientRect().top <= threshold) found = p.link;
      });
      links.forEach(function (l) {
        l.classList.remove('active');
        l.removeAttribute('aria-current');
      });
      var active = found || links[0];
      active.classList.add('active');
      active.setAttribute('aria-current', 'true');
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ── BEFORE / AFTER SLIDER ── */
  var wrap = document.getElementById('baWrap');
  var clip = document.getElementById('baClip');
  var handle = document.getElementById('baDivider');
  if (!wrap || !clip || !handle) return;

  var dragging = false;
  function setPos(p) {
    p = Math.max(5, Math.min(95, p));
    clip.style.clipPath = 'inset(0 0 0 ' + p + '%)';
    handle.style.left = p + '%';
    handle.setAttribute('aria-valuenow', String(Math.round(p)));
  }
  function fromPointer(x) {
    var r = wrap.getBoundingClientRect();
    setPos((x - r.left) / r.width * 100);
  }

  handle.setAttribute('role', 'slider');
  handle.setAttribute('tabindex', '0');
  handle.setAttribute('aria-label', 'Before and after comparison');
  handle.setAttribute('aria-valuemin', '5');
  handle.setAttribute('aria-valuemax', '95');
  handle.setAttribute('aria-valuenow', '50');
  handle.setAttribute('aria-valuetext', 'Divider position, 50 percent');

  handle.addEventListener('pointerdown', function (e) {
    dragging = true;
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  handle.addEventListener('pointermove', function (e) { if (dragging) fromPointer(e.clientX); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) {
    handle.addEventListener(t, function () { dragging = false; });
  });
  wrap.addEventListener('click', function (e) { if (e.target !== handle && !handle.contains(e.target)) fromPointer(e.clientX); });

  handle.addEventListener('keydown', function (e) {
    var cur = parseFloat(handle.getAttribute('aria-valuenow'));
    var step = e.shiftKey ? 10 : 5, next = null;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = cur - step;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = cur + step;
    else if (e.key === 'Home') next = 5;
    else if (e.key === 'End') next = 95;
    if (next === null) return;
    e.preventDefault();
    setPos(next);
    handle.setAttribute('aria-valuetext', 'Divider position, ' + Math.round(Math.max(5, Math.min(95, next))) + ' percent');
  });
})();
