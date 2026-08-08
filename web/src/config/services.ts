import {
  Globe,
  Smartphone,
  Server,
  Palette,
  PenTool,
  Sparkles,
  Search,
  BarChart3,
  Zap,
  ArrowUpRight,
} from "lucide-react";

export const services = [
  {
    category: "Development",
    icon: Globe,
    items: [
      {
        title: "Web Development",
        description: "Modern Next.js websites",
        href: "/services/web-development",
        icon: Globe,
      },
      {
        title: "Mobile Development",
        description: "iOS & Android apps",
        href: "/services/mobile-development",
        icon: Smartphone,
      },
      {
        title: "SaaS Development",
        description: "Scalable cloud products",
        href: "/services/saas-development",
        icon: Server,
      },
    ],
  },
  {
    category: "Design",
    icon: Palette,
    items: [
      {
        title: "UI Design",
        description: "Beautiful interfaces",
        href: "/services/ui-design",
        icon: Palette,
      },
      {
        title: "UX Design",
        description: "User-centered experiences",
        href: "/services/ux-design",
        icon: PenTool,
      },
      {
        title: "Brand Identity",
        description: "Memorable brand systems",
        href: "/services/brand-identity",
        icon: Sparkles,
      },
    ],
  },
  {
    category: "Marketing",
    icon: Search,
    items: [
      {
        title: "SEO",
        description: "Organic growth engine",
        href: "/services/seo",
        icon: Search,
      },
      {
        title: "Analytics",
        description: "Data-driven decisions",
        href: "/services/analytics",
        icon: BarChart3,
      },
      {
        title: "Performance",
        description: "Lightning-fast sites",
        href: "/services/performance",
        icon: Zap,
      },
    ],
  },
] as const;

export type ServiceCategory = (typeof services)[number];
export type ServiceItem = (typeof services)[number]["items"][number] & {
  onClick?: () => void;
};

export const NAV_ITEMS = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services", hasDropdown: true },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
