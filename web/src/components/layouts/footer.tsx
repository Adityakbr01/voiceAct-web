"use client";

import { Component, useState, useEffect, useMemo, type ReactNode } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { company } from "@/modules/company-data";
import { site } from "@/modules/site";
import { listServices } from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import { useDeferredVisibility } from "@/hooks/use-deferred-visibility";
import { ThemeToggle } from "@/components/layouts/navbar/ThemeToggle";

const Grainient = dynamic(() => import("@/components/grainient"), { ssr: false });

interface SafeBallpitProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

class SafeBallpit extends Component<SafeBallpitProps> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    // Suppress WebGL error logs in environments without 3D canvas support
  }
  render() {
    return this.state.hasError ? (this.props.fallback ?? null) : this.props.children;
  }
}

function FooterEffects({ isMobile }: { isMobile: boolean }) {
  return (
    <>
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
    </>
  );
}

interface FooterLinkItem {
  label: string;
  href: string;
  badge?: {
    text: string;
    color: string;
  };
}

const staticFooterLinks: {
  company: FooterLinkItem[];
  hire: FooterLinkItem[];
  tools: FooterLinkItem[];
  locations: FooterLinkItem[];
  legal: FooterLinkItem[];
} = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "Blog", href: "/blog" },
    {
      label: "Portfolio",
      href: "/#work",
      badge: { text: "Soon", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30" },
    },
    {
      label: "Careers",
      href: "/about#contact",
      badge: { text: "Soon", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
    },
  ],
  hire: [
    {
      label: "Hire Developers",
      href: "/hire",
      badge: { text: "Vetted", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    },
    { label: "React Developers", href: "/hire/react-developers" },
    { label: "Next.js Developers", href: "/hire/nextjs-developers" },
    { label: "Mobile Developers", href: "/hire/react-native-developers" },
    { label: "AI Engineers", href: "/hire/ai-engineers" },
  ],
  tools: [
    {
      label: "Cost Estimator",
      href: "/calculator",
      badge: { text: "Tool", color: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
    },
    {
      label: "Free Site Audit",
      href: "/audit",
      badge: { text: "Free", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
    },
    { label: "CRM vs ERP Guide", href: "/compare/crm-vs-erp" },
    { label: "Next.js vs React", href: "/compare/nextjs-vs-react" },
  ],
  locations: [
    { label: "Bangalore", href: "/location/bangalore/web-development" },
    { label: "Hyderabad", href: "/location/hyderabad/web-development" },
    { label: "Pune", href: "/location/pune/web-development" },
    { label: "Mumbai", href: "/location/mumbai/web-development" },
    { label: "Delhi NCR", href: "/location/delhi/web-development" },
  ],
  legal: [
    { label: "Privacy Policy", href: company.legal.privacyPolicyUrl },
    { label: "Terms & Conditions", href: company.legal.termsUrl },
    { label: "Cookie Policy", href: company.legal.cookiePolicyUrl },
    {
      label: "Contact",
      href: "/contact",
      badge: { text: "24/7", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
    },
  ],
};

export function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const { ref, isNearViewport } = useDeferredVisibility<HTMLElement>();

  // Fetch live active services from backend API
  const { data: activeServices = [] } = useQuery({
    queryKey: queryKeys.public.services,
    queryFn: listServices,
    enabled: isNearViewport,
  });

  const servicesList: FooterLinkItem[] = useMemo(() => {
    if (activeServices.length > 0) {
      return activeServices.map((s, idx) => ({
        label: s.title,
        href: s.slug ? `/services/${s.slug}` : "/#services",
        badge:
          idx === 0
            ? { text: "Popular", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" }
            : idx === 1
              ? { text: "New", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" }
              : undefined,
      }));
    }
    const defaultServices = [
      { label: "Web Development", slug: "web-development" },
      { label: "Mobile App Development", slug: "mobile-development" },
      { label: "SaaS Development", slug: "saas-development" },
      { label: "UI/UX Design", slug: "ui-ux-design" },
      { label: "AI Solutions", slug: "ai-solutions" },
      { label: "Cloud Solutions", slug: "cloud-solutions" },
    ];
    return defaultServices.map((s, idx) => ({
      label: s.label,
      href: `/services/${s.slug}`,
      badge:
        idx === 0
          ? { text: "Popular", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" }
          : idx === 1
            ? { text: "New", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" }
            : undefined,
    }));
  }, [activeServices]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-zinc-950 text-white">
      {/* Fade from background into gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-transparent to-transparent h-60 pointer-events-none" />

      {isNearViewport && <FooterEffects isMobile={isMobile} />}

      <div className="relative z-10 px-6 py-16 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 md:grid-cols-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-4">
            <div className="font-display text-xl font-semibold text-white">{company.name}</div>
            <p className="mt-3 max-w-sm text-sm text-white/70">{company.tagline}</p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>{company.address.full}</p>
              <p>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(company.contact.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
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

          {/* Company Links */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {staticFooterLinks.company.map((n) => (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    className="group nav-pill-flip inline-flex items-center overflow-hidden text-white/80 transition-colors hover:text-white"
                  >
                    <span className="nav-pill-flip-inner relative block h-[1.2em] leading-[1.2em] whitespace-nowrap group-hover:text-white">
                      <span className="nav-pill-flip-current relative block">{n.label}</span>
                      <span className="nav-pill-flip-next absolute inset-x-0 top-0 block">
                        {n.label}
                      </span>
                    </span>
                    {n.badge && (
                      <span
                        className={`ml-2 inline-flex items-center rounded-none border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${n.badge.color}`}
                      >
                        {n.badge.text}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hire Developers */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Hire Talent
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {staticFooterLinks.hire.map((h) => (
                <li key={h.label}>
                  <Link
                    href={h.href}
                    className="group nav-pill-flip inline-flex items-center overflow-hidden text-white/80 transition-colors hover:text-white"
                  >
                    <span className="nav-pill-flip-inner relative block h-[1.2em] leading-[1.2em] whitespace-nowrap group-hover:text-white">
                      <span className="nav-pill-flip-current relative block">{h.label}</span>
                      <span className="nav-pill-flip-next absolute inset-x-0 top-0 block">
                        {h.label}
                      </span>
                    </span>
                    {h.badge && (
                      <span
                        className={`ml-2 inline-flex items-center rounded-none border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${h.badge.color}`}
                      >
                        {h.badge.text}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Services
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {servicesList.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="group nav-pill-flip inline-flex items-center overflow-hidden text-white/80 transition-colors hover:text-white"
                  >
                    <span className="nav-pill-flip-inner relative block h-[1.2em] leading-[1.2em] whitespace-nowrap group-hover:text-white">
                      <span className="nav-pill-flip-current relative block">{s.label}</span>
                      <span className="nav-pill-flip-next absolute inset-x-0 top-0 block">
                        {s.label}
                      </span>
                    </span>
                    {s.badge && (
                      <span
                        className={`ml-2 inline-flex items-center rounded-none border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.badge.color}`}
                      >
                        {s.badge.text}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Asset Guides */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Tools & Guides
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {staticFooterLinks.tools.map((t) => (
                <li key={t.label}>
                  <Link
                    href={t.href}
                    className="group nav-pill-flip inline-flex items-center overflow-hidden text-white/80 transition-colors hover:text-white"
                  >
                    <span className="nav-pill-flip-inner relative block h-[1.2em] leading-[1.2em] whitespace-nowrap group-hover:text-white">
                      <span className="nav-pill-flip-current relative block">{t.label}</span>
                      <span className="nav-pill-flip-next absolute inset-x-0 top-0 block">
                        {t.label}
                      </span>
                    </span>
                    {t.badge && (
                      <span
                        className={`ml-2 inline-flex items-center rounded-none border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.badge.color}`}
                      >
                        {t.badge.text}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cities, Legal & Connect Social Section */}
        <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-12 pt-10">
          {/* Cities */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Target Cities
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-white/70">
              {staticFooterLinks.locations.map((loc) => (
                <Link
                  key={loc.label}
                  href={loc.href}
                  className="rounded-full border border-white/10 px-3 py-1 transition-colors hover:border-white/40 hover:text-white"
                >
                  {loc.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Legal & Policy
            </div>
            <ul className="space-y-2 text-sm">
              {staticFooterLinks.legal.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group nav-pill-flip inline-flex items-center overflow-hidden text-white/80 transition-colors hover:text-white"
                  >
                    <span className="nav-pill-flip-inner relative block h-[1.2em] leading-[1.2em] whitespace-nowrap group-hover:text-white">
                      <span className="nav-pill-flip-current relative block">{l.label}</span>
                      <span className="nav-pill-flip-next absolute inset-x-0 top-0 block">
                        {l.label}
                      </span>
                    </span>
                    {l.badge && (
                      <span
                        className={`ml-2 inline-flex items-center rounded-none border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${l.badge.color}`}
                      >
                        {l.badge.text}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Connect
            </div>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xl font-display font-medium italic text-white transition-colors hover:text-white/80"
            >
              {site.email}
            </a>
            <div className="flex flex-wrap gap-2.5">
              {site.socials.map((s: any, idx: number) => (
                <a
                  key={s.href + idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-none border border-white/20 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm transition-colors hover:text-white hover:border-white/40"
                >
                  <span>{s.label}</span>
                  {s.badge && (
                    <span
                      className={`inline-flex items-center rounded-none border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${s.badge.color}`}
                    >
                      {s.badge.text}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </div>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
