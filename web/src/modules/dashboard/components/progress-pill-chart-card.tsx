"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface ProgressPillChartCardProps {
  themeMode?: "dark" | "light";
}

const WEEK_DATA = [
  { label: "Mon", count: "56k", heights: ["40%", "30%", "20%"], isPeak: false },
  { label: "Tue", count: "42k", heights: ["38%", "24%", "0%"], isPeak: false },
  { label: "Wed", count: "68k", heights: ["28%", "26%", "24%"], isPeak: true },
  { label: "Thu", count: "44k", heights: ["45%", "20%", "0%"], isPeak: false },
  { label: "Fri", count: "52k", heights: ["38%", "24%", "0%"], isPeak: false },
];

const MONTH_DATA = [
  { label: "W1", count: "240k", heights: ["30%", "25%", "20%"], isPeak: false },
  { label: "W2", count: "190k", heights: ["40%", "20%", "0%"], isPeak: false },
  { label: "W3", count: "310k", heights: ["35%", "30%", "25%"], isPeak: false },
  { label: "W4", count: "280k", heights: ["42%", "22%", "0%"], isPeak: false },
  { label: "W5", count: "350k", heights: ["32%", "30%", "28%"], isPeak: true },
];

export function ProgressPillChartCard({ themeMode = "dark" }: ProgressPillChartCardProps) {
  const isDark = themeMode === "dark";
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const currentData = timeframe === "week" ? WEEK_DATA : MONTH_DATA;

  // GSAP Pill Bar Growth Animation on mount and whenever timeframe changes
  useGSAP(
    () => {
      if (!chartContainerRef.current) return;
      const bars = chartContainerRef.current.querySelectorAll(".pill-bar-container");
      const tags = chartContainerRef.current.querySelectorAll(".pill-bar-tag");

      const tl = gsap.timeline({ defaults: { ease: "back.out(1.2)" } });

      tl.fromTo(
        bars,
        { scaleY: 0, opacity: 0, transformOrigin: "bottom center" },
        { scaleY: 1, opacity: 1, duration: 0.55, stagger: 0.07 },
      ).fromTo(
        tags,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 },
        "-=0.2",
      );
    },
    { scope: chartContainerRef, dependencies: [timeframe] },
  );

  return (
    <div
      ref={chartContainerRef}
      className={`sm:px-8 sm:py-7 flex flex-col rounded-3xl pt-6 pr-6 pb-6 pl-6 font-['Space_Grotesk',sans-serif] transition-all duration-300 ${
        isDark ? "bg-[#15181E] text-[#F4F2F2]" : "bg-[#d6f14a] text-slate-900"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className={`text-xl sm:text-2xl tracking-tight font-bold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}
          >
            {timeframe === "week" ? "Weekly Visitor Traffic" : "Monthly Visitor Growth"}
          </h2>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-700"}`}>
            {timeframe === "week"
              ? "Peak visitor engagement and activity flow across the week."
              : "Consolidated monthly visitor trajectory and acquisition spikes."}
          </p>
        </div>

        {/* Functionable Week / Month Toggle */}
        <div
          className={`inline-flex items-center gap-1.5 rounded-full p-1 border ${
            isDark ? "bg-[#212630] border-[#2A2F38]" : "bg-slate-900/10 border-slate-900/10"
          }`}
        >
          <button
            onClick={() => setTimeframe("week")}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 cursor-pointer ${
              timeframe === "week"
                ? isDark
                  ? "bg-[#d6f14a] text-slate-950 shadow-md shadow-[#d6f14a]/20"
                  : "bg-slate-900 text-[#d6f14a] shadow-sm"
                : isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-800 hover:text-slate-950"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 cursor-pointer ${
              timeframe === "month"
                ? isDark
                  ? "bg-[#d6f14a] text-slate-950 shadow-md shadow-[#d6f14a]/20"
                  : "bg-slate-900 text-[#d6f14a] shadow-sm"
                : isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-800 hover:text-slate-950"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col mt-4 justify-between">
        <div className="flex sm:gap-4 sm:h-44 h-40 gap-x-3 gap-y-3 items-end justify-between">
          {currentData.map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col gap-2 flex-1 items-center">
                <div className="relative w-9 sm:w-10 flex-1 flex items-end justify-center">
                  <div
                    className={`pill-bar-container flex flex-col overflow-hidden w-full h-32 rounded-full justify-end ${
                      isDark ? "bg-[#212630]" : "bg-black/30"
                    }`}
                  >
                    {item.heights[0] !== "0%" && (
                      <div className="bg-lime-400/40 w-full" style={{ height: item.heights[0] }} />
                    )}
                    {item.heights[1] !== "0%" && (
                      <div className="w-full bg-lime-400/60" style={{ height: item.heights[1] }} />
                    )}
                    {item.heights[2] && item.heights[2] !== "0%" && (
                      <div className="bg-lime-400/80 w-full" style={{ height: item.heights[2] }} />
                    )}
                  </div>

                  {/* Metric Tag */}
                  <div className="pill-bar-tag absolute -top-7 left-1/2 -translate-x-1/2">
                    {item.isPeak ? (
                      <div
                        className={`rounded-full text-[11px] font-bold px-2 py-0.5 flex items-center gap-1 font-mono shadow-sm ${
                          isDark ? "bg-[#d6f14a] text-slate-950" : "bg-slate-900 text-[#d6f14a]"
                        }`}
                      >
                        <span>{item.count}</span>
                      </div>
                    ) : (
                      <span
                        className={`text-[11px] font-bold font-mono ${
                          isDark ? "text-[#F4F2F2]" : "text-slate-900"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[11px] font-semibold ${
                    item.isPeak
                      ? isDark
                        ? "text-[#d6f14a] font-bold"
                        : "text-slate-950 font-bold"
                      : isDark
                        ? "text-slate-300"
                        : "text-slate-800"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {idx < currentData.length - 1 && (
                <div className="h-32 sm:h-36 flex items-stretch">
                  <div
                    className={`w-px h-full border-l border-dotted opacity-50 ${
                      isDark ? "border-slate-700" : "border-slate-900/30"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div
          className={`mt-5 flex items-center justify-between text-[11px] ${isDark ? "text-slate-300" : "text-slate-800"}`}
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
            <span>Peak Visitor Sessions</span>
          </div>
          <p className="font-medium">
            {timeframe === "week" ? "Daily Average: " : "Weekly Average: "}
            <span className="font-semibold font-mono">
              {timeframe === "week" ? "48.2k visitors" : "274k visitors"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
