"use client";

import React, { useRef } from "react";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}
interface KPISummaryCardsProps {
  themeMode?: "dark" | "light";
  liveMetrics?: {
    visitors: number;
    sessions: number;
    inquiries: number;
    services?: number;
    projects?: number;
  };
}

export function KPISummaryCards({ themeMode = "dark", liveMetrics }: KPISummaryCardsProps) {
  const isDark = themeMode === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP Advanced Stagger Animation for Cards & Sparklines
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll(".kpi-card-item");
      const sparklines = sectionRef.current.querySelectorAll(".kpi-spark-path");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        cards,
        { opacity: 0, y: 24, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: {
            amount: 0.35,
            from: "start",
          },
        },
      );

      sparklines.forEach((path) => {
        const svgPath = path as SVGPathElement;
        const length = svgPath.getTotalLength ? svgPath.getTotalLength() : 120;
        gsap.fromTo(
          svgPath,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" },
        );
      });
    },
    { scope: sectionRef },
  );

  const kpiCards = [
    {
      id: "live-visitors",
      title: "Unique Visitors",
      value: (liveMetrics?.visitors ?? 0).toLocaleString(),
      numericValue: liveMetrics?.visitors ?? 0,
      periodLabel: "Live",
      badgeColor: isDark
        ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
        : "bg-blue-50 text-blue-700 border-blue-200",
      strokeColor: "#3b82f6",
      sparkline: [liveMetrics?.visitors ?? 0, liveMetrics?.visitors ?? 0],
    },
    {
      id: "live-sessions",
      title: "Total Sessions",
      value: (liveMetrics?.sessions ?? 0).toLocaleString(),
      numericValue: liveMetrics?.sessions ?? 0,
      periodLabel: "Live",
      badgeColor: isDark
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
        : "bg-emerald-50 text-emerald-700 border-emerald-200",
      strokeColor: "#10b981",
      sparkline: [liveMetrics?.sessions ?? 0, liveMetrics?.sessions ?? 0],
    },
    {
      id: "live-inquiries",
      title: "Contact Inquiries",
      value: (liveMetrics?.inquiries ?? 0).toLocaleString(),
      numericValue: liveMetrics?.inquiries ?? 0,
      periodLabel: "Live",
      badgeColor: isDark
        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
        : "bg-amber-50 text-amber-700 border-amber-200",
      strokeColor: "#f59e0b",
      sparkline: [liveMetrics?.inquiries ?? 0, liveMetrics?.inquiries ?? 0],
    },
    {
      id: "live-projects",
      title: "Portfolio Projects",
      value: (liveMetrics?.projects ?? 0).toLocaleString(),
      numericValue: liveMetrics?.projects ?? 0,
      periodLabel: "Live",
      badgeColor: isDark
        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
        : "bg-cyan-50 text-cyan-700 border-cyan-200",
      strokeColor: "#06b6d4",
      sparkline: [liveMetrics?.projects ?? 0, liveMetrics?.projects ?? 0],
    },
    {
      id: "live-services",
      title: "Active Services",
      value: (liveMetrics?.services ?? 0).toLocaleString(),
      numericValue: liveMetrics?.services ?? 0,
      periodLabel: "Live",
      badgeColor: isDark
        ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
        : "bg-rose-50 text-rose-700 border-rose-200",
      strokeColor: "#f43f5e",
      sparkline: [liveMetrics?.services ?? 0, liveMetrics?.services ?? 0],
    },
  ];

  return (
    <section ref={sectionRef} className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <h2
          className={`text-lg font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
        >
          <Zap className="w-5 h-5 text-emerald-500" /> Key Performance Indicators (KPIs)
        </h2>
        <span className={`text-xs font-semibold ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>
          {kpiCards.length} metrics live
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {kpiCards.map((kpi) => {
          const maxSpark = Math.max(...kpi.sparkline);
          const minSpark = Math.min(...kpi.sparkline);
          const range = maxSpark - minSpark || 1;

          return (
            <div
              key={kpi.id}
              className={`kpi-card-item group relative p-6 rounded-none transition-all duration-300 flex flex-col justify-between border ${
                isDark
                  ? "bg-[#0a0a0a] border-[#1f1f1f] hover:bg-[#111111]"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}
                  >
                    {kpi.title}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-none border ${kpi.badgeColor}`}
                  >
                    {kpi.periodLabel}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span
                    className={`text-3xl font-extrabold tracking-tight font-mono ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
                  >
                    {kpi.value}
                  </span>
                </div>
              </div>

              {/* Enhanced SVG Sparkline */}
              <div
                className={`mt-5 pt-3.5 flex items-center justify-between border-t ${isDark ? "border-[#1f1f1f]" : "border-slate-100"}`}
              >
                <div className="w-28 h-7">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25">
                    <path
                      className="kpi-spark-path"
                      d={`M 0 ${25 - ((kpi.sparkline[0] - minSpark) / range) * 20} ${kpi.sparkline
                        .map(
                          (val, idx) =>
                            `L ${(idx * 100) / (kpi.sparkline.length - 1)} ${25 - ((val - minSpark) / range) * 20}`,
                        )
                        .join(" ")}`}
                      fill="none"
                      stroke={kpi.strokeColor}
                      strokeWidth="2.5"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    />
                  </svg>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}
                >
                  Live
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
