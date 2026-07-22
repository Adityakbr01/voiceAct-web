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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 font-['Space_Grotesk',sans-serif]">
      <div className={`rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl border ${
        isDark ? "bg-[#15181E] border-[#2A2F38]" : "bg-white border-slate-200 text-slate-900"
      }`}>
        <div className={`flex items-center justify-between border-b pb-4 ${isDark ? "border-[#2A2F38]" : "border-slate-200"}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>
            <Settings className="w-5 h-5 text-lime-600" /> Dashboard Settings
          </h3>
          <button onClick={onClose} className={`cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}>
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Auto Refresh */}
        <div className="space-y-2">
          <label className={`text-xs font-semibold block ${isDark ? "text-slate-300" : "text-slate-700"}`}>Auto-Refresh Interval</label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[10, 30, 0].map((sec) => (
              <button
                key={sec}
                onClick={() => setAutoRefreshInterval(sec)}
                className={`py-2 rounded-xl font-semibold border transition cursor-pointer ${
                  autoRefreshInterval === sec
                    ? "bg-[#d6f14a] text-slate-950 border-[#d6f14a]"
                    : isDark
                    ? "bg-[#212630] border-[#2A2F38] text-slate-300 hover:text-white"
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
          <label className={`text-xs font-semibold block ${isDark ? "text-slate-300" : "text-slate-700"}`}>Widget Layout & Visibility</label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
            {Object.entries(widgetVisibility).map(([key, isVisible]) => (
              <div key={key} className={`flex items-center justify-between p-2.5 rounded-xl border ${
                isDark ? "bg-[#212630] border-[#2A2F38]" : "bg-slate-50 border-slate-200"
              }`}>
                <span className={`capitalize ${isDark ? "text-slate-200" : "text-slate-800"}`}>{key.replace(/([A-Z])/g, " $1")}</span>
                <button
                  onClick={() => setWidgetVisibility({ ...widgetVisibility, [key]: !isVisible })}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    isVisible ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/30" : "bg-slate-200 text-slate-700"
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
          className="w-full py-2.5 rounded-xl bg-[#d6f14a] text-slate-950 font-bold text-xs hover:bg-lime-300 transition cursor-pointer"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
