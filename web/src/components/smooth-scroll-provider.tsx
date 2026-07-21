"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Detect coarse pointers (phones/tablets) — native inertial scroll is
    // already excellent there, so we let the browser handle it and only
    // smooth the wheel/trackpad path on desktop.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      // Snappier than the 1.15s default — feels immediate but still eased.
      duration: 0.9,
      // Classic "expo-out": fast start, gentle settle. Natural on wheel + keys.
      easing: (t) => 1 - Math.pow(1 - t, 3),
      // Smooth wheel + trackpad on desktop only.
      smoothWheel: !isTouch,
      syncTouch: false,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6,
      // Lets the browser handle horizontal scrollers, modals, code blocks, etc.
      gestureOrientation: "vertical",
      // Prevent Lenis from hijacking scroll on nested scrollables that opt out.
      lerp: 0.12,
    });

    // Anchor link handling: smooth scroll to hash targets
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const hash = target.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.0 });
    };
    document.addEventListener("click", onAnchorClick);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
