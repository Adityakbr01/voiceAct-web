"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Check, Copy, MessageSquare, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layouts/footer";
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
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance">
            Let&apos;s build your next{" "}
            <span className="text-primary italic font-display">extraordinary</span> app.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
            Have a project in mind, need a 30-minute product audit, or want to discuss custom AI
            workflows? Reach out to our senior studio team directly.
          </p>
        </section>

        {/* Direct Contact Methods */}
        <section className="px-6 md:px-10 pb-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Email Card */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 flex flex-col justify-between space-y-4">
              <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                <Mail className="size-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Direct Email
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
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>

            {/* Phone Card */}
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
              <span className="text-xs text-muted-foreground font-medium">
                Quick response guaranteed
              </span>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 flex flex-col justify-between space-y-4">
              <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-500/20 grid place-items-center text-blue-400">
                <MapPin className="size-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Studio Location
                </span>
                <p className="text-xs font-semibold text-foreground leading-relaxed">
                  {company.address.full}
                </p>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                Whitefield · Bengaluru · India
              </span>
            </div>

            {/* Working Hours Card */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 flex flex-col justify-between space-y-4">
              <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/20 grid place-items-center text-amber-400">
                <Clock className="size-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Studio Hours
                </span>
                <p className="text-xs font-semibold text-foreground leading-relaxed">
                  {company.hours.weekdays}
                </p>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                IST Timezone (UTC+5:30)
              </span>
            </div>
          </div>
        </section>

        {/* Embedded Interactive Contact & Audit Request Form */}
        <Cta />
      </main>
    </div>
  );
}
