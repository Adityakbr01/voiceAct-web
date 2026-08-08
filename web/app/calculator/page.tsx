"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Calculator, Sparkles, ArrowRight } from "lucide-react";
import { company } from "@/modules/company-data";

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
}

const serviceTypes: ServiceOption[] = [
  { id: "web", name: "Custom Web Application", basePrice: 1500 },
  { id: "mobile", name: "Mobile App (iOS & Android)", basePrice: 2500 },
  { id: "crm", name: "Custom CRM System", basePrice: 3000 },
  { id: "saas", name: "Full-Stack SaaS Platform", basePrice: 4000 },
];

const featureAddons = [
  { id: "auth", name: "User Authentication & RBAC", price: 300 },
  { id: "payments", name: "Stripe / Razorpay Payments & Invoicing", price: 500 },
  { id: "ai", name: "AI LLM / Chatbot Integration", price: 800 },
  { id: "cms", name: "Headless CMS Integration", price: 400 },
  { id: "analytics", name: "Custom Analytics & Reporting Dashboard", price: 600 },
];

export default function WebsiteCostCalculatorPage() {
  const [selectedType, setSelectedType] = useState<string>("web");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["auth", "payments"]);
  const [pagesCount, setPagesCount] = useState<number>(5);

  const selectedService = serviceTypes.find((s) => s.id === selectedType) || serviceTypes[0];
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = featureAddons.find((a) => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const estimatedMin = selectedService.basePrice + pagesCount * 100 + addonsTotal;
  const estimatedMax = Math.round(estimatedMin * 1.35);

  function toggleAddon(id: string) {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>

        <section className="max-w-4xl mx-auto px-6 md:px-10 pb-12 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Calculator className="size-3.5" aria-hidden />
            Interactive Lead Magnet Tool
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Software & Website Cost Estimator
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Get an instant, transparent project estimate for your web application, mobile app, or
            custom CRM build in under 60 seconds.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Type */}
            <div className="space-y-4">
              <h2 className="text-base font-bold tracking-tight">1. Select Project Type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 text-left border rounded-2xl transition-all cursor-pointer ${
                      selectedType === type.id
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-border/60 bg-card/40 hover:border-primary/40"
                    }`}
                  >
                    <p className="font-bold text-sm">{type.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Starting from ${type.basePrice}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Scope / Pages */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold tracking-tight">
                  2. Estimated Number of Screens / Pages
                </h2>
                <span className="text-sm font-bold text-primary">{pagesCount} screens</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={pagesCount}
                onChange={(e) => setPagesCount(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Addons */}
            <div className="space-y-4">
              <h2 className="text-base font-bold tracking-tight">3. Key Features & Integrations</h2>
              <div className="space-y-2">
                {featureAddons.map((addon) => (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-4 border rounded-2xl transition-all cursor-pointer ${
                      selectedAddons.includes(addon.id)
                        ? "border-primary bg-primary/10"
                        : "border-border/60 bg-card/40 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                        className="size-4 accent-primary rounded"
                      />
                      <span className="text-sm font-medium">{addon.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      +${addon.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Estimate Result Box */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-primary/40 bg-card/80 backdrop-blur space-y-6 sticky top-28">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="size-4" />
                Project Estimate
              </div>

              <div>
                <p className="text-3xl font-extrabold text-foreground">
                  ${estimatedMin.toLocaleString()} – ${estimatedMax.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated timeframe: {Math.max(2, Math.round(pagesCount * 0.4))} –{" "}
                  {Math.max(4, Math.round(pagesCount * 0.7))} weeks
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Full IP & Source Code Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Lighthouse 90+ Score & SEO Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>30-Day Post Launch Support</span>
                </div>
              </div>

              <Link
                href={`/contact?service=${selectedType}&estimate=${estimatedMin}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
              >
                Lock in Estimate & Book Call
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
