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

  // ContactPage schema — helps Google understand this is a contact/lead page
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${baseUrl}/contact/#webpage`,
    url: `${baseUrl}/contact`,
    name: "Contact VoiceAct Solutions — Free Software Audit",
    description:
      "Claim a free 30-minute product audit and scoped development roadmap. No sales pressure — you keep the roadmap.",
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
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.state,
        postalCode: company.address.pincode,
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbsSchema, contactPageSchema]} />
      <ContactPage />
    </>
  );
}
