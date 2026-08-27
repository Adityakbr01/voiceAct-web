import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  // Base: 38 chars → with template ` | VoiceAct Solutions` = 57 chars (under 60)
  title: "Free Website & Technical Audit Tool",
  description:
    "Free website performance, Core Web Vitals, and SEO audit. Instant scores and an actionable optimization roadmap.",
  alternates: {
    canonical: `${company.website}/audit`,
  },
  openGraph: {
    title: "Free Website & Technical Audit Tool | VoiceAct Solutions",
    description:
      "Free website performance, Core Web Vitals, and SEO audit. Instant scores and an actionable roadmap.",
    url: `${company.website}/audit`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website & Technical Audit Tool | VoiceAct Solutions",
    description: "Free performance, Core Web Vitals, and SEO audit. Instant technical breakdown.",
  },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = company.website.replace(/\/$/, "");
  const auditUrl = `${baseUrl}/audit`;

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Free Website Audit", url: auditUrl },
  ]);

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VoiceAct Website & SEO Audit Tool",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    url: auditUrl,
    description: "Instant free website performance, Core Web Vitals, and SEO technical audit tool.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: company.name,
      url: baseUrl,
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbsSchema, appSchema]} />
      {children}
    </>
  );
}
