import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { TermsPage } from "@/modules/pages/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions for VoiceAct Solutions. Intellectual property terms, service deliverables, and client agreements.",
  openGraph: {
    title: "Terms & Conditions",
    description:
      "Review the terms and conditions for VoiceAct Solutions. Intellectual property terms, service deliverables, and client agreements.",
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
