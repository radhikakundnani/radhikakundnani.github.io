// The landscape behind the desktop, split into three depth layers
// (sky, far hills, near hills). Scrolling down lifts the layers at different
// speeds and brings up the footer; moving the mouse shifts them slightly.
import { $, isPhone, reduced } from './utils.js';
import { writeName } from './boot.js';

const PHOTO = { w: 1200, h: 750 };   // size of the original wallpaper
const LAYERS = [
  // how far each layer rises over the full scroll, and how much it follows the mouse
  { sel: '.sc-sky',  rise: 0.04, mouse: 6 },
  { sel: '.sc-land', rise: 0.13, mouse: 14 },
  { sel: '.sc-near', rise: 0.30, mouse: 30 },
];
const SCROLL_RANGE = 0.75;           // scrolling 75% of the screen height reaches the footer
const SCROLL_LAG = 0.07;             // lower = the landscape trails further behind the scroll

export function setupScene() {
  // Always start at the desktop, even after a reload halfway down the page.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);

  const layers = LAYERS.map((l) => ({ ...l, el: $(l.sel) }));
  const lift = ['#desktop', '#layer', '#dock', '.c1', '.c2', '.more'].map((s) => $(s)).filter(Boolean);
  const footer = $('#footer');
  const sign = $('#footer-sign');
  let progress = 0, shown = 0, mouse = { x: 0, y: 0 }, eased = { x: 0, y: 0 }, signed = false, frame = 0, last = 0;

  // Size every layer like background-size: cover, using the same box so they line up.
  function layout() {
    const vw = innerWidth, vh = innerHeight;
    const s = Math.max(vw / PHOTO.w, vh / PHOTO.h) * 1.06;   // a little extra room for the mouse shift
    const w = PHOTO.w * s, left = (vw - w) / 2, top = (vh - PHOTO.h * s) / 2;
    layers.forEach(({ el }) => { el.style.width = w + 'px'; el.style.left = left + 'px'; el.style.top = top + 'px'; });
  }

  function render(now = performance.now()) {
    frame = 0;
    const dt = last ? Math.min(64, now - last) : 16.7;   // same feel at any frame rate
    last = now;
    const k = (base) => 1 - Math.pow(1 - base, dt / 16.7);
    const vh = innerHeight;
    shown += (progress - shown) * (reduced ? 1 : k(SCROLL_LAG));   // ease toward the real scroll position
    if (Math.abs(progress - shown) < 0.0005) shown = progress;
    eased.x += (mouse.x - eased.x) * k(0.08);
    eased.y += (mouse.y - eased.y) * k(0.08);
    layers.forEach((l) => {
      l.el.style.transform = `translate3d(${-eased.x * l.mouse}px, ${-shown * l.rise * vh - eased.y * l.mouse * 0.5}px, 0)`;
    });
    const up = -shown * vh * 0.9;
    lift.forEach((el) => {
      el.style.translate = `0 ${up}px`;
      el.style.opacity = String(Math.max(0, 1 - shown * 1.4));
      el.style.pointerEvents = shown > 0.6 ? 'none' : '';
    });
    footer.style.transform = `translate3d(0, ${(1 - shown) * 110}%, 0)`;
    footer.style.visibility = shown > 0.01 ? 'visible' : 'hidden';
    if (shown > 0.85 && !signed) { signed = true; writeName(sign, 2200); }
    if (shown < 0.2) signed = false;   // write it again next time
    if (shown !== progress || Math.abs(mouse.x - eased.x) > 0.001 || Math.abs(mouse.y - eased.y) > 0.001) queue();
    else last = 0;
  }
  const queue = () => { if (!frame) frame = requestAnimationFrame(render); };

  function onScroll() {
    progress = isPhone() ? 0 : Math.min(1, Math.max(0, scrollY / (innerHeight * SCROLL_RANGE)));
    document.body.classList.toggle('scrolled', progress > 0.02);
    queue();
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { layout(); onScroll(); });
  if (!reduced) {
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      mouse.x = e.clientX / innerWidth * 2 - 1;
      mouse.y = e.clientY / innerHeight * 2 - 1;
      queue();
    }, { passive: true });
  }
  // On phones the footer simply sits at the end of the home screen.
  function placeFooter() {
    const target = isPhone() ? $('#phone') : $('#screen');
    if (footer.parentNode !== target) target.appendChild(footer);
  }
  addEventListener('resize', placeFooter);
  placeFooter();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      if (isPhone() && entries[0].isIntersecting && !signed) { signed = true; writeName(sign, 2200); }
    }, { threshold: 0.6 }).observe(footer);
  }

  layout();
  onScroll();
}

// Scroll back up to the desktop (used by the footer button and the menu bar).
export function toDesktop() {
  if (scrollY > 0) scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}

export function tickFooterClock() {
  const el = $('#footer-time');
  if (!el) return;
  const t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  el.textContent = `${t} in Bangalore`;
}
