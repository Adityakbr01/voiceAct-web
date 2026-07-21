import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={cn(
        "glass relative inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06]",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute size-4 transition-all duration-300",
          isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute size-4 transition-all duration-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0",
        )}
      />
    </button>
  );
}
