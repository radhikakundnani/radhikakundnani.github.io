/* radhika.OS — window manager + content */
(() => {
  'use strict';

  /* ---------------- content ---------------- */
  const A = (f) => 'assets/' + f;
  const FIGMA = (k) => 'https://www.figma.com/design/' + k;

  const PROJECTS = [
    { id: 'gravitas', file: 'graVITas 25', title: "graVITas'25", kind: 'Festival website', year: '2025', tags: ['design', 'product'],
      imgs: ['grav25_hero.jpg', 'grav25_events.jpg', 'grav25_team.jpg'], teamFigma: 'Pjdbsdx7uRDf5bb2W9lWPk',
      blurb: "The main website for VIT's flagship tech fest. A dark tech grid with purple and lime accents, built to browse hundreds of events: search, filters, event cards, profiles, team and merch.",
      did: ['Designed the main website: landing, events listing, event details, profiles and login', 'Built the visual system: grid, purple and lime accents, event badges', 'Prepared the developer handoff in Figma'],
      tools: ['Figma', 'design system', 'handoff'] },
    { id: 'wt', file: 'Women Techies', title: "Women Techies'26", kind: 'Hackathon website', year: '2026', tags: ['design'],
      imgs: ['wt_hero.jpg'], teamFigma: 'b1d5qeAxUB2zFWetUojmuQ',
      blurb: "'Develop like a Diva.' A hand-drawn hand holding a ticket, quote-mark stickers and a loud violet and orange palette for one of our flagship hackathons.",
      did: ['Hero, about, FAQ, past events and sponsor sections', 'Problem statements page for the hackathon'], tools: ['Figma'] },
    { id: 'devjams25', file: 'DevJams 25', title: "DevJams'25", kind: 'Hackathon website + portal', year: '2025', tags: ['design', 'product'],
      imgs: ['dj25_hero.jpg', 'dj25_tracks.jpg', 'dj25_all.jpg'], teamFigma: 'AifNs025vrTd15Qf8MVuBv',
      blurb: 'The website and participant portal for our flagship hackathon: log in, onboard, create or join a team, pick a track, submit your idea. A black grid in an electric-blue frame, with a pile of stickers that makes forms feel like a party.',
      did: ['Designed the site and the full participant flow: login, onboarding, teams, dashboard, idea submission', 'A sticker set (LETS HACK, the DJ badge, the dino) reused across every screen'], tools: ['Figma', 'user flows', 'stickers'] },
    { id: 'riviera', file: 'Riviera 25', title: "Riviera'25", kind: 'Festival website', year: '2025', tags: ['design'],
      imgs: ['riv_hero.jpg', 'riv_shows.jpg'], teamFigma: 'rMyDgVAhTrMLqZHLsgrgRa',
      blurb: "VIT's culture fest, with concert-poster energy: a brush-script logo, stage photography and a polaroid wall of past proshows.",
      did: ['Designed the official website and its design system', 'Hero, about, proshows, team and sponsor sections', 'High-fidelity prototype for handoff'], tools: ['Figma', 'Framer'] },
    { id: 'reflexant', file: 'RefleXant', title: 'RefleXant', kind: 'Website + brand · freelance', year: '2026', tags: ['design', 'product', 'framer'],
      imgs: ['rfx_hero.jpg', 'rfx_loop.jpg', 'rfx_inst.jpg', 'reflxnt.jpg'], figma: 'Dyjmlst7zSaW8zyQXv3dHe',
      framer: 'https://framer.com/projects/Other-Pentagon--KSGl6IT8v4RNlqEajHOa-aU2Mq?node=augiA20Il',
      blurb: "An assessment and coaching platform for workplaces. I built the site around one idea, 'a rhythm, not a report': an editorial serif, soft violet light and an AI coach called Rubi.",
      did: ['Brand guidelines: logo, colour, type, icons and voice', 'Site design: hero, coaching loop, the four assessments, Rubi', 'Built the responsive site in Framer'], tools: ['Figma', 'Framer', 'branding'] },
    { id: 'emberquant', file: 'EmberQuant', title: 'EmberQuant', kind: 'Landing page · freelance', year: '2025', tags: ['design', 'product', 'framer'],
      imgs: ['eq_chart.jpg', 'eq_hero.jpg'], figma: 'yQRTk2yGiOLS2vVyulzu8F',
      framer: 'https://framer.com/projects/EQ-project--qVYihb7aOgCJWLdijoYx-4PYW2?node=QjDzOUfKr',
      blurb: "An agentic finance company that needed to explain autonomous AI agents to business buyers. I turned the founders' goals into a calm, credible landing page: one clear promise, 'Quantifying Excellence', with a live-looking sales chart as proof.",
      did: ['Gathered requirements from the founders and planned the page structure', 'Took it from wireframes to high-fidelity in Figma', 'Built the responsive site in Framer for desktop, tablet and mobile'], tools: ['Figma', 'Framer', 'landing page'] },
    { id: 'devjams24', file: 'DevJams 24', title: "DevJams'24", kind: 'Hackathon website', year: '2024', tags: ['design'],
      imgs: ['dj24_center.jpg'], teamFigma: 'lFDcEKdRCs8thOWBh41YOs',
      blurb: "The hero is the Chrome dino game ('press space to play!'), with a pixel countdown, dino FAQs and a full timeline.",
      did: ['Branding and website for the hackathon', 'Dino easter eggs and game states', 'Timeline, tracks, sponsors and FAQ sections'], tools: ['Figma', 'branding'] },
    { id: 'hexathon', file: 'Hexathon 26', title: "Hexathon'26", kind: 'Hackathon portal', year: '2026', tags: ['design', 'product'],
      imgs: ['hex_splash.jpg', 'hex_market.jpg', 'hex_home.jpg'], teamFigma: 'SKVZKKZ7WTlaaAjebuaMME',
      blurb: 'A design hackathon where teams spend hexcoins in a marketplace to buy their typeface, palette and illustration style. Indian truck art meets a dashboard.',
      did: ['Designed the team portal: splash, sign in, marketplace, problem statements, submissions', 'Turned the competition rules into a shopping flow with a checkout'], tools: ['Figma', 'product flows', 'illustration'] },
    { id: 'leadsquared', file: 'LeadSquared', title: 'Test & Explain', kind: 'Product case study', year: '2026', tags: ['product', 'design'],
      imgs: ['lsq.jpg'], figma: 'k42HtMCC4kBTB9epy9GLn2',
      links: [{ label: 'Case study', href: 'https://app.notion.com/p/Fewer-Tickets-Faster-Go-Live-Making-LeadSquared-Automations-Self-Serve-3f30c702a953818a93c2ea50172f151e' }],
      blurb: 'Why do LeadSquared customers keep filing tickets about automations? 50% of reviewers blamed setup and only 22% blamed support, so I designed a check that runs before an automation goes live.',
      did: ['Read 18 reviews and scored 6 ideas with RICE', 'Wrote the PRD: personas, 7 user stories, success metrics', 'Wireframed impact preview, risk warnings and test runs; caught a workload risk and added round-robin'], tools: ['PRD', 'RICE', 'Figma'] },
    { id: 'bagsy', file: 'Bagsy', title: 'Bagsy', kind: 'Full-stack web app', year: 'live', tags: ['code', 'design', 'product'],
      imgs: ['bagsy_hero.jpg', 'bagsy_list.jpg'],
      links: [{ label: 'Open Bagsy', href: 'https://bagsy-pi.vercel.app/' }, { label: 'GitHub', href: 'https://github.com/radhikakundnani/bagsy' }],
      blurb: 'A trip planner for people who overpack. Bagsy builds your packing list from the weather on your actual dates, sorts anything you type with a small model trained on 466 items, and keeps your whole crew on one list.',
      did: ['Designed and built it end to end; live on Vercel', 'Weather-based lists, an item classifier, shared crew lists and an inspo board', 'A 30-second packing mini game, because why not'], tools: ['React', 'Node', 'MongoDB', 'ML'] },
    { id: 'gdg', file: 'Developer Groups', title: 'Google Developer Groups on Campus', kind: 'Design Lead, VIT Vellore', year: '2023–now', tags: ['design', 'product'],
      imgs: ['gdg_events.jpg'], cover: true, teamFigma: 'W2IA17AeBB2hdktUntqhjA',
      blurb: 'Inner core member turned Design Lead. I lead the design team and shape the club’s branding and creative direction, including our three flagship hackathons: DevJams, Hexathon and Women Techies.',
      did: ['Lead UI/UX, graphics, merch and marketing design', 'Run the design team and its reviews', 'Coordinate design, tech and marketing for our hackathons'], tools: ['leadership', 'branding'] }
  ];

  const TAGS = [['all', 'All', '#B5B5BD'], ['design', 'Design', '#FF6B9A'], ['product', 'Product', '#FEBC2E'], ['code', 'Code', '#0A84FF'], ['framer', 'Framer', '#7C5CF0']];

  const EXPERIENCE = [
    { when: '2023 – now', logo: true, role: 'Design Lead', org: 'Google Developer Groups on Campus, VIT Vellore',
      pts: ['Promoted from Inner Core Member to Design Lead', 'Lead the design team and shape the club’s branding and creative direction', 'Design for our three flagship hackathons, DevJams, Hexathon and Women Techies, reaching 1,000+ students'] },
    { when: 'May – Jul 2025', mark: 'M', tint: 'linear-gradient(160deg,#34D399,#0E9F6E)', role: 'AI/ML Engineering Intern', org: 'MindMap Digital, Bangalore',
      pts: ['Six weeks building automation with n8n, from core nodes and API integration to production workflows', 'Shipped 3 AI-integrated workflows with documentation, connecting Gmail, Outlook, Telegram and WhatsApp', 'An Outlook email agent that sorts mail by intent and drafts replies, and a LinkedIn lead generator that feeds the CRM'],
      link: { label: 'Read my internship report', href: 'https://app.notion.com/p/n8n-Automation-Projects-Internship-Report-25-2250728d5a27801aad38f58060a58e06' } },
    { when: '2025 – 2026', mark: 'F', tint: 'linear-gradient(160deg,#C4B5FD,#7C5CF0)', role: 'Freelance Product Designer & Developer', org: 'EmberQuant (2025) · RefleXant (2026)',
      pts: ['Gathered requirements from founders and turned brand and conversion goals into structure, wireframes and final designs', 'Built both sites in Framer for desktop, tablet and mobile'] },
    { when: 'Expected 2027', mark: 'V', tint: 'linear-gradient(160deg,#FCD34D,#F59E0B)', role: 'B.Tech, Computer Science', org: 'Vellore Institute of Technology · CGPA 8.26',
      pts: ['OCI 2025 Generative AI Professional (Oracle)', 'Google UX Design Certificate, in progress'] }
  ];

  const SKILLS = [
    { name: 'Design', color: 'linear-gradient(160deg,#FF8FB1,#F0457B)', icon: 'M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z', note: 'From the first sketch to the handoff file.',
      items: ['Figma', 'Framer', 'Design systems', 'Wireframing', 'High-fidelity UI', 'Prototyping', 'Branding', 'Creative direction', 'Responsive web'] },
    { name: 'Product', color: 'linear-gradient(160deg,#FFD66B,#F2A900)', icon: 'M4 19h16M7 16V9M12 16V5M17 16v-4', note: 'Working out what to build, and why.',
      items: ['PRDs', 'User stories', 'RICE prioritisation', 'KPIs and success metrics', 'User research', 'Competitive analysis', 'Agile / Scrum'] },
    { name: 'Engineering', color: 'linear-gradient(160deg,#6FB1FF,#2E6BF0)', icon: 'M8 7l-5 5 5 5M16 7l5 5-5 5', note: 'Building and shipping it.',
      items: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Java', 'Python', 'SQL', 'REST APIs', 'JWT auth', 'Tailwind CSS', 'Vite'] },
    { name: 'AI & automation', color: 'linear-gradient(160deg,#5FE3A1,#16A35A)', icon: 'M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2 2M15 15l2 2M7 17l2-2M15 9l2-2', note: 'Workflows and agents that do the boring parts.',
      items: ['n8n', 'LLM APIs', 'Prompt engineering', 'AI agents', 'NLP', 'SHAP / explainability', 'Pinecone'] },
    { name: 'Cloud & tools', color: 'linear-gradient(160deg,#B4B9C4,#6B7180)', icon: 'M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 18z', note: 'Where things run and how I work.',
      items: ['AWS', 'Oracle Cloud (OCI)', 'Supabase', 'Vercel', 'Git and GitHub', 'Notion', 'Claude Code', 'Codex'] },
    { name: 'Certifications', color: 'linear-gradient(160deg,#C4B5FD,#7C5CF0)', icon: 'M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM9 14l-1.5 7L12 19l4.5 2L15 14', note: 'Paper that agrees with me.',
      items: ['OCI 2025 Generative AI Professional (Oracle)', 'Google UX Design Certificate (in progress)'] }
  ];

  /* ---------------- helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isPhone = () => window.matchMedia('(max-width: 820px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const byId = (id) => PROJECTS.find((p) => p.id === id);
  const linksOf = (p) => [
    ...(p.framer ? [{ label: 'Framer file', href: p.framer }] : []),
    ...(p.figma ? [{ label: 'Figma file', href: FIGMA(p.figma) }] : []),
    ...(p.links || [])
  ];
  const ext = 'target="_blank" rel="noopener"';

  const FOLDER_SVG = '<svg width="72" height="58" viewBox="0 0 72 58" aria-hidden="true"><path d="M5 10.5A4.5 4.5 0 0 1 9.5 6h15.2a4.5 4.5 0 0 1 3.4 1.5l2.6 3H62.5A4.5 4.5 0 0 1 67 15v8H5z" fill="#55A8EC"/><path d="M5 18.5A4.5 4.5 0 0 1 9.5 14h53A4.5 4.5 0 0 1 67 18.5v30a4.5 4.5 0 0 1-4.5 4.5h-53A4.5 4.5 0 0 1 5 48.5z" fill="#86CAF9"/><path d="M9.5 14.75h53a3.75 3.75 0 0 1 3.75 3.75M5.75 18.5A3.75 3.75 0 0 1 9.5 14.75" fill="none" stroke="#D6EEFE" stroke-width="1.5" stroke-linecap="round"/><path d="M5.6 48.5a3.9 3.9 0 0 0 3.9 3.9h53a3.9 3.9 0 0 0 3.9-3.9" fill="none" stroke="#4FA3E6" stroke-opacity=".55"/></svg>';
  const X = '<svg viewBox="0 0 8 8"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#000" stroke-width="1.2" stroke-linecap="round"/></svg>';
  const MIN = '<svg viewBox="0 0 8 8"><path d="M1.5 4h5" stroke="#000" stroke-width="1.2" stroke-linecap="round"/></svg>';
  const ZOOM = '<svg viewBox="0 0 8 8"><path d="M2 6V2h4M6 2v4H2" stroke="#000" stroke-width="1.1" fill="none" stroke-linecap="round"/></svg>';

  /* ---------------- window definitions ---------------- */
  const state = { filter: 'all', proj: 'gravitas', shot: 0, cat: 0 };

  const WINS = {
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
                <span class="thumb"><img src="${A(p.imgs[0])}" alt="" loading="lazy">${p.framer ? '<span class="badge">Made in Framer</span>' : ''}</span>
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
          <div class="shotbox ${p.cover ? 'cover' : ''}"><img src="${A(imgs[state.shot] || imgs[0])}" alt="${esc(p.title)}, screen ${state.shot + 1}"></div>
          ${imgs.length > 1 ? `<div class="shots">${imgs.map((src, i) => `<button class="shot ${i === state.shot ? 'on' : ''}" data-shot="${i}" aria-label="Show screen ${i + 1}"><img src="${A(src)}" alt=""></button>`).join('')}</div>` : ''}
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
          <div class="when">${esc(e.when)}${e.logo ? '<span class="mark logo"><img src="assets/gdg_logo.png" alt="Google Developer Groups logo"></span>' : `<span class="mark" style="background:${e.tint}">${e.mark}</span>`}</div>
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

    mail: { title: 'New message', w: 560, h: 380, cls: 'mail', render: () => `
      <div class="pane">
        <div class="mrow"><span>To:</span><span id="email">radhikakundnani1@gmail.com</span><button class="copy" data-copy="radhikakundnani1@gmail.com">Copy</button></div>
        <div class="mrow"><span>Subject:</span><span>let's work together</span></div>
        <div class="mbody">Hi Radhika,<br><br>I'd love to talk about…</div>
        <div class="mfoot">
          <a class="lnk" href="mailto:radhikakundnani1@gmail.com?subject=Let's%20work%20together">Send email</a>
          <a class="lnk" href="https://www.linkedin.com/in/radhika-kundnani/" ${ext}>LinkedIn ↗</a>
          <a class="lnk" href="https://github.com/radhikakundnani" ${ext}>GitHub ↗</a>
        </div>
      </div>` }
  };

  const ICON = {
    folder: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z"/></svg>',
    case: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7"/></svg>',
    grid: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" aria-hidden="true"><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="7" r="2.5"/><circle cx="7" cy="17" r="2.5"/><circle cx="17" cy="17" r="2.5"/></svg>',
    person: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    mail: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6.5L20.5 7"/></svg>'
  };

  const shown = () => PROJECTS.filter((p) => state.filter === 'all' || p.tags.includes(state.filter));

  /* ---------------- window manager ---------------- */
  const layer = $('#layer');
  const open = new Map(); // id -> element
  let zTop = 30;
  const cascade = { n: 0 };

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
          <button class="dot r" data-close="${id}" aria-label="Close">${X}</button>
          <button class="dot y" data-min="${id}" aria-label="Minimise">${MIN}</button>
          <button class="dot g" data-zoom="${id}" aria-label="Zoom">${ZOOM}</button>
        </div>
        <span class="ttl">${esc(title(id))}</span>
        ${d.meta ? `<span class="bar-meta">${esc(d.meta())}</span>` : ''}
      </div>
      <div class="body" style="display:contents">${d.render()}</div>`;
    return el;
  }

  function refresh(id) {
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

  function focusWin(id) {
    const el = open.get(id);
    if (!el) return;
    el.classList.remove('min');
    el.style.zIndex = ++zTop;
    syncDock();
  }

  function openWin(id) {
    if (!WINS[id]) return;
    hideNudge();
    if (open.has(id)) { refresh(id); focusWin(id); return; }
    const el = build(id);
    place(id, el);
    layer.appendChild(el);
    open.set(id, el);
    focusWin(id);
    const first = el.querySelector('.pane button, .pane a, .dot.r');
    if (first && !isPhone()) first.focus({ preventScroll: true });
  }

  function closeWin(id) {
    const el = open.get(id);
    if (!el) return;
    open.delete(id);
    syncDock();
    if (reduced) { el.remove(); return; }
    el.classList.add('closing');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }

  function topOpen() {
    let best = null, z = -1;
    open.forEach((el, id) => { const zi = +el.style.zIndex || 0; if (!el.classList.contains('min') && zi > z) { z = zi; best = id; } });
    return best;
  }

  function syncDock() {
    document.querySelectorAll('.run').forEach((r) => r.classList.toggle('on', open.has(r.dataset.run)));
  }

  function openProject(id) {
    if (!byId(id)) return;
    state.proj = id; state.shot = 0;
    if (open.has('case')) { refresh('case'); focusWin('case'); }
    else openWin('case');
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
  }

  /* ---------------- events ---------------- */
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

  /* ---------------- desktop + phone ---------------- */
  function renderFolders() {
    $('#folders').innerHTML = PROJECTS.map((p) => `
      <button class="ico" data-proj="${p.id}" aria-label="Open ${esc(p.title)}">
        <span class="fold">${FOLDER_SVG}</span>
        <span class="lbl">${esc(p.file)}</span>
        <span class="ql"><img src="${A(p.imgs[0])}" alt="" loading="lazy"><span>${esc(p.title)}<small>${esc(p.year)}</small></span></span>
      </button>`).join('');
    $('#phone-apps').innerHTML = PROJECTS.map((p) => `
      <button class="papp" data-proj="${p.id}"><span><img src="${A(p.imgs[0])}" alt="" loading="lazy"></span>${esc(p.title.replace("Google Developer Groups on Campus", 'Developer Groups'))}</button>`).join('');
  }

  function hideNudge() { $('.nudge')?.classList.add('gone'); }

  function tick() {
    const d = new Date();
    $('#clock-date').textContent = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', '');
    $('#clock-time').textContent = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  /* ---------------- start ---------------- */
  renderFolders();
  tick(); setInterval(tick, 15000);

  const fromHash = (location.hash || '').slice(1);
  const bootMs = reduced ? 0 : 3000;
  if (sessionStorageGet('booted')) { const b = $('#boot'); if (b) b.classList.add('skip'); }
  const delay = sessionStorageGet('booted') ? 0 : bootMs;
  sessionStorageSet('booted', '1');

  setTimeout(() => {
    if (fromHash && byId(fromHash)) { openWin('finder'); openProject(fromHash); }
    else if (WINS[fromHash]) openWin(fromHash);
    else if (!isPhone()) openWin('hello');
  }, delay);

  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  window.addEventListener('resize', () => {
    open.forEach((el) => {
      if (el.offsetLeft > window.innerWidth - 120) el.style.left = Math.max(12, window.innerWidth - el.offsetWidth - 12) + 'px';
    });
  });
})();
