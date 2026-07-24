import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { PrivacyPolicyPage } from "@/modules/pages/privacy-policy";

export const metadata: Metadata = {
  title: `Privacy Policy — ${company.name}`,
  description: `Privacy policy for ${company.name}. Learn how we collect, use, and protect your personal information.`,
  openGraph: {
    title: `Privacy Policy — ${company.name}`,
    description: `Privacy policy for ${company.name}.`,
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
