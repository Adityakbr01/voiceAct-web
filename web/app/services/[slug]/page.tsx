import { JsonLd } from "@/components/seo/json-ld";
import { getServiceBySlug } from "@/lib/api/cms";
import { getBreadcrumbSchema, getServiceSchema, getWebPageSchema } from "@/lib/seo/schema";
import { company } from "@/modules/company-data";
import { Cta } from "@/modules/home/sections/cta";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

const staticServiceDetails: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    features: string[];
    outcomes: string[];
  }
> = {
  "web-development": {
    title: "Web Development",
    tagline: "High-performance, accessible web applications built to scale.",
    description:
      "We design and build production-grade web applications with React, Next.js, and TypeScript. From marketing sites with instant page loads to complex SaaS dashboards and enterprise portals, we engineer web experiences that perform under heavy load.",
    features: [
      "Modern React & Next.js App Router architecture",
      "Tailwind CSS & custom animation design systems",
      "Full SEO optimization, schema markup & dynamic metadata",
      "API integration with Node.js, GraphQL & REST endpoints",
      "Core Web Vitals tuning & lighthouse 95+ score targets",
    ],
    outcomes: [
      "Sub-second load times & instant user interaction",
      "Responsive across all screen sizes and mobile viewports",
      "Clean, modular codebase handed over with zero vendor lock-in",
    ],
  },
  "mobile-development": {
    title: "Mobile App Development",
    tagline: "Native iOS & Android apps built from a unified codebase.",
    description:
      "Reach users on any device. We craft fluid, performant mobile apps using React Native, Expo, and native Swift/Kotlin modules — taking your app from concept to App Store and Google Play publication.",
    features: [
      "React Native & Expo cross-platform framework",
      "Native Swift (iOS) & Kotlin (Android) custom bridges",
      "Offline storage, push notifications & biometric auth",
      "App Store & Google Play submission and approval management",
      "In-app purchases, payment gateway & subscription wiring",
    ],
    outcomes: [
      "Single codebase reducing build costs by up to 40%",
      "60 FPS smooth animations & native touch response",
      "Seamless backend sync and real-time state management",
    ],
  },
  "crm-development": {
    title: "Custom CRM Development",
    tagline: "Tailor-made CRM systems engineered for your sales workflows.",
    description:
      "Stop forcing your business into rigid off-the-shelf software. We construct custom CRM platforms with pipeline management, lead scoring, automated email/WhatsApp sequences, and custom analytics dashboards.",
    features: [
      "Custom lead pipeline & deal stage tracking",
      "Automated WhatsApp & Email customer notification flows",
      "Role-based access control (RBAC) & audit logging",
      "Third-party integrations with Razorpay, Stripe, and VoIP",
      "Real-time analytics dashboards and custom report exports",
    ],
    outcomes: [
      "100% alignment with proprietary company processes",
      "3x faster lead response times with automated workflows",
      "Elimination of recurring per-user SaaS license fees",
    ],
  },
  "cms-development": {
    title: "Headless CMS Development",
    tagline: "Blazing fast content management systems built for performance.",
    description:
      "Empower your marketing and content teams without sacrificing technical performance. We implement headless CMS solutions (Payload, Strapi, Sanity, or custom CMS) seamlessly connected to Next.js frontends.",
    features: [
      "Headless CMS integration with full visual preview",
      "Custom content models, relations, and localized fields",
      "Automated incremental static regeneration (ISR) for speed",
      "Fine-grained team permissions and editorial workflows",
      "Media asset optimization and CDN distribution",
    ],
    outcomes: [
      "Instant content updates without needing developer deploys",
      "Sub-second page rendering for maximum SEO scoring",
      "Scalable infrastructure ready for millions of monthly visitors",
    ],
  },
  "saas-development": {
    title: "SaaS Development",
    tagline: "End-to-end multi-tenant cloud software for modern businesses.",
    description:
      "Turn your software concept into a profitable subscription product. We build end-to-end SaaS platforms equipped with authentication, role-based access control, billing, analytics, and tenant isolation.",
    features: [
      "Multi-tenant database schema & secure data isolation",
      "Stripe / Razorpay subscription billing & usage tracking",
      "User authentication, OAuth & organization management",
      "Admin analytics dashboard & customer management console",
      "Automated deployment pipelines & edge distribution",
    ],
    outcomes: [
      "Production-ready MVP in 6–8 weeks",
      "Automated subscription lifecycles & billing management",
      "Enterprise-level security and uptime reliability",
    ],
  },
  "ai-solutions": {
    title: "AI Solutions & Integrations",
    tagline: "Custom AI workflows, LLM agents, and smart automation.",
    description:
      "Integrate state-of-the-art AI into your existing software. We build custom LLM workflows, RAG (Retrieval-Augmented Generation) search systems, conversational agents, and automated data processing tools.",
    features: [
      "OpenAI, Claude, and Gemini API integration",
      "Retrieval-Augmented Generation (RAG) over custom docs",
      "Automated text, image, and document processing pipelines",
      "Custom fine-tuning & prompt engineering optimizations",
      "Real-time streaming responses & voice interface integration",
    ],
    outcomes: [
      "Automated customer support & repetitive task execution",
      "Instant semantic search over proprietary company knowledge",
      "Enhanced product value through intelligent automation",
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design & Prototyping",
    tagline: "Pixel-perfect interfaces engineered for high conversion.",
    description:
      "Great software begins with intuitive design. Our design team conducts user research, constructs interactive wireframes, and crafts high-fidelity design systems in Figma that seamlessly translate to production code.",
    features: [
      "User journey mapping & interactive click-through prototypes",
      "Figma design systems with tokens & reusable components",
      "Micro-animations, transitions & visual motion design",
      "Usability testing & feedback iteration loops",
      "Developer-ready spec Handoff with pixel accuracy",
    ],
    outcomes: [
      "Higher conversion rates and lower user churn",
      "Consistent visual identity across web and mobile",
      "Accelerated development timeline using design tokens",
    ],
  },
  "ecommerce-development": {
    title: "E-Commerce Development",
    tagline: "High-converting online stores and custom shopping platforms.",
    description:
      "Drive sales with custom e-commerce experiences. We build headless storefronts and custom shopping systems with seamless cart checkouts, inventory sync, multi-currency support, and payment gateway integrations.",
    features: [
      "Headless Shopify / custom Next.js storefront architecture",
      "High-speed checkout flows optimized for mobile conversion",
      "Razorpay, Stripe, PayU, and COD payment gateway wiring",
      "Real-time inventory management and ERP synchronization",
      "Automated order tracking and SMS/WhatsApp notifications",
    ],
    outcomes: [
      "Higher checkout completion rate with friction-free payments",
      "Lightning-fast product page load times for low bounce rates",
      "Robust security complying with payment industry standards",
    ],
  },
  "api-development": {
    title: "API Development & Integration",
    tagline: "Secure REST & GraphQL APIs built for high throughput.",
    description:
      "Connect systems seamlessly. We build robust microservices, custom REST/GraphQL APIs, webhook receivers, and third-party API integrations engineered for speed, security, and developer clarity.",
    features: [
      "Node.js, Express, Bun, and TypeScript backend microservices",
      "REST & GraphQL endpoint design with OpenAPI / Swagger specs",
      "OAuth2, JWT authentication, rate-limiting, and API keys",
      "Database ORM design with PostgreSQL, Prisma, and Redis caching",
      "Third-party API integrations (CRM, Payment, Logistics, AI)",
    ],
    outcomes: [
      "Scalable infrastructure capable of thousands of requests/sec",
      "Clean API documentation for effortless developer onboarding",
      "Resilient failure handling and automated retry mechanisms",
    ],
  },
  "cloud-solutions": {
    title: "Cloud Solutions & DevOps",
    tagline: "Scalable cloud infrastructure, CI/CD, and 24/7 monitoring.",
    description:
      "Keep your infrastructure resilient, secure, and cost-effective. We configure automated deployment pipelines, cloud hosting on AWS/GCP/Cloudflare, containerization with Docker, and real-time performance monitoring.",
    features: [
      "Docker containerization & docker-compose orchestration",
      "CI/CD workflow automation (GitHub Actions / GitLab CI)",
      "AWS / Cloudflare Edge / DigitalOcean cloud infrastructure",
      "SSL, reverse proxies (Nginx / Cloudflare), and rate limiting",
      "Sentry error monitoring & PostHog analytics integration",
    ],
    outcomes: [
      "Zero-downtime automated deployments",
      "Optimized cloud spending & resource allocation",
      "Complete visibility into app performance and error logs",
    ],
  },
};

async function getServiceData(slug: string) {
  try {
    const apiData = await getServiceBySlug(slug);
    if (apiData && apiData.title) {
      return {
        title: apiData.title,
        tagline: apiData.description,
        description: apiData.description,
        features: [
          "Custom tailored software architecture",
          "Responsive, high-performance execution",
          "Production-ready deployment & continuous updates",
          "Built using modern industry standard frameworks",
        ],
        outcomes: [
          "Scalable infrastructure ready for growth",
          "Dedicated senior studio team support",
        ],
      };
    }
  } catch {
    // API offline or not found — fallback to static definitions
  }

  const staticData = staticServiceDetails[slug];
  if (staticData) {
    return staticData;
  }

  // Fallback for any unknown slug
  const formattedTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: formattedTitle,
    tagline: `Professional ${formattedTitle} services by ${company.name}.`,
    description: `We deliver top-tier ${formattedTitle} solutions tailored to your product needs. Engineered with high standards of performance, security, and scalability.`,
    features: [
      "Custom tailored software architecture",
      "Responsive, high-performance execution",
      "Production-ready deployment & continuous updates",
      "Built using modern industry standard frameworks",
    ],
    outcomes: ["Scalable infrastructure ready for growth", "Dedicated senior studio team support"],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getServiceData(resolvedParams.slug);
  const baseUrl = company.website.replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}/services/${resolvedParams.slug.toLowerCase()}`;
  const metaDescription =
    service.description.length > 165
      ? `${service.description.slice(0, 157).trim()}...`
      : service.description;

  return {
    title: service.title,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.title,
      description: metaDescription,
      url: canonicalUrl,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = await getServiceData(resolvedParams.slug);
  const baseUrl = company.website.replace(/\/$/, "");

  const serviceSchema = getServiceSchema({
    name: service.title,
    description: service.description,
    url: `${baseUrl}/services/${resolvedParams.slug}`,
    category: service.title,
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Services", url: `${baseUrl}/services` },
    { name: service.title, url: `${baseUrl}/services/${resolvedParams.slug}` },
  ]);

  const webPageSchema = getWebPageSchema({
    name: `${service.title} | VoiceAct Solutions`,
    description: service.description,
    url: `${baseUrl}/services/${resolvedParams.slug}`,
    speakableSelectors: ["h1", "h2", "p"],
    breadcrumbs: [
      { name: "Home", url: baseUrl },
      { name: "Services", url: `${baseUrl}/services` },
      { name: service.title, url: `${baseUrl}/services/${resolvedParams.slug}` },
    ],
  });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <JsonLd data={[serviceSchema, breadcrumbsSchema, webPageSchema]} />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Services
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-12 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            {service.title}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-tight">
            {service.tagline}
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            {service.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/contact?service=${resolvedParams.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              Get Started with {service.title}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-card hover:text-foreground"
            >
              View Our Work
            </Link>
          </div>
        </section>

        {/* Key Deliverables & Features */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 border-t border-border/60">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            What We Deliver in {service.title}
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

        {/* Measurable Outcomes */}
        {service.outcomes && service.outcomes.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 md:px-10 py-8 border-t border-border/60">
            <h3 className="text-xl font-bold tracking-tight mb-6">Key Business Outcomes</h3>
            <ul className="space-y-3">
              {service.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
