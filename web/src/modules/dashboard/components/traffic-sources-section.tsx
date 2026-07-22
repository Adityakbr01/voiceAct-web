"use client";

import React from "react";
import { PieChart as PieIcon, Globe } from "lucide-react";
import { MOCK_TRAFFIC_SOURCES, MOCK_REFERRERS } from "@/constants/analytics-mock-data";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface TrafficSourcesSectionProps {
  themeMode?: "dark" | "light";
}

export function TrafficSourcesSection({ themeMode = "dark" }: TrafficSourcesSectionProps) {
  const isDark = themeMode === "dark";

  const sanitizedSources = MOCK_TRAFFIC_SOURCES.map((src) => ({
    ...src,
    color:
      src.color.toLowerCase() === "#a855f7" || src.color.toLowerCase().includes("purple")
        ? "#3b82f6"
        : src.color,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-['Space_Grotesk',sans-serif]">
      {/* Doughnut Chart & Table */}
      <div className={`lg:col-span-2 p-6 rounded-3xl space-y-6 ${
        isDark ? "bg-[#15181E]" : "bg-white"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"}`}>
          <PieIcon className="w-5 h-5 text-emerald-500" /> Traffic Sources Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sanitizedSources} dataKey="visitors" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {sanitizedSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{
                  backgroundColor: isDark ? "#0F1115" : "#FFFFFF",
                  border: "none",
                  borderRadius: "12px",
                  color: isDark ? "#F4F2F2" : "#1E293B"
                }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {sanitizedSources.map((src) => (
              <div key={src.name} className={`flex items-center justify-between p-2.5 rounded-xl text-xs ${
                isDark ? "bg-[#212630]" : "bg-slate-50"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: src.color }} />
                  <span className={`font-semibold ${isDark ? "text-[#F4F2F2]" : "text-slate-800"}`}>{src.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-mono ${isDark ? "text-slate-300" : "text-slate-700"}`}>{src.visitors.toLocaleString()}</span>
                  <span className={`text-[10px] w-10 text-right ${isDark ? "text-slate-400" : "text-slate-500"}`}>{src.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Referrers */}
      <div className={`p-6 rounded-3xl space-y-4 ${
        isDark ? "bg-[#15181E]" : "bg-white"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"}`}>
          <Globe className="w-5 h-5 text-cyan-500" /> Top Referrers
        </h2>
        <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>External domains driving qualified visitors.</p>

        <div className="space-y-3 pt-2">
          {MOCK_REFERRERS.map((ref) => (
            <div key={ref.domain} className={`p-3 rounded-2xl flex items-center justify-between text-xs ${
              isDark ? "bg-[#212630]" : "bg-slate-50"
            }`}>
              <div>
                <div className={`font-semibold ${isDark ? "text-[#F4F2F2]" : "text-slate-800"}`}>{ref.domain}</div>
                <div className={`text-[10px] mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{ref.category}</div>
              </div>
              <div className="text-right">
                <div className={`font-bold font-mono ${isDark ? "text-[#d6f14a]" : "text-lime-600"}`}>{ref.visitors.toLocaleString()} vis</div>
                <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{ref.conversions} conv</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
