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
  // Title: 49 chars — within Google's 50-60 char optimal range (with the %s | suffix it's 68, so we keep base short)
  seoTitle: `${company.name} — Software Dev Agency India`,
  // Description: 153 chars — under the 155-char SERP limit, action-oriented
  seoDescription: `Custom Next.js apps, React Native mobile apps & CRM systems built in India. Senior engineers, 6–8 week MVP sprints, production-grade code. Free audit.`,
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
