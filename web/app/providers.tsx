"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { captureUTMParams, trackPageView } from "@/lib/tracking";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/layouts/nav-bar";
import { Footer } from "@/components/layouts/footer";

function PostHogInit() {
  useEffect(() => {
    if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    let cancelled = false;

    const loadPostHog = async () => {
      const { default: posthog } = await import("posthog-js");
      if (cancelled) return;
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
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

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    captureUTMParams();
    trackPageView(pathname ?? "/");
  }, [pathname]);

  return (
    <>
      <PostHogInit />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {!isAdmin && <NavBar />}
          {children}
          {!isAdmin && <Footer />}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
