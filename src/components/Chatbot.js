import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONA_CONTEXT } from '../data/resumeData';

// ─── Message component ────────────────────────────────────────────────────────
// Converts **bold**, *italic*, and bullet lines into JSX
function renderMarkdown(text) {
  return text.split('\n').map((line, i) => {
    // Convert **bold** and *italic* inline
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      if (part.startsWith('*') && part.endsWith('*'))
        return <em key={j}>{part.slice(1, -1)}</em>;
      return part;
    });

    const isBullet = line.trimStart().startsWith('* ') || line.trimStart().startsWith('- ');
    if (isBullet) {
      return (
        <div key={i} className="flex gap-2 mt-1">
          <span className="text-primary mt-0.5 shrink-0">•</span>
          <span>{parts.map((p, j) => typeof p === 'string' ? p.replace(/^[*-]\s/, '') : p)}</span>
        </div>
      );
    }
    return line ? <p key={i} className={i > 0 ? 'mt-1.5' : ''}>{parts}</p> : <div key={i} className="h-1" />;
  });
}

function Message({ msg }) {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 shrink-0 mt-0.5"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'text-white rounded-tr-sm'
            : 'text-slate-200 rounded-tl-sm border border-white/5'
        }`}
        style={
          isUser
            ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }
            : { background: 'rgba(255,255,255,0.05)' }
        }
      >
        {isUser ? msg.text : renderMarkdown(msg.text)}
      </div>
    </motion.div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-center gap-2 mb-3"
    >
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm border border-white/5"
        style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-1">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Quick prompt chips ───────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  "What's Sai's experience?",
  'Tell me about his projects',
  'What skills does he have?',
  'Is he open to work?',
];

// ─── Contextual follow-up suggestions ────────────────────────────────────────
const FOLLOW_UP_MAP = [
  { keywords: ['zee', 'gaming', 'houzee', 'leaderboard', 'kafka', 'redis'],
    suggestions: ['What tech stack did he use at ZEE?', 'How did he handle scale at ZEE?', 'What is Houzee?'] },
  { keywords: ['exo', 'imaging', 'ultrasound', 'sdk', 'opencv', 'aes'],
    suggestions: ['What did he build at Exo Imaging?', 'What languages did he use there?', 'When does his internship end?'] },
  { keywords: ['texas', 'tamu', 'ms', "master's", 'graduate'],
    suggestions: ['When does he graduate?', 'Is he open to full-time roles?', 'What is he studying?'] },
  { keywords: ['iit', 'kharagpur', 'undergraduate', 'bachelor'],
    suggestions: ['What did he study at IIT?', 'How did his ECE background help him?'] },
  { keywords: ['safar', 'yolo', 'traffic', 'flask'],
    suggestions: ['How does SAFAR work?', 'What other fullstack projects has he done?', 'Does he know computer vision?'] },
  { keywords: ['rag', 'llm', 'self-rag', 'faiss', 'hallucin'],
    suggestions: ['How does the Self-RAG pipeline work?', 'What LLM frameworks does he use?', 'What was the accuracy improvement?'] },
  { keywords: ['nutrition', 'meal', 'cnn', 'lstm', 'multimodal'],
    suggestions: ['What datasets did he use?', 'What ML frameworks does he know?', 'Tell me about his other ML projects'] },
  { keywords: ['covid', 'agent', 'simulation', 'epidemic'],
    suggestions: ['How accurate was the COVID model?', 'What is agent-based modelling?', 'Tell me about his LSTM emulator'] },
  { keywords: ['python', 'node', 'react', 'backend', 'skill', 'language'],
    suggestions: ['What is his strongest skill?', 'Does he know cloud platforms?', 'What ML frameworks does he use?'] },
  { keywords: ['aws', 'gcp', 'cloud', 'docker', 'kubernetes', 'devops'],
    suggestions: ['What cloud platforms has he worked with?', 'Tell me about his microservices experience'] },
  { keywords: ['open', 'hire', 'available', 'job', 'full-time', 'internship'],
    suggestions: ['When is he available?', 'What kind of roles is he looking for?', 'How can I contact him?'] },
  { keywords: ['contact', 'email', 'linkedin', 'github', 'reach'],
    suggestions: ['What is his GitHub?', 'What is his LinkedIn?'] },
];

function getSuggestions(responseText) {
  const lower = responseText.toLowerCase();
  for (const { keywords, suggestions } of FOLLOW_UP_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) return suggestions.slice(0, 3);
  }
  // Generic fallback
  return ["What projects has he worked on?", "What are his strongest skills?", "Is he open to work?"];
}

// ─── Main Chatbot component ───────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Sai's AI assistant. Ask me anything about his background, skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [, setApiError] = useState(null);
  const [hasApiKey] = useState(!!process.env.REACT_APP_GEMINI_API_KEY);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text) => {
    const userText = text || input.trim();
    if (!userText || isTyping) return;

    setInput('');
    setApiError(null);
    setSuggestions([]);

    const userMsg = { role: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // No API key — graceful fallback
    if (!hasApiKey) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: "The Gemini API key isn't configured. Please set REACT_APP_GEMINI_API_KEY in your .env file to enable AI responses. In the meantime, feel free to explore the portfolio!",
          },
        ]);
      }, 800);
      return;
    }

    try {
      console.log('[Chatbot] API key present:', !!process.env.REACT_APP_GEMINI_API_KEY);
      console.log('[Chatbot] Importing SDK...');
      const { GoogleGenAI } = await import('@google/genai');
      console.log('[Chatbot] SDK imported OK');

      const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });
      console.log('[Chatbot] Client initialised, using gemini-2.5-flash');

      const isFirstMessage = sessionHistory.length === 0;
      const messageToSend = isFirstMessage
        ? `${PERSONA_CONTEXT}\n\nNow answer this question: ${userText}`
        : userText;

      console.log('[Chatbot] Session history length:', sessionHistory.length);
      console.log('[Chatbot] Sending message (first?', isFirstMessage, ')');

      // Build contents array from history + new message
      const contents = [
        ...sessionHistory,
        { role: 'user', parts: [{ text: messageToSend }] },
      ];

      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: { maxOutputTokens: 500, temperature: 0.7 },
      });

      console.log('[Chatbot] Raw result:', result);
      const responseText = result.text;
      console.log('[Chatbot] Response text:', responseText);

      setSessionHistory((prev) => [
        ...prev,
        { role: 'user',  parts: [{ text: messageToSend }] },
        { role: 'model', parts: [{ text: responseText }] },
      ]);

      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'assistant', text: responseText }]);
      setSuggestions(getSuggestions(responseText));
    } catch (err) {
      console.error('[Chatbot] ERROR name:', err.name);
      console.error('[Chatbot] ERROR message:', err.message);
      console.error('[Chatbot] ERROR stack:', err.stack);
      console.error('[Chatbot] Full error object:', err);
      setIsTyping(false);

      // Show the real error in the chat bubble so you can see it without DevTools
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `⚠️ Error: ${err.message || 'Unknown error'}`,
        },
      ]);
    }
  }, [input, isTyping, hasApiKey, sessionHistory]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        text: "Chat cleared! Ask me anything about Sai's background, skills, or projects.",
      },
    ]);
    setSessionHistory([]);
    setApiError(null);
  };

  return (
    <div className="chatbot-widget">
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: '#111827',
              border: '1px solid rgba(99,102,241,0.25)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Sai's AI Assistant</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-xs">
                      {hasApiKey ? 'Powered by Gemini' : 'Demo mode'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Clear chat"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* API key warning */}
            {!hasApiKey && (
              <div className="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20">
                <p className="text-amber-400 text-xs">
                  Add <code className="font-mono bg-amber-500/20 px-1 rounded">REACT_APP_GEMINI_API_KEY</code> to .env to enable AI responses.
                </p>
              </div>
            )}

            {/* Messages */}
            <div
              className="chatbot-messages overflow-y-auto p-4"
              style={{ height: '320px' }}
            >
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}
              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Starter prompts (first load) or contextual follow-ups */}
            <AnimatePresence>
              {!isTyping && (suggestions.length > 0 || messages.length <= 1) && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-3 flex flex-wrap gap-1.5"
                >
                  {(suggestions.length > 0 ? suggestions : QUICK_PROMPTS).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all duration-150"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="p-3 border-t border-white/5">
              <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-primary/50 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Sai..."
                  rows={3}
                  className="flex-1 bg-transparent text-slate-200 placeholder-slate-600 text-sm resize-none outline-none max-h-36 leading-relaxed"
                  style={{ minHeight: '60px' }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim() && !isTyping
                      ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                      : 'rgba(99,102,241,0.2)',
                  }}
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-slate-700 text-xs mt-1.5">
                Press Enter to send · Shift+Enter for newline
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
            : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
        }}
        aria-label="Toggle AI chat assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot for first visit */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-dark animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
