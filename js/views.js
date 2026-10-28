// Every window on the desktop: its title, default size and HTML.
import { PROJECTS, TAGS, EXPERIENCE, SKILLS, EMAIL, LINKEDIN, GITHUB } from './data.js';
import { state } from './state.js';
import { esc, byId, asset, linksOf, ext } from './utils.js';
import { ICON } from './icons.js';

// Projects that match the selected tag.
export const shown = () => PROJECTS.filter((p) => state.filter === 'all' || p.tags.includes(state.filter));

export const WINS = {
  hello: { title: 'hello.txt', w: 520, h: 330, cls: 'hello', render: () => `
    <div class="pane">
      <h2>Designer or developer?<br><span>Yes.</span></h2>
      <p>Make yourself at home.</p>
      <div class="btns">
        <button class="prim" data-open="finder">Open Projects</button>
        <button class="sec" data-open="exp">Experience</button>
        <button class="sec" data-open="skills">Skills</button>
      </div>
      <div class="hint">Everything works: folders, dock, menu bar. Drag windows around too.</div>
    </div>` },

  finder: { title: 'Projects', w: 880, h: 640, cls: 'finderwin', meta: () => `${shown().length} items`, render: () => `
    <div class="pane finder">
      <nav class="sidebar" aria-label="Filter projects">
        <h4>Favourites</h4>
        <button class="side on nav-only">${ICON.folder}Projects</button>
        <button class="side nav-only" data-open="exp">${ICON.case}Experience</button>
        <button class="side nav-only" data-open="skills">${ICON.grid}Skills</button>
        <button class="side nav-only" data-open="about">${ICON.person}About me</button>
        <button class="side nav-only" data-open="mail">${ICON.mail}Contact</button>
        <h4 class="gap">Tags</h4>
        ${TAGS.map(([k, label, c]) => `<button class="side ${k === state.filter ? 'on' : ''}" data-filter="${k}" aria-pressed="${k === state.filter}"><span class="tagdot" style="background:${c}"></span>${label}<span class="n">${k === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(k)).length}</span></button>`).join('')}
      </nav>
      <div class="grid">
        ${shown().map((p) => {
          const l = linksOf(p)[0];
          return `<div class="cell">
            <button class="tile" data-proj="${p.id}">
              <span class="thumb"><img src="${asset(p.imgs[0])}" alt="" loading="lazy">${p.framer ? '<span class="badge">Made in Framer</span>' : ''}</span>
              <span class="tile-t"><b>${esc(p.title)}</b><small>${esc(p.year)}</small></span>
              <span class="tile-k">${esc(p.kind)}</span>
            </button>
            ${l ? `<a class="flink" href="${l.href}" ${ext}>${esc(l.label)} ↗</a>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>` },

  case: { title: () => byId(state.proj).file, w: 1100, h: 720, cls: 'casewin', render: () => {
    const p = byId(state.proj);
    const imgs = p.imgs;
    return `
    <div class="pane case">
      <div class="stage">
        <div class="shotbox ${p.cover ? 'cover' : ''}"><img src="${asset(imgs[state.shot] || imgs[0])}" alt="${esc(p.title)}, screen ${state.shot + 1}"></div>
        ${imgs.length > 1 ? `<div class="shots">${imgs.map((src, i) => `<button class="shot ${i === state.shot ? 'on' : ''}" data-shot="${i}" aria-label="Show screen ${i + 1}"><img src="${asset(src)}" alt=""></button>`).join('')}</div>` : ''}
      </div>
      <aside class="info">
        <div class="k">${esc(p.kind)} · ${esc(p.year)}</div>
        <h2>${esc(p.title)}</h2>
        <p>${esc(p.blurb)}</p>
        <div class="did"><div class="k" style="margin:0">what i did</div>${p.did.map((d) => `<div class="row">${esc(d)}</div>`).join('')}</div>
        <div class="tools">${p.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <div class="links">${linksOf(p).map((l) => `<a class="lnk" href="${l.href}" ${ext}>${esc(l.label)} ↗</a>`).join('')}</div>
      </aside>
    </div>`; } },

  about: { title: 'about-me.txt', w: 560, h: 640, cls: 'about', render: () => `
    <div class="pane">
      <h2>hi, i'm radhika.</h2>
      <p class="lead">I like figuring out how things could be better, look better, or work in a way they didn’t before.</p>
      <p>I’m the Design Lead at Google Developer Groups on Campus, VIT Vellore, where I lead the design team and shape the club’s branding and creative direction. I also freelance as a designer, and spend a lot of my time moving between design and code, building products, experimenting with AI, and teaching myself things I probably didn’t need to start learning at 2 a.m.</p>
      <p class="rest">I study Computer Science at VIT, graduating in 2027. I don’t have one thing I want to make forever. For now, I’m happy making a lot of different things, and seeing where they take me.</p>
      <div class="facts">
        <div><span style="color:#28C840">●</span><span>looking for product engineer, design engineer and APM roles</span></div>
        <div><span style="color:#0A84FF">●</span><span>happiest on small teams where designing it and shipping it are the same job</span></div>
        <div><span style="color:#FF6B9A">●</span><span>off the clock: collecting references on <a href="https://in.pinterest.com/qtfrootie/" ${ext}>Pinterest</a></span></div>
      </div>
    </div>` },

  exp: { title: 'experience.pdf', w: 800, h: 680, cls: 'exp', render: () => `
    <div class="pane">
      ${EXPERIENCE.map((e) => `<article class="job">
        <div class="when">${esc(e.when)}${e.logo ? '<span class="mark logo"><img src="assets/ui/gdg_logo.png" alt="Google Developer Groups logo"></span>' : `<span class="mark" style="background:${e.tint}">${e.mark}</span>`}</div>
        <div><h3>${esc(e.role)}</h3><div class="org">${esc(e.org)}</div>
          <ul>${e.pts.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          ${e.link ? `<a class="lnk" href="${e.link.href}" ${ext}>${esc(e.link.label)} ↗</a>` : ''}
        </div>
      </article>`).join('')}
    </div>` },

  skills: { title: 'Skills', w: 780, h: 520, cls: 'skillswin', render: () => {
    const c = SKILLS[state.cat];
    return `
    <div class="pane skills">
      <nav class="sidebar" style="width:210px" aria-label="Skill areas">
        ${SKILLS.map((s, i) => `<button class="cat ${i === state.cat ? 'on' : ''}" data-cat="${i}" aria-pressed="${i === state.cat}"><i style="background:${s.color}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${s.icon}"/></svg></i>${esc(s.name)}</button>`).join('')}
      </nav>
      <div class="skillpane">
        <div class="skillhead"><i style="background:${c.color}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${c.icon}"/></svg></i><div><h2>${esc(c.name)}</h2><p>${esc(c.note)}</p></div></div>
        <div class="pills">${c.items.map((t, i) => `<span class="pill" style="animation-delay:${i * 30}ms">${esc(t)}</span>`).join('')}</div>
      </div>
    </div>`; } },

  terminal: { title: 'radhika — zsh', w: 680, h: 400, cls: 'term', render: () => `
    <div class="pane">
      <div><span class="p">~</span> $ whoami</div>
      <div class="o1">radhika · design lead @ google developer groups on campus, vit vellore · cs '27</div>
      <div><span class="p">~</span> $ open https://bagsy-pi.vercel.app</div>
      <div class="o1">bagsy: plan it, pack it, post it. live on vercel</div>
      <div><span class="p">~</span> $ cat stack.txt</div>
      <div class="o2">react  node  express  mongodb  python  java  sql  aws  oci  n8n</div>
      <div><span class="p">~</span> $ cat certs.txt</div>
      <div class="o3">OCI 2025 Generative AI Professional · Google UX Design (in progress)</div>
      <div><span class="p">~</span> $ <span class="caret"></span></div>
    </div>` },

  mail: { title: 'New message', w: 560, h: 460, cls: 'mail', render: () => `
    <div class="pane">
      <div class="mrow"><span>To:</span><span id="email">${EMAIL}</span><button class="copy" data-copy="${EMAIL}">Copy</button></div>
      <label class="mrow"><span>Subject:</span><input id="m-sub" type="text" value="Let's work together" autocomplete="off"></label>
      <textarea id="m-body" class="mbody" placeholder="Hi Radhika, I'd love to talk about…"></textarea>
      <div class="mfoot">
        <button class="send" data-send="gmail">Send with Gmail</button>
        <button class="lnk" data-send="app">Use my mail app</button>
        <a class="lnk" href="${LINKEDIN}" ${ext}>LinkedIn ↗</a>
        <a class="lnk" href="${GITHUB}" ${ext}>GitHub ↗</a>
      </div>
    </div>` }
};
