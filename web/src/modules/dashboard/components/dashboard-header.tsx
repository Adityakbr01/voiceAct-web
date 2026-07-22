"use client";

import React from "react";
import { BarChart2, RefreshCw, Sun, Moon, Download, ChevronDown, Settings, FileText } from "lucide-react";

interface DashboardHeaderProps {
  lastRefreshed: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  themeMode: "dark" | "light";
  onToggleTheme: () => void;
  isExportOpen: boolean;
  onToggleExport: () => void;
  onExportJSON: () => void;
  onPrintPDF: () => void;
  onToggleSettings: () => void;
}

export function DashboardHeader({
  lastRefreshed,
  isRefreshing,
  onRefresh,
  themeMode,
  onToggleTheme,
  isExportOpen,
  onToggleExport,
  onExportJSON,
  onPrintPDF,
  onToggleSettings,
}: DashboardHeaderProps) {
  const isDark = themeMode === "dark";

  return (
    <header className={`flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b font-['Space_Grotesk',sans-serif] ${
      isDark ? "border-[#2A2F38]" : "border-slate-200"
    }`}>
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#d6f14a] text-slate-950 font-bold shadow-lg shadow-[#d6f14a]/20">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2 ${
              isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"
            }`}>
              Marketing Analytics Dashboard
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                isDark
                  ? "bg-[#d6f14a]/10 text-[#d6f14a] border-[#d6f14a]/30"
                  : "bg-[#d6f14a] text-slate-950 border-[#d6f14a]"
              }`}>
                Live Admin
              </span>
            </h1>
            <p className={`text-xs md:text-sm mt-1 font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Real-time website traffic, campaign ROI, lead attribution & visitor behavior.
            </p>
          </div>
        </div>
      </div>

      {/* Action Controls & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition shadow-sm disabled:opacity-50 cursor-pointer ${
            isDark
              ? "bg-[#15181E] hover:bg-[#212630] text-[#F4F2F2] border-[#2A2F38]"
              : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200"
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-lime-500" : ""}`} />
          <span>Refreshed: {lastRefreshed}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`p-2.5 rounded-xl border transition cursor-pointer ${
            isDark
              ? "bg-[#15181E] hover:bg-[#212630] text-[#F4F2F2] border-[#2A2F38]"
              : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200"
          }`}
          title="Toggle Light/Dark Theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Export Menu Toggle */}
        <div className="relative">
          <button
            onClick={onToggleExport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#d6f14a] text-slate-950 hover:bg-lime-300 transition shadow-md shadow-[#d6f14a]/10 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {isExportOpen && (
            <div className={`absolute right-0 mt-2 w-48 border rounded-2xl shadow-2xl p-2 z-50 text-xs ${
              isDark ? "bg-[#15181E] border-[#2A2F38]" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <button
                onClick={onExportJSON}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 cursor-pointer ${
                  isDark ? "hover:bg-[#212630] text-[#F4F2F2]" : "hover:bg-slate-100 text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-lime-600" />
                <span>Export Campaigns (JSON)</span>
              </button>
              <button
                onClick={onPrintPDF}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 cursor-pointer ${
                  isDark ? "hover:bg-[#212630] text-[#F4F2F2]" : "hover:bg-slate-100 text-slate-900"
                }`}
              >
                <Download className="w-3.5 h-3.5 text-cyan-500" />
                <span>Print Dashboard (PDF)</span>
              </button>
            </div>
          )}
        </div>

        {/* Settings Modal Toggle */}
        <button
          onClick={onToggleSettings}
          className={`p-2.5 rounded-xl border transition cursor-pointer ${
            isDark
              ? "bg-[#15181E] hover:bg-[#212630] text-[#F4F2F2] border-[#2A2F38]"
              : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200"
          }`}
          title="Dashboard Settings & Widgets"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
