import { Hero } from "@/modules/home/sections/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { getQAPageSchema } from "@/lib/seo/schema";
import { faqs } from "@/modules/services-data";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://voiceact.tech",
  },
};

const Services = dynamic(() => import("@/modules/home/sections/services").then((m) => m.Services));
const Work = dynamic(() => import("@/modules/home/sections/work").then((m) => m.Work));
const Process = dynamic(() => import("@/modules/home/sections/process").then((m) => m.Process));
const Stack = dynamic(() => import("@/modules/home/sections/stack"));
const Testimonials = dynamic(() =>
  import("@/modules/home/sections/testimonials").then((m) => m.Testimonials),
);
const Faq = dynamic(() => import("@/modules/home/sections/faq").then((m) => m.Faq));
const Cta = dynamic(() => import("@/modules/home/sections/cta").then((m) => m.Cta));

const qaSchema = getQAPageSchema(
  faqs.map((f) => ({
    question: f.q,
    answer: f.a,
  })),
);

export default function Home() {
  return (
    <>
      <JsonLd data={qaSchema} />
      <main
        id="main-content"
        className="relative min-h-screen overflow-x-clip bg-background text-foreground"
      >
        <Hero />
        <Services />
        <Work />
        <Process />
        <Stack />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
    </>
  );
}
