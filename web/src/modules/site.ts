import { company } from "@/modules/company-data";
import { NAV_LINKS } from "@/config/constants";

export const site = {
  name: company.name,
  shortName: company.shortName,
  tagline: company.tagline,
  description: company.description,
  email: company.contact.email,
  // No verified physical address — surface the country only as a neutral region hint.
  region: "India",
  socials: company.socialList,
} as const;

export const nav = NAV_LINKS;