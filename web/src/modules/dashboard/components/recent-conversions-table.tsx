"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { MOCK_RECENT_CONVERSIONS } from "@/constants/analytics-mock-data";

import type { ContactInquiry } from "@/lib/types/cms";

interface RecentConversionsTableProps {
  themeMode?: "dark" | "light";
  contacts?: Pick<ContactInquiry, "_id" | "name" | "email" | "service" | "status" | "createdAt">[];
}
function mapContactsToRows(
  contacts: Pick<ContactInquiry, "_id" | "name" | "email" | "service" | "status" | "createdAt">[]
) {
  return contacts.map((contact) => ({
    id: contact._id,
    time: new Date(contact.createdAt).toLocaleString(),
    leadName: contact.name,
    company: "—",
    campaign: "—",
    source: "Website",
    service: contact.service ?? "General",
    revenue: 0,
    status: contact.status,
  }));
}

export function RecentConversionsTable({ themeMode = "dark", contacts }: RecentConversionsTableProps) {
  const isDark = themeMode === "dark";
  const rows = contacts?.length ? mapContactsToRows(contacts) : MOCK_RECENT_CONVERSIONS;

  return (
    <section className={`p-6 rounded-3xl space-y-4 font-['Space_Grotesk',sans-serif] ${
      isDark ? "bg-[#15181E]" : "bg-white"
    }`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
          isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"
        }`}>
          <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Recent Conversions Log
        </h2>
        <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Live conversion events</span>
      </div>

      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-xs">
          <thead className={`font-semibold uppercase text-[10px] ${
            isDark ? "bg-[#212630] text-slate-400" : "bg-slate-100 text-slate-600"
          }`}>
            <tr>
              <th className="p-3">Time</th>
              <th className="p-3">Lead Name</th>
              <th className="p-3">Company</th>
              <th className="p-3">Campaign</th>
              <th className="p-3">Source</th>
              <th className="p-3">Service</th>
              <th className="p-3">Revenue</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDark ? "divide-[#212630] bg-[#15181E]" : "divide-slate-100 bg-white"
          }`}>
            {rows.map((cnv) => (
              <tr key={cnv.id} className={`transition ${isDark ? "hover:bg-[#212630]/60" : "hover:bg-slate-50"}`}>
                <td className={`p-3 font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>{cnv.time}</td>
                <td className={`p-3 font-bold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{cnv.leadName}</td>
                <td className={`p-3 ${isDark ? "text-slate-300" : "text-slate-700"}`}>{cnv.company}</td>
                <td className={`p-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{cnv.campaign}</td>
                <td className={`p-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{cnv.source}</td>
                <td className="p-3 font-medium text-lime-600">{cnv.service}</td>
                <td className="p-3 font-mono font-bold text-emerald-500">
                  {typeof cnv.revenue === "number" ? `$${cnv.revenue.toLocaleString()}` : cnv.revenue}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      cnv.status === "Won"
                        ? "bg-emerald-500/20 text-emerald-600"
                        : cnv.status === "Qualified"
                        ? "bg-cyan-500/20 text-cyan-600"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {cnv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
