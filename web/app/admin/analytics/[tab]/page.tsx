import { redirect } from "next/navigation";

export default async function AnalyticsTabRedirectPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;
  redirect(`/admin/${tab}`);
}
