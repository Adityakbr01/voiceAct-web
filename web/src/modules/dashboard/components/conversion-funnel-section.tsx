"use client";

import React, { useRef } from "react";
import { Target, Layers } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface FunnelStep {
  step: string;
  count: number;
  percentage: number;
  dropoffPercentage?: number;
  color?: string;
}

interface ConversionFunnelSectionProps {
  themeMode?: "dark" | "light";
  funnel?: FunnelStep[];
  contactsSummary?: { total: number; new: number; read: number; replied: number };
}

export function ConversionFunnelSection({
  themeMode = "dark",
  funnel = [],
  contactsSummary,
}: ConversionFunnelSectionProps) {
  const isDark = themeMode === "dark";
  const funnelRef = useRef<HTMLDivElement>(null);

  const defaultFunnel: FunnelStep[] = funnel.length
    ? funnel.map((step, idx) => ({
        ...step,
        dropoffPercentage: idx > 0 && funnel[idx - 1].count > 0
          ? Math.round(((funnel[idx - 1].count - step.count) / funnel[idx - 1].count) * 100)
          : 0,
        color: idx === 0 ? "#3b82f6" : idx === 1 ? "#06b6d4" : "#10b981",
      }))
    : [
        { step: "Sessions", count: 0, percentage: 100, color: "#3b82f6" },
        { step: "Engaged (2+ pages)", count: 0, percentage: 0, color: "#06b6d4" },
        { step: "Contact submitted", count: contactsSummary?.total ?? 0, percentage: 0, color: "#10b981" },
      ];

  const leadMetrics = [
    { title: "Total Inquiries", count: contactsSummary?.total ?? 0 },
    { title: "New Messages", count: contactsSummary?.new ?? 0 },
    { title: "Read Inquiries", count: contactsSummary?.read ?? 0 },
    { title: "Replied Inquiries", count: contactsSummary?.replied ?? 0 },
  ];

  // GSAP animation for funnel step bars fill expansion
  useGSAP(
    () => {
      if (!funnelRef.current) return;
      const bars = funnelRef.current.querySelectorAll(".funnel-bar-fill");
      gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" }
      );
    },
    { scope: funnelRef }
  );

  return (
    <section ref={funnelRef} className="grid grid-cols-1 xl:grid-cols-3 gap-6 font-sans">
      {/* Lead Metrics Cards */}
      <div className={`xl:col-span-1 p-7 rounded-none space-y-5 border shadow-sm ${
        isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
          isDark ? "text-[#ededed]" : "text-slate-900"
        }`}>
          <Target className="w-5 h-5 text-emerald-500" /> Lead Generation Metrics
        </h2>
        <p className={`text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>Real contact submissions from website.</p>

        <div className="grid grid-cols-2 gap-4 pt-2">
          {leadMetrics.map((metric) => (
            <div key={metric.title} className={`p-4 rounded-none border ${
              isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-50 border-slate-200"
            }`}>
              <span className={`text-[11px] font-bold block ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}>{metric.title}</span>
              <span className={`text-2xl font-extrabold font-mono mt-1.5 block ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{metric.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Conversion Funnel */}
      <div className={`xl:col-span-2 p-7 rounded-none space-y-6 border shadow-sm ${
        isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
      }`}>
        <div>
          <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
            isDark ? "text-[#ededed]" : "text-slate-900"
          }`}>
            <Layers className="w-5 h-5 text-blue-500" /> End-to-End Conversion Funnel
          </h2>
          <p className={`text-xs mt-1 ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>Live visitor conversion progression and drop-off analysis.</p>
        </div>

        <div className="space-y-4">
          {defaultFunnel.map((step, idx) => (
            <div key={step.step} className={`p-4 rounded-none border space-y-2.5 ${
              isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center justify-between text-xs">
                <span className={`font-bold ${isDark ? "text-[#ededed]" : "text-slate-800"}`}>{step.step}</span>
                <div className="flex items-center gap-3">
                  <span className={`font-mono font-bold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{step.count.toLocaleString()}</span>
                  <span className={`font-bold font-mono ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{step.percentage}%</span>
                  {idx > 0 && step.dropoffPercentage !== undefined && (
                    <span className="text-[10px] text-red-400 font-mono font-semibold">(-{step.dropoffPercentage}%)</span>
                  )}
                </div>
              </div>
              <div className={`w-full rounded-none h-3.5 overflow-hidden border ${
                isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-slate-200 border-slate-300"
              }`}>
                <div
                  className="funnel-bar-fill h-full rounded-none transition-all duration-500"
                  style={{ width: `${Math.max(3, step.percentage)}%`, backgroundColor: step.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
