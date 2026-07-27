"use client";

import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#F4F2F2]">{title}</h1>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      {actions}
    </div>
  );
}
