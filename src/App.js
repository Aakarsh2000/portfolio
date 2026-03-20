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

function App() {
  // Suppress CRA overlay for unhandled promise rejections (e.g. missing API key in dev)
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
        <div className="relative min-h-screen bg-dark text-slate-200 overflow-x-hidden">
          {/* Global ambient background blobs */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div
              className="blob blob-1"
              style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                top: '-200px',
                left: '-200px',
              }}
            />
            <div
              className="blob blob-2"
              style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                top: '40%',
                right: '-150px',
              }}
            />
            <div
              className="blob blob-3"
              style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                bottom: '10%',
                left: '20%',
              }}
            />
          </div>

          {/* Grid background */}
          <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-40" />

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <section id="hero">
              <Hero />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="skills">
              <Skills />
            </section>

            <section id="experience">
              <Experience />
            </section>

            <section id="projects">
              <Projects />
            </section>

            <section id="contact">
              <Contact />
            </section>
          </motion.main>

          {/* Footer */}
          <footer className="relative z-10 border-t border-white/5 py-8">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm font-mono">
                <span className="text-primary">{'<'}</span>
                SaiAakarshPadma
                <span className="text-primary">{' />'}</span>
              </p>
              <p className="text-slate-600 text-xs">
                Built with React · Tailwind CSS · Framer Motion
              </p>
              <p className="text-slate-600 text-xs">
                © {new Date().getFullYear()} Sai Aakarsh Padma
              </p>
            </div>
          </footer>

          {/* Floating Chatbot */}
          <Chatbot />
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
