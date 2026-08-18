"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

function LenisSyncHandler() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Reset scroll position on route changes
    lenis.scrollTo(0, { immediate: true });

    let update: ((time: number) => void) | null = null;
    let gsapInstance: any = null;
    let scrollTriggerInstance: any = null;

    // Dynamically import GSAP to keep initial critical path payload ultra-light
    import("gsap").then(async ({ default: gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      scrollTriggerInstance = ScrollTrigger;
      lenis.on("scroll", ScrollTrigger.update);

      update = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
    }).catch(() => {
      // Fallback requestAnimationFrame if GSAP is unavailable
      let rafId: number;
      const fallbackUpdate = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(fallbackUpdate);
      };
      rafId = requestAnimationFrame(fallbackUpdate);
      return () => cancelAnimationFrame(rafId);
    });

    return () => {
      if (gsapInstance && update) {
        gsapInstance.ticker.remove(update);
      }
      if (lenis && scrollTriggerInstance) {
        lenis.off("scroll", scrollTriggerInstance.update);
      }
    };
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        lerp: 0.1, // Exactly what lenis.dev uses: snappy 10% interpolation, direct and responsive
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: !reducedMotion,
        syncTouch: false, // Keep native 120Hz touch momentum on mobile for peak performance
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
      }}
    >
      <LenisSyncHandler />
      {children}
    </ReactLenis>
  );
}
