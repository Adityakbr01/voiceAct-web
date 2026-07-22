"use client";

import React from "react";
import {
  FILTER_DATE_RANGES,
  FILTER_TRAFFIC_SOURCES,
  FILTER_COUNTRIES,
  FILTER_DEVICES,
} from "@/constants/analytics-mock-data";
import { Filter } from "lucide-react";

interface GlobalFiltersBarProps {
  dateRange: string;
  setDateRange: (val: string) => void;
  selectedSource: string;
  setSelectedSource: (val: string) => void;
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
  selectedDevice: string;
  setSelectedDevice: (val: string) => void;
  themeMode?: "dark" | "light";
}

export function GlobalFiltersBar({
  dateRange,
  setDateRange,
  selectedSource,
  setSelectedSource,
  selectedCountry,
  setSelectedCountry,
  selectedDevice,
  setSelectedDevice,
  themeMode = "dark",
}: GlobalFiltersBarProps) {
  const isDark = themeMode === "dark";

  return (
    <section className={`p-4 rounded-2xl backdrop-blur-xl flex flex-wrap items-center gap-4 justify-between font-['Space_Grotesk',sans-serif] ${
      isDark ? "bg-[#15181E]/90" : "bg-white"
    }`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs font-semibold flex items-center gap-1.5 mr-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          <Filter className="w-3.5 h-3.5 text-lime-500" /> Date Range:
        </span>
        {FILTER_DATE_RANGES.map((item) => (
          <button
            key={item.value}
            onClick={() => setDateRange(item.value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ease-out cursor-pointer hover:scale-105 active:scale-95 ${
              dateRange === item.value
                ? "bg-[#d6f14a] text-slate-950"
                : isDark
                ? "bg-[#212630] hover:bg-slate-700 text-[#F4F2F2]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Secondary Category Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className={`text-xs font-medium px-3 py-2 rounded-xl focus:outline-none cursor-pointer transition-all duration-200 ${
            isDark
              ? "bg-[#212630] text-[#F4F2F2]"
              : "bg-slate-100 text-slate-800"
          }`}
        >
          {FILTER_TRAFFIC_SOURCES.map((src) => (
            <option key={src} value={src}>
              {src}
            </option>
          ))}
        </select>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className={`text-xs font-medium px-3 py-2 rounded-xl focus:outline-none cursor-pointer transition-all duration-200 ${
            isDark
              ? "bg-[#212630] text-[#F4F2F2]"
              : "bg-slate-100 text-slate-800"
          }`}
        >
          {FILTER_COUNTRIES.map((cnt) => (
            <option key={cnt} value={cnt}>
              {cnt}
            </option>
          ))}
        </select>

        <select
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          className={`text-xs font-medium px-3 py-2 rounded-xl focus:outline-none cursor-pointer transition-all duration-200 ${
            isDark
              ? "bg-[#212630] text-[#F4F2F2]"
              : "bg-slate-100 text-slate-800"
          }`}
        >
          {FILTER_DEVICES.map((dev) => (
            <option key={dev} value={dev}>
              {dev}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
