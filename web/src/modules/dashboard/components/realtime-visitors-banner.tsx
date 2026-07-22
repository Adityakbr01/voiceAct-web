"use client";

import React from "react";
import { Activity, Clock } from "lucide-react";
import { MOCK_REALTIME_VISITORS } from "@/constants/analytics-mock-data";

interface RealtimeVisitorsBannerProps {
  realtimeCount: number;
  themeMode?: "dark" | "light";
}

export function RealtimeVisitorsBanner({ realtimeCount, themeMode = "dark" }: RealtimeVisitorsBannerProps) {
  const isDark = themeMode === "dark";
  const latestSession = MOCK_REALTIME_VISITORS[0];

  return (
    <section className={`relative overflow-hidden rounded-2xl p-5 font-['Space_Grotesk',sans-serif] ${
      isDark ? "bg-[#15181E]" : "bg-white"
    }`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20" />
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-extrabold tracking-tight font-mono ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{realtimeCount}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active Visitors Now
              </span>
            </div>
            <p className={`text-xs mt-1 font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>Live tracking visitor activity across product landing pages.</p>
          </div>
        </div>

        {/* Live Feed Ticker */}
        <div className={`flex items-center gap-4 text-xs p-3 rounded-xl ${
          isDark ? "bg-[#0F1115]" : "bg-slate-100"
        }`}>
          <span className={`font-medium flex items-center gap-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            <Clock className="w-3.5 h-3.5 text-lime-600" /> Latest Session:
          </span>
          <span className={`font-semibold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>
            {latestSession.flag} {latestSession.currentPage}
          </span>
          <span className="text-slate-400">via</span>
          <span className={`px-2 py-0.5 rounded font-medium ${isDark ? "bg-[#212630] text-slate-300" : "bg-white text-slate-700"}`}>{latestSession.source}</span>
        </div>
      </div>
    </section>
  );
}
