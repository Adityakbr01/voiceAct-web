"use client";

import { Quote } from "lucide-react";
import { Section, SectionHeader } from "@/modules/home/components/section";
import { testimonials } from "@/modules/services-data";

// Duplicate for seamless loop
const ITEMS = [...testimonials, ...testimonials, ...testimonials];

export function Testimonials() {
  return (
    <Section id="testimonials" className="cv-auto overflow-hidden">
      <SectionHeader
        eyebrow="Testimonials"
        title={
          <>
            The teams we ship with,
            <span className="font-display italic tracking-tight text-primary">
              {" "}
              in their own words.
            </span>
          </>
        }
      />

      {/* Marquee track */}
      <div className="relative mt-16">
        {/* Left fade overlay */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-48"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, transparent 100%)",
          }}
        />
        {/* Right fade overlay */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-48"
          style={{
            background:
              "linear-gradient(to left, var(--background) 0%, transparent 100%)",
          }}
        />

        {/* Scrolling strip */}
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee gap-4 py-2">
            {ITEMS.map((t, i) => (
              <figure
                key={`${t.author}-${i}`}
                className="relative flex w-[min(85vw,360px)] shrink-0 flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <Quote className="size-6 text-primary/60" />
                <blockquote className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-foreground/85 md:text-base">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border/60 pt-4 text-sm">
                  <div className="font-semibold text-foreground">{t.author}</div>
                  <div className="text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
