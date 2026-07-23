"use client";

import CircularGallery from "@/components/ui/circular-gallery";
import { showcaseProjects } from "@/modules/services-data";

export function Showcase() {
  return (
    <section id="showcase" className="relative py-20 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Product Preview
        </span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
          Interfaces engineered
          <br />
          <span className="text-5xl font-bold italic tracking-tight text-primary md:text-[6rem] md:leading-none">
            for real users.
          </span>
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">
          Explore a selection of interactive prototypes, custom dashboards, and user experiences we've crafted. Drag or scroll to browse.
        </p>
      </div>

      <div className="mt-12 h-[450px] sm:h-[550px] md:h-[600px] w-full relative">
        <CircularGallery
          items={showcaseProjects}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </section>
  );
}
