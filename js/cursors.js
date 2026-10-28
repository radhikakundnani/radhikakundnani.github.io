// A short intro after the loading screen: the "designing" cursor drags the
// hello window into place and the "coding" cursor types "Yes.", then both leave.
// Plays once per visit, never on phones or with reduced motion.
import { $ } from './utils.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Move a cursor (or anything) to x, y with the Web Animations API.
function glide(el, x, y, ms, easing = 'cubic-bezier(.45,0,.2,1)') {
  const a = el.animate([{ transform: `translate(${x}px, ${y}px)` }], { duration: ms, easing, fill: 'forwards' });
  return a.finished.catch(() => {});
}

export async function playCursorIntro() {
  const win = $('.win[data-win="hello"]');
  const design = $('.cur.c1'), code = $('.cur.c2');
  const yes = win?.querySelector('h2 span');
  if (!win || !design || !code || !yes) return;

  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    [design, code].forEach((c) => c.classList.remove('on'));
    yes.textContent = 'Yes.';
    win.style.left = home.x + 'px';
    win.style.top = home.y + 'px';
  };

  // Where the window should end up, and where it starts (nudged off to the side).
  const home = { x: win.offsetLeft, y: win.offsetTop };
  const nudge = { x: 90, y: 60 };
  win.style.left = home.x + nudge.x + 'px';
  win.style.top = home.y + nudge.y + 'px';
  // Hide the letters of "Yes." but keep their space, so nothing jumps while it types.
  yes.innerHTML = [...'Yes.'].map((ch) => `<i style="font-style:normal;opacity:0">${ch}</i>`).join('');
  const letters = [...yes.querySelectorAll('i')];

  // If the visitor starts doing things, get out of their way.
  window.addEventListener('pointerdown', stop, { once: true });
  window.addEventListener('keydown', stop, { once: true });

  const vw = window.innerWidth, vh = window.innerHeight;
  const grab = { x: win.offsetWidth / 2 - 40, y: 22 };  // a point on the title bar

  // Start both cursors off screen.
  design.animate([{ transform: `translate(${vw + 40}px, ${vh * 0.62}px)` }], { duration: 0, fill: 'forwards' });
  code.animate([{ transform: `translate(-60px, ${vh * 0.8}px)` }], { duration: 0, fill: 'forwards' });
  design.classList.add('on');

  // 1. "designing" flies in and grabs the title bar.
  await wait(350);
  await glide(design, home.x + nudge.x + grab.x, home.y + nudge.y + grab.y, 900);
  if (stopped) return;
  design.classList.add('press');
  await wait(180);

  // 2. ...and drags the window into place.
  const dragMs = 750, ease = 'cubic-bezier(.4,0,.2,1)';
  win.animate([{ left: win.style.left, top: win.style.top }, { left: home.x + 'px', top: home.y + 'px' }], { duration: dragMs, easing: ease });
  glide(design, home.x + grab.x, home.y + grab.y, dragMs, ease);
  win.style.left = home.x + 'px';
  win.style.top = home.y + 'px';
  await wait(dragMs);
  design.classList.remove('press');
  if (stopped) return;

  // 3. "coding" comes in and types "Yes."
  code.classList.add('on');
  const r = yes.getBoundingClientRect();
  await glide(code, r.left + 6, r.top + r.height * 0.55, 850);
  if (stopped) return;
  for (const letter of letters) {
    await wait(150);
    if (stopped) return;
    letter.style.opacity = 1;
    code.animate([{ transform: `translate(${letter.getBoundingClientRect().right + 4}px, ${r.top + r.height * 0.55}px)` }], { duration: 120, fill: 'forwards' });
  }

  // 4. Both drift off and fade.
  await wait(700);
  if (stopped) return;
  glide(design, vw * 0.8, vh * 0.2, 900);
  glide(code, vw * 0.25, vh * 0.72, 900);
  await wait(500);
  stop();
}
