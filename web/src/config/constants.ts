import { company } from "@/modules/company-data";

/**
 * Central app constants. Update values in company-data.ts — do not hardcode elsewhere.
 */
export const APP = {
  name: company.name,
  shortName: company.shortName,
  domain: company.domain,
  url: company.website,
  version: "1.0.0",
  tagline: company.tagline,
  description: company.description,
  seoTitle: `${company.name} — Software Development Agency India | Next.js, Mobile & CRM`,
  seoDescription: `${company.name} is a premier software development agency in India. We build production-grade Next.js web applications, React Native mobile apps, custom CRMs, and SaaS MVPs for startups.`,
} as const;

export const OWNER = {
  name: company.name,
  legalName: company.name,
  email: company.contact.email,
  supportEmail: company.contact.supportEmail,
  location: `${company.address.city} · ${company.address.state} · India`,
} as const;

export const SOCIALS = company.socials;

export const SOCIAL_LIST = company.socialList;

export const NAV_LINKS = [
  { label: company.nav.services.label, href: company.nav.services.href },
  { label: company.nav.work.label, href: company.nav.work.href },
  { label: company.nav.process.label, href: company.nav.process.href },
  { label: company.nav.tech.label, href: company.nav.tech.href },
  { label: company.nav.faq.label, href: company.nav.faq.href },
] as const;
