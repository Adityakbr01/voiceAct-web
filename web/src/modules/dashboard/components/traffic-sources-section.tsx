"use client";

import React from "react";
import { PieChart as PieIcon, Globe } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

export interface TrafficSourceItem {
  name: string;
  visitors: number;
  percentage: number;
  color: string;
}

interface TrafficSourcesSectionProps {
  themeMode?: "dark" | "light";
  sources?: TrafficSourceItem[];
}

export function TrafficSourcesSection({ themeMode = "dark", sources = [] }: TrafficSourcesSectionProps) {
  const isDark = themeMode === "dark";

  const defaultSources = [
    { name: "Direct", visitors: 4200, percentage: 42, color: "#3b82f6" },
    { name: "Organic Search", visitors: 3100, percentage: 31, color: "#10b981" },
    { name: "Paid Ads", visitors: 1500, percentage: 15, color: "#f59e0b" },
    { name: "Social Media", visitors: 800, percentage: 8, color: "#06b6d4" },
    { name: "Referral", visitors: 400, percentage: 4, color: "#f43f5e" },
  ];

  const sanitizedSources = sources.length ? sources : defaultSources;

  const chartConfig = sanitizedSources.reduce((acc, src) => {
    acc[src.name] = { label: src.name, color: src.color };
    return acc;
  }, {} as ChartConfig);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans">
      {/* Traffic Sources Pie Chart */}
      <div className={`p-7 rounded-none space-y-5 border shadow-sm ${
        isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>
          <PieIcon className="w-5 h-5 text-emerald-500" /> Traffic Acquisition Breakdown
        </h2>
        <p className={`text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>Distribution across Direct, Search, Paid, Social, and Referrals.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center pt-2">
          <div className="h-52 w-full flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <PieChart>
                <Pie data={sanitizedSources} dataKey="visitors" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {sanitizedSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-2">
            {sanitizedSources.map((src) => (
              <div key={src.name} className={`flex items-center justify-between p-3.5 px-4 rounded-none text-xs border ${
                isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-none border border-white/20" style={{ backgroundColor: src.color }} />
                  <span className={`font-semibold ${isDark ? "text-[#ededed]" : "text-slate-800"}`}>{src.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-mono font-bold ${isDark ? "text-[#ededed]" : "text-slate-700"}`}>{src.visitors.toLocaleString()}</span>
                  <span className={`text-[10px] font-semibold w-10 text-right ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>{src.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Referrers */}
      <div className={`p-7 rounded-none space-y-5 border shadow-sm ${
        isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
      }`}>
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>
          <Globe className="w-5 h-5 text-blue-500" /> Top Referrers
        </h2>
        <p className={`text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>External domains driving qualified visitors.</p>

        <div className="space-y-3 pt-2">
          {sources.length === 0 ? (
            <div className={`p-6 text-center text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>
              No referral data recorded yet.
            </div>
          ) : (
            sources.map((ref) => (
              <div key={ref.name} className={`p-4 px-5 rounded-none flex items-center justify-between text-xs border ${
                isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-50 border-slate-200"
              }`}>
                <div>
                  <div className={`font-bold ${isDark ? "text-[#ededed]" : "text-slate-800"}`}>{ref.name}</div>
                  <div className={`text-[10px] mt-0.5 font-medium ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>Organic / Direct</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold font-mono ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{ref.visitors.toLocaleString()} vis</div>
                  <div className={`text-[10px] font-semibold ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>{ref.percentage}%</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
