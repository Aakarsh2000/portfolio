import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../data/config';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const scrollEndTimer = useRef(null);

  useEffect(() => {
    const OFFSET = 120;

    const getSectionAtScroll = () => {
      const scrollY = window.scrollY;
      let current = NAV_LINKS[0].id;
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + scrollY - OFFSET <= scrollY) {
          current = id;
        }
      }
      return current;
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      if (isProgrammaticScroll.current) {
        // Suppress active section updates during smooth scroll.
        // Reset the lock once scroll has been idle for 100ms.
        clearTimeout(scrollEndTimer.current);
        scrollEndTimer.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
          setActiveSection(getSectionAtScroll());
        }, 100);
        return;
      }

      setActiveSection(getSectionAtScroll());
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollEndTimer.current);
    };
  }, []);

  const scrollTo = (id) => {
    isProgrammaticScroll.current = true;
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-mono text-sm font-semibold text-slate-200 hover:text-primary transition-colors duration-200 group"
          >
            <span className="text-primary group-hover:text-accent transition-colors">{'<'}</span>
            <span className="mx-1">{config.name.initials}</span>
            <span className="text-primary group-hover:text-accent transition-colors">{'/>'}</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === id
                    ? 'text-primary'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 border border-white/10 rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href={`mailto:${config.email}`}
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.4)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-5 h-0.5 bg-slate-300 transition-transform origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-5 h-0.5 bg-slate-300"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-5 h-0.5 bg-slate-300 transition-transform origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-dark/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === id
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              ))}
              <div className="flex gap-3 pt-3 border-t border-white/5 mt-2">
                <a
                  href={config.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 text-sm text-slate-400 border border-white/10 rounded-lg hover:border-primary/40 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={`mailto:${config.email}`}
                  className="flex-1 text-center py-2 text-sm font-semibold text-white rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  Hire Me
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
