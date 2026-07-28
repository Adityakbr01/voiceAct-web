"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";
import { useAdminAuth } from "./admin-auth-provider";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { admin, logout } = useAdminAuth();
  const pathname = usePathname();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen font-sans ${
        isDark ? "bg-[#000000] text-[#ededed]" : "bg-slate-50 text-slate-900"
      }`}
    >
      <React.Suspense fallback={<div className="w-64 h-screen bg-[#0a0a0a]" />}>
        <DashboardSidebar
          themeMode={theme}
          onToggleTheme={toggleTheme}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          adminName={admin?.name}
          onLogout={logout}
          activePath={pathname ?? ""}
        />
      </React.Suspense>
      <main
        className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"} min-h-screen p-6 md:p-8`}
      >
        {children}
      </main>
    </div>
  );
}
