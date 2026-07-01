"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ─── Data — tambah image: "/projects/nama.png" kalau udah punya screenshot ───
const PROJECTS = [
  {
    id: "M-001",
    name: "Website Portofolio Sekolah",
    desc: "Platform pendidikan modern menuju era industri untuk mempersiapkan lulusan yang kompeten dan siap kerja.",
    long: "Dibangun untuk SMK YAJ Depok, menyediakan informasi profil sekolah, PPDB online terintegrasi, direktori akademik, galeri, serta berita dan agenda terkini.",
    tags: ["Laravel", "MySQL", "Bootstrap"],
    github: "https://github.com/Vrdeyy/Web-Sekolah",
    live: "",
    status: "Complete",
    accent: "#FF2D20",
    image: "/projects/m-001.png",
  },
  {
    id: "M-002",
    name: "Perpustakaan Digital",
    desc: "Platform e-perpustakaan untuk menemukan dan meminjam ribuan judul buku favorit secara digital di mana saja.",
    long: "Memberikan kemudahan bagi pengguna untuk menjelajahi koleksi buku, mencari berdasarkan judul atau pengarang, serta melakukan registrasi untuk peminjaman.",
    tags: ["Laravel", "MySQL", "Vue",],
    github: "https://github.com/rizqan385/perpus_ukk",
    live: "",
    status: "Complete",
    accent: "#61DAFB",
    image: "/projects/m-002.png",
  },
  {
    id: "M-003",
    name: "Buku Induk Siswa",
    desc: "Sistem Informasi Manajemen Data Induk Siswa SMK untuk pendataan administrasi yang terpusat.",
    long: "Memiliki fitur pengelolaan data siswa lengkap, manajemen nilai & akademik, pencatatan log aktivitas, serta fitur export & cetak dokumen terintegrasi.",
    tags: ["Golang", "MySQL", "React"],
    github: "https://github.com/rizqan385/daftar_induk_siswa",
    live: "",
    status: "Complete",
    accent: "#68A063",
    image: "/projects/m-003.png",
  },
  {
    id: "M-004",
    name: "Portfolio Website",
    desc: "This site — custom cursor, orbital skill viz, smooth animations, space theme.",
    long: "",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/rizqan",
    live: "/",
    status: "Active",
    accent: "#7952B3",
    image: "/projects/m-004.png",
  },
  {
    id: "M-005",
    name: "Svarga Dimsum",
    desc: "Website company profile UMKM untuk Svarga Dimsum yang menyajikan dimsum pilihan dengan rasa otentik.",
    long: "Menampilkan katalog menu favorit, testimoni pelanggan, keranjang belanja, serta alur pemesanan yang mudah untuk memberikan pengalaman kuliner terbaik.",
    tags: ["Html", "CSS", "JavaScript"],
    github: "https://github.com/LocalGrow/WebsiteUMKM_ITsDay",
    live: "",
    status: "Complete",
    accent: "#F7DF1E",
    image: "/projects/m-005.png",
  },
];

// ─── Stars ────────────────────────────────────────────────────────────────────
interface Star { id: number; x: number; y: number; size: number; opacity: number; dur: number; delay: number }
function Stars() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 100 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 0.4, opacity: Math.random() * 0.45 + 0.08,
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
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] opacity-[0.045]"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-1/3 left-1/5 w-[400px] h-[400px] opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #1d4ed8, transparent 70%)", filter: "blur(80px)" }} />
    </div>
  );
}

// ─── Image / Placeholder ──────────────────────────────────────────────────────
function ProjectVisual({ p, tall = false }: { p: typeof PROJECTS[0]; tall?: boolean }) {
  const h = tall ? "h-72 sm:h-80" : "h-48";
  if (p.image) {
    return (
      <div className={`relative w-full ${h} overflow-hidden`}>
        <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
    );
  }
  // Placeholder — decorative
  return (
    <div className={`relative w-full ${h} overflow-hidden flex items-center justify-center`}
      style={{ background: `linear-gradient(135deg, #0a0a0a 0%, ${p.accent}18 50%, #0a0a0a 100%)` }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(${p.accent}40 1px, transparent 1px), linear-gradient(90deg, ${p.accent}40 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />
      {/* Orbit rings */}
      <div className="absolute" style={{ width: 180, height: 180, borderRadius: "50%", border: `1px solid ${p.accent}22` }} />
      <div className="absolute" style={{ width: 120, height: 120, borderRadius: "50%", border: `1px solid ${p.accent}30` }} />
      <div className="absolute" style={{ width: 60, height: 60, borderRadius: "50%", background: `${p.accent}18`, border: `1px solid ${p.accent}40` }} />
      {/* Mission ID */}
      <span className="relative font-mono font-bold text-5xl sm:text-6xl tracking-widest opacity-[0.12]" style={{ color: p.accent }}>
        {p.id}
      </span>
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      {/* Upload hint — subtle */}
      <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/15 flex items-center gap-1">
        <span>⬆</span> add screenshot
      </div>
    </div>
  );
}

// ─── GitHub icon ──────────────────────────────────────────────────────────────
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ─── Featured card (large horizontal) ────────────────────────────────────────
function FeaturedCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/[0.14] transition-all duration-500"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${p.accent}10 0%, transparent 55%)` }} />

      <div className="flex flex-col lg:flex-row">
        {/* Image side */}
        <div className="lg:w-[55%] flex-shrink-0">
          <ProjectVisual p={p} tall />
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-between p-7 lg:p-8 flex-1">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] font-mono text-white/25 tracking-[0.2em]">{p.id}</span>
              <div className="flex items-center gap-1.5">
                {p.status === "Active" && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: p.accent }} />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: p.accent }} />
                  </span>
                )}
                {p.status === "Complete" && (
                  <span className="inline-flex rounded-full h-1.5 w-1.5" style={{ background: p.accent }} />
                )}
                <span className="text-[10px] font-mono text-white/25">{p.status}</span>
              </div>
            </div>

            {/* Accent bar */}
            <div className="h-px w-12 mb-5 rounded-full" style={{ background: p.accent }} />

            <h2 className="text-2xl font-bold tracking-tight text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
              {p.name}
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-2">{p.desc}</p>
            {p.long && <p className="text-white/30 text-xs leading-relaxed mb-5">{p.long}</p>}
          </div>

          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {p.tags.map(t => (
                <span key={t} className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/[0.08] text-white/45 bg-white/[0.03]">{t}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href={p.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200">
                <GithubIcon />
                GitHub
              </Link>
              {p.live && (
                <Link href={p.live}
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                  style={{ color: p.accent }}>
                  Live Preview ↗
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Grid card ────────────────────────────────────────────────────────────────
function GridCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/[0.14] transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${p.accent}0c 0%, transparent 60%)` }} />

      {/* Image thumbnail */}
      <ProjectVisual p={p} />

      {/* Accent line */}
      <div className="h-[1.5px] w-full" style={{ background: `linear-gradient(90deg, ${p.accent}99, transparent 70%)` }} />

      <div className="relative z-10 flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-mono text-white/20 tracking-widest">{p.id}</span>
          <div className="flex items-center gap-1.5">
            {p.status === "Active" ? (
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: p.accent }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: p.accent }} />
              </span>
            ) : (
              <span className="inline-flex rounded-full h-1.5 w-1.5" style={{ background: `${p.accent}80` }} />
            )}
            <span className="text-[9px] font-mono text-white/20">{p.status}</span>
          </div>
        </div>

        <h2 className="text-base font-bold tracking-tight text-white/85 mb-2 group-hover:text-white transition-colors duration-300">
          {p.name}
        </h2>
        <p className="text-xs text-white/38 leading-relaxed mb-4 flex-1">{p.desc}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {p.tags.map(t => (
            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full border border-white/[0.07] text-white/35">{t}</span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href={p.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white transition-colors duration-200">
            <GithubIcon size={12} />
            <span>GitHub</span>
          </Link>
          {p.live && (
            <Link href={p.live} className="text-xs transition-colors duration-200" style={{ color: `${p.accent}99` }}>
              Live ↗
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      <Stars />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-28">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }} className="mb-16">
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-4 font-mono">◎ Mission Log</p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter leading-none mb-5"
            style={{ fontFamily: "var(--font-inter)" }}>Projects</h1>
          <p className="text-white/40 text-lg max-w-lg leading-relaxed">
            Things I&apos;ve built, launched, and shipped — across the full stack.
          </p>
          <div className="flex items-center gap-4 mt-10">
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-white/15 text-xs font-mono">{PROJECTS.length} projects</span>
          </div>
        </motion.div>

        {/* All projects — uniform grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => <GridCard key={p.id} p={p} i={i} />)}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center">
          <Link href="https://github.com/rizqan385" target="_blank"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 text-sm text-white/50 hover:text-white/80">
            <GithubIcon />
            <span>More on GitHub</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
