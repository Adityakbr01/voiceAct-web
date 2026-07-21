import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { NavBar } from "@/components/nav-bar";
import { Hero } from "@/components/sections/hero";
import AuroraBackgroundDemo from "@/components/aurora-background-demo";

// Lazy-load below-the-fold sections to shrink the initial JS payload
// and improve Lighthouse LCP / TBT.
const Showcase = lazy(() =>
  import("@/components/sections/showcase").then((m) => ({ default: m.Showcase })),
);
const Services = lazy(() =>
  import("@/components/sections/services").then((m) => ({ default: m.Services })),
);
const Work = lazy(() => import("@/components/sections/work").then((m) => ({ default: m.Work })));
const Process = lazy(() =>
  import("@/components/sections/process").then((m) => ({ default: m.Process })),
);
const Stack = lazy(() => import("@/components/sections/stack").then((m) => ({ default: m.Stack })));
const Craft = lazy(() => import("@/components/sections/craft").then((m) => ({ default: m.Craft })));
const Testimonials = lazy(() =>
  import("@/components/sections/testimonials").then((m) => ({ default: m.Testimonials })),
);
const Faq = lazy(() => import("@/components/sections/faq").then((m) => ({ default: m.Faq })));
const Cta = lazy(() => import("@/components/sections/cta").then((m) => ({ default: m.Cta })));
const Footer = lazy(() =>
  import("@/components/sections/footer").then((m) => ({ default: m.Footer })),
);

export const Route = createFileRoute("/")({
  component: Index,
});

function DeferredBlock({
  children,
  minH = "min-h-[40vh]",
}: {
  children: React.ReactNode;
  minH?: string;
}) {
  // content-visibility: auto lets the browser skip rendering off-screen work.
  return <div className={`cv-auto ${minH}`}>{children}</div>;
}

function Index() {
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
