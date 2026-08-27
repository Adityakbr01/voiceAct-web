import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { PrivacyPolicyPage } from "@/modules/pages/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How VoiceAct Solutions handles client data, analytics security, and protects your privacy rights.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "How VoiceAct Solutions handles client data, analytics security, and protects your privacy rights.",
    type: "website",
    url: `${company.website}/privacy-policy`,
  },
  alternates: {
    canonical: `${company.website}/privacy-policy`,
  },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
