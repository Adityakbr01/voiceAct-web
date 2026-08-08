"use client";

import React, { useState } from "react";
import { Globe } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface TrafficOverviewChartProps {
  themeMode?: "dark" | "light";
  timeSeries?: { _id: string; count: number }[];
}

const chartConfig = {
  visitors: { label: "Visitors", color: "#ffffff" },
  sessions: { label: "Sessions", color: "#ededed" },
  pageViews: { label: "Page Views", color: "#a1a1a1" },
  uniqueVisitors: { label: "Unique Visitors", color: "#737373" },
};

export function TrafficOverviewChart({
  themeMode = "dark",
  timeSeries = [],
}: TrafficOverviewChartProps) {
  const isDark = themeMode === "dark";
  const [granularity, setGranularity] = useState<"hourly" | "daily">("daily");
  const [chartType, setChartType] = useState<"area" | "line" | "bar">("area");
  const [activeTrafficMetric, setActiveTrafficMetric] = useState<
    "visitors" | "sessions" | "pageViews" | "uniqueVisitors"
  >("visitors");

  const currentTrafficSeries = timeSeries.length
    ? timeSeries.map((item) => ({
        time: item._id,
        visitors: item.count,
        sessions: item.count,
        pageViews: item.count,
        uniqueVisitors: item.count,
      }))
    : [{ time: "Today", visitors: 0, sessions: 0, pageViews: 0, uniqueVisitors: 0 }];

  return (
    <section
      className={`p-7 rounded-none space-y-6 font-sans border shadow-sm ${
        isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2
            className={`text-xl font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
          >
            <Globe className="w-5 h-5 text-blue-500" /> Traffic Trends Overview
          </h2>
          <p className={`text-xs mt-1 font-medium ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>
            Visitors, sessions, and page view metrics over time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div
            className={`inline-flex p-1 rounded-none text-xs border ${isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-100 border-slate-200"}`}
          >
            <button
              onClick={() => setActiveTrafficMetric("visitors")}
              className={`px-3 py-1 rounded-none font-semibold transition cursor-pointer ${
                activeTrafficMetric === "visitors"
                  ? "bg-white text-black"
                  : isDark
                    ? "text-[#a1a1a1] hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Visitors
            </button>
            <button
              onClick={() => setActiveTrafficMetric("sessions")}
              className={`px-3 py-1 rounded-none font-semibold transition cursor-pointer ${
                activeTrafficMetric === "sessions"
                  ? "bg-white text-black"
                  : isDark
                    ? "text-[#a1a1a1] hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sessions
            </button>
            <button
              onClick={() => setActiveTrafficMetric("pageViews")}
              className={`px-3 py-1 rounded-none font-semibold transition cursor-pointer ${
                activeTrafficMetric === "pageViews"
                  ? "bg-white text-black"
                  : isDark
                    ? "text-[#a1a1a1] hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Page Views
            </button>
          </div>

          {/* Granularity Selector */}
          <div
            className={`inline-flex p-1 rounded-none text-xs border ${isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-100 border-slate-200"}`}
          >
            <button
              onClick={() => setGranularity("hourly")}
              className={`px-3 py-1 rounded-none font-semibold transition cursor-pointer ${
                granularity === "hourly"
                  ? "bg-[#1f1f1f] text-white"
                  : isDark
                    ? "text-[#a1a1a1] hover:text-white"
                    : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Hourly
            </button>
            <button
              onClick={() => setGranularity("daily")}
              className={`px-3 py-1 rounded-none font-semibold transition cursor-pointer ${
                granularity === "daily"
                  ? "bg-[#1f1f1f] text-white"
                  : isDark
                    ? "text-[#a1a1a1] hover:text-white"
                    : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Daily
            </button>
          </div>

          {/* Chart Type Selector */}
          <div
            className={`inline-flex p-1 rounded-none text-xs border ${isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-100 border-slate-200"}`}
          >
            <button
              onClick={() => setChartType("area")}
              className={`px-2.5 py-1 rounded-none font-semibold transition cursor-pointer ${
                chartType === "area"
                  ? "bg-[#1f1f1f] text-white"
                  : isDark
                    ? "text-[#a1a1a1] hover:text-white"
                    : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-2.5 py-1 rounded-none font-semibold transition cursor-pointer ${
                chartType === "bar"
                  ? "bg-[#1f1f1f] text-white"
                  : isDark
                    ? "text-[#a1a1a1] hover:text-white"
                    : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Bar
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`px-2.5 py-1 rounded-none font-semibold transition cursor-pointer ${
                chartType === "line"
                  ? "bg-[#1f1f1f] text-white"
                  : isDark
                    ? "text-[#a1a1a1] hover:text-white"
                    : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Line
            </button>
          </div>
        </div>
      </div>

      {/* Shadcn Chart Component Wrapper */}
      <ChartContainer config={chartConfig} className="h-80 w-full pt-4">
        {chartType === "area" ? (
          <AreaChart data={currentTrafficSeries}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? "#ffffff" : "#000000"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isDark ? "#ffffff" : "#000000"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1f1f1f" : "#E2E8F0"} />
            <XAxis dataKey="time" stroke={isDark ? "#a1a1a1" : "#64748b"} fontSize={11} />
            <YAxis stroke={isDark ? "#a1a1a1" : "#64748b"} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey={activeTrafficMetric}
              stroke={isDark ? "#ffffff" : "#000000"}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMetric)"
            />
          </AreaChart>
        ) : chartType === "bar" ? (
          <BarChart data={currentTrafficSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1f1f1f" : "#E2E8F0"} />
            <XAxis dataKey="time" stroke={isDark ? "#a1a1a1" : "#64748b"} fontSize={11} />
            <YAxis stroke={isDark ? "#a1a1a1" : "#64748b"} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey={activeTrafficMetric}
              fill={isDark ? "#ffffff" : "#000000"}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        ) : (
          <LineChart data={currentTrafficSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1f1f1f" : "#E2E8F0"} />
            <XAxis dataKey="time" stroke={isDark ? "#a1a1a1" : "#64748b"} fontSize={11} />
            <YAxis stroke={isDark ? "#a1a1a1" : "#64748b"} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey={activeTrafficMetric}
              stroke={isDark ? "#ffffff" : "#000000"}
              strokeWidth={2}
              dot={{ r: 4, fill: isDark ? "#ffffff" : "#000000" }}
            />
          </LineChart>
        )}
      </ChartContainer>
    </section>
  );
}
