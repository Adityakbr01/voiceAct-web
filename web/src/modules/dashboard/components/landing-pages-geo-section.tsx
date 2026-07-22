"use client";

import React, { useRef } from "react";
import { FileText, Globe } from "lucide-react";
import { MOCK_LANDING_PAGES, MOCK_GEOGRAPHY } from "@/constants/analytics-mock-data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface LandingPagesGeoSectionProps {
  themeMode?: "dark" | "light";
}

export function LandingPagesGeoSection({ themeMode = "dark" }: LandingPagesGeoSectionProps) {
  const isDark = themeMode === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Stagger animations for Landing Pages & Geo Cards
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const rows = containerRef.current.querySelectorAll(".landing-row");
      const geoItems = containerRef.current.querySelectorAll(".geo-card-item");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        rows,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.05 }
      ).fromTo(
        geoItems,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.06 },
        "-=0.2"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-['Space_Grotesk',sans-serif]">
      {/* Top Landing Pages */}
      <div className={`p-6 rounded-3xl space-y-4 ${
        isDark ? "bg-[#15181E]" : "bg-white"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
          isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"
        }`}>
          <FileText className="w-5 h-5 text-cyan-500" /> Top Landing Pages
        </h2>

        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className={`font-semibold text-[10px] uppercase ${
              isDark ? "bg-[#212630] text-slate-400" : "bg-slate-100 text-slate-600"
            }`}>
              <tr>
                <th className="p-2.5">Landing Page</th>
                <th className="p-2.5">Visitors</th>
                <th className="p-2.5">Bounce Rate</th>
                <th className="p-2.5">Conversions</th>
                <th className="p-2.5">Conv. Rate</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isDark ? "divide-[#212630] bg-[#15181E]" : "divide-slate-100 bg-white"
            }`}>
              {MOCK_LANDING_PAGES.map((page) => (
                <tr key={page.path} className={`landing-row transition ${isDark ? "hover:bg-[#212630]/60" : "hover:bg-slate-50"}`}>
                  <td className={`p-2.5 font-mono font-semibold ${isDark ? "text-[#d6f14a]" : "text-lime-700"}`}>{page.path}</td>
                  <td className={`p-2.5 font-mono ${isDark ? "text-slate-300" : "text-slate-700"}`}>{page.visitors.toLocaleString()}</td>
                  <td className={`p-2.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{page.bounceRate}%</td>
                  <td className={`p-2.5 font-bold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{page.conversions}</td>
                  <td className="p-2.5 font-bold text-emerald-500">{page.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geographic Breakdown */}
      <div className={`p-6 rounded-3xl space-y-4 ${
        isDark ? "bg-[#15181E]" : "bg-white"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
          isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"
        }`}>
          <Globe className="w-5 h-5 text-amber-500" /> Geographic Analytics
        </h2>

        <div className="space-y-3">
          {MOCK_GEOGRAPHY.map((geo) => (
            <div key={geo.country} className={`geo-card-item p-3 rounded-2xl flex items-center justify-between text-xs transition-all duration-200 ${
              isDark ? "bg-[#212630]" : "bg-slate-50 hover:bg-slate-100"
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-lg">{geo.flag}</span>
                <div>
                  <span className={`font-semibold block ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{geo.country}</span>
                  <span className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{geo.city}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold font-mono block ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{geo.visitors.toLocaleString()} visitors</span>
                <span className="text-[10px] text-emerald-500 font-mono">${geo.revenue.toLocaleString()} revenue</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
