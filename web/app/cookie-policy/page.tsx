import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { CookiePolicyPage } from "@/modules/pages/cookie-policy";

export const metadata: Metadata = {
  title: `Cookie Policy — ${company.name}`,
  description: `Cookie policy for ${company.name}. Learn about the cookies we use and how to manage them.`,
  openGraph: {
    title: `Cookie Policy — ${company.name}`,
    description: `Cookie policy for ${company.name}.`,
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
