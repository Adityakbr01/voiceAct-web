/**
 * Central app constants. Update values here — do not hardcode elsewhere.
 */
export const APP = {
  name: "voiceAct.in",
  shortName: "voiceAct",
  domain: "voiceAct.in",
  url: "https://voiceAct.in",
  version: "1.0.0",
  tagline: "Web & mobile apps, engineered to ship.",
  description:
    "voiceAct.in is a design-and-engineering studio building production-grade web and mobile applications, and custom CRMs, for startups and scaleups.",
  seoTitle: "voiceAct.in — Web & Mobile App Development Agency",
  seoDescription:
    "voiceAct.in is a design-and-engineering studio building production-grade web and mobile apps and custom CRMs. From MVP to App Store launch.",
} as const;

export const OWNER = {
  name: "voiceAct.in",
  legalName: "voiceAct.in",
  email: "hello@voiceact.in",
  supportEmail: "support@voiceact.in",
  location: "Remote · Lisbon · Austin · Bengaluru",
} as const;

export const SOCIALS = {
  twitter: { label: "Twitter", handle: "@voiceActin", href: "https://twitter.com/voiceActin" },
  linkedin: {
    label: "LinkedIn",
    handle: "voiceact",
    href: "https://linkedin.com/company/voiceact",
  },
  github: { label: "GitHub", handle: "voiceact", href: "https://github.com/voiceact" },
  instagram: {
    label: "Instagram",
    handle: "@voiceact.in",
    href: "https://instagram.com/voiceact.in",
  },
} as const;

export const SOCIAL_LIST = [
  SOCIALS.twitter,
  SOCIALS.linkedin,
  SOCIALS.github,
  SOCIALS.instagram,
] as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Tech", href: "#stack" },
  { label: "FAQ", href: "#faq" },
] as const;
