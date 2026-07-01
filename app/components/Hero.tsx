"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Particle type ───────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

// ─── Star field ──────────────────────────────────────────────────────────────
function StarField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = 80;
    const list: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 6,
    }));
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [p.opacity, p.opacity * 0.2, p.opacity] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Typing text ─────────────────────────────────────────────────────────────
const ROLES = [
  "Full-stack web developer",
  "Based on 🇮🇩",
];

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timeout = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          60
        );
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1800);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("deleting"), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          35
        );
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx]);

  return (
    <p className="text-lg text-white/60 tracking-wide font-light mt-3">
      {displayed}
      <span
        className="inline-block w-[2px] h-[1em] bg-white/60 align-middle ml-[2px]"
        style={{ animation: "blink 1s step-end infinite" }}
      />
    </p>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <StarField />

      {/* Center content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(4rem,12vw,9rem)] font-extrabold leading-none tracking-tighter text-white"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          rizqan
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div variants={itemVariants}>
          <TypingText />
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3 mt-10 justify-center"
        >
          <Link
            href="/about"
            className="hero-btn hero-btn--outline"
            id="hero-about-btn"
          >
            About me
          </Link>
          <Link
            href="/projects"
            className="hero-btn hero-btn--filled"
            id="hero-projects-btn"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="hero-btn hero-btn--outline"
            id="hero-contact-btn"
          >
            Contact
          </Link>
        </motion.div>
      </motion.div>



      {/* Global blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.55rem 1.6rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hero-btn:hover {
          transform: scale(1.04);
        }
        .hero-btn--outline {
          border: 1px solid rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.85);
          background: transparent;
        }
        .hero-btn--outline:hover {
          border-color: rgba(255,255,255,0.55);
          color: #fff;
          box-shadow: 0 0 18px rgba(255,255,255,0.08);
        }
        .hero-btn--filled {
          background: #fff;
          color: #000;
          border: 1px solid #fff;
        }
        .hero-btn--filled:hover {
          background: rgba(255,255,255,0.88);
          box-shadow: 0 0 24px rgba(255,255,255,0.2);
        }
      `}</style>
    </section>
  );
}
