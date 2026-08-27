import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { CookiePolicyPage } from "@/modules/pages/cookie-policy";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How VoiceAct Solutions uses cookies and tracking to ensure site functionality and performance.",
  openGraph: {
    title: "Cookie Policy",
    description:
      "How VoiceAct Solutions uses cookies and tracking to ensure site functionality and performance.",
    type: "website",
    url: `${company.website}/cookie-policy`,
  },
  alternates: {
    canonical: `${company.website}/cookie-policy`,
  },
};

export default function Page() {
  return <CookiePolicyPage />;
}
