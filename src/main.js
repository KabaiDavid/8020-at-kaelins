/* 80/20 at Kaelin's — interaction layer (no dependencies) */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  /* ---------- Hero intro choreography ---------- */
  const hero = $('.hero');
  $$('[data-intro]', hero).forEach((el, i) => el.style.setProperty('--d', `${0.15 + i * 0.12}s`));
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-ready')));

  /* ---------- Header: solid after hero, hide on scroll down ---------- */
  const hdr = $('[data-hdr]');
  const dock = $('[data-dock]');
  let lastY = scrollY, ticking = false;
  const onScroll = () => {
    const y = scrollY, heroEnd = hero.offsetHeight - 80;
    hdr.classList.toggle('is-solid', y > heroEnd);
    hdr.classList.toggle('is-hidden', y > heroEnd + 200 && y > lastY && !body.classList.contains('menu-open'));
    if (dock) dock.classList.toggle('is-on', y > hero.offsetHeight * 0.6);
    lastY = y; ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const toggle = $('[data-menu-toggle]');
  const drawer = $('[data-drawer]');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);
    body.classList.toggle('no-scroll', open);
    if (open) {
      drawer.hidden = false;
      requestAnimationFrame(() => drawer.classList.add('is-open'));
      $('a', drawer).focus({ preventScroll: true });
    } else {
      drawer.classList.remove('is-open');
      setTimeout(() => { if (!drawer.classList.contains('is-open')) drawer.hidden = true; }, reduce ? 0 : 700);
    }
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  drawer.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); toggle.focus(); }
  });

  /* ---------- Reveal on scroll ---------- */
  const groups = new Map();
  $$('[data-reveal]').forEach((el) => {
    const p = el.parentElement;
    const n = groups.get(p) || 0; groups.set(p, n + 1);
    el.style.setProperty('--d', `${Math.min(n, 4) * 0.09}s`);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  $$('[data-reveal]').forEach((el) => io.observe(el));

  /* ---------- Active nav link ---------- */
  const navLinks = $$('.hdr__nav a');
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => {
        if (a.hash === `#${e.target.id}`) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['story', 'menu', 'house', 'events', 'visit'].forEach((id) => { const s = document.getElementById(id); if (s) navIO.observe(s); });

  /* ---------- 80/20 counter + bar ---------- */
  const ratio = $('[data-ratio]');
  if (ratio) {
    const nums = $$('[data-count]', ratio);
    const run = () => {
      ratio.classList.add('is-in');
      if (reduce) return;
      const t0 = performance.now(), dur = 1600;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - k, 4);
        nums.forEach((n) => { n.textContent = Math.round(+n.dataset.count * ease); });
        if (k < 1) requestAnimationFrame(step);
      };
      nums.forEach((n) => { n.textContent = '0'; });
      requestAnimationFrame(step);
    };
    const rio = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); rio.disconnect(); } }, { threshold: 0.35 });
    rio.observe(ratio);
  }

  /* ---------- The House: sticky stage follows the room in view ---------- */
  const slides = $$('[data-slide]');
  const rooms = $$('[data-room]');
  if (slides.length && rooms.length) {
    const hio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const key = e.target.dataset.room;
        rooms.forEach((r) => r.classList.toggle('is-on', r === e.target));
        slides.forEach((s) => s.classList.toggle('is-on', s.dataset.slide === key));
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    rooms.forEach((r) => hio.observe(r));
    rooms[0].classList.add('is-on');
  }

  /* ---------- Gentle parallax on the 1934 numeral ---------- */
  const par = $$('[data-parallax]');
  if (par.length && !reduce) {
    const tick = () => {
      par.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        el.style.transform = `translate3d(0, ${(r.top * parseFloat(el.dataset.parallax)).toFixed(1)}px, 0)`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Map: load Google Maps only on request (speed + privacy) ---------- */
  const mapBtn = $('[data-map-load]');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.title = "Map showing 80/20 at Kaelin's, 1801 Newburg Rd, Louisville, KY";
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.src = 'https://www.google.com/maps?q=' + encodeURIComponent("80/20 at Kaelin's, 1801 Newburg Rd, Louisville, KY 40205") + '&output=embed';
      mapBtn.replaceWith(f);
    });
  }

  /* ---------- Private event inquiry → composed email ---------- */
  const form = $('[data-inquiry]');
  if (form) {
    const err = $('[data-inq-err]', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const nameOk = d.name.trim().length > 1;
      const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim());
      form.name.setAttribute('aria-invalid', String(!nameOk));
      form.email.setAttribute('aria-invalid', String(!mailOk));
      err.hidden = nameOk && mailOk;
      if (!err.hidden) { (nameOk ? form.email : form.name).focus(); return; }
      const lines = [
        'Hello 80/20 at Kaelin\'s,', '',
        'I\'d like to ask about hosting a private event.', '',
        `Name: ${d.name.trim()}`,
        `Email: ${d.email.trim()}`,
        d.date ? `Preferred date: ${d.date}` : '',
        d.guests ? `Guests: ${d.guests}` : '',
        `Occasion: ${d.occasion}`,
        d.notes.trim() ? `\n${d.notes.trim()}` : '',
        '', 'Thank you!'
      ].filter((l, i, a) => l !== '' || a[i - 1] !== '');
      const subject = `Private Event Inquiry — ${d.occasion}${d.date ? ' — ' + d.date : ''}`;
      location.href = `mailto:info@8020atkaelins.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    });
  }

  /* ---------- Footer year ---------- */
  const yr = $('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
