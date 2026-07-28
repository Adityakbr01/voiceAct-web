import { redirect } from "next/navigation";

export default async function OverviewTabRedirectPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;
  redirect(`/admin/${tab}`);
}
