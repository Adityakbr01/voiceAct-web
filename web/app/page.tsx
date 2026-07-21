"use client";

import { lazy, Suspense } from "react";

import { NavBar } from "@/modules/home/components/nav-bar";
import { Hero } from "@/modules/home/sections/hero";

// Lazy-load below-the-fold sections to shrink the initial JS payload
const Showcase = lazy(() =>
  import("@/modules/home/sections/showcase").then((m) => ({ default: m.Showcase })),
);
const Services = lazy(() =>
  import("@/modules/home/sections/services").then((m) => ({ default: m.Services })),
);
const Work = lazy(() => import("@/modules/home/sections/work").then((m) => ({ default: m.Work })));
const Process = lazy(() =>
  import("@/modules/home/sections/process").then((m) => ({ default: m.Process })),
);
const Stack = lazy(() =>
  import("@/modules/home/sections/stack").then((m) => ({ default: m.Stack })),
);
const Craft = lazy(() =>
  import("@/modules/home/sections/craft").then((m) => ({ default: m.Craft })),
);
const Testimonials = lazy(() =>
  import("@/modules/home/sections/testimonials").then((m) => ({ default: m.Testimonials })),
);
const Faq = lazy(() => import("@/modules/home/sections/faq").then((m) => ({ default: m.Faq })));
const Cta = lazy(() => import("@/modules/home/sections/cta").then((m) => ({ default: m.Cta })));
const Footer = lazy(() =>
  import("@/modules/home/sections/footer").then((m) => ({ default: m.Footer })),
);

function DeferredBlock({
  children,
  minH = "min-h-[40vh]",
}: {
  children: React.ReactNode;
  minH?: string;
}) {
  // ponytail: content-visibility: auto lets the browser skip rendering off-screen work
  return <div className={`cv-auto ${minH}`}>{children}</div>;
}

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
    >
      <NavBar />
      <Hero />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <DeferredBlock>
          <Showcase />
        </DeferredBlock>
        <DeferredBlock>
          <Services />
        </DeferredBlock>
        <DeferredBlock>
          <Work />
        </DeferredBlock>
        <DeferredBlock>
          <Process />
        </DeferredBlock>
        <DeferredBlock>
          <Stack />
        </DeferredBlock>
        <DeferredBlock>
          <Craft />
        </DeferredBlock>
        <DeferredBlock>
          <Testimonials />
        </DeferredBlock>
        <DeferredBlock>
          <Faq />
        </DeferredBlock>
        <DeferredBlock>
          <Cta />
        </DeferredBlock>
        <Footer />
      </Suspense>
    </main>
  );
}
