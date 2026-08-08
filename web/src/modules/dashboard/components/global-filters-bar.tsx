"use client";

import React from "react";
import { Filter } from "lucide-react";

const FILTER_DATE_RANGES = [
  { label: "24 Hours", value: "24h" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
];

const FILTER_TRAFFIC_SOURCES = [
  "All Sources",
  "Direct",
  "Organic Search",
  "Paid Ads",
  "Social",
  "Referral",
];
const FILTER_COUNTRIES = [
  "All Countries",
  "United States",
  "India",
  "United Kingdom",
  "Germany",
  "Canada",
];
const FILTER_DEVICES = ["All Devices", "Desktop", "Mobile", "Tablet"];

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
    <section
      className={`p-4 rounded-none border flex flex-wrap items-center gap-4 justify-between font-sans ${
        isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`text-xs font-semibold flex items-center gap-1.5 mr-2 ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}
        >
          <Filter className="w-3.5 h-3.5 text-white" /> Date Range:
        </span>
        {FILTER_DATE_RANGES.map((item) => (
          <button
            key={item.value}
            onClick={() => setDateRange(item.value)}
            className={`px-3 py-1.5 rounded-none text-xs font-bold transition-all duration-200 cursor-pointer ${
              dateRange === item.value
                ? isDark
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : isDark
                  ? "bg-[#111111] border border-[#1f1f1f] hover:bg-[#1f1f1f] text-[#ededed]"
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
          className={`text-xs font-medium px-3 py-2 rounded-none focus:outline-none cursor-pointer border transition-all duration-200 ${
            isDark
              ? "bg-[#111111] border-[#1f1f1f] text-[#ededed]"
              : "bg-slate-100 border-slate-200 text-slate-800"
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
          className={`text-xs font-medium px-3 py-2 rounded-none focus:outline-none cursor-pointer border transition-all duration-200 ${
            isDark
              ? "bg-[#111111] border-[#1f1f1f] text-[#ededed]"
              : "bg-slate-100 border-slate-200 text-slate-800"
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
          className={`text-xs font-medium px-3 py-2 rounded-none focus:outline-none cursor-pointer border transition-all duration-200 ${
            isDark
              ? "bg-[#111111] border-[#1f1f1f] text-[#ededed]"
              : "bg-slate-100 border-slate-200 text-slate-800"
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
