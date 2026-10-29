// The loading screen: "radhika" writes itself, one letter-stroke at a time,
// then a progress bar fills and the screen fades away to show the desktop.
import { $, reduced } from './utils.js';

// Hand-drawn letter strokes for "radhika" (r, a, d, h, i, i-dot, k, a).
export const VIEWBOX = '0 0 934 200';
export const SLANT = 'translate(48 0) skewX(-12)';
export const STROKES = [
  "M8 180 C26 162 40 134 46 104 C50 84 74 84 76 106 C74 130 70 168 82 186 C92 198 110 190 122 172",
  "M122 172 C134 138 152 98 176 93 C194 90 210 94 218 104 C206 90 168 92 160 122 C152 152 164 190 188 190 C210 190 220 160 224 104 C222 140 218 176 230 188 C240 196 254 188 264 172",
  "M264 172 C276 138 294 98 318 93 C336 90 352 94 360 104 C348 90 310 92 302 122 C294 152 306 190 330 190 C352 190 362 160 366 104 C370 70 374 30 376 8 C374 50 362 150 364 174 C366 192 384 194 402 178",
  "M402 178 C426 152 456 96 462 52 C466 24 460 8 448 8 C434 8 428 30 426 70 C424 110 422 160 420 190 C426 140 450 100 474 100 C496 100 500 122 496 142 C492 162 488 180 500 188 C512 196 530 184 542 164",
  "M542 164 C548 144 554 120 556 100 C554 130 550 170 560 186 C570 196 590 184 602 164",
  "M568 54 L569 57",
  "M602 164 C626 134 654 84 658 48 C662 22 654 8 644 8 C630 8 626 30 624 70 C622 110 620 160 618 190 C622 150 642 102 668 102 C688 102 688 134 644 142 C664 148 670 176 682 188 C692 196 708 188 720 172",
  "M720 172 C732 138 750 98 774 93 C792 90 808 94 816 104 C804 90 766 92 758 122 C750 152 762 190 786 190 C808 190 818 160 822 104 C820 140 816 176 828 188 C842 198 864 186 882 156"
];

const WRITE_MS = 3300;  // how long the name takes to write
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function playBoot(onDone) {
  const boot = $('#boot');
  const svg = $('#boot-hello');
  if (!boot || !svg) { onDone(); return; }

  svg.setAttribute('viewBox', VIEWBOX);
  svg.innerHTML = `<g transform="${SLANT}">${STROKES.map((d) => `<path d="${d}"/>`).join('')}</g>`;
  const paths = [...svg.querySelectorAll('path')];
  const lengths = paths.map((p) => p.getTotalLength() + 1);
  paths.forEach((p, i) => { p.style.strokeDasharray = lengths[i]; p.style.strokeDashoffset = lengths[i]; });

  // Each stroke gets time in proportion to its length, overlapping slightly.
  const total = lengths.reduce((a, b) => a + b, 0);
  let at = 200;
  const plan = lengths.map((len) => {
    const dur = Math.max(110, (len / total) * WRITE_MS);
    const start = at; at += dur * 0.92;
    return { start, dur };
  });
  const end = plan[plan.length - 1].start + plan[plan.length - 1].dur;
  const t0 = performance.now();

  const frame = (now) => {
    const t = now - t0;
    paths.forEach((p, i) => {
      const k = Math.min(1, Math.max(0, (t - plan[i].start) / plan[i].dur));
      p.style.strokeDashoffset = lengths[i] * (1 - easeInOut(k));
    });
    if (t < end) requestAnimationFrame(frame);
    else finish();
  };

  function finish() {
    boot.classList.add('ready');                         // progress bar + caption
    setTimeout(() => { boot.classList.add('done'); onDone(); }, 1300);
    setTimeout(() => boot.classList.add('skip'), 2300);   // remove after the fade
  }

  if (reduced) { paths.forEach((p) => (p.style.strokeDashoffset = 0)); finish(); return; }
  requestAnimationFrame(frame);
}

// Draw "radhika" into any <svg>, stroke by stroke. Used again in the footer.
export function writeName(svg, ms = 2600) {
  svg.setAttribute('viewBox', VIEWBOX);
  svg.innerHTML = `<g transform="${SLANT}">${STROKES.map((d) => `<path d="${d}"/>`).join('')}</g>`;
  const paths = [...svg.querySelectorAll('path')];
  const lengths = paths.map((p) => p.getTotalLength() + 1);
  const total = lengths.reduce((a, b) => a + b, 0);
  paths.forEach((p, i) => { p.style.strokeDasharray = lengths[i]; p.style.strokeDashoffset = reduced ? 0 : lengths[i]; });
  if (reduced) return;
  let at = 0;
  const plan = lengths.map((len) => { const dur = Math.max(90, (len / total) * ms); const s = at; at += dur * 0.92; return { s, dur }; });
  const t0 = performance.now();
  const frame = (now) => {
    const t = now - t0;
    paths.forEach((p, i) => { const k = Math.min(1, Math.max(0, (t - plan[i].s) / plan[i].dur)); p.style.strokeDashoffset = lengths[i] * (1 - easeInOut(k)); });
    if (t < at + 200) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
