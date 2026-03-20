// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO CONFIG — edit this file to personalise the entire portfolio.
// All components pull data from here; nothing personal is hardcoded elsewhere.
// ─────────────────────────────────────────────────────────────────────────────

const config = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: {
    first: 'Sai Aakarsh',
    last: 'Padma',
    full: 'Sai Aakarsh Padma',
    initials: 'SAP',          // shown in navbar logo  <SAP/>
    className: 'SaiAakarshPadma', // used in the About code-block easter egg
  },

  title: 'Backend | Fullstack | ML/AI Engineer',

  // One-liner shown below the typewriter in Hero
  tagline:
    'MS CS @ Texas A&M · Ex-ZEE · Exo Imaging Intern · Building scalable backends, real-time systems, and ML/AI pipelines that solve real problems.',

  // Badge in Hero ("Open to opportunities · ...")
  availability: 'Open to opportunities · May 2026',

  // ── Contact & Social ──────────────────────────────────────────────────────
  email: 'saiaakarshp@gmail.com',

  social: {
    github:          'https://github.com/Aakarsh2000',
    githubHandle:    'Aakarsh2000',
    linkedin:        'https://www.linkedin.com/in/saip2k/',
    linkedinHandle:  'saip2k',
  },

  // ── About section bio paragraphs ─────────────────────────────────────────
  bio: [
    "Hi! I'm <name>, a Master's student in Computer Science at <currentSchool> (graduating <graduationYear>), with a background in Electronics & Communication Engineering from <prevSchool>.",
    "I have industry experience across entertainment tech, healthcare imaging, and academic research — building backend systems, full-stack platforms, and computer vision pipelines at ZEE Entertainment and Exo Imaging. I enjoy working on problems that sit at the boundary of scale, reliability, and intelligence.",
    "Outside of work, I'm drawn to research in LLMs and multimodal ML — areas where I get to combine engineering with curiosity. I like building things that are both technically sound and actually useful.",
  ],

  // ── Education (used in About and the code-block) ─────────────────────────
  currentSchool:    'Texas A&M University',
  graduationYear:   'May 2026',
  prevSchool:       'IIT Kharagpur',
  location:         'College Station, TX',

  // ── Hero stats grid ───────────────────────────────────────────────────────
  stats: [
    { value: '3+',    label: 'Years Experience' },
    { value: '7+',    label: 'Projects Built'   },
    { value: 'MS CS', label: 'Texas A&M'        },
    { value: 'IIT',   label: 'Kharagpur'        },
  ],

  // ── Contact availability card ─────────────────────────────────────────────
  availabilityCard: {
    status:   'Available for full-time roles',
    date:     'Starting May 2026',
    location: 'Open to remote / relocation',
    school:   'Texas A&M University',
  },
};

export default config;
