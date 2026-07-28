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
  Briefcase,
  Layers,
} from "lucide-react";

interface DashboardSidebarProps {
  themeMode: "dark" | "light";
  onToggleTheme: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  adminName?: string;
  onLogout?: () => void;
  activePath?: string;
}

export function DashboardSidebar({
  themeMode,
  isCollapsed,
  setIsCollapsed,
  adminName = "Admin",
  onLogout,
  activePath,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const currentPath = activePath || pathname || "";
  const isDark = themeMode === "dark";

  const navItems = [
    {
      group: "DASHBOARD",
      items: [
        { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/admin/overview" },
        { id: "contacts", label: "Inquiries & Leads", icon: Users, href: "/admin/contacts" },
      ],
    },
    {
      group: "ANALYTICS",
      items: [
        { id: "traffic", label: "Traffic & Sources", icon: BarChart2, href: "/admin/traffic" },
        { id: "funnel", label: "Conversion Funnel", icon: Target, href: "/admin/funnel" },
        { id: "campaigns", label: "Campaigns & ROI", icon: TrendingUp, href: "/admin/campaigns" },
        { id: "geography", label: "Geo & Technology", icon: Globe, href: "/admin/geography" },
      ],
    },
    {
      group: "CONTENT CMS",
      items: [
        { id: "projects", label: "Projects", icon: Briefcase, href: "/admin/projects" },
        { id: "services", label: "Services", icon: Layers, href: "/admin/services" },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen shrink-0 flex flex-col justify-between transition-all duration-300 ease-out font-sans ${
        isCollapsed ? "w-20" : "w-64"
      } ${
        isDark
          ? "bg-[#0a0a0a] border-[#1f1f1f] text-[#a1a1a1]"
          : "bg-white border-slate-200 text-slate-800 shadow-sm"
      } border-r overflow-y-auto p-4 select-none z-40`}
    >
      {/* Top Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-none bg-white text-black flex items-center justify-center font-bold shadow-sm hover:scale-105 transition-transform duration-300">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h1 className={`font-bold text-sm tracking-tight ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>VoiceAct</h1>
                <p className={`text-[10px] font-medium ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>Admin Analytics</p>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-9 h-9 rounded-none bg-white text-black flex items-center justify-center font-bold mx-auto hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 fill-current" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1.5 rounded-none transition-all duration-300 ml-auto cursor-pointer hover:scale-105 ${
              isDark
                ? "bg-[#1f1f1f] hover:bg-slate-800 text-[#a1a1a1] hover:text-white"
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
                  isDark ? "text-[#a1a1a1]" : "text-slate-500"
                }`}>
                  {section.group}
                </span>
              )}
              <div className="space-y-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      title={isCollapsed ? item.label : undefined}
                      className={`group relative w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-none text-xs font-semibold transition-all duration-200 ease-out cursor-pointer ${
                        isActive
                          ? isDark
                            ? "bg-[#1f1f1f] text-white border border-[#333333] shadow-sm"
                            : "bg-black text-white font-bold border border-black shadow-sm"
                          : isDark
                          ? "hover:bg-[#1f1f1f]/60 hover:text-white text-[#a1a1a1] border border-transparent"
                          : "hover:bg-slate-100 hover:text-slate-900 text-slate-700 border border-transparent"
                      } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 ease-out group-hover:scale-110 ${
                        isActive
                          ? "text-white"
                          : isDark ? "text-[#a1a1a1] group-hover:text-white" : "text-slate-500 group-hover:text-slate-900"
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
      <div className={`pt-4 border-t space-y-3 ${isDark ? "border-[#1f1f1f]" : "border-slate-200"}`}>
        <div className={`flex items-center gap-3 px-1 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-none bg-[#1f1f1f] border border-[#333333] flex items-center justify-center font-bold text-white text-xs shrink-0 hover:scale-105 transition-transform duration-300">
            AD
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <span className={`text-xs font-bold block truncate ${isDark ? "text-[#ededed]" : "text-slate-900"}`}>
                {adminName}
              </span>
              <span className={`text-[10px] block truncate ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}>
                Admin
              </span>
            </div>
          )}
        </div>
        {onLogout && !isCollapsed && (
          <button
            type="button"
            onClick={onLogout}
            className={`w-full rounded-none px-3 py-2 text-xs font-semibold transition-colors ${
              isDark ? "bg-[#1f1f1f] hover:bg-[#2e2e2e] text-[#ededed]" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Sign out
          </button>
        )}
      </div>
    </aside>
  );
}
