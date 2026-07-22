"use client";

import React, { useRef } from "react";
import { Target, Layers } from "lucide-react";
import { MOCK_LEAD_METRICS, MOCK_CONVERSION_FUNNEL } from "@/constants/analytics-mock-data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface ConversionFunnelSectionProps {
  themeMode?: "dark" | "light";
}

export function ConversionFunnelSection({ themeMode = "dark" }: ConversionFunnelSectionProps) {
  const isDark = themeMode === "dark";
  const funnelRef = useRef<HTMLDivElement>(null);

  const sanitizedFunnel = MOCK_CONVERSION_FUNNEL.map((step) => ({
    ...step,
    color:
      step.color.toLowerCase() === "#a855f7" || step.color.toLowerCase().includes("purple")
        ? "#3b82f6"
        : step.color,
  }));

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
    <section ref={funnelRef} className="grid grid-cols-1 xl:grid-cols-3 gap-6 font-['Space_Grotesk',sans-serif]">
      {/* Lead Metrics Cards */}
      <div className={`xl:col-span-1 p-6 rounded-3xl space-y-4 ${
        isDark ? "bg-[#15181E]" : "bg-white"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
          isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"
        }`}>
          <Target className="w-5 h-5 text-cyan-500" /> Lead Generation Metrics
        </h2>
        <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Categorized lead attribution and status totals.</p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {MOCK_LEAD_METRICS.map((metric) => (
            <div key={metric.title} className={`p-3.5 rounded-2xl ${
              isDark ? "bg-[#212630]" : "bg-slate-50"
            }`}>
              <span className={`text-[11px] font-medium block ${isDark ? "text-slate-400" : "text-slate-500"}`}>{metric.title}</span>
              <span className={`text-xl font-extrabold font-mono mt-1 block ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{metric.count}</span>
              <span className="text-[10px] font-bold text-emerald-500 mt-1 block">+{metric.change}% vs prev</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Conversion Funnel */}
      <div className={`xl:col-span-2 p-6 rounded-3xl space-y-6 ${
        isDark ? "bg-[#15181E]" : "bg-white"
      }`}>
        <div>
          <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
            isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"
          }`}>
            <Layers className="w-5 h-5 text-lime-600" /> End-to-End Conversion Funnel
          </h2>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>7-step visitor conversion progression and drop-off analysis.</p>
        </div>

        <div className="space-y-3">
          {sanitizedFunnel.map((step, idx) => (
            <div key={step.step} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{step.step}</span>
                <div className="flex items-center gap-3">
                  <span className={`font-mono font-bold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{step.count.toLocaleString()}</span>
                  <span className="text-lime-600 font-semibold">{step.percentage}%</span>
                  {idx > 0 && <span className="text-[10px] text-rose-500 font-mono">(-{step.dropoffPercentage}%)</span>}
                </div>
              </div>
              <div className={`w-full rounded-full h-3 overflow-hidden ${
                isDark ? "bg-[#212630]" : "bg-slate-100"
              }`}>
                <div
                  className="funnel-bar-fill h-full rounded-full transition-all duration-500"
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
