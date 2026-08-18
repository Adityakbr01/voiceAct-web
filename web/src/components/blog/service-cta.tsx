"use client";
import Link from "next/link";

const SERVICE_MAP: Record<string, string> = {
  engineering: "/services/web-development",
  nextjs: "/services/web-development",
  mobile: "/services/mobile-development",
  "react-native": "/services/mobile-development",
  "ai & automation": "/services/ai-solutions",
  "ai-agent": "/services/ai-solutions",
  crm: "/services/crm-erp",
  saas: "/services/saas-development",
  design: "/services/ui-ux-design",
  ecommerce: "/services/ecommerce-solutions",
};

export function ServiceCTA({ category }: { category: string }) {
  const url = SERVICE_MAP[category.toLowerCase()] || "/services";
  return (
    <aside className="my-8 rounded-2xl border border-border/50 bg-muted/30 p-6">
      <p className="mb-3 text-sm text-muted-foreground">Need help implementing this?</p>
      <Link
        href={url}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        Our {category} team builds this daily →
      </Link>
    </aside>
  );
}
