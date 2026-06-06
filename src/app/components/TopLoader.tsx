"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function TopLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);
  const ticker = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const start = () => {
    clearInterval(ticker.current);
    clearTimeout(finishTimer.current);
    setProgress(8);
    setVisible(true);

    // Slowly inch toward 85% while waiting
    ticker.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) {
          clearInterval(ticker.current);
          return p;
        }
        // Ease-out: big steps early, tiny steps near 85
        return p + Math.max(1, (85 - p) * 0.08);
      });
    }, 180);
  };

  const finish = () => {
    clearInterval(ticker.current);
    setProgress(100);
    finishTimer.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 450);
  };

  // Detect internal link clicks → start the bar
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank"
      )
        return;
      if (href === pathname) return;
      start();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  // Pathname changed → navigation finished → complete the bar
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      finish();
    }
  }, [pathname]);

  // Cleanup on unmount
  useEffect(
    () => () => {
      clearInterval(ticker.current);
      clearTimeout(finishTimer.current);
    },
    [],
  );

  return (
    <>
      {/* Progress bar */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-[3px] bg-primary"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transition:
            progress === 100
              ? "width 0.15s ease-out, opacity 0.4s ease 0.15s"
              : "width 0.25s ease-out, opacity 0.1s",
        }}
      />

      {/* Spinner dot on the right end of the bar */}
      {visible && progress < 100 && (
        <div
          aria-hidden
          className="pointer-events-none fixed top-0 z-[9999] h-[3px] w-5 overflow-hidden"
          style={{
            left: `calc(${progress}% - 20px)`,
            transition: "left 0.25s ease-out",
          }}
        >
          <div className="absolute right-0 top-0 h-full w-full bg-primary opacity-60 blur-[3px]" />
        </div>
      )}
    </>
  );
}
