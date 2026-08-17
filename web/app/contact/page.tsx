import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { ContactPage } from "@/modules/pages/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Contact Our Engineering Team",
  description:
    "Get in touch with VoiceAct Solutions. Claim your free 30-minute product audit and scoped development roadmap for your software project.",
  openGraph: {
    title: "Contact Our Engineering Team",
    description:
      "Get in touch with VoiceAct Solutions. Claim your free 30-minute product audit and scoped development roadmap for your software project.",
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

  return (
    <>
      <JsonLd data={[breadcrumbsSchema]} />
      <ContactPage />
    </>
  );
}
