"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { listProjects } from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";

const CircularGallery = dynamic(() => import("@/components/ui/circular-gallery"), { ssr: false });

export function Showcase() {
  const { data: apiProjects } = useQuery({
    queryKey: queryKeys.public.projects,
    queryFn: listProjects,
    staleTime: 60_000,
  });

  const showcaseItems =
    apiProjects
      ?.filter((p) => p.image)
      .map((p) => ({
        image: p.image!,
        text: p.title ?? p.client ?? "Project",
      })) ?? [];

  if (showcaseItems.length === 0) return null;

  return (
    <section id="showcase" className="relative overflow-hidden bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
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
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          Explore a selection of interactive prototypes, custom dashboards, and user experiences
          we've crafted. Drag or scroll to browse.
        </p>
      </div>

      <div className="relative mt-12 h-[450px] w-full sm:h-[550px] md:h-[600px]">
        <CircularGallery
          items={showcaseItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </section>
  );
}
