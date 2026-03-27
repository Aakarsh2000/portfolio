import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import config from '../data/config';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: config.social.github,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: '#e2e8f0',
    label: config.social.githubHandle,
  },
  {
    name: 'LinkedIn',
    href: config.social.linkedin,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0a66c2',
    label: config.social.linkedinHandle,
  },
  {
    name: 'Email',
    href: `mailto:${config.email}`,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#6366f1',
    label: config.email,
  },
];

const SSH_LINES = [
  { text: '➜  ssh sai@connect.dev -p 443', color: '#e2e8f0', delay: 0 },
  { text: "The authenticity of host 'connect.dev' can't be established.", color: '#6b7280', delay: 600 },
  { text: 'RSA key fingerprint is SHA256:Aakarsh2000', color: '#6b7280', delay: 1000 },
  { text: 'Are you sure you want to continue connecting? (yes/no) yes', color: '#6b7280', delay: 1400 },
  { text: '✓ Connection established.', color: '#6ee7b7', delay: 2000 },
];

// steps 0-2 = prompts, 3 = confirm, 4 = sending, 5 = done
const PROMPTS = [
  {
    key: 'name',
    label: 'name',
    prompt: 'Enter your name:',
    validate: v => v.trim().length > 0 ? null : 'Name cannot be empty',
  },
  {
    key: 'email',
    label: 'email',
    prompt: 'Enter your email address:',
    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : 'Invalid email — try again',
  },
  {
    key: 'message',
    label: 'message',
    prompt: 'Enter your message:',
    validate: v => v.trim().length >= 5 ? null : 'Message too short — try again',
  },
];

const SEND_LINES = [
  { text: '$ POST /api/contact HTTP/1.1', color: '#e2e8f0', delay: 0 },
  { text: '> Content-Type: application/json', color: '#6b7280', delay: 220 },
  { text: '> Authorization: Bearer ***', color: '#6b7280', delay: 440 },
  { text: '', delay: 600 },
  { text: 'Encrypting payload...', color: '#f9a825', delay: 760 },
  { text: 'Routing to sai@connect.dev...', color: '#f9a825', delay: 1080 },
  { text: 'HTTP/1.1 200 OK', color: '#27c93f', delay: 1480 },
  { text: '{"status":"delivered","code":200}', color: '#6ee7b7', delay: 1700 },
  { text: '', delay: 1880 },
  { text: '✓ Message delivered successfully.', color: '#27c93f', delay: 2060 },
];

function SshAnimation({ onReady }) {
  const [visibleLines, setVisibleLines] = useState([]);
  useEffect(() => {
    const ids = [];
    SSH_LINES.forEach(({ text, color, delay }) => {
      ids.push(setTimeout(() => setVisibleLines(p => [...p, { text, color }]), delay));
    });
    ids.push(setTimeout(onReady, 2400));
    return () => ids.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {visibleLines.map((line, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18 }} className="font-mono text-xs leading-5" style={{ color: line.color }}>
          {line.text}
        </motion.div>
      ))}
    </>
  );
}

function SendAnimation({ onDone }) {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    const ids = [];
    SEND_LINES.forEach(({ text, color, delay }, i) => {
      ids.push(setTimeout(() => {
        setLines(p => [...p, { text, color }]);
        if (i === SEND_LINES.length - 1) ids.push(setTimeout(onDone, 800));
      }, delay));
    });
    return () => ids.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {lines.map((line, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }} className="font-mono text-xs leading-5"
          style={{ color: line.color || 'transparent', minHeight: '1.25rem' }}>
          {line.text || '\u00a0'}
        </motion.div>
      ))}
    </>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const inputRef   = useRef(null);
  const bottomRef  = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.35 });

  const [connected,    setConnected]    = useState(false);
  const [step,         setStep]         = useState(0); // 0-2 prompts, 3 confirm, 4 sending, 5 done
  const [history,      setHistory]      = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [inputError,   setInputError]   = useState('');
  const [form,         setForm]         = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, step]);

  useEffect(() => {
    if (connected && step < 4) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [connected, step]);

  const addLine = (text, color = '#e2e8f0') =>
    setHistory(prev => [...prev, { text, color, id: Date.now() + Math.random() }]);

  const handleConnected = () => {
    setConnected(true);
    setTimeout(() => {
      addLine('');
      addLine('Welcome! Fill in the details below to send me a message.', '#a5b4fc');
      addLine("Type your answer and press Enter ↵ to proceed.", '#6b7280');
      addLine('');
    }, 200);
  };

  const handleKeyDown = async (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    // ── Confirm step ──────────────────────────────────
    if (step === 3) {
      const ans = currentInput.trim().toLowerCase();
      if (ans !== 'yes' && ans !== 'no') {
        setInputError("Type 'yes' to send or 'no' to start over");
        return;
      }
      setInputError('');
      addLine(`sai@connect.dev:~$ Send message? (yes/no)`, '#27c93f');
      addLine(`  ${currentInput.trim()}`, '#e2e8f0');
      addLine('');
      setCurrentInput('');

      if (ans === 'no') {
        addLine('Restarting... Type your details again.', '#f9a825');
        addLine('');
        setForm({ name: '', email: '', message: '' });
        setStep(0);
        return;
      }
      // yes → send
      setStep(4);
      const endpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT;
      if (endpoint) {
        try {
          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(form),
          });
        } catch { /* fall through */ }
      }
      return;
    }

    // ── Normal prompt step ────────────────────────────
    const currentPrompt = PROMPTS[step];
    const err = currentPrompt.validate(currentInput);

    if (err) {
      setInputError(err);
      addLine(`  ✗ ${err}`, '#f87171');
      return;
    }

    setInputError('');
    const val = currentInput.trim();

    // echo to history
    addLine(`sai@connect.dev:~$ ${currentPrompt.prompt}`, '#27c93f');
    addLine(`  ${val}`, '#e2e8f0');
    addLine('');

    const newForm = { ...form, [currentPrompt.key]: val };
    setForm(newForm);
    setCurrentInput('');

    if (step < PROMPTS.length - 1) {
      setStep(step + 1);
    } else {
      // all 3 done → show summary + confirm
      setTimeout(() => {
        addLine('─── Summary ──────────────────────────────', '#1e3a5f');
        addLine(`  Name     :  ${newForm.name}`,    '#a5b4fc');
        addLine(`  Email    :  ${newForm.email}`,   '#a5b4fc');
        addLine(`  Message  :  ${newForm.message}`, '#a5b4fc');
        addLine('──────────────────────────────────────────', '#1e3a5f');
        addLine('');
      }, 100);
      setStep(3);
    }
  };

  const handleReset = () => {
    setStep(0);
    setHistory([]);
    setCurrentInput('');
    setInputError('');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => {
      addLine('');
      addLine('Welcome back! Fill in your details again.', '#a5b4fc');
      addLine('');
    }, 100);
  };

  const isPromptStep = step < 3;
  const isConfirmStep = step === 3;
  const prompt = isPromptStep ? PROMPTS[step] : null;

  return (
    <div ref={sectionRef} className="relative py-20 px-6" style={{ background: '#0d1117' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(16,185,129,0.2)',
            background: 'rgba(4,10,8,0.98)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* SSH terminal title bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b"
            style={{ background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(16,185,129,0.15)' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
            </div>
            <span className="font-mono text-xs" style={{ color: '#374151' }}>ssh — sai@connect.dev</span>
            <AnimatePresence>
              {connected && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="ml-auto flex items-center gap-1.5 font-mono text-xs" style={{ color: '#10b981' }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Connected
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <span className="section-tag">Contact</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                Let's <span className="gradient-text">Connect</span>
              </h2>
              <p className="max-w-xl mx-auto text-slate-400 text-lg">
                Open to full-time roles, collaborations, and interesting problems.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left — social */}
              <div className="lg:col-span-2 space-y-5">
                <div className="card-dark p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-medium text-sm">Available for opportunities</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Actively seeking full-time roles starting{' '}
                    <span className="text-white font-medium">May 2026</span> after graduating from Texas A&M.
                  </p>
                </div>

                <div className="card-dark p-5">
                  <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Find Me On</h3>
                  <div className="space-y-3">
                    {SOCIAL_LINKS.map((link) => (
                      <a key={link.name} href={link.href}
                        target={link.name !== 'Email' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-105"
                          style={{ background: `${link.color}15`, border: `1px solid ${link.color}25`, color: link.color }}>
                          {link.icon}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{link.name}</div>
                          <div className="text-slate-500 text-xs">{link.label}</div>
                        </div>
                        <svg className="w-3 h-3 ml-auto text-slate-600 group-hover:text-primary transition-colors"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="card-dark p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20 text-primary shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{config.location}</div>
                    <div className="text-slate-500 text-xs">{config.currentSchool}</div>
                  </div>
                </div>
              </div>

              {/* Right — interactive terminal */}
              <div className="lg:col-span-3">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div
                  className="rounded-xl overflow-hidden flex flex-col"
                  style={{
                    border: '1px solid rgba(16,185,129,0.15)',
                    background: '#020d06',
                    minHeight: 360,
                    maxHeight: 520,
                  }}
                  onClick={() => inputRef.current?.focus()}
                >
                  {/* Mini title bar */}
                  <div className="flex items-center gap-2 px-4 py-2 shrink-0"
                    style={{ background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: '#ff5f56' }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: '#ffbd2e' }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: '#27c93f' }} />
                    </div>
                    <span className="font-mono text-xs ml-1" style={{ color: '#374151' }}>terminal</span>
                  </div>

                  {/* Scrollable body */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5" style={{ scrollbarWidth: 'none' }}>
                    {isInView && <SshAnimation onReady={handleConnected} />}

                    {history.map((line) => (
                      <motion.div key={line.id} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                        className="font-mono text-xs leading-5 whitespace-pre-wrap break-all"
                        style={{ color: line.color }}>
                        {line.text || '\u00a0'}
                      </motion.div>
                    ))}

                    {/* Send animation */}
                    {step === 4 && <SendAnimation onDone={() => setStep(5)} />}

                    {/* Done */}
                    {step === 5 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 pt-1">
                        <div className="font-mono text-xs" style={{ color: '#6b7280' }}>
                          sai@connect.dev:~${'  '}
                          <button onClick={handleReset} className="underline hover:text-emerald-400 transition-colors">
                            Send another message
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Active input — normal prompts */}
                    {connected && isPromptStep && (
                      <motion.div key={`prompt-${step}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="font-mono text-xs leading-5" style={{ color: '#27c93f' }}>
                          sai@connect.dev:~$ {prompt.prompt}
                        </div>
                        <div className="flex items-center font-mono text-xs leading-5 mt-0.5">
                          <span style={{ color: '#a5b4fc' }}>{'> '}</span>
                          <div className="relative flex-1 ml-1">
                            <span style={{ color: '#e2e8f0' }}>{currentInput}</span>
                            <span className="inline-block w-[7px] h-[13px] align-middle ml-px"
                              style={{ background: '#10b981', animation: 'cursorBlink 0.8s step-end infinite', verticalAlign: 'middle' }} />
                            <input ref={inputRef}
                              type={prompt.key === 'email' ? 'email' : 'text'}
                              value={currentInput}
                              onChange={e => { setCurrentInput(e.target.value); setInputError(''); }}
                              onKeyDown={handleKeyDown}
                              className="absolute inset-0 opacity-0 w-full cursor-text"
                              autoComplete="off" spellCheck={false} />
                          </div>
                        </div>
                        {inputError && (
                          <div className="font-mono text-xs mt-0.5 ml-2" style={{ color: '#f87171' }}>✗ {inputError}</div>
                        )}
                      </motion.div>
                    )}

                    {/* Confirm prompt */}
                    {connected && isConfirmStep && (
                      <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="font-mono text-xs leading-5" style={{ color: '#27c93f' }}>
                          sai@connect.dev:~$ Send message? (yes/no)
                        </div>
                        <div className="flex items-center font-mono text-xs leading-5 mt-0.5">
                          <span style={{ color: '#a5b4fc' }}>{'> '}</span>
                          <div className="relative flex-1 ml-1">
                            <span style={{ color: '#e2e8f0' }}>{currentInput}</span>
                            <span className="inline-block w-[7px] h-[13px] align-middle ml-px"
                              style={{ background: '#10b981', animation: 'cursorBlink 0.8s step-end infinite', verticalAlign: 'middle' }} />
                            <input ref={inputRef} type="text" value={currentInput}
                              onChange={e => { setCurrentInput(e.target.value); setInputError(''); }}
                              onKeyDown={handleKeyDown}
                              className="absolute inset-0 opacity-0 w-full cursor-text"
                              autoComplete="off" spellCheck={false} />
                          </div>
                        </div>
                        {inputError && (
                          <div className="font-mono text-xs mt-0.5 ml-2" style={{ color: '#f87171' }}>✗ {inputError}</div>
                        )}
                      </motion.div>
                    )}

                    <div ref={bottomRef} />
                  </div>

                  {/* Progress indicator bar */}
                  {connected && step < 4 && (
                    <div className="px-4 py-2 flex items-center gap-2 shrink-0"
                      style={{ background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(16,185,129,0.08)' }}>
                      {[...PROMPTS, { key: 'confirm', label: 'confirm' }].map((p, i) => {
                        const done  = i < step;
                        const active = i === step && step < 4;
                        return (
                          <div key={p.key} className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono"
                              style={{
                                background: done ? 'rgba(16,185,129,0.2)' : active ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.04)',
                                border: done ? '1px solid #10b981' : active ? '1px solid rgba(16,185,129,0.5)' : '1px solid rgba(255,255,255,0.07)',
                                color: done ? '#10b981' : active ? '#6ee7b7' : '#374151',
                              }}>
                              {done ? '✓' : i + 1}
                            </div>
                            <span className="text-xs font-mono hidden sm:inline"
                              style={{ color: active ? '#6ee7b7' : done ? '#10b981' : '#374151' }}>
                              {p.label}
                            </span>
                            {i < 3 && <span style={{ color: '#1e3a2f' }} className="ml-1">›</span>}
                          </div>
                        );
                      })}
                      <span className="ml-auto font-mono text-xs" style={{ color: '#1e3a2f' }}>Press Enter ↵</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
