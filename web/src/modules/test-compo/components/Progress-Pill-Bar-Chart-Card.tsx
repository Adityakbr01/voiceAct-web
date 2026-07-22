import React from "react";

function ProgressPillBarChartCard() {
  return (
    <div className="sm:px-8 sm:py-7 flex flex-col bg-[#d6f14a] rounded-3xl pt-6 pr-6 pb-6 pl-6">
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <h2 className="text-xl sm:text-2xl tracking-tight font-semibold text-slate-900">
            Your progress
          </h2>
          <p className="text-xs text-slate-700 mt-1">See how your focus changes across the week.</p>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-slate-900/10 rounded-full p-1">
          <button className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-slate-900 text-[#d6f14a] shadow-sm">
            Week
          </button>
          <button className="px-3 py-1.5 rounded-full text-[11px] font-medium text-slate-800">
            Month
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col mt-4 justify-between">
        <div className="flex sm:gap-4 sm:h-44 h-40 gap-x-3 gap-y-3 items-end justify-between">
          <div className="flex flex-col gap-2 flex-1 gap-x-2 gap-y-2 items-center">
            <div className="relative w-9 sm:w-10 flex-1 flex items-end">
              <div className="flex flex-col overflow-hidden bg-black/30 w-full h-32 border-slate-900/5 border rounded-full justify-end">
                <div className="bg-lime-300/40 w-full" style={{ height: "40%" }}></div>

                <div className="w-full bg-lime-300/60" style={{ height: "30%" }}></div>

                <div className="w-full bg-lime-300/80" style={{ height: "20%" }}></div>
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-medium text-slate-900">
                56
              </div>
            </div>
            <span className="text-[11px] text-slate-800 font-medium">Mon</span>
          </div>

          <div className="h-32 sm:h-36 flex items-stretch">
            <div className="w-px h-full border-l border-dotted border-slate-900/20 opacity-70"></div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="relative w-9 sm:w-10 flex items-end justify-center h-24">
              <div className="flex flex-col overflow-hidden bg-black/30 w-full h-24 border-slate-900/5 border rounded-full justify-end">
                <div className="bg-lime-300/40 w-full" style={{ height: "38%" }}></div>

                <div className="bg-lime-300/60 w-full" style={{ height: "24%" }}></div>
              </div>
            </div>
            <span className="text-[11px] text-slate-800 font-medium">Tue</span>
          </div>

          <div className="h-32 sm:h-36 flex items-stretch">
            <div className="w-px h-full border-l border-dotted border-slate-900/20 opacity-70"></div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="relative w-9 sm:w-10 flex-1 flex items-end">
              <div className="flex flex-col overflow-hidden bg-black/30 w-full h-32 border-slate-900/10 border rounded-full justify-end">
                <div className="w-full bg-lime-300/40" style={{ height: "28%" }}></div>

                <div className="w-full bg-lime-300/60" style={{ height: "26%" }}></div>

                <div className="bg-lime-300/70 w-full" style={{ height: "24%" }}></div>
              </div>
              <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                <div className="rounded-full bg-slate-900 text-[11px] font-medium text-[#d6f14a] px-2 py-0.5 flex items-center gap-1">
                  <span>68</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    data-lucide="triangle"
                    className="lucide lucide-triangle w-2.5 h-2.5 text-[#d6f14a]"
                  >
                    <path
                      d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
                      className=""
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-900 font-semibold">Wed</span>
          </div>

          <div className="h-32 sm:h-36 flex items-stretch">
            <div className="w-px h-full border-l border-dotted border-slate-900/20 opacity-70"></div>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="relative w-9 sm:w-10 flex-1 flex items-end">
              <div className="flex flex-col overflow-hidden bg-black/30 w-full h-32 border-slate-900/5 border rounded-full justify-end">
                <div className="w-full bg-lime-300/40" style={{ height: "45%" }}></div>

                <div className="bg-lime-300/70 w-full" style={{ height: "20%" }}></div>
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-medium text-slate-900">
                44
              </div>
            </div>
            <span className="text-[11px] text-slate-800 font-medium">Thu</span>
          </div>

          <div className="h-32 sm:h-36 flex items-stretch">
            <div className="w-px h-full border-l border-dotted border-slate-900/20 opacity-70"></div>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="relative w-9 sm:w-10 flex-1 flex items-end">
              <div className="flex flex-col overflow-hidden bg-black/30 w-full h-16 border-slate-900/5 border rounded-full justify-end">
                <div className="bg-lime-300/40 w-full" style={{ height: "38%" }}></div>

                <div className="bg-lime-300/60 w-full" style={{ height: "24%" }}></div>
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-medium text-slate-900">
                52
              </div>
            </div>
            <span className="text-[11px] text-slate-800 font-medium">Fri</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-[11px] text-slate-800">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-lime-300/80 border border-slate-900/10"></span>
            <span className="">Minutes of focused study</span>
          </div>
          <p className="font-medium">
            Average per day:
            <span className="font-semibold">48 min</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressPillBarChartCard;
