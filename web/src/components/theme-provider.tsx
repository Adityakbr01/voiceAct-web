"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "voiceact-theme";
const CUSTOM_PALETTE_LIGHT_KEY = "voiceact-custom-palette-light";
const CUSTOM_PALETTE_DARK_KEY = "voiceact-custom-palette-dark";

export interface CustomPalette {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  card: string;
  border: string;
  muted: string;
}

export const DEFAULT_LIGHT_PALETTE: CustomPalette = {
  primary: "#FF4D00",
  secondary: "#0055FF",
  background: "#FDFDFD",
  foreground: "#080A0C",
  card: "#F2F2F2",
  border: "#E5E7EA",
  muted: "#F2F2F2",
};

export const DEFAULT_DARK_PALETTE: CustomPalette = {
  primary: "#FF5500",
  secondary: "#0070F3",
  background: "#000000",
  foreground: "#EDEDED",
  card: "#0A0A0A",
  border: "#222226",
  muted: "#121214",
};

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  /** Custom palette for the current active mode (null = using CSS defaults) */
  customPalette: CustomPalette | null;
  /** Custom palette specifically for light mode */
  customPaletteLight: CustomPalette | null;
  /** Custom palette specifically for dark mode */
  customPaletteDark: CustomPalette | null;
  /** Set a custom palette for a specific mode. Pass null to reset that mode. */
  setCustomPaletteForMode: (mode: Theme, p: CustomPalette | null) => void;
  /** The resolved active palette (custom or default) for the current mode */
  activePalette: CustomPalette;
  /** True if the current mode has a custom palette applied */
  isCustomized: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ── Helpers ──────────────────────────────────────────────────────────────────

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  // Default to dark — explicit brand choice, independent of OS preference.
  return "dark";
}

function loadPalette(key: string): CustomPalette | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as CustomPalette) : null;
  } catch {
    return null;
  }
}

function savePalette(key: string, p: CustomPalette | null) {
  try {
    if (p) window.localStorage.setItem(key, JSON.stringify(p));
    else window.localStorage.removeItem(key);
  } catch { /* ignore */ }
}

const CSS_VAR_KEYS = [
  "--primary", "--primary-foreground", "--primary-glow", "--secondary",
  "--secondary-foreground", "--accent", "--accent-foreground",
  "--accent-1", "--accent-2", "--ring", "--background", "--foreground",
  "--card", "--card-foreground", "--popover", "--popover-foreground",
  "--border", "--input", "--muted", "--sidebar", "--sidebar-primary",
  "--sidebar-primary-foreground", "--sidebar-accent", "--sidebar-accent-foreground",
  "--sidebar-border", "--sidebar-ring",
];

function getContrastForeground(hex: string): string {
  if (!hex || typeof hex !== "string") return "#FFFFFF";
  const clean = hex.replace("#", "");
  let r = 0, g = 0, b = 0;
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16) || 0;
    g = parseInt(clean[1] + clean[1], 16) || 0;
    b = parseInt(clean[2] + clean[2], 16) || 0;
  } else if (clean.length === 6) {
    r = parseInt(clean.substring(0, 2), 16) || 0;
    g = parseInt(clean.substring(2, 4), 16) || 0;
    b = parseInt(clean.substring(4, 6), 16) || 0;
  }
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#000000" : "#FFFFFF";
}

/**
 * Clear all custom inline CSS vars so the stylesheet :root / .dark rules
 * take effect again cleanly.
 */
function clearCSSVars() {
  const root = document.documentElement;
  CSS_VAR_KEYS.forEach((k) => root.style.removeProperty(k));
}

/**
 * Inject a custom palette as inline CSS vars on :root.
 * NOTE: inline styles win over both :root{} and .dark{} rules,
 * so we only call this AFTER clearCSSVars() to avoid stale values.
 */
function applyCSSVars(palette: CustomPalette) {
  const root = document.documentElement;
  const primaryFg = getContrastForeground(palette.primary);
  const secondaryFg = getContrastForeground(palette.secondary);

  root.style.setProperty("--primary", palette.primary);
  root.style.setProperty("--primary-foreground", primaryFg);
  root.style.setProperty("--primary-glow", palette.primary + "66");
  root.style.setProperty("--secondary", palette.secondary);
  root.style.setProperty("--secondary-foreground", secondaryFg);
  root.style.setProperty("--accent", palette.secondary);
  root.style.setProperty("--accent-foreground", secondaryFg);
  root.style.setProperty("--accent-1", palette.primary);
  root.style.setProperty("--accent-2", palette.secondary);
  root.style.setProperty("--ring", palette.secondary);
  root.style.setProperty("--background", palette.background);
  root.style.setProperty("--foreground", palette.foreground);
  root.style.setProperty("--card", palette.card);
  root.style.setProperty("--card-foreground", palette.foreground);
  root.style.setProperty("--popover", palette.card);
  root.style.setProperty("--popover-foreground", palette.foreground);
  root.style.setProperty("--border", palette.border);
  root.style.setProperty("--input", palette.border);
  root.style.setProperty("--muted", palette.muted);
  root.style.setProperty("--sidebar", palette.background);
  root.style.setProperty("--sidebar-primary", palette.primary);
  root.style.setProperty("--sidebar-primary-foreground", primaryFg);
  root.style.setProperty("--sidebar-accent", palette.secondary);
  root.style.setProperty("--sidebar-accent-foreground", secondaryFg);
  root.style.setProperty("--sidebar-border", palette.border);
  root.style.setProperty("--sidebar-ring", palette.secondary);
}

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

/**
 * Core reconciler: apply the dark/light class then inject whichever
 * custom palette is relevant for this mode (or clear if none).
 */
function reconcile(theme: Theme, palLight: CustomPalette | null, palDark: CustomPalette | null) {
  applyThemeClass(theme);
  clearCSSVars();
  const custom = theme === "dark" ? palDark : palLight;
  if (custom) applyCSSVars(custom);
}

// ── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [palLight, setPalLight] = useState<CustomPalette | null>(null);
  const [palDark, setPalDark] = useState<CustomPalette | null>(null);

  // Boot: read stored theme + both palettes, reconcile once
  useEffect(() => {
    const t = getInitialTheme();
    const pl = loadPalette(CUSTOM_PALETTE_LIGHT_KEY);
    const pd = loadPalette(CUSTOM_PALETTE_DARK_KEY);
    setThemeState(t);
    setPalLight(pl);
    setPalDark(pd);
    reconcile(t, pl, pd);
  }, []);

  const setTheme = useCallback(
    (t: Theme) => {
      setThemeState(t);
      try { window.localStorage.setItem(THEME_STORAGE_KEY, t); } catch { /* ignore */ }
      // Re-reconcile with new mode — picks up the right custom palette
      reconcile(t, palLight, palDark);
    },
    [palLight, palDark],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const setCustomPaletteForMode = useCallback(
    (mode: Theme, p: CustomPalette | null) => {
      const key = mode === "dark" ? CUSTOM_PALETTE_DARK_KEY : CUSTOM_PALETTE_LIGHT_KEY;
      savePalette(key, p);

      let nextLight = palLight;
      let nextDark = palDark;

      if (mode === "light") {
        setPalLight(p);
        nextLight = p;
      } else {
        setPalDark(p);
        nextDark = p;
      }

      // Only re-apply if we're currently viewing that mode
      if (mode === theme) {
        reconcile(theme, nextLight, nextDark);
      }
    },
    [theme, palLight, palDark],
  );

  const customPalette = theme === "dark" ? palDark : palLight;
  const activePalette = customPalette ?? (theme === "dark" ? DEFAULT_DARK_PALETTE : DEFAULT_LIGHT_PALETTE);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        customPalette,
        customPaletteLight: palLight,
        customPaletteDark: palDark,
        setCustomPaletteForMode,
        activePalette,
        isCustomized: customPalette !== null,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
