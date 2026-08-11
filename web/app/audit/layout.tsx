import type { Metadata } from "next";
import { company } from "@/modules/company-data";

export const metadata: Metadata = {
  title: "Free Website & Technical Audit Tool",
  description:
    "Request a free technical software and Core Web Vitals audit. Get performance, SEO, accessibility, and security analysis within 24 hours.",
  alternates: {
    canonical: `${company.website}/audit`,
  },
  openGraph: {
    title: "Free Website & Technical Audit Tool",
    description:
      "Request a free technical software and Core Web Vitals audit. Performance, SEO, accessibility, and security analysis.",
    url: `${company.website}/audit`,
  },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
