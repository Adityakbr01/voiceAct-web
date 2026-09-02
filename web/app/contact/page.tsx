import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { ContactPage } from "@/modules/pages/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Contact Our Engineering Team",
  description:
    "Get in touch with VoiceAct Solutions. Claim a free 30-minute product audit and scoped development roadmap.",
  keywords: [
    "contact software development agency India",
    "hire Next.js developers",
    "free software audit",
    "VoiceAct contact",
  ],
  openGraph: {
    title: "Contact Our Engineering Team",
    description:
      "Get in touch with VoiceAct Solutions. Claim a free 30-minute product audit and scoped development roadmap.",
    type: "website",
    url: `${company.website}/contact`,
  },
  alternates: {
    canonical: `${company.website}/contact`,
  },
};

export default function Page() {
  const baseUrl = company.website.replace(/\/$/, "");
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Contact", url: `${baseUrl}/contact` },
  ]);

  // ContactPage schema — helps Google understand this is a contact/lead page.
  // No verified postal address exists — only Organization contact details are surfaced.
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${baseUrl}/contact/#webpage`,
    url: `${baseUrl}/contact`,
    name: `Contact ${company.name}`,
    description: `Get in touch with ${company.name} to discuss web development, mobile apps, UI/UX design, or custom digital solutions.`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
    },
    mainEntity: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: company.name,
      telephone: company.contact.phone,
      email: company.contact.email,
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbsSchema, contactPageSchema]} />
      <ContactPage />
    </>
  );
}
