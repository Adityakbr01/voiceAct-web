import type { Metadata } from "next";
import { company } from "@/modules/company-data";

export const metadata: Metadata = {
  title: "Software Project Cost Estimator",
  description:
    "Estimate your custom software development cost. Instant price breakdown for web apps, mobile applications, custom CRMs, and SaaS MVPs.",
  alternates: {
    canonical: `${company.website}/calculator`,
  },
  openGraph: {
    title: "Software Project Cost Estimator",
    description:
      "Estimate your custom software development cost. Instant price breakdown for web apps, mobile apps, custom CRMs, and SaaS MVPs.",
    url: `${company.website}/calculator`,
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
