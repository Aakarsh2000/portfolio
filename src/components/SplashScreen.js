import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MODULES = [
  { name: 'react@18.2.0',       label: 'UI framework',    color: '#61dafb' },
  { name: 'pytorch@2.1.0',      label: 'ML runtime',      color: '#ee4c2c' },
  { name: 'redis@7.0',          label: 'Cache layer',     color: '#ff4438' },
  { name: 'postgresql@15',      label: 'Data store',      color: '#336791' },
  { name: 'fastapi@0.104',      label: 'API layer',       color: '#009688' },
  { name: 'langchain@0.1',      label: 'LLM pipeline',   color: '#1c3c3c' },
];

const BAR_CHARS = 24;

function progressBar(pct) {
  const filled = Math.round((pct / 100) * BAR_CHARS);
  return '█'.repeat(filled) + '░'.repeat(BAR_CHARS - filled);
}

export default function SplashScreen({ onDone }) {
  const [phase, setPhase]       = useState('cmd');      // cmd → loading → modules → ready → exit
  const [progress, setProgress] = useState(0);
  const [visibleMods, setVisible] = useState(0);
  const [exiting, setExiting]   = useState(false);

  // Phase sequencing
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('loading'), 600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== 'loading') return;
    let p = 0;
    const iv = setInterval(() => {
      p += 3;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => setPhase('modules'), 200);
      }
    }, 22);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'modules') return;
    let idx = 0;
    const iv = setInterval(() => {
      idx++;
      setVisible(idx);
      if (idx >= MODULES.length) {
        clearInterval(iv);
        setTimeout(() => setPhase('ready'), 300);
      }
    }, 160);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'ready') return;
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 700);
    }, 900);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#080c18',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: [
              'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(79,70,229,0.12) 0%, transparent 60%)',
              'radial-gradient(ellipse 50% 40% at 80% 70%, rgba(124,58,237,0.09) 0%, transparent 55%)',
            ].join(', '),
          }} />

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              width: '100%',
              maxWidth: '560px',
              background: 'rgba(9, 13, 24, 0.97)',
              border: '1px solid rgba(99,102,241,0.22)',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.1)',
            }}
          >
            {/* Title bar */}
            <div style={{
              background: 'rgba(0,0,0,0.5)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
              <span style={{
                flex: 1, textAlign: 'center',
                fontFamily: 'monospace', fontSize: 12, color: '#374151',
              }}>
                python3 — portfolio.py
              </span>
            </div>

            {/* Body */}
            <div style={{
              padding: '20px 24px 24px',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
              fontSize: 13,
              lineHeight: 1.65,
              minHeight: 260,
            }}>
              {/* Command */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span style={{ color: '#27c93f' }}>➜ ~ </span>
                <span style={{ color: '#e2e8f0' }}>python3 portfolio.py --serve --env production</span>
              </motion.div>

              {/* Blank line */}
              <div style={{ height: 8 }} />

              {/* Loading bar */}
              {(phase === 'loading' || phase === 'modules' || phase === 'ready') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ color: '#6366f1', marginBottom: 6 }}>
                    Initializing modules...
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: progress === 100 ? '#27c93f' : '#818cf8' }}>
                      {progressBar(progress)}
                    </span>
                    <span style={{ color: progress === 100 ? '#27c93f' : '#6366f1', minWidth: 36 }}>
                      {progress}%
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Module checklist */}
              {phase === 'modules' || phase === 'ready' ? (
                <div style={{ marginTop: 14 }}>
                  {MODULES.slice(0, visibleMods).map((mod, i) => (
                    <motion.div
                      key={mod.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}
                    >
                      <span style={{ color: '#27c93f' }}>✓</span>
                      <span style={{ color: '#a5b4fc', minWidth: 180 }}>{mod.name}</span>
                      <span style={{ color: '#374151' }}>{mod.label}</span>
                    </motion.div>
                  ))}
                </div>
              ) : null}

              {/* Ready message */}
              {phase === 'ready' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginTop: 16 }}
                >
                  <div style={{
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)',
                    marginBottom: 12,
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      display: 'inline-block',
                      width: 8, height: 8,
                      borderRadius: '50%',
                      background: '#27c93f',
                      animation: 'compilingGlow 1.2s ease-in-out infinite',
                    }} />
                    <span style={{ color: '#34d399', fontWeight: 600 }}>
                      Portfolio ready · Launching...
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Blinking cursor while loading */}
              {phase === 'cmd' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'inline-block',
                    width: 8, height: 14,
                    background: '#6366f1',
                    marginLeft: 2,
                    verticalAlign: 'middle',
                    animation: 'cursorBlink 1s step-end infinite',
                  }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
