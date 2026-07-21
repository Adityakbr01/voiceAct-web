"use client";

import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function AuroraBackgroundDemo() {
  return (
    <AuroraBackground className="relative py-32 md:py-44">
      {/* Top fade — blends into Hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-background) 0%, transparent 100%)",
        }}
      />

      {/* Bottom fade — blends into Showcase */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40"
        style={{
          background:
            "linear-gradient(to top, var(--color-background) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-20 flex flex-col gap-4 items-center justify-center px-4">
        <div className="text-3xl md:text-7xl font-bold text-foreground text-center">
          Background lights are cool you know.
        </div>
        <div className="font-extralight text-base md:text-4xl text-muted-foreground py-4">
          And this, is chemical burn.
        </div>
        <button className="bg-foreground text-background rounded-full w-fit px-4 py-2">
          Debug now
        </button>
      </div>
    </AuroraBackground>
  );
}
