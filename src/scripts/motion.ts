import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const html = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
html.classList.add('motion-ready');

const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];

/* ───────────── Smooth scroll ───────────── */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href')!;
  const target = id.length > 1 ? $(id) : null;
  if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.4 });
  else target.scrollIntoView({ behavior: 'smooth' });
});

/* ───────────── Open / closed status (IST) ───────────── */
function updateOpenStatus() {
  const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const mins = ist.getHours() * 60 + ist.getMinutes();
  const open = mins >= 600 && mins < 1290;
  for (const el of $$('[data-open-status]')) {
    el.classList.toggle('is-open', open);
    const label = el.querySelector('span');
    if (label) label.textContent = open ? 'Open now · till 9:30 PM' : 'Closed · opens 10 AM';
  }
}
updateOpenStatus();
setInterval(updateOpenStatus, 60_000);

/* ───────────── Header, menu, mobile bar ───────────── */
const hdr = $('[data-hdr]');
const mbar = $('[data-mbar]');
let lastY = window.scrollY;
function onScroll() {
  const y = window.scrollY;
  if (hdr) {
    hdr.classList.toggle('is-scrolled', y > 40);
    const goingDown = y > lastY && y > 160;
    if (!html.classList.contains('menu-open')) hdr.classList.toggle('is-hidden', goingDown);
  }
  mbar?.classList.toggle('is-visible', y > window.innerHeight * 0.55);
  lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuBtn = $('[data-menu-toggle]');
const menu = $('[data-menu]');
function setMenu(open: boolean) {
  html.classList.toggle('menu-open', open);
  menuBtn?.setAttribute('aria-expanded', String(open));
  menuBtn?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu?.setAttribute('aria-hidden', String(!open));
  if (open) lenis?.stop();
  else lenis?.start();
}
menuBtn?.addEventListener('click', () => setMenu(!html.classList.contains('menu-open')));
document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

/* ───────────── Curtain: intro + page transitions ───────────── */
const curtain = $('[data-curtain]');
const panel = curtain ? $('.curtain__panel', curtain) : null;
const content = curtain ? $('.curtain__content', curtain) : null;
const heroStarters: Array<() => void> = [];
let heroStarted = false;
function startHero() {
  if (heroStarted) return;
  heroStarted = true;
  heroStarters.forEach((fn) => fn());
}

function hideCurtain() {
  html.classList.remove('curtain-on', 'curtain-nav');
  if (panel) gsap.set(panel, { clearProps: 'all' });
  if (content) gsap.set(content, { clearProps: 'all' });
}

function runCurtain() {
  if (!curtain || !panel || !html.classList.contains('curtain-on')) {
    startHero();
    return;
  }
  const isNav = html.classList.contains('curtain-nav');
  if (isNav) {
    gsap
      .timeline({ onComplete: hideCurtain })
      .to(content, { opacity: 0, duration: 0.25 }, 0.05)
      .to(panel, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, 0.1)
      .add(startHero, 0.45);
    return;
  }
  // First-visit intro
  const logo = $('[data-curtain-logo]', curtain);
  const meta = $('.curtain__meta', curtain);
  const count = $('[data-curtain-count]', curtain);
  const c = { v: 0 };
  gsap
    .timeline({
      onComplete: () => {
        hideCurtain();
        try {
          sessionStorage.setItem('bm-intro', '1');
        } catch {}
      },
    })
    .to(c, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => count && (count.textContent = String(Math.round(c.v))) }, 0)
    .to(logo, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.inOut' }, 0.15)
    .to(meta, { opacity: 1, duration: 0.6 }, 0.8)
    .to([logo, meta, count], { y: -40, opacity: 0, duration: 0.6, ease: 'power3.in' }, 1.65)
    .to(panel, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, 1.85)
    .add(startHero, 2.25);
}

document.addEventListener('click', (e) => {
  if (reduce || !panel) return;
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.protocol.indexOf('http') !== 0) return;
  if (url.pathname === location.pathname && url.hash) return;
  e.preventDefault();
  if (url.href === location.href) {
    setMenu(false);
    return;
  }
  try {
    sessionStorage.setItem('bm-nav', '1');
  } catch {}
  html.classList.add('curtain-on', 'curtain-nav');
  gsap.set(content, { opacity: 0 });
  gsap
    .timeline({ onComplete: () => (location.href = url.href) })
    .fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 0.65, ease: 'expo.inOut' })
    .to(content, { opacity: 1, duration: 0.2 }, 0.45);
});
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    hideCurtain();
    setMenu(false);
  }
});

/* ───────────── Cursor ───────────── */
if (finePointer && !reduce) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = '<span>View</span>';
  document.body.appendChild(cursor);
  const label = cursor.querySelector('span')!;
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('pointermove', (e) => {
    cursor.style.opacity = '1';
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerleave', () => (cursor.style.opacity = '0'));
  document.addEventListener('pointerover', (e) => {
    const t = e.target as Element;
    const view = t.closest<HTMLElement>('[data-cursor="view"]');
    const link = t.closest('a, button, [data-cursor="link"]');
    cursor.classList.toggle('is-view', !!view);
    cursor.classList.toggle('is-link', !view && !!link);
    if (view) label.textContent = view.dataset.cursorLabel || 'View';
  });
}

/* ───────────── Magnetic ───────────── */
if (finePointer && !reduce) {
  for (const el of $$('[data-magnetic]')) {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.4);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  }
}

/* ───────────── Drag-to-scroll rails ───────────── */
for (const rail of $$('[data-drag]')) {
  let down = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;
  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true;
    moved = false;
    startX = e.clientX;
    startScroll = rail.scrollLeft;
    rail.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    rail.scrollLeft = startScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    down = false;
    rail.classList.remove('is-dragging');
  });
  rail.addEventListener('click', (e) => moved && e.preventDefault(), true);
  for (const btn of $$<HTMLButtonElement>(`[data-drag-btn="${rail.id}"]`)) {
    btn.addEventListener('click', () => {
      const dir = Number(btn.dataset.dir || 1);
      rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' });
    });
  }
}

/* ───────────── Hover image list (occasions) ───────────── */
if (finePointer) {
  for (const list of $$('[data-hover-list]')) {
    const follower = $('[data-hover-follower]', list);
    if (!follower) continue;
    const imgs = $$('[data-hover-img]', follower);
    const xTo = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' });
    const rot = gsap.quickTo(follower, 'rotation', { duration: 0.8, ease: 'power3' });
    let lastX = 0;
    list.addEventListener('pointermove', (e) => {
      const r = list.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
      rot(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    });
    list.addEventListener('pointerenter', () => gsap.to(follower, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' }));
    list.addEventListener('pointerleave', () => gsap.to(follower, { autoAlpha: 0, scale: 0.6, duration: 0.4 }));
    for (const item of $$<HTMLElement>('[data-hover-item]', list)) {
      item.addEventListener('pointerenter', () => {
        const i = Number(item.dataset.hoverItem);
        imgs.forEach((im, j) => gsap.to(im, { autoAlpha: i === j ? 1 : 0, duration: 0.35 }));
      });
    }
  }
}

/* ───────────── Scroll animations ───────────── */
function initReveals() {
  if (reduce) {
    html.classList.remove('motion');
    return;
  }

  // Headings: line-by-line mask reveal
  for (const el of $$('[data-split]')) {
    const isHero = el.dataset.split === 'hero';
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { opacity: 1 });
        const tween = gsap.from(self.lines, {
          yPercent: 115,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.09,
          paused: isHero,
          scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 88%', once: true },
        });
        if (isHero) heroStarters.push(() => tween.play());
        return tween;
      },
    });
  }

  for (const el of $$('[data-fade]')) {
    const isHero = el.dataset.fade === 'hero';
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'expo.out',
      delay: Number(el.dataset.delay || 0),
      paused: isHero,
      scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 92%', once: true },
    });
    if (isHero) heroStarters.push(() => tween.play());
  }

  for (const el of $$('[data-stagger]')) {
    gsap.to(el.children, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  }

  for (const el of $$('[data-reveal]')) {
    const isHero = el.dataset.reveal === 'hero';
    const img = el.querySelector('img');
    const tl = gsap.timeline({
      paused: isHero,
      delay: Number(el.dataset.delay || 0),
      scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 86%', once: true },
    });
    tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.inOut' });
    if (img) tl.from(img, { scale: 1.35, duration: 1.8, ease: 'expo.out' }, 0.1);
    if (isHero) heroStarters.push(() => tl.play());
  }

  for (const el of $$('[data-parallax]')) {
    const amt = Number(el.dataset.parallax || 0.12);
    const target = el.querySelector('img') ?? el;
    gsap.fromTo(
      target,
      { yPercent: -amt * 100 },
      {
        yPercent: amt * 100,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  }

  for (const el of $$('[data-scrub-words]')) {
    const split = SplitText.create(el, { type: 'words' });
    gsap.fromTo(
      split.words,
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true },
      },
    );
  }

  for (const el of $$('[data-count]')) {
    const end = Number(el.dataset.count);
    const o = { v: Number(el.dataset.from || 0) };
    gsap.to(o, {
      v: end,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = String(Math.round(o.v))),
    });
  }

  // Horizontal pinned rail (desktop and phones)
  ScrollTrigger.config({ ignoreMobileResize: true });
  const mm = gsap.matchMedia();
  mm.add('all', () => {
    for (const sec of $$('[data-hscroll]')) {
      const track = $('[data-hscroll-track]', sec);
      if (!track) continue;
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: () => '+=' + dist(),
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      for (const img of $$('[data-hscroll-img]', track)) {
        gsap.fromTo(
          img,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement!, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          },
        );
      }
      const bar = $('[data-hscroll-progress]', sec);
      if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + dist(), scrub: true } });
    }
  });

  // Hero scroll-out
  const hero = $('[data-hero]');
  if (hero) {
    const inner = $('[data-hero-inner]', hero);
    if (inner)
      gsap.to(inner, {
        yPercent: 18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    // Photo row: each card rises at its own speed (away from the title) and fades
    for (const card of $$<HTMLElement>('[data-hero-float]', hero)) {
      const speed = Number(card.dataset.heroFloat || 1);
      gsap.to(card, {
        yPercent: -14 * speed,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  }

  // Footer wordmark rise
  const mega = $('[data-footer-mega]');
  if (mega)
    gsap.from(mega.children, {
      yPercent: 70,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: { trigger: mega, start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
}

/* ───────────── Boot ───────────── */
async function boot() {
  try {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  } catch {}
  initReveals();
  runCurtain();
  requestAnimationFrame(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
boot();
