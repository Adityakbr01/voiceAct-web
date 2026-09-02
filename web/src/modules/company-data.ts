/**
 * Centralized business data for VoiceAct Solutions.
 *
 * Single source of truth for all business identity, contact, and social
 * information. Update values here — never hardcode business info elsewhere.
 *
 * IMPORTANT: Only include information that is genuinely verified. Do not
 * fabricate addresses, statistics, team sizes, founding years, or social
 * profiles. If something is not known or verified, omit it entirely.
 */
export const company = {
  name: "VoiceAct Solutions",
  shortName: "VoiceAct",
  tagline: "Web and mobile solutions, designed and developed.",
  description:
    "VoiceAct Solutions is a technology-focused business providing web development, mobile application development, UI/UX design, and custom digital solutions for businesses, startups, and new ideas.",
  industry: "Software Development",
  website: "https://voiceact.tech",
  domain: "voiceact.tech",

  contact: {
    email: "hello@voiceact.tech",
    supportEmail: "support@voiceact.tech",
    adminEmail: "admin@voiceact.tech",
    phone: "+91 9304922632",
    whatsapp: "+91 9304922632",
  },

  /**
   * Only verified social profiles. LinkedIn, Twitter, and Instagram company
   * profiles have not been claimed/verified and are intentionally omitted.
   * Personal developer profiles are listed separately so visitors can verify
   * ownership of the work published here.
   */
  socials: {
    github: {
      label: "GitHub",
      handle: "voiceAct-web",
      href: "https://github.com/Adityakbr01/voiceAct-web",
    },
    developerGithub: {
      label: "GitHub",
      handle: "Adityakbr01",
      href: "https://github.com/Adityakbr01",
      badge: {
        text: "Developer",
        color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      },
    },
    developerLinkedin: {
      label: "LinkedIn",
      handle: "aditya-kbr",
      href: "https://www.linkedin.com/in/aditya-kbr-3b833731b/",
      badge: {
        text: "Developer",
        color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      },
    },
  },

  /**
   * Same as socials — listed in render order for surfaces (footer, contact)
   * that iterate over an array. Personal profiles are explicitly tagged.
   */
  socialList: [
    {
      label: "GitHub",
      handle: "voiceAct-web",
      href: "https://github.com/Adityakbr01/voiceAct-web",
    },
    {
      label: "GitHub",
      handle: "Adityakbr01",
      href: "https://github.com/Adityakbr01",
      badge: {
        text: "Developer",
        color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      },
    },
    {
      label: "LinkedIn",
      handle: "aditya-kbr",
      href: "https://www.linkedin.com/in/aditya-kbr-3b833731b/",
      badge: {
        text: "Developer",
        color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      },
    },
  ],

  legal: {
    privacyPolicyUrl: "/privacy-policy",
    termsUrl: "/terms-and-conditions",
    cookiePolicyUrl: "/cookie-policy",
  },

  nav: {
    services: { label: "Services", href: "/#services" },
    hire: { label: "Hire Developers", href: "/hire" },
    calculator: { label: "Cost Estimator", href: "/calculator" },
    work: { label: "Work", href: "/#work" },
    process: { label: "Process", href: "/#process" },
    tech: { label: "Tech", href: "/#stack" },
    faq: { label: "FAQ", href: "/#faq" },
    about: { label: "About", href: "/about" },
    contact: { label: "Contact", href: "/contact" },
    privacy: { label: "Privacy Policy", href: "/privacy-policy" },
    terms: { label: "Terms & Conditions", href: "/terms-and-conditions" },
    cookie: { label: "Cookie Policy", href: "/cookie-policy" },
  },

  services: [
    "Web Development",
    "Mobile App Development",
    "SaaS Development",
    "UI/UX Design",
    "AI Solutions",
    "Cloud Solutions",
  ],

  techStack: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Swift",
    "Kotlin",
    "Node.js",
    "PHP",
    "PostgreSQL",
    "WordPress",
    "Shopify",
    "AWS",
    "Cloudflare",
    "Razorpay",
  ],

  mission:
    "To design and develop practical, modern, and scalable digital products that help businesses and ideas move from concept to production.",
  vision:
    "To build reliable web and mobile products that solve real problems for the businesses and people who use them.",

  /**
   * Modest, realistic business metrics. These reflect the scale of a small,
   * focused studio rather than exaggerated agency-style numbers.
   */
  founded: "2026",
  employees: "1–10",
  clients: "5+",
  projects: "10+",
} as const;

export type CompanyData = typeof company;