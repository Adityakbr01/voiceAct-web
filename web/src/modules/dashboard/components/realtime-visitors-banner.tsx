"use client";

import React from "react";
import { Activity } from "lucide-react";

interface RealtimeVisitorsBannerProps {
  realtimeCount: number;
  themeMode?: "dark" | "light";
}

export function RealtimeVisitorsBanner({
  realtimeCount,
  themeMode = "dark",
}: RealtimeVisitorsBannerProps) {
  const isDark = themeMode === "dark";

  return (
    <section
      className={`relative overflow-hidden rounded-none p-5 font-sans border ${
        isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-none bg-[#111111] border border-[#1f1f1f] text-white">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-white opacity-20" />
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-extrabold tracking-tight font-mono ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
              >
                {realtimeCount}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-none font-bold flex items-center gap-1.5 border ${
                  isDark
                    ? "bg-[#111111] border-[#1f1f1f] text-[#ededed]"
                    : "bg-slate-100 border-slate-300 text-slate-900"
                }`}
              >
                <span className="w-2 h-2 rounded-none bg-white animate-pulse" /> Active Sessions
              </span>
            </div>
            <p
              className={`text-xs mt-1 font-medium ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}
            >
              Live tracking active session count in past 5 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
