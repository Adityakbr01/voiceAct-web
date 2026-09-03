"use client";

import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/modules/home/components/section";
import { usePublicProjects } from "@/hooks/use-public-cms";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";

export function Work() {
  const { data: rawWork = [] } = usePublicProjects();
  const work = rawWork.slice(0, 3);

  return (
    <Section id="work">
      <div>
        <SectionHeader
          eyebrow="Selected work"
          title={
            <>
              Shipped products,
              <span className="font-display italic tracking-tight text-primary">
                {" "}
                measured in outcomes.
              </span>
            </>
          }
          description="Apps we designed and built for founders and product teams, running in production today."
        />

        {/* Mobile Layout: Clean, un-cramped responsive card list (no sticky overlap) */}
        <div className="mt-8 flex flex-col gap-5 md:hidden">
          {work.map((w, i) => (
            <a
              key={w.client || w.title || i}
              href="#contact"
              className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-card bg-[var(--gradient-card)] p-5 shadow-lg transition-all duration-300 active:scale-[0.99]"
            >
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                {w.industry && <span>{w.industry}</span>}
                {w.industry && w.client && <span className="h-1 w-1 rounded-full bg-primary/60" />}
                {w.client && <span className="text-primary font-bold">{w.client}</span>}
              </div>

              <h3 className="mt-2.5 text-lg font-bold leading-snug text-foreground">{w.title}</h3>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{w.outcome}</p>

              {/* Metrics Grid */}
              {w.metrics && w.metrics.length > 0 ? (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {w.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="glass flex flex-col items-center justify-center rounded-xl border border-border/80 p-2 text-center"
                    >
                      <div className="font-display text-sm font-bold text-foreground">{m.value}</div>
                      <div className="mt-0.5 text-[8px] uppercase tracking-wider text-muted-foreground font-medium leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : w.services && w.services.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-border/60 bg-background/50 px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground font-medium"
                    >
                      {s.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                <span>Read the case study</span>
                <ArrowUpRight className="size-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Desktop Layout: 3D ScrollStack with balanced card gaps */}
        <div className="mt-16 hidden md:block">
          <ScrollStack
            itemDistance={50}
            itemStackDistance={32}
            baseScale={0.88}
            itemScale={0.03}
            stackPosition="15%"
            useWindowScroll={true}
          >
            {work.map((w, i) => {
              const hasMetrics = Boolean(w.metrics && w.metrics.length > 0);
              const hasServices = Boolean(w.services && w.services.length > 0);
              const hasRightCol = hasMetrics || hasServices;

              return (
                <ScrollStackItem key={w.client || w.title || i}>
                  <a
                    href="#contact"
                    className="group relative block overflow-hidden rounded-3xl border border-border/60 bg-card bg-[var(--gradient-card)] shadow-[var(--shadow-card)] p-8 md:p-10 transition-all duration-500 hover:border-primary/40"
                  >
                    <div className="grid grid-cols-12 items-center gap-8">
                      <div className={hasRightCol ? "col-span-7" : "col-span-12"}>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                          {w.industry && <span>{w.industry}</span>}
                          {w.industry && w.client && <span className="h-px w-8 bg-border" />}
                          {w.client && <span className="text-primary font-bold">{w.client}</span>}
                        </div>
                        <h3 className="mt-4 text-2xl font-bold leading-tight md:text-3xl text-foreground group-hover:text-primary transition-colors">
                          {w.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed md:text-base">
                          {w.outcome}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary opacity-90 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                          Read the case study
                          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                      {hasMetrics && (
                        <div className="col-span-5 grid grid-cols-3 gap-3">
                          {w.metrics!.map((m) => (
                            <div
                              key={m.label}
                              className="glass flex flex-col justify-center rounded-2xl border border-border/60 p-4 transition-all duration-300 group-hover:border-primary/30"
                            >
                              <div className="font-display text-lg font-bold md:text-2xl lg:text-3xl text-foreground">
                                {m.value}
                              </div>
                              <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground font-medium md:text-[11px] leading-tight">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {!hasMetrics && hasServices && (
                        <div className="col-span-5 flex flex-wrap items-center justify-end gap-2">
                          {w.services!.map((s) => (
                            <span
                              key={s}
                              className="glass rounded-xl border border-border/60 px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                            >
                              {s.replace(/-/g, " ")}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </a>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>
    </Section>
  );
}
