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
  // Title: kept short so the "%s | suffix" template still fits Google's preferred 50-60 char range.
  seoTitle: `${company.name} | Web & Mobile Development`,
  // Description: under the 155-char SERP limit, focuses on what we do rather than unverifiable claims.
  seoDescription: `${company.name} provides modern web development, mobile application development, UI/UX design, and custom digital solutions for businesses, startups, and new ideas.`,
} as const;

export const OWNER = {
  name: company.name,
  legalName: company.name,
  email: company.contact.email,
  supportEmail: company.contact.supportEmail,
  adminEmail: company.contact.adminEmail,
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