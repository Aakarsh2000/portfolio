import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

function InputField({ label, id, type = 'text', placeholder, value, onChange, error, as = 'input', rows }) {
  const baseClass =
    'w-full bg-dark-card/60 border rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm transition-all duration-200 focus:outline-none resize-none';
  const borderClass = error
    ? 'border-red-500/50 focus:border-red-500'
    : 'border-white/10 focus:border-primary/60 focus:bg-dark-card focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          rows={rows || 5}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${baseClass} ${borderClass}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${baseClass} ${borderClass}`}
        />
      )}
      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message is too short';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    const endpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      // Fallback to mailto if endpoint not configured
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(`Hi Sai,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
      window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
      setTimeout(() => { setStatus('sent'); setForm({ name: '', email: '', message: '' }); }, 800);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  return (
    <div className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Let's{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            Open to full-time roles, collaborations, and interesting problems. Drop me a message!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — social + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Availability card */}
            <div className="card-dark p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium text-sm">Available for opportunities</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm actively seeking full-time software engineering, backend, or ML/AI roles starting{' '}
                <span className="text-white font-medium">May 2026</span> after graduation from Texas
                A&M.
              </p>
            </div>

            {/* Social links */}
            <div className="card-dark p-6">
              <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">
                Find Me On
              </h3>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                      style={{
                        background: `${link.color}15`,
                        border: `1px solid ${link.color}25`,
                        color: link.color,
                      }}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{link.name}</div>
                      <div className="text-slate-500 text-xs">{link.label}</div>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 ml-auto text-slate-600 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="card-dark p-5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20 text-primary shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-medium">{config.location}</div>
                <div className="text-slate-500 text-xs">{config.currentSchool}</div>
              </div>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="card-dark p-8">
              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-72 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm mb-6">Thanks! I'll get back to you soon.</p>
                  <button onClick={() => setStatus(null)} className="text-sm text-primary hover:text-secondary transition-colors">
                    Send another message
                  </button>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-72 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Something went wrong</h3>
                  <p className="text-slate-400 text-sm mb-6">Please try emailing directly at <a href={`mailto:${config.email}`} className="text-primary">{config.email}</a></p>
                  <button onClick={() => setStatus(null)} className="text-sm text-primary hover:text-secondary transition-colors">
                    Try again
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="Your Name"
                      id="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={set('name')}
                      error={errors.name}
                    />
                    <InputField
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={set('email')}
                      error={errors.email}
                    />
                  </div>
                  <InputField
                    label="Message"
                    id="message"
                    as="textarea"
                    rows={6}
                    placeholder="Hi Sai, I'd love to chat about..."
                    value={form.message}
                    onChange={set('message')}
                    error={errors.message}
                  />

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Opening email client...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-slate-600 text-xs">
                    This will open your email client with the message pre-filled.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
