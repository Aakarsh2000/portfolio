import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import config from '../data/config';

const ROLES = [
  'Backend Engineer',
  'Fullstack Developer',
  'ML / AI Engineer',
  'Systems Programmer',
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx((c) => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx((c) => c - 1); }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
      setCharIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ASCII art for neofetch (simple "SAI" initials)
const ASCII_ART = [
  ' ███████╗ █████╗ ██╗',
  ' ██╔════╝██╔══██╗██║',
  ' ███████╗███████║██║',
  ' ╚════██║██╔══██║██║',
  ' ███████║██║  ██║██║',
  ' ╚══════╝╚═╝  ╚═╝╚═╝',
];

const FETCH_INFO = [
  { key: null,     val: 'sai@portfolio',               keyColor: null,      valColor: '#ffffff', bold: true },
  { key: null,     val: '─────────────────────',        keyColor: null,      valColor: '#4b5563' },
  { key: 'OS',     val: 'Backend · ML/AI · Fullstack',  keyColor: '#f472b6', valColor: '#e2e8f0' },
  { key: 'Host',   val: 'Texas A&M University',         keyColor: '#fb923c', valColor: '#e2e8f0' },
  { key: 'Kernel', val: 'CS 3.1.0-research',            keyColor: '#facc15', valColor: '#e2e8f0' },
  { key: 'Uptime', val: '3+ years experience',          keyColor: '#4ade80', valColor: '#e2e8f0' },
  { key: 'Shell',  val: 'Python 3.11 / Node.js 20',     keyColor: '#34d399', valColor: '#e2e8f0' },
  { key: 'DE',     val: 'React 18.2 / FastAPI',         keyColor: '#22d3ee', valColor: '#e2e8f0' },
  { key: 'CPU',    val: 'PyTorch · LangChain · Redis',  keyColor: '#60a5fa', valColor: '#e2e8f0' },
  { key: 'Cloud',  val: 'AWS · GCP · Docker · K8s',     keyColor: '#818cf8', valColor: '#e2e8f0' },
  { key: 'Status', val: 'Open to FT · May 2026',        keyColor: '#a78bfa', valColor: '#4ade80' },
];

function NeofetchPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="hidden xl:block w-[420px] shrink-0 self-center"
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: '#0d0d0d',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center px-4 py-2.5 border-b"
          style={{ background: 'rgba(10,16,10,0.95)', borderColor: 'rgba(34,197,94,0.1)' }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
          </div>
          <span className="flex-1 text-center font-mono text-xs" style={{ color: '#374151' }}>
            neofetch — sai@portfolio
          </span>
        </div>

        {/* Neofetch body */}
        <div className="px-5 py-4 font-mono text-[0.72rem] leading-[1.75]">
          <div className="flex gap-5 items-start">
            {/* ASCII art column */}
            <div className="shrink-0">
              {ASCII_ART.map((line, i) => {
                const asciiColors = ['#4f46e5', '#6366f1', '#818cf8', '#6366f1', '#4f46e5', '#4338ca'];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.07 }}
                    style={{ color: asciiColors[i] ?? '#6366f1', whiteSpace: 'pre' }}
                  >
                    {line}
                  </motion.div>
                );
              })}
            </div>

            {/* Info column */}
            <div className="flex-1 min-w-0 pt-0.5">
              {FETCH_INFO.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                  className="flex items-baseline gap-1.5"
                >
                  {row.key === null && row.bold ? (
                    <span style={{ color: row.valColor, fontWeight: 700 }}>{row.val}</span>
                  ) : row.key === null ? (
                    <span style={{ color: row.valColor }}>{row.val}</span>
                  ) : (
                    <>
                      <span style={{ color: row.keyColor, minWidth: 52, display: 'inline-block' }}>{row.key}</span>
                      <span style={{ color: '#4b5563' }}>:</span>
                      <span style={{ color: row.valColor }}>{row.val}</span>
                    </>
                  )}
                </motion.div>
              ))}

              {/* Color palette blocks */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="flex gap-1 mt-3"
              >
                {['#ef4444','#22c55e','#facc15','#3b82f6','#a855f7','#06b6d4','#e2e8f0','#6b7280'].map((c) => (
                  <div key={c} className="w-4 h-4 rounded-sm" style={{ background: c }} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
};

export default function Hero() {
  const role = useTypewriter(ROLES);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.x += dot.vx; dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,197,94,0.45)';
        ctx.fill();
      });
      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34,197,94,${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34,197,94,0.08) 0%, transparent 70%)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16"
      >
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-12">
          {/* Left: hero content */}
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left xl:max-w-2xl">
            <motion.div variants={itemVariants} className="flex justify-center xl:justify-start mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-mono">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {config.availability}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none">
              {config.name.first}{' '}
              <span className="gradient-text-animated">{config.name.last}</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-2xl md:text-3xl font-mono font-medium text-slate-400 mb-6 h-10 flex items-center justify-center xl:justify-start gap-2"
            >
              <span className="text-green-400">{'>'}</span>
              <span className="text-slate-200">{role}</span>
              <span className="w-0.5 h-7 bg-indigo-400 animate-pulse ml-0.5" />
            </motion.div>

            <motion.p variants={itemVariants} className="max-w-2xl mx-auto xl:mx-0 text-slate-400 text-lg leading-relaxed mb-10">
              {config.tagline}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center xl:justify-start gap-4 mb-16">
              <button
                onClick={() => scrollTo('projects')}
                className="relative overflow-hidden px-8 py-3 text-base font-semibold rounded-xl text-white transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-8 py-3 text-base font-semibold rounded-xl border transition-all duration-200"
                style={{ background: 'transparent', color: '#818cf8', border: '1px solid rgba(99,102,241,0.4)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                Get In Touch
              </button>
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3 text-base font-semibold text-slate-400 hover:text-slate-200 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/5 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto xl:mx-0">
              {config.stats.map((stat) => (
                <div key={stat.label} className="card-dark p-4 text-center" style={{ border: '1px solid rgba(34,197,94,0.12)' }}>
                  <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: neofetch panel */}
          <NeofetchPanel />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors group"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-slate-700 group-hover:border-green-500/50 rounded-full flex items-start justify-center pt-1.5 transition-colors"
        >
          <div className="w-1 h-2 bg-slate-600 group-hover:bg-green-400 rounded-full transition-colors" />
        </motion.div>
      </motion.button>
    </div>
  );
}
