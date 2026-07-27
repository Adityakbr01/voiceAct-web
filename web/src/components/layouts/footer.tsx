"use client";

import { Component, useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { company } from "@/modules/company-data";
import { site } from "@/modules/site";

const Grainient = dynamic(() => import("@/components/grainient"), { ssr: false });
const Ballpit = dynamic(() => import("@/components/ui/ballpit"), { ssr: false });


interface SafeBallpitProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

class SafeBallpit extends Component<SafeBallpitProps> {
  state = { hasError: false };
  static getDerivedStateFromError(error: any) {
    console.error("SafeBallpit caught an error during render:", error);
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("SafeBallpit details:", error, errorInfo);
  }
  render() {
    return this.state.hasError ? (this.props.fallback ?? null) : this.props.children;
  }
}

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "Portfolio", href: "/#work" },
    { label: "Careers", href: "/about#contact" },
  ],
  services: company.services.map((s) => ({
    label: s,
    href: "/#services",
  })),
  legal: [
    { label: "Privacy Policy", href: company.legal.privacyPolicyUrl },
    { label: "Terms & Conditions", href: company.legal.termsUrl },
    { label: "Cookie Policy", href: company.legal.cookiePolicyUrl },
  ],
};

export function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-zinc-950 text-white">
      {/* Fade from background into gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-transparent to-transparent h-60 pointer-events-none" />

      {/* Interactive Ballpit background layer */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <SafeBallpit>
          <Ballpit
            count={isMobile ? 18 : 40}
            gravity={0.3}
            friction={0.98}
            wallBounce={0.9}
            followCursor={false}
            colors={["#e9d5d5", "#A1A1AA", "#3F3F46", "#5227FF"]}
            ambientColor={16777215}
            ambientIntensity={2}
            minSize={isMobile ? 1.5 : 0.7}
            maxSize={isMobile ? 2.5 : 1.1}
          />
        </SafeBallpit>
      </div>

      <div className="absolute inset-0 z-0">
        <SafeBallpit>
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
        </SafeBallpit>
      </div>

      <div className="relative z-10 px-6 py-16 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-12">
          {/* Company Info */}
          <div className="md:col-span-4">
            <div className="font-display text-xl font-semibold text-white">
              {company.name}
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/70">
              {company.tagline}
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>{company.address.full}</p>
              <p>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {company.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${company.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {company.contact.phone}
                </a>
              </p>
              <p className="text-xs text-white/50">{company.hours.weekdays}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.company.map((n) => (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Services
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Legal
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contact"
                  className="text-white/80 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Connect
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

        {/* Bottom bar */}
        <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <div>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
