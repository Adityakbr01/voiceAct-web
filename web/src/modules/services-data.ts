import type { LucideIcon } from "lucide-react";
import type { TablerIcon } from "@tabler/icons-react";
import {
  IconBrandReact as SiReact,
  IconBrandNextjs as SiNextdotjs,
  IconBrandTypescript as SiTypescript,
  IconBrandSwift as SiSwift,
  IconBrandKotlin as SiKotlin,
  IconBrandNodejs as SiNodedotjs,
  IconBrandCloudflare as SiCloudflare,
  IconBrandStripe as SiStripe,
  IconBrandPhp as SiPhp,
  IconBrandWordpress as SiWordpress,
  IconBrandAws as FaAws,
  IconDatabase,
  IconApi,
  IconBuildingStore,
  IconCreditCard,
  IconBrandLaravel as SiLaravel,
} from "@tabler/icons-react";
import { Globe, Smartphone, Palette, Rocket, Server, Wrench, Users } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  tag: string;
  color: string;
  span?: "wide" | "full";
}

export const services: Service[] = [
  {
    icon: Globe,
    tag: "Web",
    color: "#61DAFB",
    span: "wide",
    title: "Web application development",
    description:
      "Fast, accessible web apps built on React, Next.js and TypeScript — from marketing sites to complex SaaS dashboards.",
    bullets: [
      "React, Next.js & TanStack Start",
      "Design systems from scratch",
      "SEO, performance & a11y baked in",
    ],
  },
  {
    icon: Smartphone,
    tag: "Mobile",
    color: "#7F52FF",
    title: "iOS & Android app development",
    description:
      "Native-quality mobile apps in React Native, Swift and Kotlin — one team, one codebase, both stores.",
    bullets: [
      "React Native & Expo",
      "Native Swift / Kotlin modules",
      "App Store & Play Store submission",
    ],
  },
  {
    icon: Palette,
    tag: "Design",
    color: "#EC1C7B",
    title: "Product design & UX",
    description:
      "Research, flows, and pixel-precise interfaces from senior designers who ship — not just deliver Figma files.",
    bullets: ["Discovery & user research", "Interaction & visual design", "Design systems in code"],
  },
  {
    icon: Rocket,
    tag: "MVP",
    color: "#F05138",
    title: "MVP sprints",
    description:
      "From idea to a real, testable product in 6–8 weeks. Fixed scope, fixed timeline, senior team from day one.",
    bullets: [
      "Weekly demoable milestones",
      "Production-grade, not throwaway",
      "Launch on the eighth week",
    ],
  },
  {
    icon: Users,
    tag: "CRM",
    color: "#4169E1",
    title: "Custom CRM development",
    description:
      "Tailored CRMs that match your sales, support and operations workflows — not an off-the-shelf box you bend around.",
    bullets: [
      "Sales pipelines & lead tracking",
      "Customer support portals",
      "Integrations with your existing stack",
    ],
  },
  {
    icon: Server,
    tag: "Backend",
    color: "#5FA04E",
    span: "wide",
    title: "APIs & backend engineering",
    description:
      "Scalable Node, Postgres and cloud infra that grows with your product — auth, payments, integrations, all wired in.",
    bullets: ["Node, tRPC & Postgres", "Auth, payments & webhooks", "AWS, GCP & Cloudflare edge"],
  },
  {
    icon: Wrench,
    tag: "DevOps",
    color: "#F38020",
    title: "Maintenance & DevOps",
    description:
      "We stay past launch — CI/CD, monitoring, on-call, and a steady release cadence so your product keeps compounding.",
    bullets: [
      "CI/CD & release automation",
      "Uptime monitoring & on-call",
      "Monthly product iterations",
    ],
  },
];

export interface WorkItem {
  client: string;
  industry: string;
  title: string;
  outcome: string;
  metrics: { value: string; label: string }[];
}

export const work: WorkItem[] = [
  {
    client: "Nordveil",
    industry: "SaaS · Analytics",
    title: "A B2B analytics dashboard rebuilt from the ground up",
    outcome:
      "Replaced a legacy dashboard with a React + Next.js app: 3× faster load, a cleaner design system, and a mobile companion app.",
    metrics: [
      { value: "3.1×", label: "Faster dashboard" },
      { value: "+42%", label: "Weekly active users" },
      { value: "12 wks", label: "Design to launch" },
    ],
  },
  {
    client: "Helia Finance",
    industry: "Fintech · Mobile",
    title: "A React Native banking app, live on iOS & Android",
    outcome:
      "Designed and shipped a consumer fintech app with card management, Plaid-linked accounts, and biometric auth in 14 weeks.",
    metrics: [
      { value: "4.8★", label: "App Store rating" },
      { value: "180k", label: "Downloads in 6 mo" },
      { value: "iOS+Android", label: "One codebase" },
    ],
  },
  {
    client: "Signal9 Market",
    industry: "Marketplace · Web + Mobile",
    title: "A two-sided marketplace, from Figma to production",
    outcome:
      "Full-stack build: seller web console, buyer mobile app, Stripe Connect payouts, and admin tooling — one team, one contract.",
    metrics: [
      { value: "$4.1M", label: "GMV first year" },
      { value: "18k", label: "Active sellers" },
      { value: "6 mo", label: "MVP to Series A" },
    ],
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  chapter: string;
  color: string;
}

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    chapter: "Week 1 — the map",
    color: "#EC1C7B",
    description:
      "We map users, jobs and success metrics, then agree the smallest thing worth shipping first.",
  },
  {
    step: "02",
    title: "Design",
    chapter: "Week 2–3 — the blueprint",
    color: "#F05138",
    description:
      "Flows, wireframes and pixel-precise interfaces — reviewed together every week, never over the wall.",
  },
  {
    step: "03",
    title: "Build",
    chapter: "Week 3–7 — the workshop",
    color: "#61DAFB",
    description:
      "Senior engineers ship production-grade code from week one. Weekly demos, one Slack channel, no surprises.",
  },
  {
    step: "04",
    title: "Launch",
    chapter: "Week 8 — liftoff",
    color: "#F38020",
    description:
      "App Store, Play Store, and web deploys — plus analytics, monitoring and a soft-launch plan tuned to your audience.",
  },
  {
    step: "05",
    title: "Iterate",
    chapter: "Ongoing — the orbit",
    color: "#5FA04E",
    description:
      "We stay past launch: monthly releases, on-call support, and a steady stream of measurable product wins.",
  },
];

export interface StackItem {
  name: string;
  category: string;
  icon: TablerIcon;
  color: string;
}

export const stack: StackItem[] = [
  { name: "React", category: "Frontend", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", category: "Language", icon: SiTypescript, color: "#3178C6" },
  { name: "React Native", category: "Mobile", icon: SiReact, color: "#61DAFB" },
  { name: "Swift", category: "iOS", icon: SiSwift, color: "#F05138" },
  { name: "Kotlin", category: "Android", icon: SiKotlin, color: "#7F52FF" },
  { name: "Node.js", category: "Backend", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PHP", category: "Backend", icon: SiPhp, color: "#777BB4" },
  { name: "Postgres", category: "Database", icon: IconDatabase, color: "#4169E1" },
  { name: "Laravel", category: "Backend", icon: SiLaravel, color: "#398CCB" },
  { name: "WordPress", category: "CMS", icon: SiWordpress, color: "#21759B" },
  { name: "Shopify", category: "E-Commerce", icon: IconBuildingStore, color: "#96BF48" },
  { name: "AWS", category: "Cloud", icon: FaAws, color: "#FF9900" },
  { name: "Cloudflare", category: "Edge", icon: SiCloudflare, color: "#F38020" },
  { name: "Stripe", category: "Payments", icon: SiStripe, color: "#635BFF" },
  { name: "Razorpay", category: "Payments", icon: IconCreditCard, color: "#072654" },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "voiceAct.in shipped our dashboard rebuild in twelve weeks — code we're still happy to read a year later. They feel like an in-house team, not a vendor.",
    author: "Ingrid Solberg",
    role: "VP Product",
    company: "Nordveil",
  },
  {
    quote:
      "They designed and built our iOS and Android apps in one sprint. Senior engineers, senior designers, and a launch that actually happened on time.",
    author: "Marco Reyes",
    role: "Co-founder & CTO",
    company: "Helia Finance",
  },
  {
    quote:
      "Rare studio: opinionated on architecture, humble on the details, obsessive about the user. Our marketplace went from Figma to Series A in six months.",
    author: "Anaïs Laurent",
    role: "Founder",
    company: "Signal9 Market",
  },
];

export const faqs = [
  {
    q: "How long does an app take to build?",
    a: "An MVP typically ships in 6–8 weeks. A full production web or mobile app usually lands in 10–16 weeks depending on scope and integrations.",
  },
  {
    q: "Do you build web, mobile, or both?",
    a: "Both — often together. A single team designs and ships your web app, iOS app and Android app so the product feels like one thing.",
  },
  {
    q: "Who owns the code and the design?",
    a: "You do. Full source, full Figma files, and a clean handover on day one of every engagement. No lock-in, no per-seat platform fees.",
  },
  {
    q: "What does engagement look like?",
    a: "A dedicated pod — designer, mobile engineer, web engineer, tech lead — working alongside your team. Weekly demos, one shared Slack, fixed monthly pricing.",
  },
  {
    q: "How is pricing structured?",
    a: "Fixed-scope for discovery and design sprints, then a flat monthly rate for build and post-launch iteration. No hourly billing, no surprise invoices.",
  },
];

export interface ShowcaseProject {
  image: string;
  text: string;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    text: "SaaS Analytics Dashboard",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    text: "Fintech Mobile Wallet",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    text: "E-Commerce Platform",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    text: "AI Productivity Tool",
  },
  {
    image:
      "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&w=800&q=80",
    text: "Healthcare Patient Portal",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
    text: "Real Estate Marketplace",
  },
];
