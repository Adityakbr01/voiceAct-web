import { OWNER } from "@/config/constants";

export const hero = {
  eyebrow: "Web Development · Mobile Apps · UI/UX Design · Custom Software",
  title: ["Web and mobile", "products,", "designed and built."],
  description:
    "VoiceAct Solutions partners with businesses, startups, and new ideas to design, architect, and ship modern web applications, mobile apps, and custom digital products — from initial concept to production launch.",
  primaryCta: { label: "Start a Project", href: "#contact" },
  secondaryCta: { label: "Explore Our Work", href: "#work" },
  stats: [
    { value: "Web", label: "Web Applications" },
    { value: "Mobile", label: "Mobile Apps" },
    { value: "UI/UX", label: "Design & Prototyping" },
    { value: "Cloud", label: "Cloud & DevOps" },
  ],
  techStackBadges: [
    "Next.js",
    "React",
    "TypeScript",
    "React Native",
    "PostgreSQL",
    "Supabase",
    "Node.js",
    "AWS",
    "Tailwind CSS",
  ],
};

export const stats = [
  { value: "Web", label: "Web application development" },
  { value: "Mobile", label: "iOS & Android via React Native" },
  { value: "Design", label: "UI/UX design and prototyping" },
  { value: "Cloud", label: "Production deployment & monitoring" },
];

export const cta = {
  eyebrow: "Tell Us About Your Project",
  title: "Let's build something useful together.",
  description:
    "Share a few details about your idea and we'll get back with a clear, scoped response. No high-pressure sales — just an honest conversation about what you're trying to build.",
  anchor: {
    typical: { label: "Typical engagement", value: "scoped to your goals" },
    ours: { label: "Our approach", value: "concept to production" },
  },
  defaults: {
    projectType: "Web Application",
    timeline: "Flexible",
    budget: "To be discussed",
  },
  projectTypes: [
    "Web Application",
    "Mobile App",
    "UI/UX Design",
    "Custom Software",
    "Performance & Optimization",
  ],
  timelines: ["4 weeks (Rapid MVP)", "6–8 weeks (Standard)", "12 weeks (Complex)", "Flexible Retainer"],
  budgets: ["Under ₹50k", "₹50k – ₹100k", "₹100k – ₹250k", "₹250k+"],
  primary: { label: "Send Project Details", href: "#contact" },
  secondary: { label: "Email Us", href: `mailto:${OWNER.email}` },
};