(function () {
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('main-nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Акция действует до конца ноября: обратный отсчёт до 1 декабря */
  var counters = document.querySelectorAll('[data-countdown]');
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var now = new Date();
    var end = new Date(now.getFullYear(), 11, 1, 0, 0, 0);
    var left = end - now;
    counters.forEach(function (el) {
      var expired = left <= 0;
      el.hidden = expired;
      var box = el.closest('.promo-card, .promoband') || document;
      var note = box.querySelector('[data-expired]');
      if (note) note.hidden = !expired;
      if (expired) return;
      var s = Math.floor(left / 1000);
      var d = Math.floor(s / 86400);
      var h = Math.floor((s % 86400) / 3600);
      var m = Math.floor((s % 3600) / 60);
      var sec = s % 60;
      var q = function (sel) { return el.querySelector(sel); };
      if (q('[data-d]')) q('[data-d]').textContent = d;
      if (q('[data-h]')) q('[data-h]').textContent = pad(h);
      if (q('[data-m]')) q('[data-m]').textContent = pad(m);
      if (q('[data-s]')) q('[data-s]').textContent = pad(sec);
    });
  }
  if (counters.length) { tick(); setInterval(tick, 1000); }

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
