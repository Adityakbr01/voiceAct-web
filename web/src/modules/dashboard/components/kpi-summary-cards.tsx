"use client";

import React, { useRef } from "react";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";
import { MOCK_KPI_CARDS } from "@/constants/analytics-mock-data";
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
        }
      );

      sparklines.forEach((path) => {
        const svgPath = path as SVGPathElement;
        const length = svgPath.getTotalLength ? svgPath.getTotalLength() : 120;
        gsap.fromTo(
          svgPath,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }
        );
      });
    },
    { scope: sectionRef }
  );

  const liveCards = liveMetrics
    ? [
        {
          id: "live-visitors",
          title: "Unique Visitors",
          value: liveMetrics.visitors.toLocaleString(),
          numericValue: liveMetrics.visitors,
          change: 0,
          isPositive: true,
          periodLabel: "Live",
          sparkline: [liveMetrics.visitors, liveMetrics.visitors],
          category: "traffic" as const,
        },
        {
          id: "live-sessions",
          title: "Sessions",
          value: liveMetrics.sessions.toLocaleString(),
          numericValue: liveMetrics.sessions,
          change: 0,
          isPositive: true,
          periodLabel: "Live",
          sparkline: [liveMetrics.sessions, liveMetrics.sessions],
          category: "traffic" as const,
        },
        {
          id: "live-inquiries",
          title: "Contact Inquiries",
          value: liveMetrics.inquiries.toLocaleString(),
          numericValue: liveMetrics.inquiries,
          change: 0,
          isPositive: true,
          periodLabel: "Live",
          sparkline: [liveMetrics.inquiries, liveMetrics.inquiries],
          category: "lead" as const,
        },
      ]
    : [];

  const kpiCards = [...liveCards, ...MOCK_KPI_CARDS];

  return (
    <section ref={sectionRef} className="space-y-4 font-['Space_Grotesk',sans-serif]">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-extrabold tracking-tight flex items-center gap-2 ${isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"}`}>
          <Zap className="w-5 h-5 text-[#d6f14a]" /> Key Performance Indicators (KPIs)
        </h2>
        <span className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>13 metrics tracked</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const maxSpark = Math.max(...kpi.sparkline);
          const minSpark = Math.min(...kpi.sparkline);
          const range = maxSpark - minSpark || 1;

          return (
            <div
              key={kpi.id}
              className={`kpi-card-item group relative p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? "bg-[#15181E] hover:bg-[#181C22]"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {kpi.title}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      kpi.isPositive
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-rose-500/10 text-rose-500"
                    }`}
                  >
                    {kpi.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.change > 0 ? `+${kpi.change}%` : `${kpi.change}%`}
                  </span>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <span className={`text-2xl md:text-3xl font-extrabold tracking-tight font-mono ${isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"}`}>
                    {kpi.value}
                  </span>
                  <span className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>{kpi.periodLabel}</span>
                </div>
              </div>

              {/* Enhanced SVG Sparkline */}
              <div className="mt-4 pt-3 flex items-center justify-between">
                <div className="w-28 h-7">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25">
                    <path
                      className="kpi-spark-path"
                      d={`M 0 ${25 - ((kpi.sparkline[0] - minSpark) / range) * 20} ${kpi.sparkline
                        .map(
                          (val, idx) =>
                            `L ${(idx * 100) / (kpi.sparkline.length - 1)} ${25 - ((val - minSpark) / range) * 20}`
                        )
                        .join(" ")}`}
                      fill="none"
                      stroke={kpi.isPositive ? "#10B981" : "#EF4444"}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className={`text-[10px] font-mono font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>Trend</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
