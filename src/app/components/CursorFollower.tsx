"use client";

import { useEffect, useRef } from "react";

// Uses direct DOM manipulation (no setState) — zero React re-renders on mouse move
export default function CursorFollower() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let hideTimer: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      el.style.opacity = "1";
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        el.style.opacity = "0";
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px] opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(var(--primary-rgb, 99,102,241), 0.1) 0%, transparent 70%)",
        filter: "blur(40px)",
        willChange: "transform",
      }}
    />
  );
}
