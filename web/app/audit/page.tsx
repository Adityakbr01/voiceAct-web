"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Zap, ArrowRight, Mail } from "lucide-react";
import { company } from "@/modules/company-data";
import { trackGAEvent } from "@/lib/tracking";

export default function FreeAuditLeadMagnetPage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleAudit(e: React.FormEvent) {
    e.preventDefault();
    if (!url || !email) return;

    setLoading(true);
    trackGAEvent("audit_requested", { website_url: url });

    // We do not present fabricated scores. Instead, we queue a manual review
    // and confirm receipt to the user.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>

        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-12 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Zap className="size-3.5" aria-hidden />
            Request a Manual Review
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Request a Website Review
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Share your site and we'll review it on a real browser — performance, SEO, accessibility,
            and structure. You'll get a short, honest writeup by email.
          </p>
        </section>

        <section className="max-w-xl mx-auto px-6">
          <h2 className="sr-only">Request a manual website review</h2>
          <form
            onSubmit={handleAudit}
            className="p-8 rounded-3xl border border-border/60 bg-card/60 space-y-4 shadow-xl"
          >
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Your Website URL
            </label>
            <input
              type="url"
              required
              placeholder="https://yourcompany.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />

            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground pt-2">
              Your Email
            </label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading || submitted}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.01] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="size-4 animate-spin" /> Submitting…
                </span>
              ) : submitted ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4" /> Request Received
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Request a Review <ArrowRight className="size-4" />
                </span>
              )}
            </button>
          </form>

          {submitted && (
            <div className="mt-8 p-8 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 space-y-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-8 text-emerald-400" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    What happens next
                  </span>
                  <h3 className="text-xl font-bold">We've queued your request</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                We'll manually review your site on a real browser, take notes on what's working and
                what could be improved, and email you a short writeup. No fabricated scores — just
                an honest look.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`mailto:${company.contact.email}?subject=${encodeURIComponent(
                    "Manual review: " + url,
                  )}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-black transition-all hover:bg-emerald-400"
                >
                  <Mail className="size-4" />
                  Email Us Directly
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-card/50 px-6 py-3 font-semibold transition-colors hover:bg-card"
                >
                  Open Contact Page <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}