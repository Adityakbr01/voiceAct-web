import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema, getServiceSchema } from "@/lib/seo/schema";
import { company } from "@/modules/company-data";
import { Cta } from "@/modules/home/sections/cta";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Layers,
  Layout,
  Palette,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Base: 40 chars → with template ` | VoiceAct Solutions` = 59 chars (under 60)
  title: "Web, Mobile, CRM & SaaS Development Services",
  description:
    "VoiceAct Solutions' services: Web, Mobile, Custom CRM, SaaS, AI workflows, Cloud, and Headless CMS engineering.",
  alternates: {
    canonical: `${company.website}/services`,
  },
  openGraph: {
    title: `Software Development Services | ${company.name}`,
    description: "VoiceAct's services: Web, Mobile, Custom CRM, SaaS, AI, and Cloud engineering.",
    url: `${company.website}/services`,
  },
};

const servicesCatalog = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: Code2,
    tagline: "High-performance, accessible React & Next.js web applications built to scale.",
    desc: "We build production-grade web applications with React, Next.js, and TypeScript, engineered for sub-second page loads and high Lighthouse scores.",
  },
  {
    slug: "mobile-development",
    title: "Mobile App Development",
    icon: Smartphone,
    tagline: "Native iOS & Android apps built from a unified React Native codebase.",
    desc: "Reach users on any mobile device. We craft 60 FPS mobile applications using React Native, Expo, and native Swift/Kotlin modules.",
  },
  {
    slug: "crm-development",
    title: "Custom CRM Development",
    icon: Database,
    tagline: "Tailor-made CRM systems engineered for your sales & operational workflows.",
    desc: "Stop forcing your business into rigid off-the-shelf software. We construct custom CRM platforms with automated pipeline & WhatsApp sequence integrations.",
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    icon: Layers,
    tagline: "End-to-end multi-tenant cloud software for modern subscription products.",
    desc: "Turn your software concept into a scalable subscription business equipped with authentication, role-based access control, billing, and tenant isolation.",
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions & LLM Workflows",
    icon: BrainCircuit,
    tagline: "Custom AI workflows, LLM agents, and smart automated processing.",
    desc: "Integrate state-of-the-art AI into your existing stack with OpenAI/Claude APIs, custom RAG search over documents, and intelligent automation agents.",
  },
  {
    slug: "cms-development",
    title: "Headless CMS Development",
    icon: Layout,
    tagline: "Blazing fast content management systems built for marketing performance.",
    desc: "Empower your marketing team without sacrificing speed. We implement headless CMS solutions (Payload, Strapi, Sanity) connected seamlessly to Next.js.",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design & Systems",
    icon: Palette,
    tagline: "Pixel-perfect interfaces engineered for engagement and high conversion.",
    desc: "Intuitive user research, click-through wireframes, and design systems built in Figma that seamlessly translate into production-ready frontend code.",
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions & DevOps",
    icon: Cloud,
    tagline: "Scalable cloud infrastructure, CI/CD pipelines, and 24/7 monitoring.",
    desc: "Keep your infrastructure resilient and cost-effective with automated deployment pipelines, Docker containerization, and AWS/Cloudflare edge hosting.",
  },
];

export default function ServicesPage() {
  const baseUrl = company.website.replace(/\/$/, "");

  const serviceSchema = getServiceSchema({
    name: "Software Development & Engineering Services",
    description: "Custom web development, mobile apps, CRM, SaaS, and AI engineering.",
    url: `${baseUrl}/services`,
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Services", url: `${baseUrl}/services` },
  ]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <JsonLd data={[serviceSchema, breadcrumbsSchema]} />
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 pb-16 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Zap className="size-3.5" aria-hidden />
            Engineering Capabilities
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl">
            Software Development Services Engineered for Growth
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
            From early MVP architecture to high-throughput scaleups, we design and build
            production-ready software tailored to your specific product requirements.
          </p>
        </section>

        {/* Services Grid */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
            Core Service Offerings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesCatalog.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group p-8 rounded-3xl border border-border/60 bg-card/40 hover:border-primary/50 transition-all hover:scale-[1.01] flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </div>
                      <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>

                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center text-xs font-semibold text-primary">
                    View {item.title} Details <ArrowRight className="ml-1.5 size-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Why Choose VoiceAct */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 border-t border-border/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Sparkles className="size-6 text-primary" />
              <h3 className="font-bold text-lg">Direct Collaboration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You work directly with the engineers and designers building the product.
              </p>
            </div>
            <div className="space-y-3">
              <Zap className="size-6 text-amber-400" />
              <h3 className="font-bold text-lg">Iterative Shipping</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Scoped milestones with regular demos so progress is visible at every step.
              </p>
            </div>
            <div className="space-y-3">
              <Code2 className="size-6 text-emerald-400" />
              <h3 className="font-bold text-lg">Full Code Ownership</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete source code and design files handed over to you from day one.
              </p>
            </div>
          </div>
        </section>

        <Cta />
      </main>
    </div>
  );
}
