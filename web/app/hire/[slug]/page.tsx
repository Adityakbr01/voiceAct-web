import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema, getServiceSchema } from "@/lib/seo/schema";
import { company } from "@/modules/company-data";
import { Cta } from "@/modules/home/sections/cta";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

const hirePagesData: Record<
  string,
  {
    title: string;
    roleName: string;
    tagline: string;
    description: string;
    skills: string[];
    models: { title: string; desc: string }[];
    deliverables: string[];
  }
> = {
  "react-developers": {
    title: "Hire Dedicated React Developers",
    roleName: "Senior React Engineers",
    tagline: "Top 1% React.js Developers for High-Growth Startups & Enterprises",
    description:
      "Scale your web frontend engineering team with senior React developers who specialize in React 19, Redux, Zustand, Tailwind CSS, performance tuning, and complex web applications.",
    skills: [
      "React 19 & Hooks",
      "TypeScript & State Management",
      "Tailwind CSS & UI Systems",
      "REST & GraphQL APIs",
      "Core Web Vitals Tuning",
    ],
    models: [
      {
        title: "Dedicated Full-Time",
        desc: "40 hrs/week dedicated exclusively to your product roadmap.",
      },
      {
        title: "Project-Based",
        desc: "Fixed-scope milestone delivery for web MVPs and feature rollouts.",
      },
      {
        title: "Team Augmentation",
        desc: "Embed senior frontend talent into your existing engineering team within 48 hours.",
      },
    ],
    deliverables: [
      "Sub-second page rendering & zero UI latency",
      "Pixel-perfect responsive implementation from Figma",
      "Clean, maintainable, fully typed TypeScript codebase",
    ],
  },
  "nextjs-developers": {
    title: "Hire Next.js Developers",
    roleName: "Senior Next.js & Full-Stack Engineers",
    tagline: "Architect High-Performance Full-Stack Next.js Applications",
    description:
      "Deploy battle-tested Next.js App Router applications. Our Next.js developers master React Server Components, ISR, Edge API routes, Turbopack, and automated SEO optimization.",
    skills: [
      "Next.js App Router",
      "React Server Components (RSC)",
      "Server Actions & API Routes",
      "SEO & OpenGraph Optimization",
      "SSR & SSG Performance",
    ],
    models: [
      {
        title: "Dedicated Full-Time",
        desc: "Full-time Next.js experts taking ownership of your web architecture.",
      },
      { title: "Project-Based", desc: "End-to-end build from discovery to Vercel/AWS deployment." },
      {
        title: "Team Augmentation",
        desc: "Accelerate your team's velocity with senior Next.js specialists.",
      },
    ],
    deliverables: [
      "90+ Lighthouse score guarantee across all core routes",
      "Dynamic metadata & JSON-LD schema integration",
      "Production-ready deployment pipelines on AWS/Cloudflare/Vercel",
    ],
  },
  "react-native-developers": {
    title: "Hire React Native Mobile Developers",
    roleName: "Senior Mobile Engineers",
    tagline: "Build Cross-Platform iOS & Android Apps from a Single Codebase",
    description:
      "Ship native-feeling iOS and Android mobile apps fast. Our React Native engineers build fluid, 60 FPS mobile applications equipped with push notifications, offline sync, and App Store publication.",
    skills: [
      "React Native & Expo",
      "Native Swift & Kotlin Bridges",
      "Redux Toolkit & React Query",
      "Biometric Auth & Payments",
      "App Store & Play Store CI/CD",
    ],
    models: [
      {
        title: "Dedicated Mobile Squad",
        desc: "Dedicated mobile developers + QA engineers for ongoing feature delivery.",
      },
      { title: "Project-Based MVP", desc: "Launch your mobile app to the stores in 6 to 8 weeks." },
      {
        title: "App Optimization",
        desc: "Audit and optimize existing React Native apps for speed and stability.",
      },
    ],
    deliverables: [
      "Simultaneous iOS & Android App Store release",
      "60 FPS smooth gesture animations & native feel",
      "Offline data persistence and secure biometric authentication",
    ],
  },
  "ai-engineers": {
    title: "Hire AI & LLM Developers",
    roleName: "AI Automation & LLM Specialists",
    tagline: "Integrate Cutting-Edge AI Models, RAG Pipelines & Autonomous Agents",
    description:
      "Transform your product with custom AI capabilities. Our AI engineers build LLM integrations, RAG (Retrieval-Augmented Generation) document search, fine-tuned models, and smart automation workflows.",
    skills: [
      "OpenAI, Claude & Gemini APIs",
      "RAG & Vector Databases (Pinecone/Qdrant)",
      "LangChain & LlamaIndex",
      "Python, FastApi & Node.js",
      "AI Agent Workflow Design",
    ],
    models: [
      {
        title: "Dedicated AI Engineer",
        desc: "Dedicated specialist embedding AI capabilities directly into your software.",
      },
      {
        title: "AI MVP Sprint",
        desc: "Build an AI chatbot or automated search workflow in 3 weeks.",
      },
      {
        title: "Consulting & Audit",
        desc: "Architect custom LLM and RAG pipelines for your enterprise data.",
      },
    ],
    deliverables: [
      "Custom RAG search over proprietary corporate documents",
      "Real-time streaming AI text & voice conversational interfaces",
      "Automated operational workflows reducing manual costs",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(hirePagesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = hirePagesData[slug.toLowerCase()];

  if (!data) {
    return { title: "Hire Developers" };
  }

  const title = data.title;
  const description = data.description;
  const baseUrl = company.website.replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}/hire/${slug.toLowerCase()}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
    },
  };
}

export default async function HireDeveloperPage({ params }: PageProps) {
  const { slug } = await params;
  const data = hirePagesData[slug.toLowerCase()];

  if (!data) {
    notFound();
  }

  const baseUrl = company.website.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/hire/${slug}`;

  const serviceSchema = getServiceSchema({
    name: data.title,
    description: data.description,
    url: pageUrl,
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Hire Developers", url: `${baseUrl}/#contact` },
    { name: data.roleName, url: pageUrl },
  ]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <JsonLd data={[serviceSchema, breadcrumbsSchema]} />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> View All Services
          </Link>
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 pb-12 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <UserCheck className="size-3.5" aria-hidden />
            On-Demand Talent
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-tight">
            {data.tagline}
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            {data.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/contact?hire=${slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              Hire {data.roleName} Now
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={`https://wa.me/${company.contact.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-card hover:text-foreground"
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* Core Technical Stack */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-12 border-t border-border/60">
          <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-center gap-2">
            <Code2 className="size-5 text-primary" /> Technical Mastery & Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-xl border border-primary/30 bg-primary/10 text-xs font-bold text-primary flex items-center gap-2"
              >
                <Sparkles className="size-3" />
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Models */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-12 border-t border-border/60">
          <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-center gap-2">
            <Cpu className="size-5 text-primary" /> Flexible Engagement Models
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.models.map((model, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border/60 bg-card/40 space-y-3">
                <h3 className="font-bold text-base text-foreground">{model.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{model.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-12 border-t border-border/60">
          <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" /> What You Get
          </h2>
          <div className="space-y-4">
            {data.deliverables.map((del, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-border/60 bg-card/40 flex items-center gap-3"
              >
                <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">{del}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
