"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const CTA = memo(function CTA({ className }: { className?: string }) {
  return (
    <Button
      asChild
      size="sm"
      variant="glow"
      className={cn("group inline-flex text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2", className)}
    >
      <Link href="/contact" className="flex items-center gap-1.5">
        <span>Book a call</span>
        <span className="relative inline-flex size-3.5 items-center justify-center overflow-hidden">
          <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-[120%] group-hover:translate-x-[120%]" />
          <ArrowUpRight className="absolute size-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      </Link>
    </Button>
  );
});

CTA.displayName = "CTA";
