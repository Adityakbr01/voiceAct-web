"use client";

import { memo } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export const ThemeToggle = memo(function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      variant="circle"
      duration={1200}
      className={cn(
        "glass relative inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06]",
        className,
      )}
    />
  );
});

ThemeToggle.displayName = "ThemeToggle";