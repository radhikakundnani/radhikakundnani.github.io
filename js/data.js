// All the content on the site lives here.
// To add or reorder a project, edit the PROJECTS list. The desktop folders,
// the Projects window and the phone home screen all follow this order.

export const EMAIL = 'radhikakundnani1@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/radhika-kundnani/';
export const GITHUB = 'https://github.com/radhikakundnani';


export const PROJECTS = [
  { id: 'bagsy', file: 'Bagsy', title: 'Bagsy', kind: 'Full-stack web app', year: 'live', tags: ['code', 'design', 'product'],
    imgs: ['bagsy_hero.jpg', 'bagsy_list.jpg'],
    links: [{ label: 'Open Bagsy', href: 'https://bagsy-pi.vercel.app/' }, { label: 'GitHub', href: 'https://github.com/radhikakundnani/bagsy' }],
    blurb: 'A trip planner for people who overpack. Bagsy builds your packing list from the weather on your actual dates, sorts anything you type with a small model trained on 466 items, and keeps your whole crew on one list.',
    did: ['Designed and built it end to end; live on Vercel', 'Weather-based lists, an item classifier, shared crew lists and an inspo board', 'A 30-second packing mini game, because why not'], tools: ['React', 'Node', 'MongoDB', 'ML'] },
  { id: 'leadsquared', file: 'LeadSquared', title: 'Test & Explain', kind: 'Product case study', year: '2026', tags: ['product', 'design'],
    imgs: ['lsq.jpg'], figma: 'k42HtMCC4kBTB9epy9GLn2',
    links: [{ label: 'Case study', href: 'https://app.notion.com/p/Fewer-Tickets-Faster-Go-Live-Making-LeadSquared-Automations-Self-Serve-3f30c702a953818a93c2ea50172f151e' }],
    blurb: 'Why do LeadSquared customers keep filing tickets about automations? 50% of reviewers blamed setup and only 22% blamed support, so I designed a check that runs before an automation goes live.',
    did: ['Read 18 reviews and scored 6 ideas with RICE', 'Wrote the PRD: personas, 7 user stories, success metrics', 'Wireframed impact preview, risk warnings and test runs; caught a workload risk and added round-robin'], tools: ['PRD', 'RICE', 'Figma'] },
  { id: 'devjams25', file: 'DevJams 25', title: "DevJams'25", kind: 'Hackathon website + portal', year: '2025', tags: ['design', 'product'],
    imgs: ['dj25_hero.jpg', 'dj25_tracks.jpg', 'dj25_all.jpg'], teamFigma: 'AifNs025vrTd15Qf8MVuBv',
    blurb: 'The website and participant portal for our flagship hackathon: log in, onboard, create or join a team, pick a track, submit your idea. A black grid in an electric-blue frame, with a pile of stickers that makes forms feel like a party.',
    did: ['Designed the site and the full participant flow: login, onboarding, teams, dashboard, idea submission', 'A sticker set (LETS HACK, the DJ badge, the dino) reused across every screen'], tools: ['Figma', 'user flows', 'stickers'] },
  { id: 'devjams24', file: 'DevJams 24', title: "DevJams'24", kind: 'Hackathon website', year: '2024', tags: ['design'],
    imgs: ['dj24_center.jpg'], teamFigma: 'lFDcEKdRCs8thOWBh41YOs',
    blurb: "The hero is the Chrome dino game ('press space to play!'), with a pixel countdown, dino FAQs and a full timeline.",
    did: ['Branding and website for the hackathon', 'Dino easter eggs and game states', 'Timeline, tracks, sponsors and FAQ sections'], tools: ['Figma', 'branding'] },
  { id: 'riviera', file: 'Riviera 25', title: "Riviera'25", kind: 'Festival website', year: '2025', tags: ['design'],
    imgs: ['riv_hero.jpg', 'riv_shows.jpg'], teamFigma: 'rMyDgVAhTrMLqZHLsgrgRa',
    blurb: "VIT's culture fest, with concert-poster energy: a brush-script logo, stage photography and a polaroid wall of past proshows.",
    did: ['Designed the official website and its design system', 'Hero, about, proshows, team and sponsor sections', 'High-fidelity prototype for handoff'], tools: ['Figma', 'Framer'] },
  { id: 'gravitas', file: 'graVITas 25', title: "graVITas'25", kind: 'Festival website', year: '2025', tags: ['design', 'product'],
    imgs: ['grav25_hero.jpg', 'grav25_events.jpg', 'grav25_team.jpg'], teamFigma: 'Pjdbsdx7uRDf5bb2W9lWPk',
    blurb: "The main website for VIT's flagship tech fest. A dark tech grid with purple and lime accents, built to browse hundreds of events: search, filters, event cards, profiles, team and merch.",
    did: ['Designed the main website: landing, events listing, event details, profiles and login', 'Built the visual system: grid, purple and lime accents, event badges', 'Prepared the developer handoff in Figma'],
    tools: ['Figma', 'design system', 'handoff'] },
  { id: 'wt', file: 'Women Techies', title: "Women Techies'26", kind: 'Hackathon website', year: '2026', tags: ['design'],
    imgs: ['wt_hero.jpg'], teamFigma: 'b1d5qeAxUB2zFWetUojmuQ',
    blurb: "'Develop like a Diva.' A hand-drawn hand holding a ticket, quote-mark stickers and a loud violet and orange palette for one of our flagship hackathons.",
    did: ['Hero, about, FAQ, past events and sponsor sections', 'Problem statements page for the hackathon'], tools: ['Figma'] },
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
  { id: 'hexathon', file: 'Hexathon 26', title: "Hexathon'26", kind: 'Hackathon portal', year: '2026', tags: ['design', 'product'],
    imgs: ['hex_splash.jpg', 'hex_market.jpg', 'hex_home.jpg'], teamFigma: 'SKVZKKZ7WTlaaAjebuaMME',
    blurb: 'A design hackathon where teams spend hexcoins in a marketplace to buy their typeface, palette and illustration style. Indian truck art meets a dashboard.',
    did: ['Designed the team portal: splash, sign in, marketplace, problem statements, submissions', 'Turned the competition rules into a shopping flow with a checkout'], tools: ['Figma', 'product flows', 'illustration'] },
  { id: 'gdg', file: 'Developer Groups', title: 'Google Developer Groups on Campus', kind: 'Design Lead, VIT Vellore', year: '2023–now', tags: ['design', 'product'],
    imgs: ['gdg_events.jpg'], cover: true, teamFigma: 'W2IA17AeBB2hdktUntqhjA',
    blurb: 'Inner core member turned Design Lead. I lead the design team and shape the club’s branding and creative direction, including our three flagship hackathons: DevJams, Hexathon and Women Techies.',
    did: ['Lead UI/UX, graphics, merch and marketing design', 'Run the design team and its reviews', 'Coordinate design, tech and marketing for our hackathons'], tools: ['leadership', 'branding'] }
];

export const TAGS = [['all', 'All', '#B5B5BD'], ['design', 'Design', '#FF6B9A'], ['product', 'Product', '#FEBC2E'], ['code', 'Code', '#0A84FF'], ['framer', 'Framer', '#7C5CF0']];

export const EXPERIENCE = [
  { when: '2023 – now', logo: true, role: 'Design Lead', org: 'Google Developer Groups on Campus, VIT Vellore',
    pts: ['Promoted from Inner Core Member to Design Lead', 'Lead the design team and shape the club’s branding and creative direction', 'Design for our three flagship hackathons, DevJams, Hexathon and Women Techies, reaching 1,000+ students'] },
  { when: 'May – Jul 2025', mark: 'M', tint: 'linear-gradient(160deg,#34D399,#0E9F6E)', role: 'AI/ML Engineering Intern', org: 'MindMap Digital, Bangalore',
    pts: ['Six weeks building automation with n8n, from core nodes and API integration to production workflows', 'Shipped 3 AI-integrated workflows with documentation, connecting Gmail, Outlook, Telegram and WhatsApp', 'An Outlook email agent that sorts mail by intent and drafts replies, and a LinkedIn lead generator that feeds the CRM'],
    link: { label: 'Read my internship report', href: 'https://app.notion.com/p/n8n-Automation-Projects-Internship-Report-25-2250728d5a27801aad38f58060a58e06' } },
  { when: '2025 – 2026', mark: 'F', tint: 'linear-gradient(160deg,#C4B5FD,#7C5CF0)', role: 'Freelance Product Designer & Developer', org: 'EmberQuant (2025) · RefleXant (2026)',
    pts: ['Gathered requirements from founders and turned brand and conversion goals into structure, wireframes and final designs', 'Built both sites in Framer for desktop, tablet and mobile'] },
  { when: 'Expected 2027', mark: 'V', tint: 'linear-gradient(160deg,#FCD34D,#F59E0B)', role: 'B.Tech, Computer Science', org: 'Vellore Institute of Technology',
    pts: ['OCI 2025 Generative AI Professional (Oracle)', 'Google UX Design Certificate, in progress'] }
];

export const SKILLS = [
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
