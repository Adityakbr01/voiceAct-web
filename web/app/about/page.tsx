import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { AboutPage } from "@/modules/pages/about";

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
  return <AboutPage />;
}
