"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart2,
  TrendingUp,
  Target,
  Globe,
  Users,
  ChevronLeft,
  ChevronRight,
  Zap,
  PhoneCall,
  SlidersHorizontal,
} from "lucide-react";

interface DashboardSidebarProps {
  themeMode: "dark" | "light";
  onToggleTheme: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function DashboardSidebar({
  themeMode,
  isCollapsed,
  setIsCollapsed,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const isDark = themeMode === "dark";

  const navItems = [
    {
      group: "ANALYTICS",
      items: [
        { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/admin/analytics/overview" },
        { id: "traffic", label: "Traffic & Sources", icon: BarChart2, href: "/admin/analytics/traffic" },
        { id: "campaigns", label: "Campaigns & ROI", icon: TrendingUp, href: "/admin/analytics/campaigns" },
        { id: "funnel", label: "Conversion Funnel", icon: Target, href: "/admin/analytics/funnel" },
        { id: "geography", label: "Geo & Technology", icon: Globe, href: "/admin/analytics/geography" },
        { id: "conversions", label: "Leads & Conversions", icon: Users, href: "/admin/analytics/conversions" },
      ],
    },
    {
      group: "MANAGEMENT",
      items: [
        { id: "calls", label: "Voice AI Calls", icon: PhoneCall, href: "/admin/analytics/calls" },
        { id: "settings", label: "Dashboard Settings", icon: SlidersHorizontal, href: "/admin/analytics/settings" },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen shrink-0 flex flex-col justify-between transition-all duration-300 ease-out font-['Space_Grotesk',sans-serif] ${
        isCollapsed ? "w-20" : "w-64"
      } ${
        isDark
          ? "bg-[#15181E] border-[#2A2F38] text-slate-300"
          : "bg-white border-slate-200 text-slate-800 shadow-sm"
      } border-r overflow-y-auto p-4 select-none z-40`}
    >
      {/* Top Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#d6f14a] flex items-center justify-center text-slate-950 font-bold shadow-md shadow-[#d6f14a]/20 hover:scale-105 transition-transform duration-300">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h1 className={`font-extrabold text-sm tracking-tight ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>VoiceAct</h1>
                <p className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>Admin Analytics</p>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-9 h-9 rounded-xl bg-[#d6f14a] flex items-center justify-center text-slate-950 font-bold mx-auto hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 fill-current" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1.5 rounded-lg transition-all duration-300 ml-auto cursor-pointer hover:scale-105 ${
              isDark
                ? "bg-[#212630] hover:bg-slate-700 text-slate-400 hover:text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-6 pt-2">
          {navItems.map((section) => (
            <div key={section.group} className="space-y-2">
              {!isCollapsed && (
                <span className={`text-[10px] font-bold tracking-wider uppercase px-3 block mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                  {section.group}
                </span>
              )}
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (pathname === "/admin/analytics" && item.id === "overview");
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      title={isCollapsed ? item.label : undefined}
                      className={`group relative w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ease-out cursor-pointer ${
                        isActive
                          ? isDark
                            ? "bg-[#d6f14a]/10 text-[#d6f14a] border border-[#d6f14a]/30 shadow-md shadow-[#d6f14a]/10"
                            : "bg-[#d6f14a] text-slate-950 font-bold border border-[#d6f14a] shadow-md shadow-[#d6f14a]/20"
                          : isDark
                          ? "hover:bg-[#212630] hover:text-[#d6f14a] text-slate-300 border border-transparent"
                          : "hover:bg-slate-100 hover:text-slate-900 text-slate-700 border border-transparent"
                      } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 ease-out group-hover:scale-110 ${
                        isActive
                          ? isDark ? "text-[#d6f14a]" : "text-slate-950"
                          : isDark ? "text-slate-400 group-hover:text-[#d6f14a]" : "text-slate-500 group-hover:text-slate-900"
                      }`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Profile */}
      <div className={`pt-4 border-t space-y-3 ${isDark ? "border-[#2A2F38]" : "border-slate-200"}`}>
        <div className={`flex items-center gap-3 px-1 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center font-bold text-white text-xs shrink-0 hover:scale-105 transition-transform duration-300">
            AD
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <span className={`text-xs font-bold block truncate ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>Aditya Admin</span>
              <span className={`text-[10px] block truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>Super Admin</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
