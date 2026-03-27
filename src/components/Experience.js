import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences, education } from '../data/resumeData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

function ExperienceCard({ exp, index, isExpanded, onToggle }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="relative pl-14"
    >
      {/* Timeline dot */}
      <div
        className="timeline-dot"
        style={{
          top: '24px',
          background: `linear-gradient(135deg, ${exp.color}, ${exp.color}88)`,
          boxShadow: `0 0 12px ${exp.color}66`,
        }}
      />

      {/* Card */}
      <motion.div
        layout
        className="card-dark overflow-hidden"
        style={{ borderColor: `${exp.color}20` }}
        whileHover={{ borderColor: `${exp.color}40` }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <button
          onClick={onToggle}
          className="w-full p-6 text-left flex items-start justify-between gap-4 group"
        >
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `${exp.color}20`,
                border: `1px solid ${exp.color}40`,
                color: exp.color,
              }}
            >
              {exp.logo}
            </div>

            <div className="flex-1 min-w-0">
              {/* Git log line */}
              <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
                <span style={{ color: '#f9a825' }}>commit</span>
                <span style={{ color: '#f9a825' }}>{exp.hash}</span>
                <span
                  className="px-1.5 py-0.5 rounded text-xs"
                  style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}30` }}
                >
                  ({exp.branch})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-white font-bold text-lg leading-tight">{exp.company}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${exp.color}20`, color: exp.color, border: `1px solid ${exp.color}30` }}
                >
                  {exp.type}
                </span>
              </div>
              <p className="text-slate-300 font-medium mb-1">{exp.role}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-slate-500 text-sm font-mono">{exp.period}</span>
                <span className="text-slate-700">·</span>
                <span className="text-slate-500 text-sm">{exp.location}</span>
              </div>
            </div>
          </div>

          {/* Expand toggle */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center rounded-full border border-white/10 text-slate-500 group-hover:border-primary/40 group-hover:text-primary transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0">
                <div className="h-px mb-5" style={{ background: `${exp.color}20` }} />
                <ul className="space-y-3 mb-5">
                  {exp.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.color }} />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium"
                      style={{
                        background: `${exp.color}10`,
                        border: `1px solid ${exp.color}25`,
                        color: exp.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const [expandedId, setExpandedId] = useState(1);
  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="relative py-20 px-6" style={{ background: '#0d1117' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: '1px solid #30363d',
            background: '#161b22',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* GitHub repo title bar */}
          <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b" style={{ borderColor: '#30363d', background: '#161b22' }}>
            <svg className="w-4 h-4 shrink-0" style={{ color: '#8b949e' }} fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
            </svg>
            <span style={{ color: '#58a6ff', fontWeight: 600, fontSize: 14 }}>Aakarsh2000</span>
            <span style={{ color: '#8b949e' }}>/</span>
            <span style={{ color: '#58a6ff', fontWeight: 700, fontSize: 14 }}>work-experience</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium ml-1" style={{ border: '1px solid #30363d', color: '#8b949e' }}>Public</span>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#8b949e' }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                </svg>
                Star
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#8b949e' }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0Z" />
                </svg>
                Fork
              </div>
            </div>
          </div>

          {/* Nav tabs */}
          <div className="flex items-center gap-0 px-4 overflow-x-auto" style={{ background: '#161b22', borderBottom: '1px solid #30363d' }}>
            {[
              { label: 'Code', active: false },
              { label: 'Commits', active: true },
              { label: 'Branches', active: false },
              { label: 'Actions', active: false },
            ].map((tab) => (
              <div
                key={tab.label}
                className="flex items-center gap-1.5 px-4 py-3 text-xs font-medium cursor-default whitespace-nowrap"
                style={{
                  color: tab.active ? '#e6edf3' : '#8b949e',
                  borderBottom: tab.active ? '2px solid #f78166' : '2px solid transparent',
                }}
              >
                {tab.label}
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2 py-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs" style={{ background: '#21262d', border: '1px solid #30363d', color: '#8b949e' }}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.492 2.492 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z" />
                </svg>
                main
              </div>
            </div>
          </div>

          {/* Section content */}
          <div className="p-8 md:p-10">
            {/* Section header */}
            <div className="text-center mb-14">
              <span className="section-tag">Work Experience</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                My{' '}
                <span className="gradient-text">Journey</span>
              </h2>
              <p className="max-w-xl mx-auto text-slate-400 text-lg">
                3+ years of building, shipping, and scaling production systems.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="timeline-line" />
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <ExperienceCard
                    key={exp.id}
                    exp={exp}
                    index={i}
                    isExpanded={expandedId === exp.id}
                    onToggle={() => toggle(exp.id)}
                  />
                ))}
              </div>
            </div>

            {/* Education mini section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-14"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-white/5" />
                <span className="section-tag">Education</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card-dark p-5 flex items-center gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: `${edu.color}22`,
                        border: `1px solid ${edu.color}40`,
                        color: edu.id === 1 ? '#ff6b6b' : '#60a5fa',
                      }}
                    >
                      {edu.logo}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{edu.school}</div>
                      <div className="text-slate-400 text-sm">{edu.degree}</div>
                      <div className="text-slate-500 text-xs font-mono mt-0.5">
                        {edu.period} · {edu.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
