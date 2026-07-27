"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fetchMe, login as apiLogin, logout as apiLogout } from "@/lib/api/auth";
import type { AdminUser } from "@/lib/types/cms";

interface AdminAuthContextValue {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Bootstrap: just call /auth/me — if we get a 401, no admin is logged in
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const me = await fetchMe();
        if (!cancelled) setAdmin(me);
      } catch {
        // 401 or network error — not logged in
        if (!cancelled) setAdmin(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { admin: user } = await apiLogin(email, password);
      setAdmin(user);
      router.replace("/admin/contacts");
    },
    [router]
  );

  const logout = useCallback(() => {
    apiLogout();
    setAdmin(null);
    router.replace("/admin/login");
  }, [router]);

  const value = useMemo(() => ({ admin, loading, login, logout }), [admin, loading, login, logout]);

  const isLoginRoute = pathname === "/admin/login";

  // Redirect to /admin/login if not logged in and trying to access admin pages
  useEffect(() => {
    if (loading || isLoginRoute) return;
    if (!admin && pathname?.startsWith("/admin")) {
      router.replace("/admin/login");
    }
  }, [admin, loading, isLoginRoute, pathname, router]);

  // Redirect to /admin/contacts if already logged in and on /admin/login
  useEffect(() => {
    if (loading || !admin || !isLoginRoute) return;
    router.replace("/admin/contacts");
  }, [admin, loading, isLoginRoute, router]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAdminAuth();
  const pathname = usePathname();

  if (pathname === "/admin/login") return <>{children}</>;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F1115] text-slate-300">
        Loading admin…
      </div>
    );
  }

  if (!admin) return null;

  return <>{children}</>;
}
