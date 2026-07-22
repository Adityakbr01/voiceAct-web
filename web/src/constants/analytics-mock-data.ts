export interface KPIMetric {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  change: number;
  isPositive: boolean;
  periodLabel: string;
  sparkline: number[];
  unit?: string;
  prefix?: string;
  category: "traffic" | "lead" | "financial";
}

export interface TrafficSeriesPoint {
  time: string;
  visitors: number;
  uniqueVisitors: number;
  sessions: number;
  pageViews: number;
}

export interface TrafficSourceItem {
  name: string;
  visitors: number;
  conversions: number;
  revenue: number;
  percentage: number;
  trend: number;
  color: string;
}

export interface CampaignItem {
  id: string;
  name: string;
  source: string;
  medium: string;
  clicks: number;
  impressions: number;
  ctr: number; // percentage
  conversions: number;
  revenue: number;
  cost: number;
  roi: number; // percentage
  cpl: number;
  cpa: number;
  status: "Active" | "Paused" | "Completed";
}

export interface ConversionFunnelStep {
  step: string;
  count: number;
  percentage: number;
  dropoffPercentage: number;
  color: string;
}

export interface LandingPageItem {
  path: string;
  visitors: number;
  bounceRate: number;
  avgTime: string;
  conversions: number;
  conversionRate: number;
  isBest?: boolean;
}

export interface GeographicItem {
  country: string;
  code: string;
  state?: string;
  city: string;
  visitors: number;
  conversions: number;
  revenue: number;
  flag: string;
}

export interface DeviceTechData {
  deviceTypes: { type: string; percentage: number; count: number; color: string }[];
  browsers: { name: string; percentage: number; count: number; color: string }[];
  operatingSystems: { name: string; percentage: number; count: number; color: string }[];
  screenResolutions: { resolution: string; count: number; percentage: number }[];
}

export interface RealtimeVisitor {
  id: string;
  timeAgo: string;
  currentPage: string;
  source: string;
  country: string;
  flag: string;
  device: string;
  browser: string;
  duration: string;
}

export interface RecentVisitor {
  id: string;
  time: string;
  visitorId: string;
  country: string;
  flag: string;
  device: string;
  source: string;
  landingPage: string;
  pagesViewed: number;
  duration: string;
}

export interface RecentConversion {
  id: string;
  time: string;
  leadName: string;
  company: string;
  campaign: string;
  source: string;
  service: string;
  revenue: number;
  status: "Won" | "In Review" | "Qualified" | "Lost";
}

export interface UTMItem {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  visitors: number;
  conversions: number;
  revenue: number;
}

export interface ReferrerItem {
  domain: string;
  visitors: number;
  bounceRate: number;
  conversions: number;
  category: string;
}

export interface LeadCategoryMetric {
  title: string;
  count: number;
  change: number;
  isPositive: boolean;
  color: string;
}

// Global Filter Options
export const FILTER_DATE_RANGES = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "Custom Date", value: "custom" },
];

export const FILTER_TRAFFIC_SOURCES = [
  "All Sources",
  "Organic Search",
  "Paid Search",
  "Google Ads",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Twitter/X",
  "YouTube",
  "Referral",
  "Email",
  "WhatsApp",
  "Telegram",
  "Partner",
  "Affiliate",
  "Direct",
];

export const FILTER_COUNTRIES = [
  "All Countries",
  "United States",
  "United Kingdom",
  "Germany",
  "India",
  "Canada",
  "Australia",
  "France",
  "Singapore",
  "Japan",
];

export const FILTER_DEVICES = ["All Devices", "Desktop", "Mobile", "Tablet"];
export const FILTER_BROWSERS = ["All Browsers", "Chrome", "Safari", "Firefox", "Edge", "Opera"];
export const FILTER_SERVICES = ["All Services", "Voice AI Agent", "Web Analytics", "Custom Workflow", "Enterprise Bot"];
export const FILTER_CONVERSION_TYPES = ["All Types", "Contact Form", "Consultation Booking", "Quote Request", "Newsletter Sign-up"];

// KPI Cards Data
export const MOCK_KPI_CARDS: KPIMetric[] = [
  {
    id: "visitors",
    title: "Visitors",
    value: "14,281",
    numericValue: 14281,
    change: 18.4,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [320, 450, 410, 580, 620, 710, 890, 940, 1100, 1250, 1420],
    category: "traffic",
  },
  {
    id: "unique_visitors",
    title: "Unique Visitors",
    value: "10,942",
    numericValue: 10942,
    change: 14.2,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [250, 310, 390, 420, 500, 580, 690, 780, 890, 990, 1094],
    category: "traffic",
  },
  {
    id: "sessions",
    title: "Sessions",
    value: "18,650",
    numericValue: 18650,
    change: 21.0,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [400, 520, 610, 700, 820, 910, 1100, 1250, 1450, 1680, 1865],
    category: "traffic",
  },
  {
    id: "returning_visitors",
    title: "Returning Visitors",
    value: "3,339",
    numericValue: 3339,
    change: 8.7,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [120, 150, 180, 210, 240, 260, 280, 300, 310, 325, 333],
    category: "traffic",
  },
  {
    id: "page_views",
    title: "Page Views",
    value: "58,410",
    numericValue: 58410,
    change: 25.6,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [1200, 1800, 2100, 2900, 3400, 4200, 4900, 5300, 5600, 5750, 5841],
    category: "traffic",
  },
  {
    id: "avg_duration",
    title: "Avg. Session Duration",
    value: "3m 42s",
    numericValue: 222,
    change: 12.3,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [140, 155, 160, 175, 180, 195, 205, 210, 215, 220, 222],
    category: "traffic",
  },
  {
    id: "bounce_rate",
    title: "Bounce Rate",
    value: "38.2%",
    numericValue: 38.2,
    change: -4.5,
    isPositive: true, // Lower bounce rate is positive
    periodLabel: "vs prev 30 days",
    sparkline: [48, 46, 45, 43, 42, 41, 40, 39.5, 39, 38.5, 38.2],
    category: "traffic",
  },
  {
    id: "conversion_rate",
    title: "Conversion Rate",
    value: "4.85%",
    numericValue: 4.85,
    change: 1.2,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [3.2, 3.5, 3.8, 4.0, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.85],
    category: "lead",
  },
  {
    id: "total_leads",
    title: "Total Leads",
    value: "692",
    numericValue: 692,
    change: 31.8,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [15, 28, 34, 45, 52, 68, 79, 85, 94, 102, 115],
    category: "lead",
  },
  {
    id: "revenue",
    title: "Revenue",
    value: "$148,250",
    numericValue: 148250,
    prefix: "$",
    change: 28.4,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [4000, 6500, 8900, 11200, 13400, 15800, 17900, 19200, 21500, 23800, 26000],
    category: "financial",
  },
  {
    id: "cost",
    title: "Marketing Cost",
    value: "$32,400",
    numericValue: 32400,
    prefix: "$",
    change: 5.2,
    isPositive: false,
    periodLabel: "vs prev 30 days",
    sparkline: [2100, 2300, 2400, 2600, 2700, 2800, 2900, 3000, 3100, 3180, 3240],
    category: "financial",
  },
  {
    id: "roi",
    title: "Marketing ROI",
    value: "357.5%",
    numericValue: 357.5,
    change: 42.1,
    isPositive: true,
    periodLabel: "vs prev 30 days",
    sparkline: [210, 230, 255, 280, 300, 320, 335, 345, 350, 354, 357.5],
    category: "financial",
  },
];

// Time Series Traffic Data
export const MOCK_TRAFFIC_DAILY: TrafficSeriesPoint[] = [
  { time: "Mon 01", visitors: 420, uniqueVisitors: 340, sessions: 520, pageViews: 1680 },
  { time: "Tue 02", visitors: 580, uniqueVisitors: 450, sessions: 710, pageViews: 2320 },
  { time: "Wed 03", visitors: 640, uniqueVisitors: 510, sessions: 800, pageViews: 2560 },
  { time: "Thu 04", visitors: 710, uniqueVisitors: 580, sessions: 910, pageViews: 2840 },
  { time: "Fri 05", visitors: 890, uniqueVisitors: 690, sessions: 1120, pageViews: 3560 },
  { time: "Sat 06", visitors: 450, uniqueVisitors: 360, sessions: 580, pageViews: 1800 },
  { time: "Sun 07", visitors: 390, uniqueVisitors: 310, sessions: 490, pageViews: 1560 },
  { time: "Mon 08", visitors: 760, uniqueVisitors: 610, sessions: 980, pageViews: 3040 },
  { time: "Tue 09", visitors: 840, uniqueVisitors: 680, sessions: 1090, pageViews: 3360 },
  { time: "Wed 10", visitors: 920, uniqueVisitors: 740, sessions: 1200, pageViews: 3680 },
  { time: "Thu 11", visitors: 1050, uniqueVisitors: 830, sessions: 1350, pageViews: 4200 },
  { time: "Fri 12", visitors: 1180, uniqueVisitors: 940, sessions: 1510, pageViews: 4720 },
  { time: "Sat 13", visitors: 620, uniqueVisitors: 490, sessions: 780, pageViews: 2480 },
  { time: "Sun 14", visitors: 540, uniqueVisitors: 430, sessions: 690, pageViews: 2160 },
];

export const MOCK_TRAFFIC_HOURLY: TrafficSeriesPoint[] = [
  { time: "00:00", visitors: 45, uniqueVisitors: 38, sessions: 52, pageViews: 180 },
  { time: "03:00", visitors: 22, uniqueVisitors: 19, sessions: 28, pageViews: 88 },
  { time: "06:00", visitors: 68, uniqueVisitors: 54, sessions: 82, pageViews: 272 },
  { time: "09:00", visitors: 210, uniqueVisitors: 175, sessions: 260, pageViews: 840 },
  { time: "12:00", visitors: 340, uniqueVisitors: 280, sessions: 410, pageViews: 1360 },
  { time: "15:00", visitors: 390, uniqueVisitors: 310, sessions: 470, pageViews: 1560 },
  { time: "18:00", visitors: 280, uniqueVisitors: 225, sessions: 350, pageViews: 1120 },
  { time: "21:00", visitors: 140, uniqueVisitors: 115, sessions: 175, pageViews: 560 },
];

// Traffic Sources
export const MOCK_TRAFFIC_SOURCES: TrafficSourceItem[] = [
  { name: "Google Ads", visitors: 4120, conversions: 215, revenue: 48500, percentage: 28.8, trend: 14.2, color: "#3B82F6" },
  { name: "Organic Search", visitors: 3450, conversions: 182, revenue: 39200, percentage: 24.1, trend: 18.6, color: "#10B981" },
  { name: "LinkedIn Ads", visitors: 1980, conversions: 110, revenue: 26400, percentage: 13.8, trend: 22.4, color: "#0284C7" },
  { name: "Direct", visitors: 1640, conversions: 65, revenue: 12800, percentage: 11.5, trend: 5.1, color: "#6366F1" },
  { name: "Facebook", visitors: 1210, conversions: 48, revenue: 9600, percentage: 8.5, trend: -2.3, color: "#8B5CF6" },
  { name: "Email Campaign", visitors: 940, conversions: 42, revenue: 7800, percentage: 6.6, trend: 11.0, color: "#F59E0B" },
  { name: "YouTube", visitors: 540, conversions: 18, revenue: 2500, percentage: 3.8, trend: 8.4, color: "#EF4444" },
  { name: "Referral / Others", visitors: 401, conversions: 12, revenue: 1450, percentage: 2.9, trend: 3.5, color: "#6B7280" },
];

// Campaign Analytics Table Data
export const MOCK_CAMPAIGNS: CampaignItem[] = [
  {
    id: "cmp-01",
    name: "Voice AI Product Launch Q3",
    source: "Google Ads",
    medium: "cpc",
    clicks: 12450,
    impressions: 185000,
    ctr: 6.73,
    conversions: 215,
    revenue: 54200,
    cost: 11200,
    roi: 383.9,
    cpl: 52.09,
    cpa: 52.09,
    status: "Active",
  },
  {
    id: "cmp-02",
    name: "Enterprise B2B Lead Gen",
    source: "LinkedIn",
    medium: "sponsored",
    clicks: 5820,
    impressions: 92000,
    ctr: 6.32,
    conversions: 110,
    revenue: 38500,
    cost: 9400,
    roi: 309.5,
    cpl: 85.45,
    cpa: 85.45,
    status: "Active",
  },
  {
    id: "cmp-03",
    name: "Retargeting Meta Demo",
    source: "Facebook",
    medium: "cpm",
    clicks: 4190,
    impressions: 142000,
    ctr: 2.95,
    conversions: 48,
    revenue: 14200,
    cost: 3800,
    roi: 273.6,
    cpl: 79.16,
    cpa: 79.16,
    status: "Active",
  },
  {
    id: "cmp-04",
    name: "Summer Promo Newsletter",
    source: "Email",
    medium: "newsletter",
    clicks: 3100,
    impressions: 28000,
    ctr: 11.07,
    conversions: 42,
    revenue: 11500,
    cost: 800,
    roi: 1337.5,
    cpl: 19.04,
    cpa: 19.04,
    status: "Completed",
  },
  {
    id: "cmp-05",
    name: "AI Voice Bot Search Brand",
    source: "Google Ads",
    medium: "search",
    clicks: 8900,
    impressions: 64000,
    ctr: 13.9,
    conversions: 165,
    revenue: 29800,
    cost: 7200,
    roi: 313.8,
    cpl: 43.63,
    cpa: 43.63,
    status: "Active",
  },
  {
    id: "cmp-06",
    name: "Affiliate Partner Blast",
    source: "Affiliate",
    medium: "referral",
    clicks: 1850,
    impressions: 22000,
    ctr: 8.4,
    conversions: 24,
    revenue: 7200,
    cost: 1800,
    roi: 300.0,
    cpl: 75.0,
    cpa: 75.0,
    status: "Paused",
  },
];

// Lead Analytics
export const MOCK_LEAD_METRICS: LeadCategoryMetric[] = [
  { title: "Total Leads", count: 692, change: 31.8, isPositive: true, color: "#3B82F6" },
  { title: "Qualified Leads", count: 418, change: 24.5, isPositive: true, color: "#10B981" },
  { title: "Consultations Booked", count: 184, change: 19.2, isPositive: true, color: "#8B5CF6" },
  { title: "Quote Requests", count: 142, change: 15.6, isPositive: true, color: "#F59E0B" },
  { title: "Contact Forms", count: 215, change: 11.4, isPositive: true, color: "#0284C7" },
  { title: "Newsletter Subs", count: 151, change: 8.9, isPositive: true, color: "#EC4899" },
  { title: "Won Deals", count: 96, change: 34.2, isPositive: true, color: "#059669" },
  { title: "Lost Leads", count: 42, change: -12.0, isPositive: true, color: "#EF4444" },
];

// 7-Step Conversion Funnel
export const MOCK_CONVERSION_FUNNEL: ConversionFunnelStep[] = [
  { step: "1. Total Visitors", count: 14281, percentage: 100.0, dropoffPercentage: 0, color: "#3B82F6" },
  { step: "2. Landing Page View", count: 11420, percentage: 79.9, dropoffPercentage: 20.1, color: "#60A5FA" },
  { step: "3. Service Page View", count: 7240, percentage: 50.7, dropoffPercentage: 36.6, color: "#818CF8" },
  { step: "4. Contact/CTA Form", count: 2410, percentage: 16.8, dropoffPercentage: 66.7, color: "#A78BFA" },
  { step: "5. Lead Generated", count: 692, percentage: 4.84, dropoffPercentage: 71.2, color: "#C084FC" },
  { step: "6. Qualified Lead", count: 418, percentage: 2.92, dropoffPercentage: 39.6, color: "#E879F9" },
  { step: "7. Client / Won Deal", count: 96, percentage: 0.67, dropoffPercentage: 77.0, color: "#10B981" },
];

// Top Landing Pages
export const MOCK_LANDING_PAGES: LandingPageItem[] = [
  { path: "/test", visitors: 4820, bounceRate: 34.2, avgTime: "4m 12s", conversions: 245, conversionRate: 5.08, isBest: true },
  { path: "/services/voice-ai", visitors: 3640, bounceRate: 38.5, avgTime: "3m 45s", conversions: 184, conversionRate: 5.05, isBest: true },
  { path: "/services/analytics", visitors: 2850, bounceRate: 41.0, avgTime: "2m 58s", conversions: 112, conversionRate: 3.93 },
  { path: "/contact", visitors: 1950, bounceRate: 22.4, avgTime: "1m 45s", conversions: 310, conversionRate: 15.89, isBest: true },
  { path: "/pricing", visitors: 1420, bounceRate: 45.1, avgTime: "3m 10s", conversions: 68, conversionRate: 4.78 },
  { path: "/about", visitors: 980, bounceRate: 52.8, avgTime: "1m 30s", conversions: 15, conversionRate: 1.53 },
];

// Geographic Distribution
export const MOCK_GEOGRAPHY: GeographicItem[] = [
  { country: "United States", code: "US", city: "New York", visitors: 5840, conversions: 312, revenue: 68400, flag: "🇺🇸" },
  { country: "United Kingdom", code: "GB", city: "London", visitors: 2410, conversions: 124, revenue: 28500, flag: "🇬🇧" },
  { country: "Germany", code: "DE", city: "Berlin", visitors: 1850, conversions: 86, revenue: 19200, flag: "🇩🇪" },
  { country: "Canada", code: "CA", city: "Toronto", visitors: 1420, conversions: 64, revenue: 14800, flag: "🇨🇦" },
  { country: "India", code: "IN", city: "Bangalore", visitors: 1240, conversions: 52, revenue: 8900, flag: "🇮🇳" },
  { country: "Australia", code: "AU", city: "Sydney", visitors: 910, conversions: 38, revenue: 8400, flag: "🇦🇺" },
];

// Device & Tech Analytics
export const MOCK_TECH_DATA: DeviceTechData = {
  deviceTypes: [
    { type: "Desktop", percentage: 58.4, count: 8340, color: "#3B82F6" },
    { type: "Mobile", percentage: 34.2, count: 4884, color: "#10B981" },
    { type: "Tablet", percentage: 7.4, count: 1057, color: "#F59E0B" },
  ],
  browsers: [
    { name: "Chrome", percentage: 64.2, count: 9168, color: "#4285F4" },
    { name: "Safari", percentage: 19.5, count: 2784, color: "#00C7B7" },
    { name: "Firefox", percentage: 8.3, count: 1185, color: "#FF7139" },
    { name: "Edge", percentage: 5.6, count: 800, color: "#0078D7" },
    { name: "Opera / Others", percentage: 2.4, count: 344, color: "#FF1B2D" },
  ],
  operatingSystems: [
    { name: "Windows", percentage: 44.5, count: 6355, color: "#0078D4" },
    { name: "macOS", percentage: 26.8, count: 3827, color: "#A2AAAD" },
    { name: "iOS", percentage: 15.4, count: 2199, color: "#000000" },
    { name: "Android", percentage: 11.2, count: 1599, color: "#3DDC84" },
    { name: "Linux", percentage: 2.1, count: 301, color: "#FCC624" },
  ],
  screenResolutions: [
    { resolution: "1920x1080", count: 5410, percentage: 37.8 },
    { resolution: "2560x1440", count: 2480, percentage: 17.3 },
    { resolution: "390x844 (Mobile)", count: 2150, percentage: 15.0 },
    { resolution: "1440x900", count: 1820, percentage: 12.7 },
    { resolution: "1366x768", count: 1420, percentage: 9.9 },
    { resolution: "Others", count: 1001, percentage: 7.3 },
  ],
};

// Live Realtime Visitors
export const MOCK_REALTIME_VISITORS: RealtimeVisitor[] = [
  { id: "rt-01", timeAgo: "2s ago", currentPage: "/test", source: "Google Ads", country: "United States", flag: "🇺🇸", device: "Desktop", browser: "Chrome", duration: "1m 24s" },
  { id: "rt-02", timeAgo: "5s ago", currentPage: "/services/voice-ai", source: "Organic Search", country: "United Kingdom", flag: "🇬🇧", device: "Mobile", browser: "Safari", duration: "45s" },
  { id: "rt-03", timeAgo: "8s ago", currentPage: "/contact", source: "LinkedIn", country: "Germany", flag: "🇩🇪", device: "Desktop", browser: "Firefox", duration: "3m 10s" },
  { id: "rt-04", timeAgo: "12s ago", currentPage: "/services/analytics", source: "Direct", country: "Canada", flag: "🇨🇦", device: "Desktop", browser: "Chrome", duration: "2m 05s" },
  { id: "rt-05", timeAgo: "18s ago", currentPage: "/pricing", source: "Facebook", country: "India", flag: "🇮🇳", device: "Mobile", browser: "Chrome", duration: "55s" },
];

// Recent Visitors Table
export const MOCK_RECENT_VISITORS: RecentVisitor[] = [
  { id: "vis-101", time: "19:24:12", visitorId: "usr_9f82a1", country: "United States", flag: "🇺🇸", device: "Desktop", source: "Google Ads", landingPage: "/test", pagesViewed: 5, duration: "4m 18s" },
  { id: "vis-102", time: "19:23:45", visitorId: "usr_3b41c9", country: "Germany", flag: "🇩🇪", device: "Mobile", source: "Organic", landingPage: "/services/voice-ai", pagesViewed: 3, duration: "2m 10s" },
  { id: "vis-103", time: "19:22:10", visitorId: "usr_7e12d4", country: "United Kingdom", flag: "🇬🇧", device: "Desktop", source: "LinkedIn", landingPage: "/pricing", pagesViewed: 6, duration: "6m 40s" },
  { id: "vis-104", time: "19:20:05", visitorId: "usr_1a89f2", country: "Canada", flag: "🇨🇦", device: "Tablet", source: "Direct", landingPage: "/contact", pagesViewed: 2, duration: "1m 15s" },
  { id: "vis-105", time: "19:18:30", visitorId: "usr_5c74e8", country: "India", flag: "🇮🇳", device: "Mobile", source: "Facebook", landingPage: "/test", pagesViewed: 4, duration: "3m 50s" },
];

// Recent Conversions Table
export const MOCK_RECENT_CONVERSIONS: RecentConversion[] = [
  { id: "cnv-501", time: "19:20:15", leadName: "Sarah Jenkins", company: "Apex Digital Solutions", campaign: "Voice AI Product Launch Q3", source: "Google Ads", service: "Voice AI Agent", revenue: 4800, status: "Won" },
  { id: "cnv-502", time: "19:14:32", leadName: "Michael Vance", company: "Vance Logistics Corp", campaign: "Enterprise B2B Lead Gen", source: "LinkedIn", service: "Custom Workflow", revenue: 12500, status: "Qualified" },
  { id: "cnv-503", time: "19:08:44", leadName: "Elena Rostova", company: "Nordic Tech GmbH", campaign: "Organic Search", source: "Google Organic", service: "Web Analytics", revenue: 3200, status: "Won" },
  { id: "cnv-504", time: "18:55:02", leadName: "David Chen", company: "Pacific Retail Group", campaign: "Retargeting Meta Demo", source: "Facebook", service: "Voice AI Agent", revenue: 6400, status: "In Review" },
  { id: "cnv-505", time: "18:42:19", leadName: "Amanda Miller", company: "BrightStar Media", campaign: "Summer Promo Newsletter", source: "Email", service: "Enterprise Bot", revenue: 9800, status: "Won" },
];

// UTM Parameters Table
export const MOCK_UTM_ANALYTICS: UTMItem[] = [
  { utm_source: "google", utm_medium: "cpc", utm_campaign: "voice_ai_q3", utm_term: "ai_voice_bot", utm_content: "banner_v1", visitors: 4120, conversions: 215, revenue: 54200 },
  { utm_source: "linkedin", utm_medium: "sponsored", utm_campaign: "enterprise_b2b", utm_term: "cto_targeting", utm_content: "video_ad_1", visitors: 1980, conversions: 110, revenue: 38500 },
  { utm_source: "facebook", utm_medium: "cpm", utm_campaign: "retargeting_demo", utm_term: "lookalike_1pct", utm_content: "carousel_demo", visitors: 1210, conversions: 48, revenue: 14200 },
  { utm_source: "newsletter", utm_medium: "email", utm_campaign: "summer_promo", utm_term: "subscribers", utm_content: "hero_cta", visitors: 940, conversions: 42, revenue: 11500 },
  { utm_source: "youtube", utm_medium: "video_ad", utm_campaign: "brand_awareness", utm_term: "voice_automation", utm_content: "trueview_60s", visitors: 540, conversions: 18, revenue: 2500 },
];

// Referrer Domains
export const MOCK_REFERRERS: ReferrerItem[] = [
  { domain: "google.com", visitors: 3450, bounceRate: 32.1, conversions: 182, category: "Search Engine" },
  { domain: "linkedin.com", visitors: 1980, bounceRate: 28.5, conversions: 110, category: "Social Media" },
  { domain: "facebook.com", visitors: 1210, bounceRate: 44.2, conversions: 48, category: "Social Media" },
  { domain: "github.com", visitors: 820, bounceRate: 36.4, conversions: 35, category: "Developer Network" },
  { domain: "reddit.com/r/technology", visitors: 640, bounceRate: 48.0, conversions: 19, category: "Community Forum" },
  { domain: "twitter.com", visitors: 490, bounceRate: 51.2, conversions: 14, category: "Social Media" },
];
