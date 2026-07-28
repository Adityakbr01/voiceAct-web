"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
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
    time: new Date(contact.createdAt).toLocaleDateString() + " " + new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    leadName: contact.name,
    email: contact.email,
    service: contact.service ?? "General",
    status: contact.status,
  }));
}

export function RecentConversionsTable({ themeMode = "dark", contacts = [] }: RecentConversionsTableProps) {
  const isDark = themeMode === "dark";
  const rows = mapContactsToRows(contacts);

  return (
    <section className={`p-6 rounded-none space-y-4 font-sans border ${
      isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
    }`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
          isDark ? "text-[#ededed]" : "text-slate-900"
        }`}>
          <CheckCircle2 className="w-5 h-5 text-white" /> Recent Contact Submissions
        </h2>
        <span className={`text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>Live database inquiries</span>
      </div>

      <div className="overflow-x-auto rounded-none border border-[#1f1f1f]">
        <table className="w-full text-left text-xs">
          <thead className={`font-semibold uppercase text-[10px] ${
            isDark ? "bg-[#111111] text-[#a1a1a1]" : "bg-slate-100 text-slate-600"
          }`}>
            <tr>
              <th className="p-3">Time</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Service</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDark ? "divide-[#1f1f1f] bg-[#0a0a0a]" : "divide-slate-100 bg-white"
          }`}>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className={`p-4 text-center ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>
                  No recent contacts found.
                </td>
              </tr>
            ) : (
              rows.map((cnv) => (
                <tr key={cnv.id} className={`transition ${isDark ? "hover:bg-[#111111]" : "hover:bg-slate-50"}`}>
                  <td className={`p-3 font-mono ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>{cnv.time}</td>
                  <td className={`p-3 font-bold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{cnv.leadName}</td>
                  <td className={`p-3 ${isDark ? "text-[#ededed]" : "text-slate-700"}`}>{cnv.email}</td>
                  <td className={`p-3 font-medium ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{cnv.service}</td>
                  <td className="p-3 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-none text-[10px] font-bold capitalize border ${
                        cnv.status === "new"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : cnv.status === "replied"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {cnv.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
