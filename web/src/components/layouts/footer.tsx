"use client";

import { site, nav } from "@/modules/site";
import Grainient from "@/components/grainient";
import Ballpit from "@/components/ui/ballpit";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Fade from background into gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-transparent to-transparent h-60 pointer-events-none" />

      {/* Interactive Ballpit background layer */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <Ballpit
          count={40}
          gravity={0.3}
          friction={0.98}
          wallBounce={0.9}
          followCursor={false}
          colors={["#e9d5d5", "#A1A1AA", "#3F3F46", "#5227FF"]}
          ambientColor={16777215}
          ambientIntensity={2}
          minSize={0.7}
          maxSize={1.1}
        />
      </div>

      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#494349"
          color2="#5227FF"
          color3="#777777"
          timeSpeed={0.3}
          colorBalance={-0.33}
          warpStrength={1.0}
          warpFrequency={11.9}
          warpSpeed={4}
          warpAmplitude={24}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          centerX={0.1}
          centerY={0.0}
          zoom={0.9}
        />
      </div>
      <div className="relative z-10 px-6 py-16 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-xl font-semibold text-white">
              {site.name}
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/70">
              {site.tagline}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">
              {site.location}
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Contact
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block text-lg font-display font-medium italic text-white transition-colors hover:text-white/80"
            >
              {site.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 backdrop-blur-sm transition-colors hover:text-white hover:border-white/40"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <div>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
