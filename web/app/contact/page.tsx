import type { Metadata } from "next";
import { company } from "@/modules/company-data";
import { ContactPage } from "@/modules/pages/contact";

export const metadata: Metadata = {
  title: `Contact Us — ${company.name}`,
  description: `Get in touch with ${company.name}. Request a free 30-minute product audit and scoped roadmap for your web or mobile app project.`,
  openGraph: {
    title: `Contact Us — ${company.name}`,
    description: `Get in touch with ${company.name}. Request a free 30-minute product audit and scoped roadmap for your web or mobile app project.`,
    type: "website",
    url: `${company.website}/contact`,
  },
  alternates: {
    canonical: `${company.website}/contact`,
  },
};

export default function Page() {
  return <ContactPage />;
}
