import { AnalyticsDashboardView } from "@/modules/dashboard";

export default async function AnalyticsTabSubroutePage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;
  return <AnalyticsDashboardView activeTabRoute={tab} />;
}
