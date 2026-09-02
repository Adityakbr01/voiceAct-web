import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  // Base: 34 chars → with template ` | VoiceAct Solutions` = 53 chars (under 60)
  title: "Software Project Cost Estimator",
  description:
    "Estimate your custom software development cost in 60 seconds. Transparent pricing for web, mobile, CRM, and SaaS MVPs.",
  alternates: {
    canonical: `${company.website}/calculator`,
  },
  openGraph: {
    title: "Software Project Cost Estimator | VoiceAct Solutions",
    description:
      "Estimate your custom software development cost in 60 seconds. Transparent pricing for web, mobile, CRM, and SaaS MVPs.",
    url: `${company.website}/calculator`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Project Cost Estimator | VoiceAct Solutions",
    description: "Instant project pricing estimator for web, mobile, CRM, and SaaS MVPs.",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = company.website.replace(/\/$/, "");
  const calcUrl = `${baseUrl}/calculator`;

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Cost Estimator", url: calcUrl },
  ]);

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VoiceAct Software Cost Estimator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    url: calcUrl,
    description: "Instant software and web application development cost calculator.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
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
