import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { AboutPage } from "@/modules/pages/about";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "About Our Software Studio",
  description:
    "VoiceAct Solutions — a senior software agency building production-grade web apps, mobile products, and custom CRMs.",
  keywords: [
    "about VoiceAct Solutions",
    "software development studio India",
    "senior engineers Bangalore",
    "Next.js agency about",
  ],
  openGraph: {
    title: "About Our Software Studio",
    description:
      "VoiceAct Solutions — a senior software agency building production-grade web apps, mobile products, and custom CRMs.",
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
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: company.name,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    about: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: company.name,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.png`,
      },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "p"],
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbsSchema, aboutPageSchema]} />
      <AboutPage />
    </>
  );
}
