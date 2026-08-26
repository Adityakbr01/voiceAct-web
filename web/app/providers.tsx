"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { captureUTMParams, trackPageView } from "@/lib/tracking";
import { initWebVitals } from "@/lib/web-vitals";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/layouts/nav-bar";
import { Footer } from "@/components/layouts/footer";
import { FigmaCursor } from "@/components/ui/figma-cursor";

// FigmaCursor is a desktop-only cosmetic effect. Load it dynamically on
// coarse-pointer devices we skip it entirely (also drops framer-motion
// from the touch-device bundle once we move the import to a chunk).
const FigmaCursorLazy = dynamic(
  () => import("@/components/ui/figma-cursor").then((m) => m.FigmaCursor),
  { ssr: false },
);

function PostHogInit() {
  useEffect(() => {
    if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    let cancelled = false;

    const loadPostHog = async () => {
      const { default: posthog } = await import("posthog-js");
      if (cancelled) return;
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: false,
        autocapture: false,
        disable_surveys: true,
        disable_session_recording: true,
        advanced_disable_decide: true,
      });
    };

    const supportsIdleCallback = "requestIdleCallback" in window && "cancelIdleCallback" in window;
    const idleHandle = supportsIdleCallback
      ? window.requestIdleCallback(() => void loadPostHog(), { timeout: 4_000 })
      : window.setTimeout(() => void loadPostHog(), 3_000);

    return () => {
      cancelled = true;
      if (supportsIdleCallback) window.cancelIdleCallback(idleHandle as number);
      else window.clearTimeout(idleHandle as number);
    };
  }, []);

  return null;
}

function FigmaCursorGate() {
  // Render the FigmaCursor only on fine-pointer devices (desktop with a mouse).
  // On touch / coarse-pointer devices we render nothing — the CSS already hides
  // the native cursor, but skipping the component avoids mounting 5 SVG variants,
  // framer-motion subscriptions, and global mouse listeners.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
  }, []);
  if (!enabled) return null;
  return <FigmaCursorLazy />;
}

function useIdleEffect(fn: () => void, deps: React.DependencyList) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      };
    const run = () => fn();
    if (typeof w.requestIdleCallback === "function") {
      const handle = w.requestIdleCallback(run, { timeout: 2_000 });
      return () => w.cancelIdleCallback?.(handle);
    }
    const handle = w.setTimeout(run, 1_500);
    return () => w.clearTimeout(handle);
  }, deps);
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  // Defer Web Vitals reporting until the browser is idle — they aren't a
  // critical-path signal and they add observer setup cost on initial paint.
  useIdleEffect(() => initWebVitals(), []);

  // UTM capture and page-view tracking also moved off the initial render path.
  useIdleEffect(() => {
    captureUTMParams();
    trackPageView(pathname ?? "/");
  }, [pathname]);

  return (
    <>
      <PostHogInit />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FigmaCursorGate />
          <SmoothScroll>
            {!isAdmin && <NavBar />}
            {children}
            {!isAdmin && <Footer />}
          </SmoothScroll>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
