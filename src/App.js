import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import SplashScreen from './components/SplashScreen';

function App() {
  const [splashDone, setSplashDone] = React.useState(false);

  useEffect(() => {
    const handler = (event) => {
      if (
        event.message &&
        (event.message.includes('API_KEY') || event.message.includes('generative'))
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener('unhandledrejection', handler);
    return () => window.removeEventListener('unhandledrejection', handler);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {!splashDone && <SplashScreen key="splash" onDone={() => setSplashDone(true)} />}
      </AnimatePresence>

      <div className="relative min-h-screen text-slate-200 overflow-x-hidden" style={{ background: '#0d1117' }}>

        {/* ── Subtle ambient glow ── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div style={{
            position: 'absolute', inset: 0,
            background: [
              'radial-gradient(ellipse 60% 40% at 15% 10%, rgba(79,70,229,0.06) 0%, transparent 60%)',
              'radial-gradient(ellipse 50% 35% at 85% 5%, rgba(124,58,237,0.05) 0%, transparent 55%)',
              'radial-gradient(ellipse 55% 40% at 75% 90%, rgba(8,145,178,0.04) 0%, transparent 55%)',
            ].join(', '),
          }} />
        </div>

        <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-20" />

        <Navbar />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <section id="hero"><Hero /></section>
          <section id="about"><About /></section>
          <section id="skills"><Skills /></section>
          <section id="experience"><Experience /></section>
          <section id="projects"><Projects /></section>
          <section id="contact"><Contact /></section>
        </motion.main>

        <footer className="relative z-10 border-t border-white/5 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm font-mono">
              <span className="text-primary">{'<'}</span>
              SaiAakarshPadma
              <span className="text-primary">{' />'}</span>
            </p>
            <p className="text-slate-600 text-xs">Built with React · Tailwind CSS · Framer Motion</p>
            <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Sai Aakarsh Padma</p>
          </div>
        </footer>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
