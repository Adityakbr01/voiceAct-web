import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { TermsPage } from "@/modules/pages/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for VoiceAct Solutions — IP, service deliverables, and client agreements.",
  openGraph: {
    title: "Terms & Conditions",
    description:
      "Terms and conditions for VoiceAct Solutions — IP, service deliverables, and client agreements.",
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
