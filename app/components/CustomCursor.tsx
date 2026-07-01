"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [textSize, setTextSize] = useState<number | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      // First: if anywhere inside a button or link → stay circle, done
      if (el.closest("button, a")) {
        setTextSize(null);
        return;
      }

      // Then: check for text-only elements
      const tag = el.tagName.toUpperCase();
      const textTags = ["H1", "H2", "H3", "H4", "P", "SPAN", "LABEL", "LI"];
      const textEl =
        textTags.includes(tag)
          ? el
          : el.closest("h1, h2, h3, h4, p, span, label, li");

      if (textEl) {
        const fs = parseFloat(getComputedStyle(textEl).fontSize);
        setTextSize(isNaN(fs) ? 16 : fs);
      } else {
        setTextSize(null);
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(-200px, -200px)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const isText = textSize !== null;
  const caretHeight = isText ? Math.min(Math.max(textSize!, 14), 120) : 20;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        marginLeft: isText ? "-1.5px" : "-10px",
        marginTop: isText ? `${-caretHeight / 2}px` : "-10px",
        width: isText ? "3px" : "20px",
        height: isText ? `${caretHeight}px` : "20px",
        borderRadius: isText ? "2px" : "50%",
        background: isText ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)",
        mixBlendMode: "difference",
        transition:
          "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), border-radius 0.25s cubic-bezier(0.22,1,0.36,1), margin 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  );
}
