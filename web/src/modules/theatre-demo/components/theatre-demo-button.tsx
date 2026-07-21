"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TheatreDemoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function TheatreDemoButton({
  label = "Get Started",
  className,
  ...props
}: TheatreDemoButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-full px-8 py-4 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {/* Glass overlay — fades in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[20px] bg-white transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, willChange: "opacity" }}
      />

      {/* Gradient border glow */}
      <span
        aria-hidden
        className="absolute -inset-px rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Content */}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
