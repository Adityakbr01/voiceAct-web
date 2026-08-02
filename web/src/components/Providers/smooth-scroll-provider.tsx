"use client";

import { useEffect, type ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const initialize = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
      (window as any).lenis = lenis;

      const handleScroll = () => ScrollTrigger.update();
      const updateTicker = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", handleScroll);
      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      const onAnchorClick = (event: MouseEvent) => {
        const target = (event.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        const hash = target?.getAttribute("href");
        if (!hash || hash.length < 2) return;

        const element = document.querySelector(hash);
        if (!element) return;
        event.preventDefault();
        lenis.scrollTo(element as HTMLElement, { offset: -80, duration: 1 });
      };
      document.addEventListener("click", onAnchorClick);

      let refreshTimer: number | undefined;
      const scheduleRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => {
          lenis.resize();
          ScrollTrigger.refresh();
        }, 150);
      };
      const resizeObserver = new ResizeObserver(scheduleRefresh);
      resizeObserver.observe(document.body);

      cleanup = () => {
        window.clearTimeout(refreshTimer);
        gsap.ticker.remove(updateTicker);
        lenis.off("scroll", handleScroll);
        document.removeEventListener("click", onAnchorClick);
        resizeObserver.disconnect();
        lenis.destroy();
        delete (window as any).lenis;
      };
    };

    const supportsIdleCallback =
      "requestIdleCallback" in window && "cancelIdleCallback" in window;
    const idleHandle = supportsIdleCallback
      ? window.requestIdleCallback(() => void initialize(), { timeout: 2_500 })
      : window.setTimeout(() => void initialize(), 1_500);

    return () => {
      cancelled = true;
      if (supportsIdleCallback) window.cancelIdleCallback(idleHandle as number);
      else window.clearTimeout(idleHandle as number);
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
