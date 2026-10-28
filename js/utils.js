// Small helpers shared by every module.
import { PROJECTS } from './data.js';

export const $ = (s, r = document) => r.querySelector(s);
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const isPhone = () => window.matchMedia('(max-width: 820px)').matches;
export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const byId = (id) => PROJECTS.find((p) => p.id === id);

export const asset = (file) => 'assets/projects/' + file;
export const figmaUrl = (key) => 'https://www.figma.com/design/' + key;
export const ext = 'target="_blank" rel="noopener"';

// Links shown under a project: Framer first, then Figma, then anything extra.
export const linksOf = (p) => [
  ...(p.framer ? [{ label: 'Framer file', href: p.framer }] : []),
  ...(p.figma ? [{ label: 'Figma file', href: figmaUrl(p.figma) }] : []),
  ...(p.links || [])
];

// sessionStorage can throw in private mode, so wrap it.
export const store = {
  get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
};
