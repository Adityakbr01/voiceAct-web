"use client";

import React, { useRef } from "react";
import { FileText, Globe } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface LandingPagesGeoSectionProps {
  themeMode?: "dark" | "light";
  landingPages?: { _id: string; count: number }[];
  countries?: { _id: string; count: number }[];
}

export function LandingPagesGeoSection({
  themeMode = "dark",
  landingPages = [],
  countries = [],
}: LandingPagesGeoSectionProps) {
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
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans">
      {/* Top Landing Pages */}
      <div className={`p-6 rounded-none space-y-4 border ${
        isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
          isDark ? "text-[#ededed]" : "text-slate-900"
        }`}>
          <FileText className="w-5 h-5 text-white" /> Top Landing Pages
        </h2>

        <div className="overflow-x-auto rounded-none border border-[#1f1f1f]">
          <table className="w-full text-left text-xs">
            <thead className={`font-semibold text-[10px] uppercase ${
              isDark ? "bg-[#111111] text-[#a1a1a1]" : "bg-slate-100 text-slate-600"
            }`}>
              <tr>
                <th className="p-2.5">Landing Page</th>
                <th className="p-2.5 text-right">Views</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isDark ? "divide-[#1f1f1f] bg-[#0a0a0a]" : "divide-slate-100 bg-white"
            }`}>
              {landingPages.length === 0 ? (
                <tr>
                  <td colSpan={2} className={`p-4 text-center ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>
                    No landing pages recorded yet.
                  </td>
                </tr>
              ) : (
                landingPages.map((page) => (
                  <tr key={page._id} className={`landing-row transition ${isDark ? "hover:bg-[#111111]" : "hover:bg-slate-50"}`}>
                    <td className={`p-2.5 font-mono font-semibold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{page._id || "/"}</td>
                    <td className={`p-2.5 text-right font-mono ${isDark ? "text-[#ededed]" : "text-slate-700"}`}>{page.count.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geographic Breakdown */}
      <div className={`p-6 rounded-none space-y-4 border ${
        isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
          isDark ? "text-[#ededed]" : "text-slate-900"
        }`}>
          <Globe className="w-5 h-5 text-white" /> Geographic Analytics
        </h2>

        <div className="space-y-3">
          {countries.length === 0 ? (
            <div className={`p-4 text-center text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>
              No geographic data recorded yet.
            </div>
          ) : (
            countries.map((geo) => (
              <div key={geo._id} className={`geo-card-item p-3 rounded-none flex items-center justify-between text-xs transition-all duration-200 border ${
                isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-50 hover:bg-slate-100 border-slate-200"
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">🌐</span>
                  <div>
                    <span className={`font-semibold block ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{geo._id || "Unknown"}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-bold font-mono block ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{geo.count.toLocaleString()} visitors</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
