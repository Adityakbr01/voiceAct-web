"use client";

import React, { useState, useMemo } from "react";
import { DollarSign, Search } from "lucide-react";

export interface CampaignItem {
  id: string;
  name: string;
  source: string;
  medium: string;
  clicks: number;
  conversions: number;
  cost: number;
  revenue: number;
  roi: number;
  status: string;
}

interface CampaignAnalyticsTableProps {
  selectedSource: string;
  themeMode?: "dark" | "light";
  campaigns?: CampaignItem[];
}

export function CampaignAnalyticsTable({
  selectedSource,
  themeMode = "dark",
  campaigns = [],
}: CampaignAnalyticsTableProps) {
  const isDark = themeMode === "dark";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((cmp) => {
      const matchesSearch =
        cmp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmp.source.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource =
        selectedSource === "All Sources" ||
        cmp.source.toLowerCase().includes(selectedSource.toLowerCase());
      return matchesSearch && matchesSource;
    });
  }, [campaigns, searchQuery, selectedSource]);

  return (
    <section className={`p-7 rounded-none border shadow-sm space-y-6 font-sans ${
      isDark ? "bg-[#0a0a0a] border-[#1f1f1f]" : "bg-white border-slate-200"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>
            <DollarSign className="w-5 h-5 text-emerald-500" /> Campaign Performance
          </h2>
          <p className={`text-xs mt-1 font-medium ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>
            Tracked marketing campaigns & lead attribution.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`} />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`text-xs pl-10 pr-4 py-2.5 rounded-none border focus:outline-none ${
              isDark
                ? "bg-[#111111] border-[#1f1f1f] text-[#ededed] focus:border-white"
                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-800"
            }`}
          />
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-none border ${isDark ? "border-[#1f1f1f]" : "border-slate-200"}`}>
        <table className="w-full text-left text-xs">
          <thead className={`font-bold uppercase text-[10px] tracking-wider ${
            isDark ? "bg-[#111111] text-[#a1a1a1]" : "bg-slate-100 text-slate-600"
          }`}>
            <tr>
              <th className="px-5 py-4">Campaign</th>
              <th className="px-5 py-4">Source / Medium</th>
              <th className="px-5 py-4">Clicks</th>
              <th className="px-5 py-4">Conversions</th>
              <th className="px-5 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDark ? "divide-[#1f1f1f] bg-[#0a0a0a]" : "divide-slate-200 bg-white"
          }`}>
            {filteredCampaigns.length === 0 ? (
              <tr>
                <td colSpan={5} className={`p-6 text-center ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>
                  No active campaigns tracked yet.
                </td>
              </tr>
            ) : (
              filteredCampaigns.map((cmp) => (
                <tr key={cmp.id} className={`transition ${isDark ? "hover:bg-[#111111]" : "hover:bg-slate-50"}`}>
                  <td className={`px-5 py-4 font-bold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{cmp.name}</td>
                  <td className={`px-5 py-4 font-medium ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}>{cmp.source} / {cmp.medium}</td>
                  <td className={`px-5 py-4 font-mono font-semibold ${isDark ? "text-[#ededed]" : "text-slate-700"}`}>{cmp.clicks.toLocaleString()}</td>
                  <td className={`px-5 py-4 font-mono font-extrabold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>{cmp.conversions}</td>
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider border ${
                        cmp.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : isDark
                          ? "bg-[#1f1f1f] text-[#a1a1a1] border-[#333333]"
                          : "bg-slate-100 text-slate-600 border-slate-300"
                      }`}
                    >
                      {cmp.status}
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
