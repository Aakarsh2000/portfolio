import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/resumeData';
import config from '../data/config';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.25, 0.4, 0.25, 1] },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function FolderIcon({ open, color }) {
  return open ? (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor" style={{ color: color || '#e8bf6a' }}>
      <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z" />
    </svg>
  ) : (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor" style={{ color: color || '#e8bf6a' }}>
      <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      className="w-3 h-3 shrink-0 transition-transform duration-150"
      style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', color: '#4b5563' }}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="card-dark flex flex-col overflow-hidden group cursor-default"
      style={{
        borderColor: hovered ? `${project.color}40` : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? `0 16px 40px ${project.color}15` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Top color bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${project.color}, ${project.color}44)`,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.3s',
        }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Repo path */}
        <div className="flex items-center gap-1 font-mono text-xs mb-3" style={{ color: '#374151' }}>
          <span>~/projects/</span>
          <span style={{ color: project.color }}>
            {project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                }}
              >
                {project.category}
              </span>
              {project.status === 'compiling' && (
                <span className="compiling-badge">
                  ▶ Compiling<span className="cursor">_</span>
                </span>
              )}
            </div>
            <h3 className="text-white font-bold text-base leading-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">{project.subtitle}</p>
          </div>

          {/* GitHub link */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
            aria-label={`View ${project.title} on GitHub`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="text-xs px-2 py-0.5 rounded-md font-medium flex items-center gap-1"
              style={{
                background: `${project.color}10`,
                color: project.color,
                border: `1px solid ${project.color}20`,
              }}
            >
              <span className="w-1 h-1 rounded-full inline-block" style={{ background: project.color }} />
              {h}
            </span>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [rootOpen, setRootOpen] = useState(true);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const mlCount = projects.filter((p) => p.category === 'ML/AI').length;
  const fsCount = projects.filter((p) => p.category === 'Fullstack').length;

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
            border: '1px solid rgba(80,80,90,0.5)',
            background: '#2b2b2b',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          }}
        >
          {/* IntelliJ title bar */}
          <div
            className="flex items-center gap-3 px-4 py-2 border-b"
            style={{ background: '#3c3f41', borderColor: 'rgba(0,0,0,0.4)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
            </div>
            {/* IntelliJ icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="3" fill="#000000"/>
              <rect x="4" y="16" width="8" height="2" fill="white"/>
              <path d="M4 4h6v2H4zM4 8h4v2H4zM12 4l4 8h-2l-1-2H9l-1 2H6l4-8h2z" fill="white"/>
            </svg>
            <span className="font-mono text-xs font-semibold" style={{ color: '#a9b7c6' }}>
              IntelliJ IDEA
            </span>
            <span className="font-mono text-xs" style={{ color: '#606366' }}>— portfolio</span>
            <div className="ml-auto flex items-center gap-3 font-mono text-xs" style={{ color: '#606366' }}>
              <span>{projects.filter(p => !p.status).length} completed</span>
              <span>·</span>
              <span style={{ color: '#a78bfa' }}>▶</span>
              <span>{projects.filter(p => p.status).length} compiling</span>
            </div>
          </div>

          {/* Body: sidebar + content */}
          <div className="flex min-h-0">
            {/* IntelliJ Project sidebar */}
            <div
              className="shrink-0 w-52 border-r flex flex-col"
              style={{ background: '#3c3f41', borderColor: 'rgba(0,0,0,0.3)' }}
            >
              {/* Project panel header */}
              <div
                className="px-3 py-2 text-xs font-semibold"
                style={{ color: '#a9b7c6', borderBottom: '1px solid rgba(0,0,0,0.3)', background: '#4c5052' }}
              >
                Project
              </div>

              {/* File tree */}
              <div className="flex-1 py-2 select-none">
                {/* Root folder: projects/ */}
                <button
                  onClick={() => { setFilter('All'); setRootOpen(!rootOpen); }}
                  className="w-full flex items-center gap-1.5 px-3 py-1 text-xs font-mono transition-colors duration-100"
                  style={{
                    background: filter === 'All' ? 'rgba(104,151,187,0.2)' : 'transparent',
                    color: filter === 'All' ? '#6897bb' : '#9ca3af',
                  }}
                >
                  <ChevronIcon open={rootOpen} />
                  <FolderIcon open={rootOpen} color={filter === 'All' ? '#e8bf6a' : '#7a7e85'} />
                  <span>projects</span>
                  <span
                    className="ml-auto text-xs px-1 rounded"
                    style={{
                      background: filter === 'All' ? 'rgba(104,151,187,0.25)' : 'rgba(255,255,255,0.05)',
                      color: filter === 'All' ? '#6897bb' : '#606366',
                    }}
                  >
                    {projects.length}
                  </span>
                </button>

                {/* Subfolders */}
                {rootOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* ml/ subfolder */}
                    <button
                      onClick={() => setFilter('ML/AI')}
                      className="w-full flex items-center gap-1.5 pl-7 pr-3 py-1 text-xs font-mono transition-colors duration-100"
                      style={{
                        background: filter === 'ML/AI' ? 'rgba(104,151,187,0.15)' : 'transparent',
                        color: filter === 'ML/AI' ? '#6897bb' : '#9ca3af',
                      }}
                    >
                      <ChevronIcon open={filter === 'ML/AI'} />
                      <FolderIcon open={filter === 'ML/AI'} color={filter === 'ML/AI' ? '#e8bf6a' : '#7a7e85'} />
                      <span>ml</span>
                      <span
                        className="ml-auto text-xs px-1 rounded"
                        style={{
                          background: filter === 'ML/AI' ? 'rgba(104,151,187,0.25)' : 'rgba(255,255,255,0.05)',
                          color: filter === 'ML/AI' ? '#6897bb' : '#606366',
                        }}
                      >
                        {mlCount}
                      </span>
                    </button>

                    {/* fullstack/ subfolder */}
                    <button
                      onClick={() => setFilter('Fullstack')}
                      className="w-full flex items-center gap-1.5 pl-7 pr-3 py-1 text-xs font-mono transition-colors duration-100"
                      style={{
                        background: filter === 'Fullstack' ? 'rgba(104,151,187,0.15)' : 'transparent',
                        color: filter === 'Fullstack' ? '#6897bb' : '#9ca3af',
                      }}
                    >
                      <ChevronIcon open={filter === 'Fullstack'} />
                      <FolderIcon open={filter === 'Fullstack'} color={filter === 'Fullstack' ? '#e8bf6a' : '#7a7e85'} />
                      <span>fullstack</span>
                      <span
                        className="ml-auto text-xs px-1 rounded"
                        style={{
                          background: filter === 'Fullstack' ? 'rgba(104,151,187,0.25)' : 'rgba(255,255,255,0.05)',
                          color: filter === 'Fullstack' ? '#6897bb' : '#606366',
                        }}
                      >
                        {fsCount}
                      </span>
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Breadcrumb path at bottom */}
              <div
                className="px-3 py-2 font-mono text-xs border-t truncate"
                style={{ borderColor: 'rgba(0,0,0,0.3)', color: '#606366' }}
              >
                ~/{filter === 'All' ? 'projects' : filter === 'ML/AI' ? 'projects/ml' : 'projects/fullstack'}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0 p-8 md:p-10" style={{ background: '#2b2b2b' }}>
              {/* Section header */}
              <div className="text-center mb-12">
                <span className="section-tag">Projects</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                  What I've{' '}
                  <span className="gradient-text">Built</span>
                </h2>
                <p className="max-w-xl mx-auto text-slate-400 text-lg">
                  A selection of ML, fullstack, and systems engineering projects.
                </p>
              </div>

              {/* Project grid */}
              <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* GitHub CTA */}
              <div className="text-center mt-10">
                <a
                  href={config.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View All Projects on GitHub
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
