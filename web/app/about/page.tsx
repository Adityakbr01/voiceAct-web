import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { AboutPage } from "@/modules/pages/about";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "About Our Software Studio",
  description:
    "Learn about VoiceAct Solutions, a senior software agency building production-grade web applications, mobile products, and custom CRMs.",
  openGraph: {
    title: "About Our Software Studio",
    description:
      "Learn about VoiceAct Solutions, a senior software agency building production-grade web applications, mobile products, and custom CRMs.",
    type: "website",
    url: `${company.website}/about`,
  },
  alternates: {
    canonical: `${company.website}/about`,
  },
};

export default function Page() {
  const baseUrl = company.website.replace(/\/$/, "");
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "About", url: `${baseUrl}/about` },
  ]);

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${baseUrl}/about/#webpage`,
    url: `${baseUrl}/about`,
    name: "About Our Software Studio | VoiceAct Solutions",
    description: company.description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: company.name,
    },
    about: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: company.name,
      url: baseUrl,
      logo: `${baseUrl}/icon.png`,
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbsSchema, aboutPageSchema]} />
      <AboutPage />
    </>
  );
}

