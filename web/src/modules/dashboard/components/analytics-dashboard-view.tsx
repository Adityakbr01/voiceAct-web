"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { GlobalFiltersBar } from "./global-filters-bar";
import { RealtimeVisitorsBanner } from "./realtime-visitors-banner";
import { KPISummaryCards } from "./kpi-summary-cards";
import { TrafficOverviewChart } from "./traffic-overview-chart";
import { TrafficSourcesSection } from "./traffic-sources-section";
import { ConversionFunnelSection } from "./conversion-funnel-section";
import { CampaignAnalyticsTable } from "./campaign-analytics-table";
import { LandingPagesGeoSection } from "./landing-pages-geo-section";
import { TechDeviceSection } from "./tech-device-section";
import { RecentConversionsTable } from "./recent-conversions-table";
import { DashboardSettingsModal } from "./dashboard-settings-modal";
import { ProgressPillChartCard } from "./progress-pill-chart-card";
import { UpcomingMeetingsCard } from "./upcoming-meetings-card";
import { BillingPeriodToggleCard } from "./billing-period-toggle-card";
import { MOCK_CAMPAIGNS, MOCK_TRAFFIC_SOURCES } from "@/constants/analytics-mock-data";
import { Globe, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface AnalyticsDashboardViewProps {
  activeTabRoute?: string;
}

export function AnalyticsDashboardView({ activeTabRoute = "overview" }: AnalyticsDashboardViewProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Global Persistent Theme Provider
  const { theme, toggleTheme } = useTheme();
  const themeMode = theme;
  const isDark = themeMode === "dark";

  // --- Filter States ---
  const [dateRange, setDateRange] = useState("30d");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedDevice, setSelectedDevice] = useState("All Devices");

  // --- Realtime & Refresh States ---
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(30);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");
  const [realtimeCount, setRealtimeCount] = useState(42);

  // --- Modals ---
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const mainContentRef = useRef<HTMLDivElement>(null);

  const [widgetVisibility, setWidgetVisibility] = useState<Record<string, boolean>>({
    kpiCards: true,
    realtimeFeed: true,
    trafficOverview: true,
    trafficSources: true,
    leadAnalytics: true,
    conversionFunnel: true,
    campaignsTable: true,
    landingPages: true,
    geographyTech: true,
    recentConversions: true,
  });

  useEffect(() => {
    setLastRefreshed(new Date().toLocaleTimeString());
  }, []);

  // GSAP Smooth Easing entrance animation whenever activeTabRoute changes
  useGSAP(
    () => {
      if (!mainContentRef.current) return;
      const children = mainContentRef.current.children;
      if (children.length > 0) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          }
        );
      }
    },
    { dependencies: [activeTabRoute] }
  );

  // Realtime Live Counter simulation
  useEffect(() => {
    if (autoRefreshInterval === 0) return;
    const interval = setInterval(() => {
      setRealtimeCount((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(25, prev + delta);
      });
      setLastRefreshed(new Date().toLocaleTimeString());
    }, autoRefreshInterval * 1000);
    return () => clearInterval(interval);
  }, [autoRefreshInterval]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRealtimeCount(Math.floor(Math.random() * 15) + 38);
      setLastRefreshed(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 600);
  };

  const handleExportJSON = () => {
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(JSON.stringify(MOCK_CAMPAIGNS, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `analytics_campaigns_${dateRange}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportOpen(false);
  };

  // Top ROI campaign for quick summary card
  const topRoiCampaign = MOCK_CAMPAIGNS[0];
  const topSource = MOCK_TRAFFIC_SOURCES[0];

  return (
    <div
      className={`min-h-screen w-full font-['Space_Grotesk',sans-serif] transition-colors duration-300 ${
        isDark ? "bg-[#1D2128] text-[#F4F2F2]" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* 1. Left Sidebar */}
      <DashboardSidebar
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* 2. Main Content Area */}
      <main
        style={{
          marginLeft: isCollapsed ? "80px" : "264px",
          width: isCollapsed ? "calc(100% - 80px)" : "calc(100% - 264px)",
        }}
        className="min-h-screen p-4 md:p-8 space-y-8 transition-all duration-300 ease-out"
      >
        {/* Header */}
        <DashboardHeader
          lastRefreshed={lastRefreshed}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          themeMode={themeMode}
          onToggleTheme={toggleTheme}
          isExportOpen={isExportOpen}
          onToggleExport={() => setIsExportOpen(!isExportOpen)}
          onExportJSON={handleExportJSON}
          onPrintPDF={() => window.print()}
          onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        />

        {/* Global Filters Bar */}
        <GlobalFiltersBar
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          themeMode={themeMode}
        />

        {/* Dynamic Route View */}
        <div ref={mainContentRef} className="space-y-8">
          {/* 1. OVERVIEW (Clean, Minimal, Executive with new visual components) */}
          {activeTabRoute === "overview" && (
            <>
              <RealtimeVisitorsBanner realtimeCount={realtimeCount} themeMode={themeMode} />
           
              {/* Progress Pill Bar Chart & Upcoming Meetings Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProgressPillChartCard themeMode={themeMode} />
                <UpcomingMeetingsCard themeMode={themeMode} />
              </div>

              <TrafficOverviewChart themeMode={themeMode} />

                 <KPISummaryCards themeMode={themeMode} />
              
              
              {/* Executive Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-3xl flex items-center justify-between ${
                  isDark ? "bg-[#15181E]" : "bg-white"
                }`}>
                  <div>
                    <span className="text-xs font-semibold text-lime-600 uppercase tracking-wider block flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" /> Top Performing Campaign
                    </span>
                    <h4 className={`text-lg font-bold mt-1 ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{topRoiCampaign.name}</h4>
                    <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{topRoiCampaign.source} • ROI {topRoiCampaign.roi}%</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-lime-600 font-mono">${topRoiCampaign.revenue.toLocaleString()}</span>
                    <span className={`text-xs block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Revenue</span>
                  </div>
                </div>

                <div className={`p-6 rounded-3xl flex items-center justify-between ${
                  isDark ? "bg-[#15181E]" : "bg-white"
                }`}>
                  <div>
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wider block flex items-center gap-1.5">
                      <Globe className="w-4 h-4" /> #1 Traffic Acquisition Channel
                    </span>
                    <h4 className={`text-lg font-bold mt-1 ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>{topSource.name}</h4>
                    <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{topSource.percentage}% total site visitors</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-cyan-500 font-mono">{topSource.visitors.toLocaleString()}</span>
                    <span className={`text-xs block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Visitors</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 2. TRAFFIC & SOURCES */}
          {activeTabRoute === "traffic" && (
            <>
              <ProgressPillChartCard themeMode={themeMode} />
              <TrafficOverviewChart themeMode={themeMode} />
              <TrafficSourcesSection themeMode={themeMode} />
            </>
          )}

          {/* 3. CAMPAIGNS & ROI */}
          {activeTabRoute === "campaigns" && (
            <>
              <BillingPeriodToggleCard themeMode={themeMode} />
              <CampaignAnalyticsTable selectedSource={selectedSource} themeMode={themeMode} />
            </>
          )}

          {/* 4. CONVERSION FUNNEL */}
          {activeTabRoute === "funnel" && (
            <>
              <ConversionFunnelSection themeMode={themeMode} />
            </>
          )}

          {/* 5. GEO & TECHNOLOGY */}
          {activeTabRoute === "geography" && (
            <>
              <LandingPagesGeoSection themeMode={themeMode} />
              <TechDeviceSection themeMode={themeMode} />
            </>
          )}

          {/* 6. LEADS & CONVERSIONS */}
          {activeTabRoute === "conversions" && (
            <>
              <RecentConversionsTable themeMode={themeMode} />
            </>
          )}

          {/* 7. VOICE AI CALLS */}
          {activeTabRoute === "calls" && (
            <>
              <UpcomingMeetingsCard themeMode={themeMode} />
              <section className={`p-8 rounded-3xl border text-center space-y-4 ${
                isDark ? "bg-[#15181E] border-[#2A2F38]" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <h3 className={`text-xl font-bold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>Voice AI Agent Call Logs</h3>
                <p className={`text-sm max-w-md mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Real-time speech analytics, call sentiment tracking, and transcript summaries.
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-lime-500/10 text-lime-600 font-semibold text-xs border border-lime-500/20">
                  System Active • 4 Calls in Progress
                </div>
              </section>
            </>
          )}

          {/* 8. SETTINGS */}
          {activeTabRoute === "settings" && (
            <section className={`p-8 rounded-3xl border space-y-6 max-w-xl mx-auto ${
              isDark ? "bg-[#15181E] border-[#2A2F38]" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className={`text-xl font-bold ${isDark ? "text-[#F4F2F2]" : "text-slate-900"}`}>Dashboard Preferences</h3>
              <div className="space-y-4 text-xs">
                <div className={`flex items-center justify-between p-4 rounded-2xl border ${
                  isDark ? "bg-[#212630] border-[#2A2F38]" : "bg-slate-50 border-slate-200"
                }`}>
                  <span className={isDark ? "text-slate-300" : "text-slate-700"}>Auto-Refresh Data</span>
                  <button
                    onClick={() => setAutoRefreshInterval(autoRefreshInterval === 0 ? 30 : 0)}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${
                      autoRefreshInterval > 0 ? "bg-[#d6f14a] text-slate-950" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {autoRefreshInterval > 0 ? `Every ${autoRefreshInterval}s` : "Disabled"}
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Settings Modal */}
        <DashboardSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          autoRefreshInterval={autoRefreshInterval}
          setAutoRefreshInterval={setAutoRefreshInterval}
          widgetVisibility={widgetVisibility}
          setWidgetVisibility={setWidgetVisibility}
          themeMode={themeMode}
        />
      </main>
    </div>
  );
}
