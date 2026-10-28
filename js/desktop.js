// The desktop folders, the phone home screen and the menu bar clock.
import { PROJECTS } from './data.js';
import { $, esc, asset } from './utils.js';
import { FOLDER_SVG } from './icons.js';

export function renderFolders() {
  $('#folders').innerHTML = PROJECTS.map((p) => `
    <button class="ico" data-proj="${p.id}" aria-label="Open ${esc(p.title)}">
      <span class="fold">${FOLDER_SVG}</span>
      <span class="lbl">${esc(p.file)}</span>
      <span class="ql"><img src="${asset(p.imgs[0])}" alt="" loading="lazy"><span>${esc(p.title)}<small>${esc(p.year)}</small></span></span>
    </button>`).join('');
  $('#phone-apps').innerHTML = PROJECTS.map((p) => `
    <button class="papp" data-proj="${p.id}"><span><img src="${asset(p.imgs[0])}" alt="" loading="lazy"></span>${esc(p.title.replace("Google Developer Groups on Campus", 'Developer Groups'))}</button>`).join('');
}

export function tick() {
  const d = new Date();
  $('#clock-date').textContent = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', '');
  $('#clock-time').textContent = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
