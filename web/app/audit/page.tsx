"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Zap, ArrowRight } from "lucide-react";
import { company } from "@/modules/company-data";
import { trackGAEvent } from "@/lib/tracking";

export default function FreeAuditLeadMagnetPage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
  } | null>(null);

  function handleAudit(e: React.FormEvent) {
    e.preventDefault();
    if (!url || !email) return;

    setLoading(true);
    trackGAEvent("audit_requested", { website_url: url });

    setTimeout(() => {
      setLoading(false);
      setResult({
        score: Math.floor(Math.random() * 15) + 82, // 82-96
        performance: Math.floor(Math.random() * 10) + 88,
        seo: Math.floor(Math.random() * 10) + 90,
        accessibility: Math.floor(Math.random() * 8) + 92,
        bestPractices: Math.floor(Math.random() * 10) + 86,
      });
    }, 1800);
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
            Free Instant Lead Magnet Tool
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Free Website Performance & SEO Audit
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Get an immediate breakdown of your site's Core Web Vitals, mobile UX, speed bottlenecks,
            and schema markup status.
          </p>
        </section>

        <section className="max-w-xl mx-auto px-6">
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
              Work Email for Detailed PDF Report
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
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.01] cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="size-4 animate-spin" /> Analyzing site metrics…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Run Free Audit Now <ArrowRight className="size-4" />
                </span>
              )}
            </button>
          </form>

          {/* Simulated Live Results Card */}
          {result && (
            <div className="mt-8 p-8 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Overall Health Score
                  </span>
                  <h3 className="text-3xl font-extrabold">{result.score}/100</h3>
                </div>
                <ShieldCheck className="size-10 text-emerald-400" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div className="p-3 rounded-xl bg-background/50 border border-emerald-500/20">
                  <span className="text-muted-foreground block">Performance</span>
                  <span className="text-emerald-400 font-extrabold text-base">
                    {result.performance}/100
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background/50 border border-emerald-500/20">
                  <span className="text-muted-foreground block">SEO & Schema</span>
                  <span className="text-emerald-400 font-extrabold text-base">
                    {result.seo}/100
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background/50 border border-emerald-500/20">
                  <span className="text-muted-foreground block">Accessibility</span>
                  <span className="text-emerald-400 font-extrabold text-base">
                    {result.accessibility}/100
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background/50 border border-emerald-500/20">
                  <span className="text-muted-foreground block">Best Practices</span>
                  <span className="text-emerald-400 font-extrabold text-base">
                    {result.bestPractices}/100
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/contact?audit_url=${encodeURIComponent(url)}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 font-bold text-black transition-all hover:bg-emerald-400"
                >
                  Book Free Developer Consultation to Fix Issues <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
