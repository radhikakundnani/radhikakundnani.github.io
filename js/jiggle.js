// iPhone-style "jiggle mode" for the phone home screen:
// press and hold an app or dock icon, and every icon starts to wiggle.
// Tap "Done" or an empty spot to stop. Icons don't open while jiggling.
import { $, isPhone } from './utils.js';

const HOLD_MS = 500;
const MOVE_TOLERANCE = 10;  // px a finger can drift before it counts as a scroll

export function setupJiggle() {
  const phone = $('#phone');
  const dock = $('#dock');
  if (!phone || !dock) return;

  let timer = 0, start = null, justEntered = false;
  const icons = '.papp, #dock .dk';

  const enter = () => {
    document.body.classList.add('jiggle');
    justEntered = true;                      // swallow the click that ends this press
    try { navigator.vibrate?.(12); } catch (e) {}
  };
  const exit = () => document.body.classList.remove('jiggle');
  const jiggling = () => document.body.classList.contains('jiggle');
  const cancel = () => { clearTimeout(timer); start = null; };

  document.addEventListener('pointerdown', (e) => {
    if (!isPhone() || !e.target.closest(icons)) return;
    start = { x: e.clientX, y: e.clientY };
    timer = setTimeout(enter, HOLD_MS);
  });
  document.addEventListener('pointermove', (e) => {
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > MOVE_TOLERANCE) cancel();
  });
  document.addEventListener('pointerup', cancel);
  document.addEventListener('pointercancel', cancel);

  // Runs before the app's own click handler (capture phase).
  document.addEventListener('click', (e) => {
    if (justEntered) { justEntered = false; e.preventDefault(); e.stopPropagation(); return; }
    if (!jiggling()) return;
    if (e.target.closest('.jig-done') || !e.target.closest(icons)) exit();
    e.preventDefault();
    e.stopPropagation();
  }, true);

  // Stop the long-press menu ("Save image", "Open link") from popping up.
  document.addEventListener('contextmenu', (e) => { if (isPhone() && e.target.closest(icons)) e.preventDefault(); });

  window.addEventListener('resize', () => { if (!isPhone()) exit(); });
}
