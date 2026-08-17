"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/modules/home/components/section";
import type { Service } from "@/modules/services-data";
import { usePublicServices } from "@/hooks/use-public-cms";
import { useDeferredVisibility } from "@/hooks/use-deferred-visibility";

function getServiceHref(service: Service & { slug?: string }) {
  if (service.slug) return `/services/${service.slug}`;
  const titleLower = service.title.toLowerCase();
  if (titleLower.includes("web")) return "/services/web-development";
  if (titleLower.includes("mobile") || titleLower.includes("ios") || titleLower.includes("android"))
    return "/services/mobile-development";
  if (titleLower.includes("design") || titleLower.includes("ux")) return "/services/ui-ux-design";
  if (titleLower.includes("crm")) return "/services/custom-crm";
  if (titleLower.includes("mvp") || titleLower.includes("saas"))
    return "/services/saas-development";
  if (titleLower.includes("api") || titleLower.includes("backend"))
    return "/services/api-development";
  if (
    titleLower.includes("devops") ||
    titleLower.includes("cloud") ||
    titleLower.includes("maintenance")
  )
    return "/services/cloud-solutions";
  return `/services/${service.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    let rect = rectRef.current;
    if (!rect) {
      rect = card.getBoundingClientRect();
      rectRef.current = rect;
    }
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const Icon = service.icon;
  const isWide = service.span === "wide";
  const href = getServiceHref(service);

  return (
    <motion.article
      ref={cardRef}
      key={service.title}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      className={`
        group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card p-6
        transition-all duration-500 ease-out
        hover:-translate-y-1 hover:shadow-card hover:border-opacity-80
        md:p-7
        ${isWide ? "md:col-span-2" : ""}
      `}
    >
      <Link href={href} className="absolute inset-0 z-10" aria-label={`Explore ${service.title}`}>
        <span className="sr-only">Explore {service.title}</span>
      </Link>

      {/* Mouse-following glow (GPU CSS variable driven) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.color}22, transparent 70%)`,
        }}
      />

      {/* Soft orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full opacity-[0.08] blur-3xl transition-all duration-700 group-hover:opacity-[0.15] group-hover:scale-110"
        style={{ backgroundColor: service.color }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span
            className="inline-flex size-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-105 group-hover:rounded-xl"
            style={{
              backgroundColor: `${service.color}15`,
              color: service.color,
            }}
          >
            <Icon className="size-6" style={{ color: service.color }} />
          </span>
          <span
            className="mt-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{
              backgroundColor: `${service.color}10`,
              color: service.color,
            }}
          >
            {service.tag}
          </span>
        </div>

        <h3 className="mt-6 text-xl font-semibold leading-tight md:text-2xl">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
          {service.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <span className="size-1.5 rounded-full" style={{ backgroundColor: service.color }} />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-foreground/70 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span>Explore</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.article>
  );
}

export function Services() {
  const { ref, isNearViewport } = useDeferredVisibility<HTMLDivElement>();
  const { data: services = [] } = usePublicServices({ enabled: isNearViewport });

  return (
    <Section id="services">
      <div ref={ref}>
        <SectionHeader
          eyebrow="Services"
          title={
            <>
              One studio for the whole
              <span className="font-display italic tracking-tight text-primary">
                {" "}
                product surface.
              </span>
            </>
          }
          description="From first sketch to App Store launch — design, web, mobile, backend and DevOps, under one roof."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s: Service, i: number) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
