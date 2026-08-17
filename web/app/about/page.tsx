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

  return (
    <>
      <JsonLd data={[breadcrumbsSchema]} />
      <AboutPage />
    </>
  );
}
