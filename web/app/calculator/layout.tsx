import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Software Project Cost Estimator | Instant Pricing",
  description:
    "Estimate your custom software development cost in 60 seconds. Transparent pricing for web applications, mobile apps, custom CRMs, and SaaS MVPs.",
  alternates: {
    canonical: `${company.website}/calculator`,
  },
  openGraph: {
    title: "Software Project Cost Estimator | VoiceAct Solutions",
    description:
      "Estimate your custom software development cost in 60 seconds. Transparent pricing for web applications, mobile apps, custom CRMs, and SaaS MVPs.",
    url: `${company.website}/calculator`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Project Cost Estimator | VoiceAct Solutions",
    description:
      "Instant project pricing estimator for web apps, mobile apps, custom CRMs, and SaaS MVPs.",
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
    description:
      "Instant software and web application development cost calculator.",
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
