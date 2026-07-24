import { company } from "@/modules/company-data";
import { NAV_LINKS } from "@/config/constants";

export const site = {
  name: company.name,
  shortName: company.shortName,
  tagline: company.tagline,
  description: company.description,
  email: company.contact.email,
  location: `${company.address.city} · ${company.address.state} · India`,
  socials: company.socialList,
} as const;

export const nav = NAV_LINKS;
