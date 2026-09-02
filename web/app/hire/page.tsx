import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema, getServiceSchema } from "@/lib/seo/schema";
import { company } from "@/modules/company-data";
import { Cta } from "@/modules/home/sections/cta";
import { ArrowLeft, ArrowRight, Code2, Cpu, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hire Developers & AI Engineers",
  description:
    "Hire React, Next.js, React Native developers and AI engineers for your project. Flexible engagement, clear deliverables.",
  openGraph: {
    title: "Hire Developers & AI Engineers",
    description:
      "Hire React, Next.js, React Native developers and AI engineers for your project.",
    url: `${company.website}/hire`,
  },
  alternates: {
    canonical: `${company.website}/hire`,
  },
};

const hireOptions = [
  {
    slug: "react-developers",
    title: "Hire React Developers",
    desc: "Senior React 19 & TypeScript frontend specialists for high-performance web applications.",
    skills: ["React 19", "TypeScript", "Tailwind CSS", "Redux/Zustand"],
    href: "/hire/react-developers",
  },
  {
    slug: "nextjs-developers",
    title: "Hire Next.js Developers",
    desc: "Full-stack Next.js experts mastering Server Components, App Router, and SEO optimization.",
    skills: ["Next.js App Router", "Server Components", "Vercel/AWS", "SEO"],
    href: "/hire/nextjs-developers",
  },
  {
    slug: "react-native-developers",
    title: "Hire React Native Developers",
    desc: "Cross-platform mobile developers delivering 60 FPS iOS and Android apps.",
    skills: ["React Native", "Expo", "Swift Bridge", "Kotlin Bridge"],
    href: "/hire/react-native-developers",
  },
  {
    slug: "ai-engineers",
    title: "Hire AI & LLM Engineers",
    desc: "Custom AI model integration, RAG document search, and LLM automation engineers.",
    skills: ["OpenAI & Gemini", "RAG Pipelines", "Vector Databases", "LangChain"],
    href: "/hire/ai-engineers",
  },
];

export default function HireMainPage() {
  const baseUrl = company.website.replace(/\/$/, "");

  const serviceSchema = getServiceSchema({
    name: "Dedicated Developer Hiring Services",
    description: "Scale your software team with pre-vetted senior engineers.",
    url: `${baseUrl}/hire`,
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Hire Developers", url: `${baseUrl}/hire` },
  ]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <JsonLd data={[serviceSchema, breadcrumbsSchema]} />
      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 md:px-10 pb-12 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <UserCheck className="size-3.5" aria-hidden />
            Dedicated Engineering Talent
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Hire Developers for Your Project
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
            Bring in React, Next.js, mobile, and AI development help without the recruitment
            overhead. Flexible engagement, clear deliverables.
          </p>
        </section>

        {/* Hire Options Grid */}
        <section className="max-w-5xl mx-auto px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {hireOptions.map((option) => (
            <Link
              key={option.slug}
              href={option.href}
              className="group p-8 rounded-3xl border border-border/60 bg-card/40 hover:border-primary/50 transition-all hover:scale-[1.01] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="size-3.5" /> Developer Role
                  </span>
                  <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {option.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{option.desc}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
                {option.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-secondary/80 text-[11px] font-medium text-foreground/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </section>

        {/* Guarantees */}
        <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 border-t border-border/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border/60 bg-card/30 space-y-2">
              <ShieldCheck className="size-6 text-emerald-400" />
              <h3 className="font-bold text-base">Clear Onboarding</h3>
              <p className="text-xs text-muted-foreground">
                Integration into your existing tools and repositories, scoped to your timeline.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border/60 bg-card/30 space-y-2">
              <Code2 className="size-6 text-primary" />
              <h3 className="font-bold text-base">IP Ownership</h3>
              <p className="text-xs text-muted-foreground">
                All code, commits, and assets remain with your company.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border/60 bg-card/30 space-y-2">
              <Cpu className="size-6 text-blue-400" />
              <h3 className="font-bold text-base">Flexible Engagement</h3>
              <p className="text-xs text-muted-foreground">
                Monthly terms with the option to scale up, down, or pause as your needs change.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
