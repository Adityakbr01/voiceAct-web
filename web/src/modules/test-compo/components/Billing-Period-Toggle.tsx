"use client";

import { useState } from "react";
import { IconCalendar, IconCalendarClock } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function BillingPeriodToggle() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="flex flex-col items-center text-center gap-8 relative z-20">
      <div className="space-y-5 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-600 text-xs font-light tracking-widest shadow-sm uppercase font-[Oswald]">
          <IconCalendar className="text-sm" />
          Clear Cost Structure
        </div>
        <h1 className="text-4xl lg:text-6xl font-normal tracking-tight leading-tight max-w-xl text-slate-900 font-[Instrument_Serif]">
          Transparent{" "}
          <span className="text-indigo-600 font-normal italic">Economics</span>
        </h1>
        <p className="text-base text-slate-500 font-light max-w-md font-[Space_Grotesk]">
          Choose a plan that matches your current workload. Expand seamlessly as
          your technical demands grow.
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        onClick={() => setIsAnnual(!isAnnual)}
        className={cn(
          "relative z-10 w-48 h-16 rounded-full p-1.5 flex items-center cursor-pointer transition-all duration-500 outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 border",
          isAnnual
            ? "bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px),linear-gradient(180deg,#e0e7ff_0%,#a5b4fc_100%)] border-indigo-300 shadow-[2px_2px_0px_rgba(79,70,229,0.1),4px_4px_0px_rgba(79,70,229,0.08),6px_6px_0px_rgba(79,70,229,0.06),8px_8px_0px_rgba(79,70,229,0.04),10px_10px_0px_rgba(79,70,229,0.02),20px_20px_30px_rgba(79,70,229,0.25),inset_0_4px_8px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.7),0_0_0_6px_rgba(238,242,255,0.8)]"
            : "bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] border-slate-300 shadow-[2px_2px_0px_rgba(79,70,229,0.1),4px_4px_0px_rgba(79,70,229,0.08),6px_6px_0px_rgba(79,70,229,0.06),8px_8px_0px_rgba(79,70,229,0.04),10px_10px_0px_rgba(79,70,229,0.02),20px_20px_30px_rgba(79,70,229,0.25),inset_0_4px_8px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.7),0_0_0_6px_rgba(238,242,255,0.8)]"
        )}
      >
        <div
          className={cn(
            "absolute left-[6px] w-[116px] h-[calc(100%-12px)] rounded-full flex items-center justify-center gap-1.5 transition-all duration-500 ease-out border",
            isAnnual
              ? "translate-x-[64px] bg-[linear-gradient(180deg,#ffffff_0%,#f5f7ff_100%)] shadow-[1px_1px_0px_rgba(79,70,229,0.15),2px_2px_0px_rgba(79,70,229,0.1),3px_3px_0px_rgba(79,70,229,0.08),4px_4px_0px_rgba(79,70,229,0.05),5px_5px_0px_rgba(79,70,229,0.03),12px_12px_20px_-4px_rgba(79,70,229,0.4),inset_0_3px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(129,140,248,0.2)] border-indigo-50"
              : "translate-x-0 bg-[linear-gradient(180deg,#ffffff_0%,#f5f7ff_100%)] shadow-[1px_1px_0px_rgba(79,70,229,0.15),2px_2px_0px_rgba(79,70,229,0.1),3px_3px_0px_rgba(79,70,229,0.08),4px_4px_0px_rgba(79,70,229,0.05),5px_5px_0px_rgba(79,70,229,0.03),12px_12px_20px_-4px_rgba(79,70,229,0.4),inset_0_3px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(129,140,248,0.2)] border-indigo-50"
          )}
        >
          {isAnnual ? (
            <IconCalendar className="text-indigo-600 text-base drop-shadow-sm transition-colors duration-300" />
          ) : (
            <IconCalendarClock className="text-slate-500 text-base drop-shadow-sm transition-colors duration-300" />
          )}
          <span
            className={cn(
              "text-sm font-light tracking-wide transition-all duration-300 font-[Space_Grotesk] [text-shadow:0_1px_1px_rgba(255,255,255,0.9)]",
              isAnnual ? "text-slate-800" : "text-slate-800"
            )}
          >
            {isAnnual ? "Annually" : "Monthly"}
          </span>
        </div>
      </button>
    </div>
  );
}

export default BillingPeriodToggle;
