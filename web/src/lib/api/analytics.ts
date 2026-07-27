import api from "../api";
import type { ApiSuccess, DashboardStats } from "../types/cms";

export async function fetchDashboardStats(period = "30d") {
  const { data } = await api.get<ApiSuccess<DashboardStats>>("/admin/stats", { params: { period } });
  return data.data;
}

export async function fetchTrackingAnalytics(period = "30d") {
  const { data } = await api.get<ApiSuccess<DashboardStats["tracking"]>>("/tracking/analytics", {
    params: { period },
  });
  return data.data;
}
