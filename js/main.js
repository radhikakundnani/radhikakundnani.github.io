// Entry point: wires up clicks, dragging and keyboard, then boots the desktop.
import { EMAIL } from './data.js';
import { state } from './state.js';
import { $, isPhone, reduced, byId, store } from './utils.js';
import { WINS } from './views.js';
import { layer, open, refresh, focusWin, openWin, closeWin, topOpen, openProject } from './window-manager.js';
import { renderFolders, tick } from './desktop.js';

/* ---------- clicks ---------- */
document.addEventListener('click', (e) => {
  const t = e.target.closest('button, a');
  if (!t) return;
  const ds = t.dataset;
  if (ds.open) { openWin(ds.open); return; }
  if (ds.proj) { openProject(ds.proj); return; }
  if (ds.close) { closeWin(ds.close); return; }
  if (ds.min) { open.get(ds.min)?.classList.add('min'); return; }
  if (ds.zoom) { open.get(ds.zoom)?.classList.toggle('max'); return; }
  if (ds.filter) { state.filter = ds.filter; refresh('finder'); return; }
  if (ds.shot) { state.shot = +ds.shot; refresh('case'); return; }
  if (ds.cat) { state.cat = +ds.cat; refresh('skills'); return; }
  if (ds.send) {
    const to = EMAIL;
    const su = ($('#m-sub')?.value || '').trim();
    const body = ($('#m-body')?.value || '').trim();
    const q = (k, v) => v ? k + '=' + encodeURIComponent(v) : '';
    if (ds.send === 'gmail') {
      const url = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&' + [q('su', su), q('body', body)].filter(Boolean).join('&');
      window.open(url, '_blank', 'noopener');
    } else {
      location.href = 'mailto:' + to + '?' + [q('subject', su), q('body', body)].filter(Boolean).join('&');
    }
    return;
  }
  if (ds.copy) {
    const done = () => { t.textContent = 'Copied'; setTimeout(() => (t.textContent = 'Copy'), 1500); };
    try { navigator.clipboard.writeText(ds.copy).then(done, () => selectText('#email')); } catch (err) { selectText('#email'); }
  }
});

function selectText(sel) {
  const n = $(sel); if (!n) return;
  const r = document.createRange(); r.selectNodeContents(n);
  const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}

// bring to front on press
layer.addEventListener('pointerdown', (e) => {
  const w = e.target.closest('.win');
  if (w) focusWin(w.dataset.win);
});

// drag by title bar
let drag = null;
layer.addEventListener('pointerdown', (e) => {
  const bar = e.target.closest('.bar');
  if (!bar || e.target.closest('button') || isPhone()) return;
  const w = bar.closest('.win');
  if (w.classList.contains('max')) return;
  drag = { w, sx: e.clientX, sy: e.clientY, ox: w.offsetLeft, oy: w.offsetTop };
  bar.setPointerCapture(e.pointerId);
  e.preventDefault();
});
layer.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const x = drag.ox + e.clientX - drag.sx;
  const y = Math.max(34, Math.min(window.innerHeight - 60, drag.oy + e.clientY - drag.sy));
  drag.w.style.left = Math.max(-drag.w.offsetWidth + 120, Math.min(window.innerWidth - 120, x)) + 'px';
  drag.w.style.top = y + 'px';
});
const endDrag = () => { drag = null; };
layer.addEventListener('pointerup', endDrag);
layer.addEventListener('pointercancel', endDrag);

// double-click title bar to zoom
layer.addEventListener('dblclick', (e) => {
  const bar = e.target.closest('.bar');
  if (bar && !e.target.closest('button')) bar.closest('.win').classList.toggle('max');
});

// Esc closes the frontmost window
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { const id = topOpen(); if (id) closeWin(id); }
});

/* ---------- start ---------- */
renderFolders();
tick();
setInterval(tick, 15000);

// Play the boot screen once per visit; deep links like #bagsy open that project.
const fromHash = (location.hash || '').slice(1);
const booted = store.get('booted');
if (booted) $('#boot')?.classList.add('skip');
store.set('booted', '1');
const delay = booted || reduced ? 0 : 3000;

setTimeout(() => {
  if (fromHash && byId(fromHash)) { openWin('finder'); openProject(fromHash); }
  else if (WINS[fromHash]) openWin(fromHash);
  else if (!isPhone()) openWin('hello');
}, delay);

// Keep windows on screen when the browser is resized.
window.addEventListener('resize', () => {
  open.forEach((el) => {
    if (el.offsetLeft > window.innerWidth - 120) el.style.left = Math.max(12, window.innerWidth - el.offsetWidth - 12) + 'px';
  });
});
