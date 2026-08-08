"use client";

import React from "react";
import { Settings, XCircle } from "lucide-react";

interface DashboardSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoRefreshInterval: number;
  setAutoRefreshInterval: (sec: number) => void;
  widgetVisibility: Record<string, boolean>;
  setWidgetVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  themeMode?: "dark" | "light";
}

export function DashboardSettingsModal({
  isOpen,
  onClose,
  autoRefreshInterval,
  setAutoRefreshInterval,
  widgetVisibility,
  setWidgetVisibility,
  themeMode = "dark",
}: DashboardSettingsModalProps) {
  if (!isOpen) return null;
  const isDark = themeMode === "dark";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans">
      <div
        className={`rounded-none p-6 max-w-md w-full space-y-6 shadow-2xl border ${
          isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b pb-4 ${isDark ? "border-[#1f1f1f]" : "border-slate-200"}`}
        >
          <h3
            className={`text-lg font-bold flex items-center gap-2 ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
          >
            <Settings className="w-5 h-5 text-white" /> Dashboard Settings
          </h3>
          <button
            onClick={onClose}
            className={`cursor-pointer ${isDark ? "text-[#a1a1a1] hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Auto Refresh */}
        <div className="space-y-2">
          <label
            className={`text-xs font-semibold block ${isDark ? "text-[#a1a1a1]" : "text-slate-700"}`}
          >
            Auto-Refresh Interval
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[10, 30, 0].map((sec) => (
              <button
                key={sec}
                onClick={() => setAutoRefreshInterval(sec)}
                className={`py-2 rounded-none font-semibold border transition cursor-pointer ${
                  autoRefreshInterval === sec
                    ? isDark
                      ? "bg-white text-black border-white"
                      : "bg-black text-white border-black"
                    : isDark
                      ? "bg-[#111111] border-[#1f1f1f] text-[#ededed] hover:bg-[#1f1f1f]"
                      : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                }`}
              >
                {sec === 0 ? "Off" : `${sec} seconds`}
              </button>
            ))}
          </div>
        </div>

        {/* Widget Visibility */}
        <div className="space-y-3">
          <label
            className={`text-xs font-semibold block ${isDark ? "text-[#a1a1a1]" : "text-slate-700"}`}
          >
            Widget Layout & Visibility
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
            {Object.entries(widgetVisibility).map(([key, isVisible]) => (
              <div
                key={key}
                className={`flex items-center justify-between p-2.5 rounded-none border ${
                  isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-50 border-slate-200"
                }`}
              >
                <span className={`capitalize ${isDark ? "text-[#ededed]" : "text-slate-800"}`}>
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <button
                  onClick={() => setWidgetVisibility({ ...widgetVisibility, [key]: !isVisible })}
                  className={`px-3 py-1 rounded-none font-bold transition cursor-pointer border ${
                    isVisible
                      ? isDark
                        ? "bg-[#1f1f1f] text-white border-[#333333]"
                        : "bg-slate-900 text-white border-slate-900"
                      : "bg-transparent text-slate-500 border-slate-700"
                  }`}
                >
                  {isVisible ? "Visible" : "Hidden"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-none bg-white text-black font-bold text-xs hover:bg-slate-200 transition cursor-pointer shadow-sm"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
