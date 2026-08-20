import { OWNER } from "@/config/constants";

export const hero = {
  eyebrow: "Senior Engineering Studio · Next.js · React Native · Custom CRM · AI Workflows",
  title: ["Production-Grade Apps,", "engineered to scale,", "built without templates."],
  description:
    "We partner with ambitious founders and scaling companies to design, architect, and ship high-performance Next.js SaaS platforms, React Native mobile apps, and custom CRM systems — from initial architecture to production launch in 6–8 week sprints.",
  primaryCta: { label: "Book 20-Min Architecture Call", href: "#contact" },
  secondaryCta: { label: "Explore Shipped Work", href: "#work" },
  stats: [
    { value: "6–8 wks", label: "Average MVP Launch Sprint" },
    { value: "<400ms", label: "Target TTFB & Sub-Second Loads" },
    { value: "100%", label: "Senior Engineer Led" },
    { value: "99.9%", label: "Production Uptime Guarantee" },
  ],
  techStackBadges: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "React Native",
    "PostgreSQL",
    "Supabase",
    "Fastify / Node.js",
    "Docker / AWS",
    "Tailwind CSS",
  ],
};

export const stats = [
  { value: "6–8 wks", label: "Average MVP launch sprint" },
  { value: "100%", label: "TypeScript & strict type safety" },
  { value: "<400ms", label: "Target server response latency" },
  { value: "24/7", label: "Post-launch monitoring & CI/CD" },
];

export const cta = {
  eyebrow: "Free Technical Architecture Review",
  title: "Ship your product in weeks, not quarters.",
  description:
    "Get a 30-minute technical audit + scoped architecture roadmap delivered within 24 hours. No high-pressure sales pitch, no obligation — you keep the roadmap and system design either way.",
  anchor: {
    typical: { label: "Traditional agency engagement", value: "6+ months · ₹150k+" },
    ours: { label: "Our senior agile sprint", value: "6–8 weeks · from ₹25k" },
  },
  defaults: {
    projectType: "Full-Stack SaaS / Web App",
    timeline: "6–8 weeks",
    budget: "₹25k – ₹50k",
  },
  projectTypes: [
    "Full-Stack SaaS / Web App",
    "React Native Mobile App",
    "Custom CRM / Internal Tool",
    "AI Workflow / LLM Integration",
    "Performance Optimization",
  ],
  timelines: ["4 weeks (Rapid MVP)", "6–8 weeks (Standard)", "12 weeks (Complex)", "Flexible Retainer"],
  budgets: ["₹25k – ₹50k", "₹50k – ₹100k", "₹100k – ₹250k", "₹250k+"],
  primary: { label: "Schedule My Architecture Call", href: "#contact" },
  secondary: { label: "Email Technical Lead", href: `mailto:${OWNER.email}` },
};
