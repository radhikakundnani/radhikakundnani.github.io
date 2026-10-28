// The window manager: opening, closing, focusing and stacking windows.
import { WINS } from './views.js';
import { state } from './state.js';
import { $, isPhone, reduced, byId, esc } from './utils.js';
import { CLOSE, MIN, ZOOM } from './icons.js';

export const layer = $('#layer');
export const open = new Map(); // window id -> element
let zTop = 30;
const cascade = { n: 0 };

// Show a focus ring only when the visitor is using the keyboard.
let usingKeys = false;
document.addEventListener('keydown', () => { usingKeys = true; document.documentElement.classList.add('kb'); }, true);
document.addEventListener('pointerdown', () => { usingKeys = false; document.documentElement.classList.remove('kb'); }, true);

function place(id, el) {
  const d = WINS[id];
  const vw = window.innerWidth, vh = window.innerHeight;
  const w = Math.min(d.w, vw - 24), h = Math.min(d.h, vh - 130);
  el.style.width = w + 'px';
  el.style.height = h + 'px';
  const off = (cascade.n++ % 4) * 22;
  const x = Math.max(12, Math.round((vw - w) / 2) + (id === 'hello' ? 0 : off - 33));
  const y = Math.max(40, Math.round((vh - 90 - h) / 2) + 16 + (id === 'hello' ? 40 : off - 33));
  el.style.left = x + 'px';
  el.style.top = y + 'px';
}

function title(id) { const t = WINS[id].title; return typeof t === 'function' ? t() : t; }

function build(id) {
  const d = WINS[id];
  const el = document.createElement('section');
  el.className = 'win ' + (d.cls || '');
  el.dataset.win = id;
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', title(id));
  el.innerHTML = `
    <div class="bar">
      <div class="tl">
        <button class="dot r" data-close="${id}" aria-label="Close">${CLOSE}</button>
        <button class="dot y" data-min="${id}" aria-label="Minimise">${MIN}</button>
        <button class="dot g" data-zoom="${id}" aria-label="Zoom">${ZOOM}</button>
      </div>
      <span class="ttl">${esc(title(id))}</span>
      ${d.meta ? `<span class="bar-meta">${esc(d.meta())}</span>` : ''}
    </div>
    <div class="body" style="display:contents">${d.render()}</div>`;
  return el;
}

export function refresh(id) {
  const el = open.get(id);
  if (!el) return;
  const d = WINS[id];
  const scrollers = [...el.querySelectorAll('.grid,.pane,.info,.skillpane')].map((n) => n.scrollTop);
  el.querySelector('.body').innerHTML = d.render();
  el.querySelector('.ttl').textContent = title(id);
  el.setAttribute('aria-label', title(id));
  const meta = el.querySelector('.bar-meta');
  if (meta && d.meta) meta.textContent = d.meta();
  [...el.querySelectorAll('.grid,.pane,.info,.skillpane')].forEach((n, i) => { if (scrollers[i]) n.scrollTop = scrollers[i]; });
}

export function focusWin(id) {
  const el = open.get(id);
  if (!el) return;
  el.classList.remove('min');
  el.style.zIndex = ++zTop;
  syncDock();
}

export function openWin(id) {
  if (!WINS[id]) return;
  $('.nudge')?.classList.add('gone');
  if (open.has(id)) { refresh(id); focusWin(id); return; }
  const el = build(id);
  place(id, el);
  layer.appendChild(el);
  open.set(id, el);
  focusWin(id);
  const first = el.querySelector('.pane button, .pane a, .dot.r');
  if (first && !isPhone()) first.focus({ preventScroll: true, focusVisible: usingKeys });
}

export function closeWin(id) {
  const el = open.get(id);
  if (!el) return;
  open.delete(id);
  syncDock();
  if (reduced) { el.remove(); return; }
  el.classList.add('closing');
  el.addEventListener('animationend', () => el.remove(), { once: true });
}

export function topOpen() {
  let best = null, z = -1;
  open.forEach((el, id) => { const zi = +el.style.zIndex || 0; if (!el.classList.contains('min') && zi > z) { z = zi; best = id; } });
  return best;
}

function syncDock() {
  document.querySelectorAll('.run').forEach((r) => r.classList.toggle('on', open.has(r.dataset.run)));
}

export function openProject(id) {
  if (!byId(id)) return;
  state.proj = id; state.shot = 0;
  if (open.has('case')) { refresh('case'); focusWin('case'); }
  else openWin('case');
  try { history.replaceState(null, '', '#' + id); } catch (e) {}
}
