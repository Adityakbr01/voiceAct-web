import { OWNER } from "@/config/constants";

export const hero = {
  eyebrow: "Web apps · Mobile apps · CRM · Product design",
  title: ["Web & mobile apps,", "designed to convert,", "engineered to ship."],
  description:
    "We're a small, senior studio that partners with founders and product teams to design and build production-grade web and mobile applications — from first prototype to App Store launch.",
  primaryCta: { label: "Start your project", href: "#contact" },
  secondaryCta: { label: "See our work", href: "#work" },
  stats: [
    { value: "120+", label: "Apps shipped to production" },
    { value: "8 wks", label: "Average MVP launch time" },
    { value: "94%", label: "Client retention after launch" },
    { value: "4.9/5", label: "App Store & Play Store average" },
  ],
  trustedBy: ["NORDVEIL", "HELIA", "SIGNAL9", "LATTICE", "OAKRIDGE", "KESTREL"],
};

export const stats = [
  { value: "120+", label: "Apps shipped worldwide" },
  { value: "8 wks", label: "Average MVP launch time" },
  { value: "94%", label: "Client retention" },
  { value: "24/7", label: "Post-launch support" },
];

export const cta = {
  eyebrow: "3 discovery slots left this month",
  title: "Ship your app in weeks, not quarters.",
  description:
    "Free 30-minute product audit + scoped roadmap delivered within 24 hours. No sales call, no obligation — you keep the roadmap either way.",
  anchor: {
    typical: { label: "Typical agency engagement", value: "6 months · $150k+" },
    ours: { label: "Our sprint", value: "8 weeks · from $25k" },
  },
  defaults: {
    projectType: "Mobile + Web app",
    timeline: "8 weeks",
    budget: "$25k – $50k",
  },
  projectTypes: ["Mobile app", "Web app", "Mobile + Web app", "CRM / internal tool"],
  timelines: ["4 weeks", "8 weeks", "12 weeks", "Flexible"],
  budgets: ["$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+"],
  primary: { label: "Claim my discovery slot", href: "#contact" },
  secondary: { label: "Email the studio", href: `mailto:${OWNER.email}` },
};
