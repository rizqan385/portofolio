"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

// ─── Skill definitions ────────────────────────────────────────────────────────
const SKILLS = [
  { name: "React", slug: "react", color: "#61DAFB", fg: "#000", orbit: 1, angle: 0 },
  { name: "HTML", slug: "html5", color: "#E34F26", fg: "#fff", orbit: 1, angle: 180 },
  { name: "JS", slug: "javascript", color: "#F7DF1E", fg: "#000", orbit: 2, angle: 0 },
  { name: "TS", slug: "typescript", color: "#3178C6", fg: "#fff", orbit: 2, angle: 90 },
  { name: "Git", slug: "git", color: "#F05032", fg: "#fff", orbit: 2, angle: 180 },
  { name: "MySQL", slug: "mysql", color: "#4479A1", fg: "#fff", orbit: 2, angle: 270 },
  { name: "Next.js", slug: "nextdotjs", color: "#ffffff", fg: "#000", orbit: 3, angle: 0 },
  { name: "Node.js", slug: "nodedotjs", color: "#68A063", fg: "#fff", orbit: 3, angle: 72 },
  { name: "Laravel", slug: "laravel", color: "#FF2D20", fg: "#fff", orbit: 3, angle: 144 },
  { name: "Tailwind", slug: "tailwindcss", color: "#06B6D4", fg: "#fff", orbit: 3, angle: 216 },
  { name: "Bootstrap", slug: "bootstrap", color: "#7952B3", fg: "#fff", orbit: 3, angle: 288 },
];

const ORBIT_CFG: Record<number, { r: number; dur: number }> = {
  1: { r: 110, dur: 12 },
  2: { r: 188, dur: 22 },
  3: { r: 272, dur: 34 },
};

const BOX = 660;

// ─── What I do cards ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "✦",
    title: "Frontend Development",
    desc: "Crafting pixel-perfect, responsive interfaces with React, Next.js, and modern CSS. I care deeply about UX and micro-interactions.",
    tags: ["React", "Next.js", "Tailwind", "TypeScript"],
    color: "#61DAFB",
  },
  {
    icon: "⬡",
    title: "Backend Development",
    desc: "Building robust, scalable APIs and server-side logic. From RESTful services to full MVC architectures with Laravel and Node.js.",
    tags: ["Laravel", "Node.js", "REST API", "MySQL"],
    color: "#68A063",
  },
  {
    icon: "◈",
    title: "Full-Stack Solutions",
    desc: "End-to-end product development — from database design to deployment. I connect the dots between frontend and backend seamlessly.",
    tags: ["Full-Stack", "Git", "CI/CD", "Agile"],
    color: "#7952B3",
  },
];

// ─── Fun facts ────────────────────────────────────────────────────────────────
const FACTS = [
  { emoji: "🌙", text: "Peak productivity at midnight" },
  { emoji: "☕", text: "Coffee → Code → Repeat" },
  { emoji: "🎮", text: "Gamer when not coding" },
  { emoji: "🌏", text: "Based in Indonesia 🇮🇩" },
  { emoji: "⚡", text: "Obsessed with clean code" },
];

// ─── Stars background ─────────────────────────────────────────────────────────
interface Star { id: number; x: number; y: number; size: number; opacity: number; dur: number; delay: number }

function Stars() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 90 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.5 + 0.1,
      dur: Math.random() * 4 + 3, delay: Math.random() * 6,
    })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => (
        <motion.div key={s.id} className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.opacity, s.opacity * 0.1, s.opacity] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.035]"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)", filter: "blur(60px)" }} />
    </div>
  );
}

// ─── Orbital visualization ────────────────────────────────────────────────────
function SkillsOrbit() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const resize = () => {
      if (wrapRef.current) {
        // Prevent it from shrinking too much on mobile so it stays large & realistic
        const screenW = wrapRef.current.offsetWidth;
        const newScale = screenW < 500 ? Math.max(0.75, screenW / 500) : Math.min(1, screenW / BOX);
        setScale(newScale);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useAnimationFrame((t) => {
    if (startTime.current === null) startTime.current = t;
    const elapsed = (t - startTime.current) / 1000;
    SKILLS.forEach((skill, i) => {
      const { r, dur } = ORBIT_CFG[skill.orbit];
      const angle = (skill.angle * Math.PI / 180) + (elapsed / dur) * 2 * Math.PI;
      const x = Math.cos(angle) * r, y = Math.sin(angle) * r;
      if (badgeRefs.current[i]) {
        badgeRefs.current[i]!.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }
    });
  });

  return (
    <div ref={wrapRef} className="w-full flex justify-center overflow-visible">
      <div style={{ width: BOX, height: BOX, position: "relative", transform: `scale(${scale})`, transformOrigin: "top center", flexShrink: 0 }}>
        {[1, 2, 3].map(o => (
          <div key={o} style={{
            position: "absolute", top: "50%", left: "50%",
            width: ORBIT_CFG[o].r * 2, height: ORBIT_CFG[o].r * 2,
            marginLeft: -ORBIT_CFG[o].r, marginTop: -ORBIT_CFG[o].r,
            borderRadius: "50%", 
            border: "1px dashed rgba(255,255,255,0.2)",
            boxShadow: "0 0 30px rgba(255,255,255,0.05) inset, 0 0 10px rgba(255,255,255,0.03)", 
            pointerEvents: "none",
          }} />
        ))}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 52, height: 52, marginLeft: -26, marginTop: -26,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 38%, #fff 0%, #fde68a 40%, #f59e0b 100%)",
          boxShadow: "0 0 40px 14px rgba(251,191,36,0.28), 0 0 90px 40px rgba(251,191,36,0.1)",
        }} />
        {SKILLS.map((s, i) => (
          <div key={s.name} ref={el => { badgeRefs.current[i] = el; }}
            style={{ position: "absolute", top: "50%", left: "50%", willChange: "transform" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: `linear-gradient(135deg, ${s.color}20, ${s.color}0d)`,
              border: `1px solid ${s.color}44`,
              borderRadius: 999, padding: "5px 12px 5px 6px",
              backdropFilter: "blur(8px)",
              boxShadow: `0 0 14px ${s.color}2a, 0 2px 8px rgba(0,0,0,0.5)`,
              whiteSpace: "nowrap",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: s.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, overflow: "hidden",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://cdn.simpleicons.org/${s.slug}/${s.fg === "#000" ? "000000" : "ffffff"}`}
                  alt={s.name} width={14} height={14} style={{ display: "block" }} />
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.88)",
                fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.03em"
              }}>
                {s.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Fade variants ────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="relative bg-black text-white overflow-hidden"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      <Stars />

      {/* ── Hero Bio ─────────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center px-6 pt-24 pb-16 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 w-full">

          {/* Text */}
          <div className="flex-1">
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="text-white/40 text-xs tracking-[0.25em] uppercase mb-5">
              About me
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="text-5xl sm:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-8"
              style={{ fontFamily: "var(--font-inter)" }}>
              Hi, I&apos;m<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.4))" }}>
                Rizqan.
              </span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="max-w-lg text-white/50 text-[17px] leading-[1.85] mb-10">
              A passionate full-stack developer based in Indonesia. I love crafting
              clean, performant web experiences — from pixel-perfect frontends to
              solid backend architectures. Always curious, always building.
            </motion.p>

            {/* Stats */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-10 mb-10">
              {[
                { label: "Years coding", value: "3+" },
                { label: "Projects built", value: "5" },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-4xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-white/35 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Fun facts pills */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-2">
              {FACTS.map(f => (
                <span key={f.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/50 border border-white/[0.08] bg-white/[0.03]">
                  <span>{f.emoji}</span>
                  <span>{f.text}</span>
                </span>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── What I Do ────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12">
          <p className="text-white/35 text-xs tracking-[0.25em] uppercase mb-3">What I do</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How I can help</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}12 0%, transparent 70%)` }} />

              <div className="relative z-10">
                <div className="text-2xl mb-4" style={{ color: s.color }}>{s.icon}</div>
                <h3 className="text-base font-semibold mb-3 text-white/90">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Skills orbit ─────────────────────────────────────────────── */}
      <section className="relative z-10 pb-28 px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)",
            filter: "blur(40px)"
          }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-2">
          <p className="text-white/35 text-xs tracking-[0.25em] uppercase mb-3">My Toolkit</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Skills in orbit</h2>
          <p className="text-white/30 text-sm mt-2">technologies I work with daily</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} style={{ marginTop: -20 }}>
          <SkillsOrbit />
        </motion.div>
      </section>
    </main>
  );
}
