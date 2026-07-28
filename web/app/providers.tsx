"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { captureUTMParams, trackPageView } from "@/lib/tracking";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const SmoothScrollProvider = dynamic(
  () => import("@/components/Providers/smooth-scroll-provider").then((m) => m.SmoothScrollProvider),
  { ssr: false },
);
const NavBar = dynamic(() => import("@/modules/home/components/nav-bar").then((m) => m.NavBar), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/layouts/footer").then((m) => m.Footer), {
  ssr: false,
});

function PostHogInit() {
  useEffect(() => {
    if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    });
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
      <PostHogProvider client={posthog}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <SmoothScrollProvider>
              {!isAdmin && <NavBar />}
              {children}
              {!isAdmin && <Footer />}
            </SmoothScrollProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </PostHogProvider>
    </>
  );
}
