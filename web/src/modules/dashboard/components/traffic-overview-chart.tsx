"use client";

import React, { useState } from "react";
import { Globe } from "lucide-react";
import { MOCK_TRAFFIC_DAILY, MOCK_TRAFFIC_HOURLY } from "@/constants/analytics-mock-data";
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
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrafficOverviewChartProps {
  themeMode?: "dark" | "light";
}

export function TrafficOverviewChart({ themeMode = "dark" }: TrafficOverviewChartProps) {
  const isDark = themeMode === "dark";
  const [granularity, setGranularity] = useState<"hourly" | "daily">("daily");
  const [chartType, setChartType] = useState<"area" | "line" | "bar">("area");
  const [activeTrafficMetric, setActiveTrafficMetric] = useState<
    "visitors" | "sessions" | "pageViews" | "uniqueVisitors"
  >("visitors");

  const currentTrafficSeries = granularity === "hourly" ? MOCK_TRAFFIC_HOURLY : MOCK_TRAFFIC_DAILY;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-xl backdrop-blur-md text-xs space-y-1 font-['Space_Grotesk',sans-serif] ${
          isDark ? "bg-[#0F1115] text-[#F4F2F2]" : "bg-white text-slate-900"
        }`}>
          <p className={`font-bold pb-1 ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{label}</p>
          <div className="flex items-center justify-between gap-4 pt-1">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>{activeTrafficMetric}:</span>
            <span className="font-mono font-bold text-[#84cc16]">{payload[0].value.toLocaleString()}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className={`p-6 rounded-3xl space-y-6 font-['Space_Grotesk',sans-serif] ${
      isDark ? "bg-[#15181E]" : "bg-white"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"}`}>
            <Globe className="w-5 h-5 text-cyan-500" /> Traffic Trends Overview
          </h2>
          <p className={`text-xs mt-1 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Visitors, sessions, and page view metrics over time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div className={`inline-flex p-1 rounded-xl text-xs ${isDark ? "bg-[#212630]" : "bg-slate-100"}`}>
            <button
              onClick={() => setActiveTrafficMetric("visitors")}
              className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                activeTrafficMetric === "visitors" ? "bg-[#d6f14a] text-slate-950" : isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Visitors
            </button>
            <button
              onClick={() => setActiveTrafficMetric("sessions")}
              className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                activeTrafficMetric === "sessions" ? "bg-[#d6f14a] text-slate-950" : isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sessions
            </button>
            <button
              onClick={() => setActiveTrafficMetric("pageViews")}
              className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                activeTrafficMetric === "pageViews" ? "bg-[#d6f14a] text-slate-950" : isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Page Views
            </button>
          </div>

          {/* Granularity Selector */}
          <div className={`inline-flex p-1 rounded-xl text-xs ${isDark ? "bg-[#212630]" : "bg-slate-100"}`}>
            <button
              onClick={() => setGranularity("hourly")}
              className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                granularity === "hourly" ? "bg-slate-800 text-white" : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Hourly
            </button>
            <button
              onClick={() => setGranularity("daily")}
              className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                granularity === "daily" ? "bg-slate-800 text-white" : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Daily
            </button>
          </div>

          {/* Chart Type Selector */}
          <div className={`inline-flex p-1 rounded-xl text-xs ${isDark ? "bg-[#212630]" : "bg-slate-100"}`}>
            <button
              onClick={() => setChartType("area")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                chartType === "area" ? "bg-slate-800 text-white" : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                chartType === "bar" ? "bg-slate-800 text-white" : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Bar
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                chartType === "line" ? "bg-slate-800 text-white" : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Line
            </button>
          </div>
        </div>
      </div>

      {/* Recharts Component */}
      <div className="h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={currentTrafficSeries}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84cc16" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#212630" : "#F1F5F9"} />
              <XAxis dataKey="time" stroke={isDark ? "#64748b" : "#475569"} fontSize={11} />
              <YAxis stroke={isDark ? "#64748b" : "#475569"} fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={activeTrafficMetric} stroke="#84cc16" strokeWidth={3} fillOpacity={1} fill="url(#colorMetric)" />
            </AreaChart>
          ) : chartType === "bar" ? (
            <BarChart data={currentTrafficSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#212630" : "#F1F5F9"} />
              <XAxis dataKey="time" stroke={isDark ? "#64748b" : "#475569"} fontSize={11} />
              <YAxis stroke={isDark ? "#64748b" : "#475569"} fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={activeTrafficMetric} fill="#84cc16" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={currentTrafficSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#212630" : "#F1F5F9"} />
              <XAxis dataKey="time" stroke={isDark ? "#64748b" : "#475569"} fontSize={11} />
              <YAxis stroke={isDark ? "#64748b" : "#475569"} fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey={activeTrafficMetric} stroke="#84cc16" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}
