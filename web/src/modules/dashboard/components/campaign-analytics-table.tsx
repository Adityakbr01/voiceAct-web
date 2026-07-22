"use client";

import React, { useState, useMemo } from "react";
import { DollarSign, Search } from "lucide-react";
import { MOCK_CAMPAIGNS, CampaignItem } from "@/constants/analytics-mock-data";

interface CampaignAnalyticsTableProps {
  selectedSource: string;
  themeMode?: "dark" | "light";
}

export function CampaignAnalyticsTable({ selectedSource, themeMode = "dark" }: CampaignAnalyticsTableProps) {
  const isDark = themeMode === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignSortField, setCampaignSortField] = useState<keyof CampaignItem>("roi");
  const [campaignSortAsc, setCampaignSortAsc] = useState(false);

  // Filtered Campaigns List
  const filteredCampaigns = useMemo(() => {
    return MOCK_CAMPAIGNS.filter((cmp) => {
      const matchesSearch =
        cmp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmp.source.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource =
        selectedSource === "All Sources" ||
        cmp.source.toLowerCase().includes(selectedSource.toLowerCase());
      return matchesSearch && matchesSource;
    }).sort((a, b) => {
      const valA = a[campaignSortField];
      const valB = b[campaignSortField];
      if (typeof valA === "number" && typeof valB === "number") {
        return campaignSortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });
  }, [searchQuery, selectedSource, campaignSortField, campaignSortAsc]);

  const highestRoiCampaign = useMemo(() => {
    return [...MOCK_CAMPAIGNS].sort((a, b) => b.roi - a.roi)[0];
  }, []);

  const highestRevenueCampaign = useMemo(() => {
    return [...MOCK_CAMPAIGNS].sort((a, b) => b.revenue - a.revenue)[0];
  }, []);

  return (
    <section className={`p-6 rounded-3xl border shadow-sm space-y-6 font-['Space_Grotesk',sans-serif] ${
      isDark ? "bg-[#15181E] border-[#2A2F38]" : "bg-white border-slate-200"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-[#F4F2F2]" : "text-[#1D2128]"}`}>
            <DollarSign className="w-5 h-5 text-[#84cc16]" /> Campaign Performance & ROI
          </h2>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Detailed campaign metrics, revenue, cost, CPL, CPA and ROI stats.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`text-xs pl-9 pr-4 py-2 rounded-xl border focus:outline-none ${
              isDark
                ? "bg-[#212630] border-[#2A2F38] text-[#F4F2F2] focus:border-[#d6f14a]"
                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-lime-500"
            }`}
          />
        </div>
      </div>

      {/* ROI Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block">Highest ROI Campaign</span>
            <span className={`text-base font-bold mt-1 block ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{highestRoiCampaign?.name}</span>
            <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>ROI: {highestRoiCampaign?.roi}%</span>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-emerald-500 font-mono">${highestRoiCampaign?.revenue.toLocaleString()}</span>
            <span className={`text-xs block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Revenue</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wider block">Top Revenue Generator</span>
            <span className={`text-base font-bold mt-1 block ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{highestRevenueCampaign?.name}</span>
            <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Conversions: {highestRevenueCampaign?.conversions}</span>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-cyan-500 font-mono">${highestRevenueCampaign?.revenue.toLocaleString()}</span>
            <span className={`text-xs block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Revenue</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-2xl border ${isDark ? "border-[#2A2F38]" : "border-slate-200"}`}>
        <table className="w-full text-left text-xs">
          <thead className={`font-semibold uppercase text-[10px] tracking-wider ${
            isDark ? "bg-[#212630] text-slate-400" : "bg-slate-100 text-slate-600"
          }`}>
            <tr>
              <th className="p-3">Campaign</th>
              <th className="p-3">Source / Medium</th>
              <th className="p-3 cursor-pointer" onClick={() => { setCampaignSortField("clicks"); setCampaignSortAsc(!campaignSortAsc); }}>Clicks</th>
              <th className="p-3 cursor-pointer" onClick={() => { setCampaignSortField("conversions"); setCampaignSortAsc(!campaignSortAsc); }}>Conversions</th>
              <th className="p-3 cursor-pointer" onClick={() => { setCampaignSortField("cost"); setCampaignSortAsc(!campaignSortAsc); }}>Cost</th>
              <th className="p-3 cursor-pointer" onClick={() => { setCampaignSortField("revenue"); setCampaignSortAsc(!campaignSortAsc); }}>Revenue</th>
              <th className="p-3 cursor-pointer" onClick={() => { setCampaignSortField("roi"); setCampaignSortAsc(!campaignSortAsc); }}>ROI</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDark ? "divide-[#2A2F38] bg-[#15181E]" : "divide-slate-200 bg-white"
          }`}>
            {filteredCampaigns.map((cmp) => (
              <tr key={cmp.id} className={`transition ${isDark ? "hover:bg-[#212630]/60" : "hover:bg-slate-50"}`}>
                <td className={`p-3 font-semibold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{cmp.name}</td>
                <td className={`p-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{cmp.source} / {cmp.medium}</td>
                <td className={`p-3 font-mono ${isDark ? "text-slate-300" : "text-slate-700"}`}>{cmp.clicks.toLocaleString()}</td>
                <td className="p-3 font-mono font-semibold text-lime-600">{cmp.conversions}</td>
                <td className={`p-3 font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>${cmp.cost.toLocaleString()}</td>
                <td className={`p-3 font-mono font-bold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>${cmp.revenue.toLocaleString()}</td>
                <td className="p-3 font-mono font-bold text-emerald-500">{cmp.roi}%</td>
                <td className="p-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      cmp.status === "Active"
                        ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                        : cmp.status === "Paused"
                        ? "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {cmp.status}
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
