import React from "react";

function UpcomingMeetings() {
  return (
    <div className="flex flex-col bg-white rounded-3xl pt-5 pr-6 pb-5 pl-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <h2 className="text-xl sm:text-[22px] tracking-tight font-semibold text-slate-900">
            Upcoming meetings
          </h2>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              data-lucide="phone"
              className="lucide lucide-phone w-3.5 h-3.5"
            >
              <path
                d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
                className=""
              ></path>
            </svg>
            <span>4 calls • Tue, 19</span>
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition">
          September
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            data-lucide="chevron-down"
            className="lucide lucide-chevron-down w-3.5 h-3.5"
          >
            <path d="m6 9 6 6 6-6" className=""></path>
          </svg>
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between gap-1">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-slate-50 flex flex-col items-center justify-center text-[11px] text-slate-700">
            <span className="font-medium">08</span>
            <span className="text-[10px]">Sun</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-slate-50 flex flex-col items-center justify-center text-[11px] text-slate-700">
            <span className="font-medium">09</span>
            <span className="text-[10px]">Mon</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-slate-50 flex flex-col items-center justify-center text-[11px] text-slate-700">
            <span className="font-medium">10</span>
            <span className="text-[10px]">Tue</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-[#d6f14a] text-slate-900 flex flex-col items-center justify-center text-[11px] font-medium">
            <span>11</span>
            <span className="text-[10px]">Wed</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-slate-50 flex flex-col items-center justify-center text-[11px] text-slate-700">
            <span className="font-medium">12</span>
            <span className="text-[10px]">Thu</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-slate-50 flex flex-col items-center justify-center text-[11px] text-slate-700">
            <span className="font-medium">13</span>
            <span className="text-[10px]">Fri</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full w-2/5 bg-slate-900"></div>
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-400">
          <span>09:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span className="">18:00</span>
        </div>
      </div>
    </div>
  );
}

export default UpcomingMeetings;
