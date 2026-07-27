"use client";

import { AdminAuthGate, AdminAuthProvider } from "@/modules/admin";
import { AdminShell } from "@/modules/admin";
import { usePathname } from "next/navigation";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const isAnalytics = pathname?.startsWith("/admin/analytics");

  if (isLogin) return <>{children}</>;

  if (isAnalytics) {
    return <AdminAuthGate>{children}</AdminAuthGate>;
  }

  return (
    <AdminAuthGate>
      <AdminShell>{children}</AdminShell>
    </AdminAuthGate>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}
