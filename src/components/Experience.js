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

            <div>
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
                {/* Separator */}
                <div className="h-px mb-5" style={{ background: `${exp.color}20` }} />

                {/* Bullets */}
                <ul className="space-y-3 mb-5">
                  {exp.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: exp.color }}
                      />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>

                {/* Tags */}
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
    <div className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Work Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            My{' '}
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            3+ years of building, shipping, and scaling production systems.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
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

        {/* Education mini timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16"
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
    </div>
  );
}
