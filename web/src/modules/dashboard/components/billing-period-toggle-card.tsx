"use client";

import React, { useState } from "react";
import { IconCalendar, IconCalendarClock } from "@tabler/icons-react";

interface BillingPeriodToggleCardProps {
  themeMode?: "dark" | "light";
}

export function BillingPeriodToggleCard({ themeMode = "dark" }: BillingPeriodToggleCardProps) {
  const isDark = themeMode === "dark";
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div
      className={`p-6 rounded-3xl flex flex-col items-center text-center gap-6 font-['Space_Grotesk',sans-serif] transition-all duration-300 ${
        isDark ? "bg-[#15181E] text-[#F4F2F2]" : "bg-white text-slate-900"
      }`}
    >
      <div className="space-y-3 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d6f14a]/10 text-[#d6f14a] text-xs font-bold uppercase tracking-wider">
          <IconCalendar className="w-4 h-4" />
          Campaign Spend Allocation
        </div>
        <h3
          className={`text-2xl font-bold tracking-tight ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}
        >
          Flexible Budgeting Cycle
        </h3>
        <p className={`text-xs max-w-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          Toggle between annual and monthly campaign budget projections to optimize CPL and CPA
          performance.
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        onClick={() => setIsAnnual(!isAnnual)}
        className={`relative z-10 w-52 h-14 rounded-full p-1.5 flex items-center cursor-pointer transition-all duration-500 outline-none ${
          isAnnual ? "bg-[#d6f14a]" : isDark ? "bg-[#212630]" : "bg-slate-200"
        }`}
      >
        <div
          className={`w-[110px] h-full rounded-full flex items-center justify-center gap-1.5 transition-all duration-500 ease-out font-bold text-xs shadow-md ${
            isAnnual
              ? "translate-x-[90px] bg-slate-950 text-[#d6f14a]"
              : "translate-x-0 bg-white text-slate-900 shadow-sm"
          }`}
        >
          {isAnnual ? (
            <IconCalendar className="w-4 h-4 text-[#d6f14a]" />
          ) : (
            <IconCalendarClock className="w-4 h-4 text-slate-700" />
          )}
          <span>{isAnnual ? "Annual" : "Monthly"}</span>
        </div>
      </button>
    </div>
  );
}
