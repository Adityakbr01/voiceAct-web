import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { AboutPage } from "@/modules/pages/about";

export const metadata: Metadata = {
  title: `About Us — ${company.name}`,
  description: `Learn about ${company.name}, a software development agency building production-grade web and mobile applications.`,
  openGraph: {
    title: `About Us — ${company.name}`,
    description: `Learn about ${company.name}, a software development agency building production-grade web and mobile applications.`,
    type: "website",
    url: `${company.website}/about`,
  },
  alternates: {
    canonical: `${company.website}/about`,
  },
};

export default function Page() {
  return <AboutPage />;
}
