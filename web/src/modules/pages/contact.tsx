"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Check,
  Copy,
  MessageSquare,
  MessageCircle,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Zap,
  FileCode2,
  CheckCircle2,
} from "lucide-react";
import { company } from "@/modules/company-data";
import { Cta } from "@/modules/home/sections/cta";

export function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(company.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>

        {/* Contact Hero */}
        <section className="px-6 md:px-10 pb-12 max-w-6xl mx-auto text-center space-y-4">
          <span className="glass inline-flex items-center gap-2 rounded-full border border-border/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <MessageSquare className="size-3.5 text-primary" aria-hidden />
            Direct Technical Inquiry
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance">
            Let&apos;s build your next{" "}
            <span className="text-primary italic font-display">extraordinary</span> software product.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
            Have a project in mind, need a 30-minute architecture review, or want to discuss custom SaaS
            and CRM workflows? Connect directly with our senior engineering team.
          </p>
        </section>

        {/* Direct Contact & Fast Action Channels */}
        <section className="px-6 md:px-10 pb-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Instant Meeting Booking Card */}
            <div className="p-6 rounded-2xl border border-primary/40 bg-primary/5 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                <Calendar className="size-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  Fastest Option
                </span>
                <p className="text-base font-bold text-foreground">
                  Book 20-Min Call
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition shadow"
              >
                <Zap className="size-3.5" />
                Schedule on Calendar
              </a>
              <span className="text-[11px] text-muted-foreground font-medium">
                Direct with Lead Architect
              </span>
            </div>

            {/* Direct Email */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 flex flex-col justify-between space-y-4">
              <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                <Mail className="size-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Direct Studio Email
                </span>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-base font-bold text-foreground hover:underline block truncate"
                >
                  {company.contact.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border/60 bg-background/60 hover:bg-background transition cursor-pointer text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {copied ? "Copied to Clipboard" : "Copy Email"}
              </button>
            </div>

            {/* WhatsApp Direct */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 flex flex-col justify-between space-y-4">
              <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center text-emerald-400">
                <Phone className="size-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Call / WhatsApp
                </span>
                <a
                  href={`tel:${company.contact.phone}`}
                  className="text-base font-bold text-foreground hover:underline block truncate"
                >
                  {company.contact.phone}
                </a>
              </div>
              <a
                href={`https://wa.me/${company.contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                  `Hi ${company.name}! I'd like to discuss an engineering project with your team.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition cursor-pointer"
              >
                <MessageCircle className="size-3.5" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Studio Hours & Location */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 flex flex-col justify-between space-y-4">
              <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-500/20 grid place-items-center text-blue-400">
                <MapPin className="size-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Studio Location
                </span>
                <p className="text-xs font-semibold text-foreground leading-relaxed">
                  {company.address.city}, {company.address.state}
                </p>
              </div>
              <span className="text-[11px] text-muted-foreground font-medium">
                IST Timezone · Mon–Sat (Response &lt; 4 Hours)
              </span>
            </div>
          </div>
        </section>

        {/* What Happens After You Contact Us */}
        <section className="px-6 md:px-10 pb-16 max-w-6xl mx-auto">
          <div className="rounded-3xl border border-border/60 bg-card/30 p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground text-center mb-8">
              What happens after you reach out?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-xs grid place-items-center">
                    01
                  </span>
                  <span className="font-bold text-sm text-foreground">Initial Review</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We analyze your requirements, tech stack, and goals within 4 business hours.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-xs grid place-items-center">
                    02
                  </span>
                  <span className="font-bold text-sm text-foreground">Discovery Call</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A 20-minute technical architecture call directly with our Lead Architect (zero sales pressure).
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-xs grid place-items-center">
                    03
                  </span>
                  <span className="font-bold text-sm text-foreground">Scoped Roadmap</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You receive a detailed technical roadmap with milestone estimates and deliverables within 24 hours.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs grid place-items-center">
                    04
                  </span>
                  <span className="font-bold text-sm text-foreground">Sprint Kickoff</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Production code starts shipping in week one with weekly demoable milestones and a dedicated Slack channel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Interactive Contact & Discovery Form */}
        <Cta />
      </main>
    </div>
  );
}
