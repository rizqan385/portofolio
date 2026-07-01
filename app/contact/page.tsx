"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DiscordProfile from "../components/DiscordProfile";

// ─── Stars Background ────────────────────────────────────────────────────────
interface Star { id: number; x: number; y: number; size: number; opacity: number; dur: number; delay: number }

function Stars() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 80 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 0.4, opacity: Math.random() * 0.5 + 0.08,
      dur: Math.random() * 5 + 3, delay: Math.random() * 7,
    })));
  }, []);
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map(s => (
        <motion.div key={s.id} className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.opacity, s.opacity * 0.1, s.opacity] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.02]"
        style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)", filter: "blur(100px)" }} />
    </div>
  );
}

// ─── Icons ──────────────────────────────────────────────────────────────────
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    window.location.href = `mailto:rizqanahmad942@gmail.com?subject=${subject}&body=${body}`;
    
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="relative min-h-screen bg-black text-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      <Stars />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16 text-center"
        >
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-4 font-mono">◎ Establish Communication</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none mb-5" style={{ fontFamily: "var(--font-inter)" }}>
            Let&apos;s Talk
          </h1>
          <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Reach out via Discord, social media, or send a direct message through the terminal below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">

          {/* Left Column: Discord & Socials */}
          <div className="flex flex-col gap-8">
            {/* Discord Profile */}
            <div className="group relative">
              {/* Glow behind profile */}
              <div className="absolute inset-0 bg-indigo-500/10 blur-[50px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none" />
              <DiscordProfile id="1497601892337844305" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 max-w-sm mx-auto w-full"
            >
              <a href="https://wa.me/6289513270487" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group">
                <WhatsappIcon />
                <span className="text-[10px] text-white/50 group-hover:text-white uppercase tracking-wider">WhatsApp</span>
              </a>
              <a href="https://www.instagram.com/rizqanahmd/" className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group">
                <InstagramIcon />
                <span className="text-[10px] text-white/50 group-hover:text-white uppercase tracking-wider">Instagram</span>
              </a>
              <a href="https://github.com/rizqan385" target="_blank" className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group">
                <GithubIcon />
                <span className="text-[10px] text-white/50 group-hover:text-white uppercase tracking-wider">GitHub</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full relative"
          >
            {/* Form Container */}
            <div className="relative p-8 rounded-3xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Subtle top gradient line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <h3 className="text-xl font-bold tracking-tight mb-1 text-white/90">Send a Message</h3>
              <p className="text-xs text-white/40 mb-8">Directly to my inbox.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  Initiate Transmission
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
