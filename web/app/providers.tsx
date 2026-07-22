"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/Providers/smooth-scroll-provider";
import { captureUTMParams, trackPageView } from "@/lib/tracking";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    captureUTMParams();
    trackPageView();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
