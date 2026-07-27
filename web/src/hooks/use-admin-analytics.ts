"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/lib/api/analytics";
import { queryKeys } from "@/lib/api/query-keys";
import { periodFromDateRange } from "@/lib/analytics-mappers";

export function useAdminDashboardStats(dateRange: string) {
  const period = periodFromDateRange(dateRange);

  return useQuery({
    queryKey: queryKeys.admin.stats(period),
    queryFn: () => fetchDashboardStats(period),
    staleTime: 30_000,
  });
}
