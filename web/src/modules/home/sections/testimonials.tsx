"use client";

import { Globe, Smartphone, ShoppingCart, Layout, Code2, Palette } from "lucide-react";
import { Section, SectionHeader } from "@/modules/home/components/section";

const buildCategories = [
  {
    title: "Web Applications",
    description: "Production Next.js, React, and TypeScript apps with strong SEO and performance.",
    icon: Globe,
  },
  {
    title: "Mobile Applications",
    description: "Cross-platform iOS and Android apps from a single React Native codebase.",
    icon: Smartphone,
  },
  {
    title: "E-commerce Platforms",
    description: "Storefronts and checkout flows for physical and digital products.",
    icon: ShoppingCart,
  },
  {
    title: "Business Websites",
    description: "Marketing sites and landing pages that load fast and convert.",
    icon: Layout,
  },
  {
    title: "Custom Software",
    description: "Internal tools, dashboards, and CRMs tailored to the way you actually work.",
    icon: Code2,
  },
  {
    title: "UI/UX Design",
    description: "Research, flows, and design systems that translate into production code.",
    icon: Palette,
  },
];

export function Testimonials() {
  return (
    <Section id="what-we-build" className="overflow-hidden">
      <SectionHeader
        eyebrow="What We Build"
        title={
          <>
            Web and mobile products,
            <span className="font-display italic tracking-tight text-primary">
              {" "}
              designed and built end-to-end.
            </span>
          </>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {buildCategories.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="size-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}