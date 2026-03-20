import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../data/resumeData';

const CATEGORY_ICONS = {
  backend: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  frontend: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  ml: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  devops: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
};

const CATEGORY_COLORS = {
  backend: { accent: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)', bar: 'from-indigo-500 to-purple-500' },
  frontend: { accent: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.25)', bar: 'from-cyan-500 to-blue-500' },
  ml: { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', bar: 'from-purple-500 to-pink-500' },
  devops: { accent: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', bar: 'from-emerald-500 to-teal-500' },
};

function SkillChip({ name, color, accent, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 cursor-default"
      style={{
        background: `${accent}12`,
        borderColor: `${accent}30`,
        color: `${accent}dd`,
      }}
      whileHover={{
        background: `${accent}22`,
        borderColor: `${accent}60`,
        scale: 1.04,
        transition: { duration: 0.15 },
      }}
    >
      {name}
    </motion.span>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('backend');

  const active = skillCategories.find((c) => c.id === activeCategory);
  const colors = CATEGORY_COLORS[activeCategory];

  return (
    <div className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Technical Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            What I{' '}
            <span className="gradient-text">Work With</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            Click a category to see the technologies I work with.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {skillCategories.map((cat) => {
            const c = CATEGORY_COLORS[cat.id];
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: isActive ? c.bg : 'rgba(17,24,39,0.6)',
                  border: `1px solid ${isActive ? c.accent : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? c.accent : '#94a3b8',
                  boxShadow: isActive ? `0 0 20px ${c.accent}20` : 'none',
                }}
              >
                <span style={{ color: isActive ? c.accent : '#64748b' }}>
                  {CATEGORY_ICONS[cat.id]}
                </span>
                {cat.label}
                <span
                  className="text-xs px-1.5 py-0.5 rounded-md font-mono"
                  style={{
                    background: isActive ? `${c.accent}20` : 'rgba(255,255,255,0.05)',
                    color: isActive ? c.accent : '#64748b',
                  }}
                >
                  {cat.skills.length}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="card-dark p-8"
            style={{
              borderColor: colors.border,
              background: `linear-gradient(135deg, rgba(17,24,39,0.9) 0%, ${colors.bg} 100%)`,
            }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.accent }}
              >
                {CATEGORY_ICONS[activeCategory]}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{active?.label}</h3>
                <p className="text-slate-500 text-sm">
                  {active?.skills.length} technologies
                </p>
              </div>
            </div>

            {/* Skill chips */}
            <div className="flex flex-wrap gap-3">
              {active?.skills.map((skill, i) => (
                <SkillChip
                  key={skill.name}
                  name={skill.name}
                  color={colors.bar}
                  accent={colors.accent}
                  index={i}
                />
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Tech cloud — quick tags overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {skillCategories.flatMap((cat) =>
            cat.skills.map((s) => (
              <span key={`${cat.id}-${s.name}`} className="tag-pill">
                {s.name}
              </span>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
