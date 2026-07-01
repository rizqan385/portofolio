"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // JS-based breakpoint check — avoids CSS responsive class issues
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change or if resized to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [pathname, isMobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed top bar ─────────────────────────────────────────────── */}
      <header
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled && !menuOpen
            ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
            : "bg-transparent"
          }`}
      >
        <nav className="max-w-5xl mx-auto flex items-center justify-center px-6 h-16 relative">

          {/* Desktop: pill-bordered nav links (centered) */}
          {!isMobile && (
            <ul className="flex items-center gap-1 border border-white/15 rounded-full px-2 py-1.5 bg-white/[0.03]">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      id={`nav-${label.toLowerCase()}`}
                      className={`relative px-4 py-1.5 rounded-full text-[14px] transition-colors duration-200 block ${active
                          ? "text-white bg-white/10"
                          : "text-white/50 hover:text-white/85 hover:bg-white/5"
                        }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Mobile: hamburger only (absolute right, no other content in header) */}
          {isMobile && (
            <button
              id="nav-hamburger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="absolute right-6 flex flex-col justify-center items-end gap-[6px] w-8 h-8"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                className="block h-[1.5px] bg-white/80 origin-center"
                style={{ width: "22px" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-[1.5px] bg-white/80"
                style={{ width: "14px" }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                className="block h-[1.5px] bg-white/80 origin-center"
                style={{ width: "22px" }}
              />
            </button>
          )}
        </nav>
      </header>

      {/* ── Mobile fullscreen overlay (ONLY renders on mobile when open) ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black flex flex-col px-6"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {/* Top row: rizqan (only here, only on mobile, only when open) + X */}
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-white font-semibold text-base tracking-wide"
              >
                rizqan
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex flex-col justify-center items-center w-8 h-8 gap-0"
              >
                <span
                  className="block h-[1.5px] bg-white/80 origin-center"
                  style={{ width: "22px", transform: "rotate(45deg) translateY(0.75px)" }}
                />
                <span
                  className="block h-[1.5px] bg-white/80 origin-center"
                  style={{ width: "22px", transform: "rotate(-45deg) translateY(-0.75px)" }}
                />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col mt-8">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Link
                    href={href}
                    id={`nav-mobile-${label.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-5xl font-bold tracking-tight py-4 border-b border-white/[0.07] transition-colors duration-200 ${pathname === href ? "text-white" : "text-white/25 hover:text-white"
                      }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
