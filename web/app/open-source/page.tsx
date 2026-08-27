import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Gauge, Github, Star, Boxes } from "lucide-react";
import { company } from "@/modules/company-data";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  // Base: 50 chars → with template ` | VoiceAct Solutions` = 69 chars ✗ — too long
  // Shortened: 38 chars → with template = 57 chars (under 60)
  title: "Open Source & Free Engineering Tools",
  description:
    "Free tools from VoiceAct: an open-source Next.js agency starter, project cost estimator, and website audit tool.",
  alternates: {
    canonical: `${company.website}/open-source`,
  },
  openGraph: {
    title: "Open Source & Free Tools for Founders and Engineers",
    description:
      "Free tools from VoiceAct: an open-source Next.js agency starter, project cost estimator, and website audit tool.",
    type: "website",
    url: `${company.website}/open-source`,
  },
};

const assets = [
  {
    icon: Boxes,
    title: "Open Source Agency Starter",
    description:
      "The production Next.js 16 + TypeScript + Tailwind v4 stack that powers voiceact.tech. Dark-mode design system, SEO-ready metadata, JSON-LD schema helpers, and a CMS-patterned blog — MIT licensed and free to fork.",
    badge: "Open Source",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    links: [
      { label: "Fork / Star on GitHub", href: company.socials.github.href },
      { label: "Follow the author", href: company.socials.developer.href },
    ],
  },
  {
    icon: Calculator,
    title: "Software Cost Estimator",
    description:
      "Get an instant, itemized estimate for a web app, mobile app, custom CRM, or SaaS MVP — no sales call, no spreadsheet math. Built so founders can budget before they even email us.",
    badge: "Free Tool",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    links: [{ label: "Try the estimator", href: "/calculator" }],
  },
  {
    icon: Gauge,
    title: "Free Website & Technical Audit",
    description:
      "A real (not vaporware) performance, SEO, accessibility, and security audit delivered within 24 hours — the same checklist we use before rebuilding a client site.",
    badge: "Free",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    links: [{ label: "Request a free audit", href: "/audit" }],
  },
  {
    icon: Star,
    title: "Engineering Guides",
    description:
      "Written by the engineers who ship the work: Next.js vs React, CRM vs ERP, React Native vs Flutter, and practical builds for production apps.",
    badge: "Guides",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    links: [
      { label: "Browse the blog", href: "/blog" },
      { label: "Next.js vs React", href: "/compare/nextjs-vs-react" },
    ],
  },
];

export default function OpenSourcePage() {
  const repoUrl = company.socials.github.href;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Open Source & Free Tools for Founders and Engineers",
          url: `${company.website}/open-source`,
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: company.website },
              {
                "@type": "ListItem",
                position: 2,
                name: "Open Source & Tools",
                item: `${company.website}/open-source`,
              },
            ],
          },
        }}
      />

      <main className="pt-24 pb-20">
        <section className="max-w-5xl mx-auto px-6 md:px-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Github className="size-3.5" aria-hidden /> Open Source & Free Tools
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance leading-tight">
            Tools we built, free for{" "}
            <span className="font-display italic tracking-tight text-primary">
              founders and engineers.
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
            {company.name} publishes the internal stack, calculators, and discipline that go into
            every product we ship. Everything below is free — take it, fork it, link it.
          </p>

          <div className="pt-4">
            <Link
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              <Github className="size-5" /> Star the starter kit on GitHub
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-10 pt-16">
          <div className="grid grid-cols-1 gap-6">
            {assets.map((asset) => (
              <div
                key={asset.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <asset.icon className="size-6" aria-hidden />
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${asset.badgeColor}`}
                  >
                    {asset.badge}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-bold leading-tight md:text-2xl">{asset.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {asset.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {asset.links.map((link) =>
                    link.href.startsWith("http") ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        {link.label} <ArrowRight className="size-4" />
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        {link.label} <ArrowRight className="size-4" />
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-10 py-16 text-center">
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed">
            Building something serious? We turn MVPs into production software in 6–8 weeks.{" "}
            <Link
              href="/contact"
              className="font-semibold text-primary hover:text-primary/80 underline underline-offset-4"
            >
              Start a conversation
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
