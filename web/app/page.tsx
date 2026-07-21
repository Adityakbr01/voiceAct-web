"use client";

import { NavBar } from "@/modules/home/components/nav-bar";
import { Hero } from "@/modules/home/sections/hero";
import { Showcase } from "@/modules/home/sections/showcase";
import { Services } from "@/modules/home/sections/services";
import { Work } from "@/modules/home/sections/work";
import { Process } from "@/modules/home/sections/process";
import { Stack } from "@/modules/home/sections/stack";
import { Craft } from "@/modules/home/sections/craft";
import { Testimonials } from "@/modules/home/sections/testimonials";
import { Faq } from "@/modules/home/sections/faq";
import { Cta } from "@/modules/home/sections/cta";
import { Footer } from "@/modules/home/sections/footer";

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
    >
      <NavBar />
      <Hero />
      <Showcase />
      <Services />
      <Work />
      <Process />
      <Stack />
      <Craft />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
