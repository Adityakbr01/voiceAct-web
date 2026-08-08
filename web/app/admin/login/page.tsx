"use client";

import { useState } from "react";
import { useAdminAuth } from "@/modules/admin/admin-auth-provider";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F1115] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl border border-[#2A2F38] bg-[#15181E] p-8 shadow-xl"
      >
        <div>
          <h1 className="text-xl font-bold text-[#F4F2F2]">VoiceAct Admin</h1>
          <p className="mt-1 text-sm text-slate-400">
            Sign in to manage contacts, projects, and services.
          </p>
        </div>
        <label className="block space-y-1.5 text-sm">
          <span className="text-slate-400">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#2A2F38] bg-[#0F1115] px-3 py-2 text-[#F4F2F2] outline-none focus:border-[#d6f14a]/50"
          />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="text-slate-400">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#2A2F38] bg-[#0F1115] px-3 py-2 text-[#F4F2F2] outline-none focus:border-[#d6f14a]/50"
          />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-[#d6f14a] text-slate-950 hover:bg-[#c5e043]"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
