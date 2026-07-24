import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { TermsPage } from "@/modules/pages/terms";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${company.name}`,
  description: `Terms and conditions for ${company.name} software development services.`,
  openGraph: {
    title: `Terms & Conditions — ${company.name}`,
    description: `Terms and conditions for ${company.name} software development services.`,
    type: "website",
    url: `${company.website}/terms-and-conditions`,
  },
  alternates: {
    canonical: `${company.website}/terms-and-conditions`,
  },
};

export default function Page() {
  return <TermsPage />;
}
