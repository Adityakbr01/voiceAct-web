"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
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
import { mapTrafficSources } from "@/lib/analytics-mappers";
import { useAdminDashboardStats } from "@/hooks/use-admin-analytics";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface AnalyticsDashboardViewProps {
  activeTabRoute?: string;
}

export function AnalyticsDashboardView({ activeTabRoute = "overview" }: AnalyticsDashboardViewProps) {
  const searchParams = useSearchParams();
  const currentTab = activeTabRoute || searchParams.get("tab") || "overview";

  const { theme, toggleTheme } = useTheme();
  const themeMode = theme;
  const isDark = themeMode === "dark";

  // --- Filter States ---
  const [dateRange, setDateRange] = useState("30d");
  const { data: dashboardStats, refetch: refetchStats } = useAdminDashboardStats(dateRange);
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedDevice, setSelectedDevice] = useState("All Devices");

  // --- Realtime & Refresh States ---
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(30);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

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
    { dependencies: [currentTab] }
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    void refetchStats().finally(() => {
      setLastRefreshed(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    });
  };

  const liveMetrics = dashboardStats
    ? {
        visitors: dashboardStats.tracking.stats.totalVisitors,
        sessions: dashboardStats.tracking.stats.totalSessions,
        inquiries: dashboardStats.contacts.total,
        projects: dashboardStats.projects.total,
        services: dashboardStats.services.active,
      }
    : undefined;

  const liveTrafficSources = dashboardStats?.tracking.sources.length
    ? mapTrafficSources(dashboardStats.tracking.sources)
    : [];

  const liveRecentContacts = dashboardStats?.recentContacts;
  const realtimeCount = dashboardStats?.tracking.realtime?.activeSessions ?? 0;

  const handleExportJSON = () => {
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(JSON.stringify(dashboardStats ?? {}, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `analytics_export_${dateRange}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportOpen(false);
  };

  return (
    <div className="space-y-8 font-sans">
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
        {/* 1. OVERVIEW */}
        {currentTab === "overview" && (
          <>
            <RealtimeVisitorsBanner realtimeCount={realtimeCount} themeMode={themeMode} />
            <KPISummaryCards themeMode={themeMode} liveMetrics={liveMetrics} />
            <TrafficOverviewChart themeMode={themeMode} timeSeries={dashboardStats?.tracking.timeSeries} />
            <TrafficSourcesSection themeMode={themeMode} sources={liveTrafficSources} />
            <RecentConversionsTable themeMode={themeMode} contacts={liveRecentContacts} />
          </>
        )}

        {/* 2. TRAFFIC & SOURCES */}
        {currentTab === "traffic" && (
          <>
            <TrafficOverviewChart themeMode={themeMode} timeSeries={dashboardStats?.tracking.timeSeries} />
            <TrafficSourcesSection themeMode={themeMode} sources={liveTrafficSources} />
          </>
        )}

        {/* 3. CAMPAIGNS & ROI */}
        {currentTab === "campaigns" && (
          <>
            <CampaignAnalyticsTable selectedSource={selectedSource} themeMode={themeMode} />
          </>
        )}

        {/* 4. CONVERSION FUNNEL */}
        {currentTab === "funnel" && (
          <>
            <ConversionFunnelSection
              themeMode={themeMode}
              funnel={dashboardStats?.tracking.funnel}
              contactsSummary={dashboardStats?.contacts}
            />
          </>
        )}

        {/* 5. GEO & TECHNOLOGY */}
        {currentTab === "geography" && (
          <>
            <LandingPagesGeoSection
              themeMode={themeMode}
              landingPages={dashboardStats?.tracking.landingPages}
              countries={dashboardStats?.tracking.countries}
            />
            <TechDeviceSection
              themeMode={themeMode}
              devices={dashboardStats?.tracking.devices}
              browsers={dashboardStats?.tracking.browsers}
            />
          </>
        )}

        {/* 6. LEADS & CONVERSIONS */}
        {currentTab === "conversions" && (
          <>
            <RecentConversionsTable themeMode={themeMode} contacts={liveRecentContacts} />
          </>
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
    </div>
  );
}
