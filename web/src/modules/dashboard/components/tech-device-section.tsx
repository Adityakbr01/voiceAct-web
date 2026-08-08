"use client";

import React from "react";
import { Monitor, Globe, Smartphone } from "lucide-react";

interface TechDeviceSectionProps {
  themeMode?: "dark" | "light";
  devices?: { _id: string; count: number }[];
  browsers?: { _id: string; count: number }[];
}

export function TechDeviceSection({
  themeMode = "dark",
  devices = [],
  browsers = [],
}: TechDeviceSectionProps) {
  const isDark = themeMode === "dark";

  const totalDevices = devices.reduce((sum, item) => sum + item.count, 0) || 1;
  const totalBrowsers = browsers.reduce((sum, item) => sum + item.count, 0) || 1;

  const deviceList = devices.length
    ? devices.map((d) => ({
        type: d._id || "Desktop",
        percentage: Math.round((d.count / totalDevices) * 100),
        count: d.count,
        color: isDark ? "#ffffff" : "#000000",
      }))
    : [
        {
          type: "Desktop / Mobile",
          percentage: 100,
          count: 0,
          color: isDark ? "#ffffff" : "#000000",
        },
      ];

  const browserList = browsers.length
    ? browsers.map((b) => ({
        name: b._id || "Unknown Browser",
        percentage: Math.round((b.count / totalBrowsers) * 100),
        count: b.count,
        color: isDark ? "#ffffff" : "#000000",
      }))
    : [
        {
          name: "Modern Browser",
          percentage: 100,
          count: 0,
          color: isDark ? "#ffffff" : "#000000",
        },
      ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      {/* Device Types */}
      <div
        className={`p-5 rounded-none space-y-4 border ${
          isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
        }`}
      >
        <h3
          className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
        >
          <Monitor className="w-4 h-4 text-white" /> Device Distribution
        </h3>
        <div className="space-y-3 pt-2">
          {deviceList.map((item) => (
            <div key={item.type} className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className={isDark ? "text-[#ededed]" : "text-slate-700"}>{item.type}</span>
                <span className={`font-mono ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>
                  {item.percentage}%
                </span>
              </div>
              <div
                className={`w-full rounded-none h-2 border ${isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-100 border-slate-200"}`}
              >
                <div
                  className="h-full rounded-none"
                  style={{
                    width: `${Math.max(3, item.percentage)}%`,
                    backgroundColor: isDark ? "#ffffff" : "#000000",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browsers */}
      <div
        className={`p-5 rounded-none space-y-4 border ${
          isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
        }`}
      >
        <h3
          className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
        >
          <Globe className="w-4 h-4 text-white" /> Browsers
        </h3>
        <div className="space-y-3 pt-2">
          {browserList.map((item) => (
            <div key={item.name} className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className={isDark ? "text-[#ededed]" : "text-slate-700"}>{item.name}</span>
                <span className={`font-mono ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>
                  {item.percentage}%
                </span>
              </div>
              <div
                className={`w-full rounded-none h-2 border ${isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-100 border-slate-200"}`}
              >
                <div
                  className="h-full rounded-none"
                  style={{
                    width: `${Math.max(3, item.percentage)}%`,
                    backgroundColor: isDark ? "#ffffff" : "#000000",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
