import { APP, OWNER, SOCIAL_LIST, NAV_LINKS } from "@/config/constants";

export const site = {
  name: APP.name,
  shortName: APP.shortName,
  tagline: APP.tagline,
  description: APP.description,
  email: OWNER.email,
  location: OWNER.location,
  socials: SOCIAL_LIST,
} as const;

export const nav = NAV_LINKS;
