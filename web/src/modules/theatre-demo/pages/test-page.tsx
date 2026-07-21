"use client";

import { TheatreDemoButton } from "../components/theatre-demo-button";

export default function TestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Theatre Demo</h1>

      <div className="flex flex-col items-center gap-6">
        <TheatreDemoButton label="Get Started" />
        <TheatreDemoButton label="Learn More" className="bg-secondary text-secondary-foreground" />
        <TheatreDemoButton label="Contact Us" className="bg-foreground text-background" />
      </div>
    </main>
  );
}
