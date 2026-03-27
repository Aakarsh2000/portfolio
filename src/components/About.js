import React from 'react';
import { motion } from 'framer-motion';
import { education } from '../data/resumeData';
import config from '../data/config';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const HIGHLIGHTS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Backend Systems',
    desc: 'Designing high-throughput, fault-tolerant distributed systems with Redis, Kafka, and microservice architectures.',
    color: '#6366f1',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Fullstack Development',
    desc: 'End-to-end product engineering from React frontends to Node.js/Python APIs and cloud deployments.',
    color: '#06b6d4',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'ML / AI Engineering',
    desc: 'Building multimodal ML models, LLM pipelines with RAG, and real-time CV systems using PyTorch, LangChain, and FAISS.',
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Cloud & DevOps',
    desc: 'AWS & GCP multi-cloud architecture, Docker/Kubernetes containerization, CI/CD with GitHub Actions.',
    color: '#10b981',
  },
];

export default function About() {
  return (
    <div className="relative py-20 px-6" style={{ background: '#0d1117' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(36,150,237,0.3)',
            background: '#1d2d3e',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Docker Desktop title bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b" style={{ background: '#1a2a3a', borderColor: 'rgba(36,150,237,0.15)' }}>
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
            </div>
            {/* Docker whale icon */}
            <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 19h4v4h-4v-4zm-6 0h4v4h-4v-4zm-6 0h4v4h-4v-4zm6-6h4v4h-4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zm-12-6h4v4h-4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" fill="#2496ed"/>
              <path d="M46.6 22.1c-.9-.6-2.9-.8-4.5-.5-.2-1.6-1.1-3-2.7-4.1l-.9-.6-.6.9c-.8 1.2-1.1 3.2-.9 4.7-.4-.2-.9-.5-1.3-.6-1-.4-2.1-.5-3.1-.5H4c-.3 3.3.5 7.4 2.7 10.3 2.5 3.2 6.3 4.8 11.2 4.8 10.7 0 18.6-4.9 22.3-13.8 1.5.1 4.6.1 6.2-3.1.1-.1.4-.8.5-1.1l-.3-.4z" fill="#2496ed"/>
            </svg>
            <span style={{ color: '#2496ed', fontSize: 13, fontWeight: 600 }}>Docker Desktop</span>
            <span style={{ color: '#4b6a8a', fontSize: 13 }}>— portfolio</span>
          </div>

          {/* Container status row */}
          <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b" style={{ background: '#162436', borderColor: 'rgba(36,150,237,0.15)' }}>
            <code className="font-mono text-xs" style={{ color: '#93c5fd' }}>
              docker run --name sai-aakarsh -p 3000:3000 -d portfolio:latest
            </code>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded font-mono font-semibold" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.4)' }}>
                ● RUNNING
              </span>
              <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}>
                Up 3+ years
              </span>
              <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: 'rgba(36,150,237,0.1)', color: '#60a5fa', border: '1px solid rgba(36,150,237,0.25)' }}>
                0.0.0.0:3000-&gt;3000/tcp
              </span>
            </div>
          </div>

          {/* Section content */}
          <div className="p-8 md:p-10">
            {/* Section header */}
            <div className="text-center mb-14">
              <span className="section-tag">About Me</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                Who I{' '}
                <span className="gradient-text">Am</span>
              </h2>
              <p className="max-w-xl mx-auto text-slate-400 text-lg">
                Engineer, researcher, and builder — bridging the gap between theory and production systems.
              </p>
            </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — bio */}
          <div className="space-y-6">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="card-dark p-6 space-y-4"
            >
              <p className="text-slate-300 leading-relaxed">
                Hi! I'm <span className="text-primary font-semibold">{config.name.full}</span>, a
                Master's student in Computer Science at{' '}
                <span className="text-accent font-medium">{config.currentSchool}</span> (graduating
                {' '}{config.graduationYear}), with a background in Electronics & Communication
                Engineering from{' '}
                <span className="text-secondary font-medium">{config.prevSchool}</span>.
              </p>
              <p className="text-slate-400 leading-relaxed">
                I have industry experience across entertainment tech, healthcare imaging, and
                academic research — building backend systems, full-stack platforms, and
                computer vision pipelines at{' '}
                <span className="text-white font-medium">ZEE Entertainment</span> and{' '}
                <span className="text-white font-medium">Exo Imaging</span>. I enjoy working
                on problems that sit at the boundary of scale, reliability, and intelligence.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Outside of work, I'm drawn to research in{' '}
                <span className="text-white font-medium">LLMs and multimodal ML</span> — areas
                where I get to combine engineering with curiosity. I like building things that
                are both technically sound and actually useful.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="card-dark p-6"
            >
              <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: `${edu.color}33`, border: `1px solid ${edu.color}44` }}
                    >
                      <span style={{ color: edu.color === '#500000' ? '#ff6b6b' : '#60a5fa' }}>
                        {edu.logo}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{edu.school}</div>
                      <div className="text-slate-400 text-sm">{edu.degree}</div>
                      <div className="text-slate-500 text-xs mt-0.5 font-mono">
                        {edu.period} · {edu.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-wrap gap-3"
            >
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {config.email}
              </a>
            </motion.div>
          </div>

          {/* Right — highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i * 0.15}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-dark p-5 group cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${item.color}20`,
                    border: `1px solid ${item.color}30`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}

            {/* VS Code IDE card */}
            <motion.div
              variants={fadeUp}
              custom={0.6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="sm:col-span-2 rounded-xl overflow-hidden"
              style={{
                background: '#1e1e2e',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center border-b"
                style={{ background: '#181825', borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex gap-1.5 px-4 py-2.5 shrink-0">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
                </div>
                {/* File tabs */}
                <div className="flex text-xs font-mono overflow-hidden">
                  <div
                    className="px-4 py-2 text-slate-300 border-r"
                    style={{
                      background: '#1e1e2e',
                      borderBottom: '2px solid #6366f1',
                      borderRightColor: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    about.py
                  </div>
                  <div
                    className="px-4 py-2 text-slate-600"
                    style={{ background: '#181825' }}
                  >
                    profile.json
                  </div>
                </div>
              </div>

              {/* Editor body */}
              <div className="flex text-sm font-mono" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                {/* Line numbers */}
                <div
                  className="flex flex-col items-end py-4 px-3 select-none text-xs leading-6 border-r"
                  style={{ color: '#3d3d5c', borderColor: 'rgba(255,255,255,0.04)', minWidth: '40px', background: '#1e1e2e' }}
                >
                  {[1,2,3,4,5,6,7,8].map(n => <span key={n}>{n}</span>)}
                </div>

                {/* Code */}
                <div className="p-4 text-sm leading-6 flex-1 overflow-x-auto">
                  <p>
                    <span style={{ color: '#cba6f7' }}>class</span>{' '}
                    <span style={{ color: '#89dceb' }}>{config.name.className}</span>
                    <span style={{ color: '#6c7086' }}>:</span>
                  </p>
                  <p className="pl-4">
                    <span style={{ color: '#cba6f7' }}>def</span>{' '}
                    <span style={{ color: '#89b4fa' }}>__init__</span>
                    <span style={{ color: '#6c7086' }}>(self):</span>
                  </p>
                  <p className="pl-8">
                    <span style={{ color: '#6c7086' }}>self.</span>
                    <span style={{ color: '#f9e2af' }}>role</span>
                    <span style={{ color: '#6c7086' }}> = </span>
                    <span style={{ color: '#a6e3a1' }}>"Backend | Fullstack | ML/AI"</span>
                  </p>
                  <p className="pl-8">
                    <span style={{ color: '#6c7086' }}>self.</span>
                    <span style={{ color: '#f9e2af' }}>school</span>
                    <span style={{ color: '#6c7086' }}> = </span>
                    <span style={{ color: '#a6e3a1' }}>"{config.currentSchool}"</span>
                  </p>
                  <p className="pl-8">
                    <span style={{ color: '#6c7086' }}>self.</span>
                    <span style={{ color: '#f9e2af' }}>open_to</span>
                    <span style={{ color: '#6c7086' }}> = </span>
                    <span style={{ color: '#a6e3a1' }}>"Full-time ({config.graduationYear})"</span>
                  </p>
                  <p className="pl-8">
                    <span style={{ color: '#6c7086' }}>self.</span>
                    <span style={{ color: '#f9e2af' }}>passion</span>
                    <span style={{ color: '#6c7086' }}> = [</span>
                    <span style={{ color: '#a6e3a1' }}>"systems"</span>
                    <span style={{ color: '#6c7086' }}>, </span>
                    <span style={{ color: '#a6e3a1' }}>"ML"</span>
                    <span style={{ color: '#6c7086' }}>, </span>
                    <span style={{ color: '#a6e3a1' }}>"scalability"</span>
                    <span style={{ color: '#6c7086' }}>]</span>
                  </p>
                  <p className="h-6" />
                  <p>
                    <span style={{ color: '#6c7086' }}>sai = </span>
                    <span style={{ color: '#89dceb' }}>{config.name.className}</span>
                    <span style={{ color: '#6c7086' }}>()</span>
                    <span
                      className="inline-block w-[7px] h-[14px] ml-1 align-middle"
                      style={{ background: '#6366f1', animation: 'cursorBlink 1s step-end infinite' }}
                    />
                  </p>
                </div>
              </div>

              {/* Status bar */}
              <div
                className="flex items-center gap-4 px-4 py-1 text-xs font-mono"
                style={{ background: '#6366f1', color: 'rgba(255,255,255,0.85)' }}
              >
                <span>Python 3.11</span>
                <span className="opacity-60">·</span>
                <span>UTF-8</span>
                <span className="opacity-60">·</span>
                <span>Ln 8, Col 1</span>
                <span className="ml-auto opacity-70">about.py</span>
              </div>
            </motion.div>
          </div>
        </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
