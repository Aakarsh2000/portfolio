import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../data/resumeData';

const allSkills = skillCategories.flatMap((cat) =>
  cat.skills.map((s) => ({ ...s, category: cat.id }))
);

const TABS = [
  { id: 'all',      label: 'All',      sql: 'SELECT * FROM skills ORDER BY category' },
  { id: 'backend',  label: 'Backend',  sql: "SELECT * FROM skills WHERE category = 'backend'" },
  { id: 'frontend', label: 'Frontend', sql: "SELECT * FROM skills WHERE category = 'frontend'" },
  { id: 'ml',       label: 'ML / AI',  sql: "SELECT * FROM skills WHERE category = 'ml'" },
  { id: 'devops',   label: 'DevOps',   sql: "SELECT * FROM skills WHERE category = 'devops'" },
];

const CATEGORY_COLORS = {
  backend:  { text: '#61afef', bg: 'rgba(97,175,239,0.1)',  border: 'rgba(97,175,239,0.25)',  label: 'Backend'  },
  frontend: { text: '#56b6c2', bg: 'rgba(86,182,194,0.1)',  border: 'rgba(86,182,194,0.25)',  label: 'Frontend' },
  ml:       { text: '#c678dd', bg: 'rgba(198,120,221,0.1)', border: 'rgba(198,120,221,0.25)', label: 'ML / AI'  },
  devops:   { text: '#98c379', bg: 'rgba(152,195,121,0.1)', border: 'rgba(152,195,121,0.25)', label: 'DevOps'   },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [typedQuery, setTypedQuery] = useState('');
  const [queryReady, setQueryReady] = useState(false);
  const [runFlashing, setRunFlashing] = useState(false);

  const tab = TABS.find((t) => t.id === activeTab);

  // Runs on mount AND on every tab change
  useEffect(() => {
    const full = tab.sql;
    setTypedQuery('');
    setQueryReady(false);
    setRunFlashing(false);

    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedQuery(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        // Simulate Run button click flash, then show results
        setTimeout(() => setRunFlashing(true), 80);
        setTimeout(() => { setRunFlashing(false); setQueryReady(true); }, 520);
      }
    }, 18);

    return () => clearInterval(id);
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const displaySkills =
    activeTab === 'all'
      ? allSkills
      : skillCategories.find((c) => c.id === activeTab)?.skills.map((s) => ({ ...s, category: activeTab })) ?? [];

  const count = activeTab === 'all' ? allSkills.length : displaySkills.length;

  return (
    <div className="relative py-20 px-6" style={{ background: '#0d1117' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(51,103,145,0.4)',
            background: '#0d1520',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* pgAdmin title bar */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 border-b"
            style={{ background: '#0a1018', borderColor: 'rgba(51,103,145,0.2)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
            </div>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(91,155,213,0.15)" stroke="#5b9bd5" strokeWidth="1.5"/>
              <path d="M8 11c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#7eb5d6" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="10" r="1" fill="#7eb5d6"/>
              <circle cx="14" cy="10" r="1" fill="#7eb5d6"/>
            </svg>
            <span className="font-mono text-xs font-semibold" style={{ color: '#5b9bd5' }}>PostgreSQL</span>
            <span className="font-mono text-xs" style={{ color: '#4b5563' }}>— sai_db @ localhost:5432</span>
            <div className="ml-auto flex items-center gap-1.5 font-mono text-xs" style={{ color: '#22c55e' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              Connected
            </div>
          </div>

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 px-4 py-2 font-mono text-xs border-b"
            style={{ background: '#0c1420', borderColor: 'rgba(51,103,145,0.1)', color: '#4b5563' }}
          >
            <span style={{ color: '#5b9bd5' }}>sai_db</span>
            <span>›</span>
            <span style={{ color: '#7eb5d6' }}>public</span>
            <span>›</span>
            <span style={{ color: '#7eb5d6' }}>skills</span>
            <span className="ml-auto" style={{ color: '#1e3a5f' }}>
              {allSkills.length} rows · {skillCategories.length} categories
            </span>
          </div>

          <div className="p-8 md:p-10">
            {/* Section header */}
            <div className="text-center mb-10">
              <span className="section-tag">Technical Skills</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                What I <span className="gradient-text">Work With</span>
              </h2>
              <p className="max-w-xl mx-auto text-slate-400 text-lg">
                Select a category to query the skills table.
              </p>
            </div>

            {/* Query editor */}
            <div
              className="rounded-xl overflow-hidden mb-6"
              style={{ border: '1px solid rgba(51,103,145,0.2)', background: '#080e18' }}
            >
              <div
                className="flex items-center gap-3 px-4 py-2 border-b"
                style={{ background: '#0a1018', borderColor: 'rgba(51,103,145,0.15)' }}
              >
                <span className="font-mono text-xs" style={{ color: '#374151' }}>Query Editor</span>
                <div className="ml-auto">
                  <motion.button
                    animate={runFlashing ? { scale: 0.93, background: 'rgba(91,155,213,0.4)' } : { scale: 1, background: 'rgba(91,155,213,0.15)' }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-semibold"
                    style={{ border: '1px solid rgba(91,155,213,0.3)', color: '#5b9bd5' }}
                  >
                    ▶ Run
                  </motion.button>
                </div>
              </div>

              <div className="px-4 py-3 font-mono text-sm min-h-[44px] flex items-center flex-wrap gap-x-1.5">
                {/* Render typed query with syntax coloring */}
                {(() => {
                  // Colorize keywords as they appear in typedQuery
                  const q = typedQuery;
                  const parts = [];
                  let rest = q;

                  const tokens = [
                    { re: /^SELECT/, color: '#56b6c2' },
                    { re: /^\*/, color: '#e2e8f0' },
                    { re: /^FROM/, color: '#56b6c2' },
                    { re: /^skills/, color: '#61afef' },
                    { re: /^WHERE/, color: '#56b6c2' },
                    { re: /^category/, color: '#61afef' },
                    { re: /^=/, color: '#e2e8f0' },
                    { re: /^'[^']*'?/, color: '#98c379' },
                    { re: /^ORDER/, color: '#56b6c2' },
                    { re: /^BY/, color: '#56b6c2' },
                    { re: /^\s+/, color: null },
                  ];

                  let key = 0;
                  while (rest.length > 0) {
                    let matched = false;
                    for (const { re, color } of tokens) {
                      const m = rest.match(re);
                      if (m) {
                        if (color) parts.push(<span key={key++} style={{ color }}>{m[0]}</span>);
                        else parts.push(<span key={key++}> </span>);
                        rest = rest.slice(m[0].length);
                        matched = true;
                        break;
                      }
                    }
                    if (!matched) { parts.push(<span key={key++} style={{ color: '#e2e8f0' }}>{rest[0]}</span>); rest = rest.slice(1); }
                  }

                  return parts;
                })()}
                {!queryReady && (
                  <span
                    className="inline-block w-[7px] h-[14px] align-middle rounded-sm"
                    style={{ background: '#5b9bd5', animation: 'cursorBlink 0.6s step-end infinite' }}
                  />
                )}
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {TABS.map((t) => {
                const isActive = activeTab === t.id;
                const cnt = t.id === 'all' ? allSkills.length : (skillCategories.find(c => c.id === t.id)?.skills.length ?? 0);
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono font-medium transition-all duration-200"
                    style={{
                      background: isActive ? 'rgba(91,155,213,0.15)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isActive ? 'rgba(91,155,213,0.4)' : 'rgba(255,255,255,0.06)'}`,
                      color: isActive ? '#5b9bd5' : '#4b5563',
                      boxShadow: isActive ? '0 0 14px rgba(91,155,213,0.12)' : 'none',
                    }}
                  >
                    {t.label}
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: isActive ? 'rgba(91,155,213,0.2)' : 'rgba(255,255,255,0.05)',
                        color: isActive ? '#7eb5d6' : '#374151',
                      }}
                    >
                      {cnt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {queryReady && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(51,103,145,0.2)' }}
                >
                  {/* Results header */}
                  <div
                    className="flex items-center justify-between px-4 py-2 border-b font-mono text-xs"
                    style={{ background: '#0a1018', borderColor: 'rgba(51,103,145,0.15)', color: '#4b5563' }}
                  >
                    <span>Results</span>
                    <span>{count} rows · {Date.now() % 80 + 3}ms</span>
                  </div>

                  <div className="p-5" style={{ background: '#080e18' }}>
                    {activeTab === 'all' ? (
                      /* Grouped by category */
                      <div className="space-y-6">
                        {skillCategories.map((cat, ci) => {
                          const c = CATEGORY_COLORS[cat.id];
                          return (
                            <motion.div
                              key={cat.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: ci * 0.06 }}
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <span
                                  className="font-mono text-xs px-2 py-0.5 rounded"
                                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                                >
                                  {c.label}
                                </span>
                                <span className="font-mono text-xs" style={{ color: '#1e3a5f' }}>
                                  {cat.skills.length} rows
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill, i) => (
                                  <motion.span
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.12, delay: ci * 0.06 + i * 0.025 }}
                                    className="font-mono text-sm px-3 py-1.5 rounded-lg cursor-default"
                                    style={{
                                      color: c.text,
                                      background: c.bg,
                                      border: `1px solid ${c.border}`,
                                    }}
                                  >
                                    {skill.name}
                                  </motion.span>
                                ))}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Single category chips */
                      <div className="flex flex-wrap gap-2">
                        {displaySkills.map((skill, i) => {
                          const c = CATEGORY_COLORS[skill.category];
                          return (
                            <motion.span
                              key={skill.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.12, delay: i * 0.03 }}
                              className="font-mono text-sm px-3 py-1.5 rounded-lg cursor-default"
                              style={{ color: c.text, background: c.bg, border: `1px solid ${c.border}` }}
                            >
                              {skill.name}
                            </motion.span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
