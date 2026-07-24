"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/Providers/smooth-scroll-provider";
import { captureUTMParams, trackPageView } from "@/lib/tracking";
import { usePathname } from "next/navigation";
import { NavBar } from "@/modules/home/components/nav-bar";
import { Footer } from "@/components/layouts/footer";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    captureUTMParams();
    trackPageView();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SmoothScrollProvider>
          {!isAdmin && <NavBar />}
          {children}
          {!isAdmin && <Footer />}
        </SmoothScrollProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
