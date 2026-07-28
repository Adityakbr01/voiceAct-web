"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/modules/home/sections/hero";

const Showcase = dynamic(() => import("@/modules/home/sections/showcase").then(m => m.Showcase));
const Services = dynamic(() => import("@/modules/home/sections/services").then(m => m.Services));
const Work = dynamic(() => import("@/modules/home/sections/work").then(m => m.Work));
const Process = dynamic(() => import("@/modules/home/sections/process").then(m => m.Process));
const Stack = dynamic(() => import("@/modules/home/sections/Stack"));
const Testimonials = dynamic(() => import("@/modules/home/sections/testimonials").then(m => m.Testimonials));
const Faq = dynamic(() => import("@/modules/home/sections/faq").then(m => m.Faq));
const Cta = dynamic(() => import("@/modules/home/sections/cta").then(m => m.Cta));

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
    >
      <Hero />
      <Showcase />
      <Services />
      <Work />
      <Process />
      <Stack />
      <Testimonials />
      <Faq />
      <Cta />
    </main>
  );
}
