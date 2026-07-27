"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Detect coarse pointers (phones/tablets) — native inertial scroll is
    // already excellent there, so we let the browser handle it and only
    // smooth the wheel/trackpad path on desktop.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: !isTouch,
      syncTouch: false,
    });

    (window as any).lenis = lenis;

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Drive Lenis RAF loop through GSAP's single synchronized ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

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

    // Handle resizes (images loading, content rendering)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off("scroll", handleScroll);
      document.removeEventListener("click", onAnchorClick);
      resizeObserver.disconnect();
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
