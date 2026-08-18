import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { company } from "@/modules/company-data";
import { Cta } from "@/modules/home/sections/cta";
import { ArrowLeft, ArrowRight, CheckCircle2, Columns, XCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

const comparisonsData: Record<
  string,
  {
    title: string;
    headline: string;
    description: string;
    optionA: { name: string; pros: string[]; cons: string[]; bestFor: string };
    optionB: { name: string; pros: string[]; cons: string[]; bestFor: string };
    verdict: string;
  }
> = {
  "crm-vs-erp": {
    title: "CRM vs ERP Comparison Guide (2026)",
    headline: "CRM vs ERP: Which Software System Does Your Business Need?",
    description:
      "Understand the key technical and operational differences between Customer Relationship Management (CRM) and Enterprise Resource Planning (ERP) software.",
    optionA: {
      name: "Custom CRM System",
      pros: [
        "Focuses on sales pipelines, lead management, and revenue growth",
        "Higher customer retention & lead response automation",
        "Lower implementation cost and faster deployment",
        "Direct integration with WhatsApp, Email & VoIP",
      ],
      cons: ["Does not manage supply chain, inventory, or complex HR payroll"],
      bestFor: "Sales teams, agencies, service providers, and customer-facing businesses.",
    },
    optionB: {
      name: "Enterprise ERP System",
      pros: [
        "Manages back-office supply chain, inventory, and accounting",
        "Centralized financial forecasting & multi-warehouse tracking",
        "Standardized procurement and HR management",
      ],
      cons: [
        "High cost & complex 6–12 month implementation timeline",
        "Lacks agile front-office sales and marketing tools",
      ],
      bestFor: "Manufacturing, logistics, retail chains, and enterprise corporations.",
    },
    verdict:
      "If your main goal is getting more clients, organizing your sales team, and automating lead follow-ups, build a custom CRM. If your bottleneck is manufacturing, inventory, and supply chain logistics, implement an ERP.",
  },
  "nextjs-vs-react": {
    title: "Next.js vs React: Architectural Comparison for 2026",
    headline: "Next.js vs React: Choosing the Right Framework for Production",
    description:
      "Compare Next.js App Router vs standalone Client-Side React to choose the best architecture for your web product.",
    optionA: {
      name: "Next.js (App Router)",
      pros: [
        "Built-in Server-Side Rendering (SSR) & Static Site Generation (SSG)",
        "Zero-config automated SEO & dynamic OpenGraph metadata",
        "Server Components (RSC) reduce client JavaScript bundle size",
        "Integrated file-based routing and Edge API endpoints",
      ],
      cons: ["Slightly higher server deployment complexity compared to plain static files"],
      bestFor: "Marketing sites, SaaS applications, E-commerce, and high-SEO products.",
    },
    optionB: {
      name: "Plain React (Client SPA)",
      pros: [
        "Extremely simple client-side state management",
        "Easy hosting on static CDNs (S3, Cloudflare Pages)",
        "Great for internal dashboards behind authentication walls",
      ],
      cons: [
        "Poor initial SEO indexing without pre-rendering",
        "Larger initial JavaScript bundle download on mobile",
      ],
      bestFor: "Internal admin tools, web-based games, and password-protected portals.",
    },
    verdict:
      "For any public-facing app where search engine rankings, performance, and instant page loads matter, Next.js is the clear industry choice in 2026.",
  },
};

export async function generateStaticParams() {
  return Object.keys(comparisonsData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = comparisonsData[slug.toLowerCase()];

  if (!data) {
    return { title: "Comparison Guide" };
  }

  const baseUrl = company.website.replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}/compare/${slug.toLowerCase()}`;

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonicalUrl,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const data = comparisonsData[slug.toLowerCase()];

  if (!data) {
    notFound();
  }

  const baseUrl = company.website.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/compare/${slug}`;

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Guides", url: `${baseUrl}/blog` },
    { name: data.title, url: pageUrl },
  ]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <JsonLd data={[breadcrumbsSchema]} />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Blog & Guides
          </Link>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-12 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Columns className="size-3.5" aria-hidden />
            Comparison Breakdown
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {data.headline}
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            {data.description}
          </p>
        </section>

        {/* Side-by-Side Matrix */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Option A */}
          <div className="p-6 rounded-3xl border border-primary/40 bg-card/40 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Option A
              </span>
              <h2 className="text-xl font-bold">{data.optionA.name}</h2>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Pros
              </p>
              {data.optionA.pros.map((pro, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>

            {data.optionA.cons.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Cons
                </p>
                {data.optionA.cons.map((con, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 rounded-xl bg-secondary/50 text-xs">
              <span className="font-bold block text-foreground mb-1">Best For:</span>
              <span className="text-muted-foreground">{data.optionA.bestFor}</span>
            </div>
          </div>

          {/* Option B */}
          <div className="p-6 rounded-3xl border border-border/60 bg-card/40 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Option B
              </span>
              <h2 className="text-xl font-bold">{data.optionB.name}</h2>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Pros
              </p>
              {data.optionB.pros.map((pro, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>

            {data.optionB.cons.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Cons
                </p>
                {data.optionB.cons.map((con, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 rounded-xl bg-secondary/50 text-xs">
              <span className="font-bold block text-foreground mb-1">Best For:</span>
              <span className="text-muted-foreground">{data.optionB.bestFor}</span>
            </div>
          </div>
        </section>

        {/* Final Verdict */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-8 border-t border-border/60 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">The Verdict</h2>
          <div className="p-6 rounded-2xl border border-primary/30 bg-primary/10 text-sm md:text-base leading-relaxed">
            {data.verdict}
          </div>
        </section>
      </main>
    </div>
  );
}
