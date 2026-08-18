"use client";

import { useState } from "react";
import {
  useTheme,
  DEFAULT_LIGHT_PALETTE,
  DEFAULT_DARK_PALETTE,
  type CustomPalette,
  type Theme,
} from "@/components/theme-provider";

/* ── Presets ─────────────────────────────────────────────────── */
interface Preset {
  name: string;
  emoji: string;
  light: CustomPalette;
  dark: CustomPalette;
}

const PRESETS: Preset[] = [
  {
    name: "Optic Clarity",
    emoji: "⚡",
    light: DEFAULT_LIGHT_PALETTE,
    dark: DEFAULT_DARK_PALETTE,
  },
  {
    name: "Emerald Studio",
    emoji: "🌿",
    light: {
      primary: "#059669",
      secondary: "#7C3AED",
      background: "#F9FAFB",
      foreground: "#111827",
      card: "#F0FDF4",
      border: "#D1FAE5",
      muted: "#ECFDF5",
    },
    dark: {
      primary: "#10B981",
      secondary: "#8B5CF6",
      background: "#0A1512",
      foreground: "#ECFDF5",
      card: "#132318",
      border: "#1F3D2E",
      muted: "#182E22",
    },
  },
  {
    name: "Rose Gold",
    emoji: "🌹",
    light: {
      primary: "#E11D48",
      secondary: "#DB2777",
      background: "#FFF1F2",
      foreground: "#0F0A0B",
      card: "#FFE4E6",
      border: "#FECDD3",
      muted: "#FFF1F2",
    },
    dark: {
      primary: "#FB7185",
      secondary: "#F472B6",
      background: "#120810",
      foreground: "#FFE4E6",
      card: "#1E1020",
      border: "#2D1528",
      muted: "#1A0D18",
    },
  },
  {
    name: "Neo Brutalist",
    emoji: "📐",
    light: {
      primary: "#F43F33",
      secondary: "#D4FF00",
      background: "#FFFFFF",
      foreground: "#000000",
      card: "#FFFFFF",
      border: "#000000",
      muted: "#F2F2F2",
    },
    dark: {
      primary: "#FF5745",
      secondary: "#D4FF00",
      background: "#000000",
      foreground: "#FFFFFF",
      card: "#333333",
      border: "#FFFFFF",
      muted: "#222222",
    },
  },
  {
    name: "Geist Monochrome",
    emoji: "▲",
    light: {
      primary: "#000000",
      secondary: "#E5E5E5",
      background: "#FCFCFC",
      foreground: "#000000",
      card: "#FFFFFF",
      border: "#E5E5E5",
      muted: "#F7F7F7",
    },
    dark: {
      primary: "#FFFFFF",
      secondary: "#333333",
      background: "#000000",
      foreground: "#FFFFFF",
      card: "#181818",
      border: "#333333",
      muted: "#222222",
    },
  },
  {
    name: "Midnight Indigo",
    emoji: "🔮",
    light: {
      primary: "#4F46E5",
      secondary: "#0EA5E9",
      background: "#FAFAFA",
      foreground: "#0A0A1E",
      card: "#EEF2FF",
      border: "#C7D2FE",
      muted: "#EEF2FF",
    },
    dark: {
      primary: "#818CF8",
      secondary: "#38BDF8",
      background: "#080B18",
      foreground: "#EEF2FF",
      card: "#0F1428",
      border: "#1E2547",
      muted: "#131A35",
    },
  },
];

/* ── Swatch row ──────────────────────────────────────────────── */
function SwatchRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          {value}
        </span>
        <label className="cursor-pointer">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <span
            className="block h-8 w-8 rounded-full border-2 border-border shadow-sm transition-transform hover:scale-110 cursor-pointer"
            style={{ backgroundColor: value }}
          />
        </label>
      </div>
    </div>
  );
}

/* ── Palette editor for one mode ─────────────────────────────── */
function PaletteEditor({
  mode,
  draft,
  onChange,
}: {
  mode: Theme;
  draft: CustomPalette;
  onChange: (key: keyof CustomPalette, val: string) => void;
}) {
  return (
    <div className="space-y-3">
      <SwatchRow label="Accent (Primary)"   value={draft.primary}    onChange={(v) => onChange("primary", v)} />
      <SwatchRow label="Support (Secondary)" value={draft.secondary}  onChange={(v) => onChange("secondary", v)} />
      <SwatchRow label="Background"          value={draft.background} onChange={(v) => onChange("background", v)} />
      <SwatchRow label="Foreground"          value={draft.foreground} onChange={(v) => onChange("foreground", v)} />
      <SwatchRow label="Card Surface"        value={draft.card}       onChange={(v) => onChange("card", v)} />
      <SwatchRow label="Border"              value={draft.border}     onChange={(v) => onChange("border", v)} />
      <SwatchRow label="Muted"               value={draft.muted}      onChange={(v) => onChange("muted", v)} />
    </div>
  );
}

/* ── Main panel ──────────────────────────────────────────────── */
export function ThemeCustomizer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const {
    theme,
    customPaletteLight,
    customPaletteDark,
    setCustomPaletteForMode,
  } = useTheme();

  // Which tab the user is editing — defaults to current mode
  const [editingMode, setEditingMode] = useState<Theme>(theme);

  // Separate live drafts for each mode
  const [draftLight, setDraftLight] = useState<CustomPalette>(
    customPaletteLight ?? DEFAULT_LIGHT_PALETTE,
  );
  const [draftDark, setDraftDark] = useState<CustomPalette>(
    customPaletteDark ?? DEFAULT_DARK_PALETTE,
  );

  if (!open) return null;

  const draft = editingMode === "light" ? draftLight : draftDark;
  const setDraft = editingMode === "light" ? setDraftLight : setDraftDark;

  const isCurrentModeCustomized =
    editingMode === "light" ? customPaletteLight !== null : customPaletteDark !== null;

  /* Live-preview: apply change immediately if editing the active mode */
  const updateField = (key: keyof CustomPalette, val: string) => {
    const next = { ...draft, [key]: val };
    setDraft(next);
    // Immediate live-preview only when editing the currently visible mode
    if (editingMode === theme) {
      setCustomPaletteForMode(editingMode, next);
    }
  };

  /* Apply a preset to the editing tab */
  const applyPreset = (p: Preset) => {
    const pal = editingMode === "light" ? p.light : p.dark;
    setDraft(pal);
    if (editingMode === theme) setCustomPaletteForMode(editingMode, pal);
  };

  /* Save the current draft for the editing mode */
  const apply = () => {
    setCustomPaletteForMode("light", draftLight !== DEFAULT_LIGHT_PALETTE ? draftLight : customPaletteLight);
    setCustomPaletteForMode("dark",  draftDark  !== DEFAULT_DARK_PALETTE  ? draftDark  : customPaletteDark);
    onClose();
  };

  /* Reset only the editing mode */
  const reset = () => {
    const def = editingMode === "light" ? DEFAULT_LIGHT_PALETTE : DEFAULT_DARK_PALETTE;
    setDraft(def);
    setCustomPaletteForMode(editingMode, null);
  };

  /* Export both palettes */
  const exportSettings = () => {
    const payload = {
      version: 2,
      light: draftLight,
      dark: draftDark,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voiceact-theme-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* Import both palettes */
  const importSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        // v2 format: { light, dark }
        if (json.light && json.dark) {
          setDraftLight(json.light);
          setDraftDark(json.dark);
          setCustomPaletteForMode("light", json.light);
          setCustomPaletteForMode("dark", json.dark);
        // v1 legacy format: { palette }
        } else if (json.palette) {
          setDraft(json.palette);
          setCustomPaletteForMode(editingMode, json.palette);
        }
      } catch { /* ignore */ }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Theme Customizer"
        className="fixed bottom-0 right-0 z-[70] flex h-[90dvh] w-full max-w-sm flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:bottom-6 sm:right-6 sm:h-auto sm:max-h-[92vh] sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-display text-base font-semibold text-foreground">
              Theme Customizer
            </h2>
            <p className="text-xs text-muted-foreground">
              {isCurrentModeCustomized
                ? `✦ Custom ${editingMode} theme active`
                : `Using default ${editingMode} theme`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Light / Dark mode tabs */}
        <div className="flex border-b border-border">
          {(["light", "dark"] as Theme[]).map((m) => {
            const hasCustom = m === "light" ? customPaletteLight !== null : customPaletteDark !== null;
            const isActive = editingMode === m;
            const isCurrent = theme === m;
            return (
              <button
                key={m}
                onClick={() => setEditingMode(m)}
                className={`relative flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground border-b-2 border-primary -mb-px"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "light" ? "☀️" : "🌙"} {m.charAt(0).toUpperCase() + m.slice(1)}
                {isCurrent && (
                  <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    active
                  </span>
                )}
                {hasCustom && (
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Presets */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Presets
            </p>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => {
                const pal = editingMode === "light" ? p.light : p.dark;
                return (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    className="group flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-left text-sm transition-all hover:border-primary/60 hover:bg-muted"
                  >
                    <span className="flex gap-1">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: pal.primary }} />
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: pal.secondary }} />
                      <span className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: pal.card }} />
                    </span>
                    <span className="flex-1 truncate font-medium text-foreground/80 group-hover:text-foreground">
                      {p.emoji} {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Color pickers */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {editingMode === "light" ? "☀️" : "🌙"} {editingMode.charAt(0).toUpperCase() + editingMode.slice(1)} Colors
            </p>
            <PaletteEditor
              mode={editingMode}
              draft={draft}
              onChange={updateField}
            />
          </section>

          {/* Import / Export */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Portability
            </p>
            <div className="flex gap-2">
              <button
                onClick={exportSettings}
                className="flex-1 rounded-xl border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-border"
              >
                ↓ Export JSON
              </button>
              <label className="flex-1 cursor-pointer rounded-xl border border-border bg-muted px-3 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-border">
                ↑ Import JSON
                <input type="file" accept=".json" className="sr-only" onChange={importSettings} />
              </label>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Export saves both light &amp; dark palettes in one file.
            </p>
          </section>
        </div>

        {/* Footer actions */}
        <div className="flex gap-2 border-t border-border px-5 py-4">
          <button
            onClick={reset}
            className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Reset {editingMode}
          </button>
          <button
            onClick={apply}
            className="flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Apply &amp; Save
          </button>
        </div>
      </aside>
    </>
  );
}
