import type { TrafficSourceRow } from "@/lib/types/cms";
import type { TrafficSourceItem } from "@/constants/analytics-mock-data";

const SOURCE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#64748b"];

export function mapTrafficSources(rows: TrafficSourceRow[]): TrafficSourceItem[] {
  const total = rows.reduce((sum, row) => sum + row.count, 0) || 1;
  return rows.map((row, index) => ({
    name: row._id || "Unknown",
    visitors: row.count,
    conversions: 0,
    revenue: 0,
    percentage: Math.round((row.count / total) * 100),
    trend: 0,
    color: SOURCE_COLORS[index % SOURCE_COLORS.length],
  }));
}

export function periodFromDateRange(dateRange: string): string {
  const map: Record<string, string> = {
    "24h": "24h",
    "7d": "7d",
    "30d": "30d",
    "90d": "90d",
  };
  return map[dateRange] ?? "30d";
}
