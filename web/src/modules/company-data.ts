export const company = {
  name: "VoiceAct Solutions",
  shortName: "VoiceAct",
  tagline: "Web & mobile apps, engineered to ship.",
  description:
    "VoiceAct Solutions is a software development agency building production-grade web and mobile applications, and custom CRMs, for startups and scaleups.",
  industry: "Software Development",
  website: "https://voiceact.tech",
  domain: "voiceact.tech",

  address: {
    street: "123 Tech Park, Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560066",
    country: "India",
    full: "123 Tech Park, Whitefield, Bengaluru, Karnataka 560066, India",
  },

  contact: {
    email: "hello@voiceact.tech",
    supportEmail: "support@voiceact.tech",
    salesEmail: "sales@voiceact.tech",
    phone: "+91 80 4567 8900",
    whatsapp: "+91 98765 43210",
  },

  maps: {
    query: "VoiceAct+Solutions+Bengaluru",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.7!3d12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },

  hours: {
    weekdays: "Monday – Friday: 9:00 AM – 6:00 PM IST",
    saturday: "Saturday: 10:00 AM – 2:00 PM IST",
    sunday: "Sunday: Closed",
    full: "Monday – Friday: 9:00 AM – 6:00 PM IST | Saturday: 10:00 AM – 2:00 PM IST | Sunday: Closed",
  },

  registrations: {
    gst: "29AADCV1234F1Z5",
    udyam: "UDYAM-KA-03-0123456",
    duns: "87-654-3210",
  },

  socials: {
    twitter: { label: "Twitter", handle: "@voiceact_tech", href: "https://twitter.com/voiceact_tech" },
    linkedin: {
      label: "LinkedIn",
      handle: "voiceact",
      href: "https://linkedin.com/company/voiceact",
    },
    github: {
      label: "GitHub",
      handle: "voiceAct-web",
      href: "https://github.com/Adityakbr01/voiceAct-web",
    },
    developer: {
      label: "GitHub",
      handle: "Adityakbr01",
      href: "https://github.com/Adityakbr01",
      badge: { text: "Developer", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    },
    instagram: {
      label: "Instagram",
      handle: "@voiceact.tech",
      href: "https://instagram.com/voiceact.tech",
    },
  },

  socialList: [
    { label: "Twitter", handle: "@voiceact_tech", href: "https://twitter.com/voiceact_tech" },
    { label: "LinkedIn", handle: "voiceact", href: "https://linkedin.com/company/voiceact" },
    {
      label: "GitHub",
      handle: "voiceAct-web",
      href: "https://github.com/Adityakbr01/voiceAct-web",
    },
    {
      label: "GitHub",
      handle: "Adityakbr01",
      href: "https://github.com/Adityakbr01",
      badge: { text: "Developer", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    },
    { label: "Instagram", handle: "@voiceact.tech", href: "https://instagram.com/voiceact.tech" },
  ],

  legal: {
    privacyPolicyUrl: "/privacy-policy",
    termsUrl: "/terms-and-conditions",
    cookiePolicyUrl: "/cookie-policy",
  },

  nav: {
    services: { label: "Services", href: "/#services" },
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
    "To empower businesses with innovative, scalable, and user-centric software solutions that drive growth and digital transformation.",

  vision:
    "To be the most trusted technology partner for startups and enterprises, delivering excellence in every line of code.",

  founded: "2020",
  employees: "10-50",
  clients: "50+",
  projects: "120+",
} as const;

export type CompanyData = typeof company;
