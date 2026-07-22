"use client";

import React from "react";
import { Monitor, Globe, Smartphone } from "lucide-react";
import { MOCK_TECH_DATA } from "@/constants/analytics-mock-data";

interface TechDeviceSectionProps {
  themeMode?: "dark" | "light";
}

export function TechDeviceSection({ themeMode = "dark" }: TechDeviceSectionProps) {
  const isDark = themeMode === "dark";

  const sanitizedOS = MOCK_TECH_DATA.operatingSystems.map((item) => ({
    ...item,
    color: item.color.toLowerCase().includes("purple") || item.color === "#a855f7" ? "#3b82f6" : item.color,
  }));

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 font-['Space_Grotesk',sans-serif]">
      {/* Device Types */}
      <div className={`p-5 rounded-3xl space-y-4 ${
        isDark ? "bg-[#15181E]" : "bg-white"
      }`}>
        <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"}`}>
          <Monitor className="w-4 h-4 text-blue-500" /> Device Distribution
        </h3>
        <div className="space-y-3 pt-2">
          {MOCK_TECH_DATA.deviceTypes.map((item) => (
            <div key={item.type} className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className={isDark ? "text-slate-300" : "text-slate-700"}>{item.type}</span>
                <span className="text-lime-600 font-mono">{item.percentage}%</span>
              </div>
              <div className={`w-full rounded-full h-2 ${isDark ? "bg-[#212630]" : "bg-slate-100"}`}>
                <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browsers */}
      <div className={`p-5 rounded-3xl space-y-4 ${
        isDark ? "bg-[#15181E]" : "bg-white"
      }`}>
        <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"}`}>
          <Globe className="w-4 h-4 text-emerald-500" /> Browsers
        </h3>
        <div className="space-y-3 pt-2">
          {MOCK_TECH_DATA.browsers.map((item) => (
            <div key={item.name} className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className={isDark ? "text-slate-300" : "text-slate-700"}>{item.name}</span>
                <span className="text-emerald-500 font-mono">{item.percentage}%</span>
              </div>
              <div className={`w-full rounded-full h-2 ${isDark ? "bg-[#212630]" : "bg-slate-100"}`}>
                <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operating Systems */}
      <div className={`p-5 rounded-3xl space-y-4 ${
        isDark ? "bg-[#15181E]" : "bg-white"
      }`}>
        <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"}`}>
          <Smartphone className="w-4 h-4 text-cyan-500" /> Operating Systems
        </h3>
        <div className="space-y-3 pt-2">
          {sanitizedOS.map((item) => (
            <div key={item.name} className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className={isDark ? "text-slate-300" : "text-slate-700"}>{item.name}</span>
                <span className="text-cyan-500 font-mono">{item.percentage}%</span>
              </div>
              <div className={`w-full rounded-full h-2 ${isDark ? "bg-[#212630]" : "bg-slate-100"}`}>
                <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
