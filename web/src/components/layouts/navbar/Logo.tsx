"use client";

import { memo, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/modules/site";

export const Logo = memo(
  forwardRef<HTMLAnchorElement, { className?: string }>(function Logo({ className }, ref) {
    return (
      <a
        ref={ref}
        href="/"
        className={cn(
          "group relative z-10 flex items-center gap-2 rounded-full font-display text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          className,
        )}
        aria-label={`${site.name} - Home`}
      >
        <span className="tracking-tight">{site.shortName}</span>
      </a>
    );
  }),
);

Logo.displayName = "Logo";
