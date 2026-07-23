import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/modules/home/components/section";
import { work } from "@/modules/services-data";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";

export function Work() {
  return (
    <Section id="work">
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

      <div className="mt-16">
        <ScrollStack
          itemDistance={60}
          baseScale={0.9}
          itemScale={0.02}
          stackPosition="20%"
          useWindowScroll={true}
        >
          {work.map((w) => (
            <ScrollStackItem key={w.client}>
              <a
                href="#contact"
                className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card bg-[var(--gradient-card)] shadow-[var(--shadow-card)] p-4 transition-all duration-500 hover:border-primary/40 sm:rounded-3xl sm:p-6 md:p-10"
              >
                <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-7">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:gap-3 sm:text-xs">
                      <span>{w.industry}</span>
                      <span className="h-px w-6 bg-border sm:w-8" />
                      <span className="text-primary">{w.client}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold leading-tight sm:text-2xl md:mt-4 md:text-3xl">
                      {w.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:mt-3 md:text-base">
                      {w.outcome}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary opacity-80 transition-opacity group-hover:opacity-100 sm:mt-6">
                      Read the case study
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 sm:gap-3 md:col-span-5">
                    {w.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="glass flex min-w-0 flex-col justify-center rounded-xl border border-border/60 p-1.5 sm:rounded-2xl sm:p-4"
                      >
                        <div className="font-display min-w-0 break-words text-xs font-semibold sm:text-lg md:text-2xl lg:text-3xl">
                          {m.value}
                        </div>
                        <div className="mt-0.5 min-w-0 break-words text-[8px] leading-tight uppercase tracking-wider text-muted-foreground sm:mt-1 sm:text-[10px] md:text-[11px]">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </Section>
  );
}
