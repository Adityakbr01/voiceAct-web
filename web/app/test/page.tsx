"use client";

import { Footer1 } from "@/modules/test-compo/components/Footer1";

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Footer Demo
        </h1>
      </div>
      <Footer1 />
    </div>
  );
}
