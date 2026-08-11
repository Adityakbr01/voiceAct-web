import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { PrivacyPolicyPage } from "@/modules/pages/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy for VoiceAct Solutions. Learn how we handle client data, analytics security, and protect your privacy rights.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "Read the privacy policy for VoiceAct Solutions. Learn how we handle client data and protect your privacy rights.",
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
