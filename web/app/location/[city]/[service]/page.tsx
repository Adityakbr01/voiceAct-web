import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema, getLocalBusinessSchema, getServiceSchema } from "@/lib/seo/schema";
import { company } from "@/modules/company-data";
import { Cta } from "@/modules/home/sections/cta";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ city: string; service: string }> | { city: string; service: string };
}

const supportedCities: Record<string, { name: string; state: string; label: string }> = {
  bangalore: { name: "Bengaluru", state: "Karnataka", label: "Bangalore" },
  bengaluru: { name: "Bengaluru", state: "Karnataka", label: "Bengaluru" },
  hyderabad: { name: "Hyderabad", state: "Telangana", label: "Hyderabad" },
  pune: { name: "Pune", state: "Maharashtra", label: "Pune" },
  mumbai: { name: "Mumbai", state: "Maharashtra", label: "Mumbai" },
  delhi: { name: "Delhi NCR", state: "Delhi", label: "Delhi" },
};

const serviceMap: Record<
  string,
  {
    title: string;
    description: string;
    features: string[];
  }
> = {
  "web-development": {
    title: "Web Development Company",
    description:
      "Engineered React, Next.js, and TypeScript web applications for high-growth tech startups and businesses.",
    features: [
      "Custom Next.js App Router & Server Components architecture",
      "Sub-second page load speeds with Lighthouse 90+ score guarantee",
      "Full search engine optimization with JSON-LD schema markup",
      "Seamless backend API & database integration",
    ],
  },
  "mobile-development": {
    title: "Mobile App Development Company",
    description:
      "Native iOS and Android mobile apps crafted with React Native, Expo, and native Swift/Kotlin.",
    features: [
      "Cross-platform React Native codebases built for high performance",
      "Native touch interactions, 60 FPS UI transitions",
      "App Store & Google Play publishing and review management",
      "Push notifications, offline caching, and payment integration",
    ],
  },
  "crm-development": {
    title: "Custom CRM Development Company",
    description:
      "Tailor-made CRM systems engineered around your exact sales, lead management, and customer pipelines.",
    features: [
      "Automated lead assignment and deal stage tracking",
      "WhatsApp & Email notification workflow automation",
      "Custom analytics dashboards and data export capabilities",
      "Zero per-user monthly software licensing fees",
    ],
  },
  "saas-development": {
    title: "SaaS Development Agency",
    description:
      "End-to-end multi-tenant cloud software products, built for recurring revenue subscription models.",
    features: [
      "Multi-tenant data isolation and secure architecture",
      "Stripe and Razorpay automated subscription billing",
      "Role-based access control and organization management",
      "Production-ready deployment pipeline within 6–8 weeks",
    ],
  },
  "ai-solutions": {
    title: "AI Development & Integration Services",
    description:
      "Custom AI agents, LLM integrations, and RAG document search automation built for enterprise workflows.",
    features: [
      "OpenAI, Claude, and Gemini API custom integration",
      "Retrieval-Augmented Generation (RAG) over company data",
      "Automated data extraction and workflow triggers",
      "Real-time AI voice and text streaming interfaces",
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design Agency",
    description:
      "High-converting visual interfaces, Figma design systems, and interactive user prototypes.",
    features: [
      "Figma component libraries with design tokens",
      "User research, wireframing, and interactive click-throughs",
      "Seamless developer handoff with high fidelity",
      "Conversion rate optimization and responsive mobile layouts",
    ],
  },
};

export async function generateStaticParams() {
  const params: Array<{ city: string; service: string }> = [];

  for (const citySlug of Object.keys(supportedCities)) {
    for (const serviceSlug of Object.keys(serviceMap)) {
      params.push({ city: citySlug, service: serviceSlug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = supportedCities[citySlug.toLowerCase()];
  const service = serviceMap[serviceSlug.toLowerCase()];

  if (!city || !service) {
    return { title: `Services — ${company.name}` };
  }

  const title = `${service.title} in ${city.label} | ${company.name}`;
  const description = `Looking for top-rated ${service.title.toLowerCase()} in ${city.label}, ${city.state}? ${service.description} Contact ${company.name} for a free consultation.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CityServicePage({ params }: PageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = supportedCities[citySlug.toLowerCase()];
  const service = serviceMap[serviceSlug.toLowerCase()];

  if (!city || !service) {
    notFound();
  }

  const baseUrl = company.website.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/location/${citySlug}/${serviceSlug}`;

  const localBizSchema = getLocalBusinessSchema(city.label);
  const serviceSchema = getServiceSchema({
    name: `${service.title} in ${city.label}`,
    description: service.description,
    url: pageUrl,
  });
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Locations", url: `${baseUrl}/#contact` },
    { name: city.label, url: pageUrl },
    { name: service.title, url: pageUrl },
  ]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <JsonLd data={[localBizSchema, serviceSchema, breadcrumbsSchema]} />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All Services
          </Link>
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 pb-12 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <MapPin className="size-3.5" aria-hidden />
            {city.label}, {city.state}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-tight">
            Top-Tier {service.title} in {city.label}
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            {company.name} delivers custom software development, mobile apps, and digital solutions
            for companies and scaleups in {city.label} and across {city.state}.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/contact?service=${serviceSlug}&location=${citySlug}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              Consult Our {city.label} Team
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={`tel:${company.contact.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-card hover:text-foreground"
            >
              Call {company.contact.phone}
            </a>
          </div>
        </section>

        {/* Deliverables */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-12 border-t border-border/60">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            Why {city.label} Companies Choose {company.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-border/60 bg-card/40 flex items-start gap-3"
              >
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground/90 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12">
          <Cta />
        </div>
      </main>
    </div>
  );
}
