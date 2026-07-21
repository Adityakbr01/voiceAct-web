import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cta } from "@/modules/home-data";
import { OWNER } from "@/config/constants";

type Choice = { label: string; options: string[]; value: string };

function Chips({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={[
                "rounded-full border px-3.5 py-1.5 text-sm transition-all",
                active
                  ? "border-primary/60 bg-primary/15 text-foreground shadow-[0_0_0_1px_var(--color-primary)_inset]"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground",
              ].join(" ")}
              aria-pressed={active}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Cta() {
  const [projectType, setProjectType] = useState(cta.defaults.projectType);
  const [timeline, setTimeline] = useState(cta.defaults.timeline);
  const [budget, setBudget] = useState(cta.defaults.budget);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const choices: Choice[] = [
    { label: "Project", options: cta.projectTypes, value: projectType },
    { label: "Timeline", options: cta.timelines, value: timeline },
    { label: "Budget", options: cta.budgets, value: budget },
  ];

  // Goal Gradient: seed progress with the pre-filled preferences.
  // Never show 0%.
  const progress = useMemo(() => {
    const steps = [
      true, // Preferences captured (defaults)
      projectType !== cta.defaults.projectType || timeline !== cta.defaults.timeline || budget !== cta.defaults.budget,
      name.trim().length > 1,
      /.+@.+\..+/.test(email),
    ];
    const done = steps.filter(Boolean).length;
    return { done, total: steps.length, pct: Math.max(25, Math.round((done / steps.length) * 100)) };
  }, [projectType, timeline, budget, name, email]);

  const mailtoHref = useMemo(() => {
    const subject = `Discovery slot — ${projectType}`;
    const body = [
      `Hi ${OWNER.name.split(" ")[0] || "team"},`,
      "",
      `I'd like to claim a discovery slot.`,
      "",
      `• Project: ${projectType}`,
      `• Timeline: ${timeline}`,
      `• Budget: ${budget}`,
      `• Name: ${name || "—"}`,
      "",
      "Please send the scoped roadmap within 24h.",
    ].join("\n");
    return `mailto:${OWNER.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [projectType, timeline, budget, name]);

  return (
    <section id="contact" className="relative px-6 pb-32 md:px-10">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-[var(--shadow-card)] p-8 md:p-14">
        <div className="relative grid gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
          {/* Left — pitch + anchor (Contrast Effect + Loss Aversion) */}
          <div className="flex flex-col text-left">
            <span className="glass inline-flex w-fit items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <Clock className="size-3 text-primary" aria-hidden />
              {cta.eyebrow}
            </span>
            <h2 className="mt-6 max-w-xl text-balance text-4xl font-semibold leading-[1.05] md:text-5xl">
              {cta.title.split("weeks").map((part, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i}>{part}</span>
                ) : (
                  <span key={i}>
                    {part}
                    <span className="font-display italic tracking-tight text-primary">weeks</span>
                  </span>
                ),
              )}
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-muted-foreground md:text-lg">
              {cta.description}
            </p>

            {/* Contrast anchor — expensive number first */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border/50 bg-card/30 p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                  {cta.anchor.typical.label}
                </div>
                <div className="mt-1 font-display text-lg font-semibold text-muted-foreground line-through decoration-muted-foreground/40">
                  {cta.anchor.typical.value}
                </div>
              </div>
              <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-primary/90">
                  {cta.anchor.ours.label}
                </div>
                <div className="mt-1 font-display text-lg font-semibold text-foreground">
                  {cta.anchor.ours.value}
                </div>
              </div>
            </div>

            {/* Reciprocity list */}
            <ul className="mt-8 space-y-2.5 text-sm text-muted-foreground">
              {[
                "30-min product audit — yours to keep",
                "Scoped roadmap + fixed timeline in 24h",
                "No sales call, no obligation",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2.5">
                  <span className="grid size-5 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — pre-filled form (Smart Defaults + IKEA + Goal Gradient) */}
          <div className="glass rounded-2xl border border-border/60 bg-card/40 p-6 md:p-7">
            {/* Goal gradient */}
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" aria-hidden />
                Preferences captured
              </span>
              <span className="font-medium text-foreground">
                {progress.done} of {progress.total} · {progress.pct}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{ width: `${progress.pct}%` }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
              />
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {choices.map((c, i) => (
                <Chips
                  key={c.label}
                  label={c.label}
                  options={c.options}
                  value={c.value}
                  onChange={i === 0 ? setProjectType : i === 1 ? setTimeline : setBudget}
                />
              ))}

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-left">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Your name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Chen"
                    className="rounded-full border border-border/60 bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-left">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Work email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="rounded-full border border-border/60 bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
                  />
                </label>
              </div>

              <Button asChild size="lg" variant="default" className="mt-1 rounded-full">
                <a href={mailtoHref}>
                  {cta.primary.label}
                  <ArrowRight className="ml-1 size-4" />
                </a>
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Slots reset the 1st of each month · roadmap yours to keep
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}