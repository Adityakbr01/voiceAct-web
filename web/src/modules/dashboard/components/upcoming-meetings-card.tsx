"use client";

import React, { useState } from "react";
import { Phone, ChevronDown, Calendar, Clock, Video, ArrowRight } from "lucide-react";

interface UpcomingMeetingsCardProps {
  themeMode?: "dark" | "light";
}

const SCHEDULE_DAYS = [
  { day: "08", name: "Sun" },
  { day: "09", name: "Mon" },
  { day: "10", name: "Tue" },
  { day: "11", name: "Wed", isSelected: true },
  { day: "12", name: "Thu" },
  { day: "13", name: "Fri" },
];

const UPCOMING_CALL_SESSIONS = [
  {
    id: "1",
    time: "10:30 AM",
    client: "Sarah Jenkins",
    company: "Acme Corp",
    type: "AI Voice Demo",
    avatarBg: "bg-emerald-500/20 text-emerald-500",
    status: "In 15 mins",
  },
  {
    id: "2",
    time: "02:15 PM",
    client: "David Miller",
    company: "TechScale Inc",
    type: "API SLA Consultation",
    avatarBg: "bg-cyan-500/20 text-cyan-500",
    status: "Today",
  },
];

export function UpcomingMeetingsCard({ themeMode = "dark" }: UpcomingMeetingsCardProps) {
  const isDark = themeMode === "dark";
  const [selectedDay, setSelectedDay] = useState("11");

  return (
    <div
      className={`flex flex-col justify-between rounded-3xl p-6 font-['Space_Grotesk',sans-serif] transition-all duration-300 ${
        isDark ? "bg-[#15181E] text-[#F4F2F2]" : "bg-white text-slate-900"
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-xl sm:text-[22px] tracking-tight font-extrabold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>
              Upcoming meetings
            </h2>
            <p className={`text-xs mt-1 flex items-center gap-1.5 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              <Phone className="w-3.5 h-3.5 text-lime-500" />
              <span>4 calls • Tue, 19</span>
            </p>
          </div>

          <button
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
              isDark
                ? "bg-[#212630] text-[#F4F2F2] hover:bg-slate-700"
                : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Calendar className="w-3 h-3 text-lime-500" />
            <span>September</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>

        {/* Days Row */}
        <div className="mt-2 flex items-center justify-between gap-1.5">
          {SCHEDULE_DAYS.map((item) => {
            const isActive = selectedDay === item.day;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className="flex-1 flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <div
                  className={`w-11 h-11 rounded-full flex flex-col items-center justify-center text-[11px] transition-all duration-300 ${
                    isActive
                      ? "bg-[#d6f14a] text-slate-950 font-bold shadow-md shadow-[#d6f14a]/20 scale-105"
                      : isDark
                      ? "bg-[#212630] text-slate-300 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span className="font-bold font-mono">{item.day}</span>
                  <span className="text-[9px] font-medium">{item.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress Line & Time Markers */}
        <div className="mt-5">
          <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-[#212630]" : "bg-slate-100"}`}>
            <div className="h-full w-2/5 bg-[#d6f14a] rounded-full transition-all duration-500" />
          </div>
          <div className={`mt-2 flex justify-between text-[10px] font-mono font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            <span>09:00</span>
            <span>12:00</span>
            <span>15:00</span>
            <span>18:00</span>
          </div>
        </div>

        {/* Next Scheduled Meetings Feed (Fills Empty Space Perfectly) */}
        <div className="mt-5 space-y-2.5">
          <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Scheduled Voice Sessions
          </span>
          {UPCOMING_CALL_SESSIONS.map((session) => (
            <div
              key={session.id}
              className={`p-3 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                isDark ? "bg-[#212630] hover:bg-[#282f3c]" : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${session.avatarBg}`}>
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{session.client}</h4>
                  <p className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {session.company} • <span className="text-lime-500 font-medium">{session.type}</span>
                  </p>
                </div>
              </div>

              <div className="text-right flex items-center gap-2">
                <div>
                  <span className={`text-xs font-mono font-bold block ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{session.time}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-lime-500/10 text-lime-600 font-bold border border-lime-500/20">
                    {session.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className={`mt-4 pt-3 flex items-center justify-between text-[11px] border-t ${
        isDark ? "border-[#212630] text-slate-400" : "border-slate-100 text-slate-600"
      }`}>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-lime-500" /> Total 2.5 hrs calls today
        </span>
        <button className="text-lime-500 hover:text-lime-400 font-bold text-xs flex items-center gap-1 cursor-pointer">
          View All Schedule <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
