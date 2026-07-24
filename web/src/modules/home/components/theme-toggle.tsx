import { useTheme } from "@/components/theme-provider";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
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
}
