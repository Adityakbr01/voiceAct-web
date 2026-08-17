"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cta } from "@/modules/home-data";
import { submitContact } from "@/lib/api/contacts";
import { listServices } from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import { useDeferredVisibility } from "@/hooks/use-deferred-visibility";

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
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
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
                  ? "border-primary/60 bg-primary/15 text-foreground shadow-none"
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
  const { ref, isNearViewport } = useDeferredVisibility<HTMLDivElement>();

  // Fetch live active services from backend CMS
  const { data: activeServices = [] } = useQuery({
    queryKey: queryKeys.public.services,
    queryFn: listServices,
    enabled: isNearViewport,
  });

  const projectTypeOptions = useMemo(() => {
    if (activeServices.length > 0) {
      return activeServices.map((s) => s.title);
    }
    return cta.projectTypes;
  }, [activeServices]);

  const [projectType, setProjectType] = useState(cta.defaults.projectType);
  const [timeline, setTimeline] = useState(cta.defaults.timeline);
  const [budget, setBudget] = useState(cta.defaults.budget);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Auto-reset form after 10 seconds of successful submission
  useEffect(() => {
    if (!submitted) return;
    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSubmitted(false);
          setName("");
          setEmail("");
          setProjectType(projectTypeOptions[0] || cta.defaults.projectType);
          setTimeline(cta.defaults.timeline);
          setBudget(cta.defaults.budget);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted, projectTypeOptions]);

  // Sync default selection when live active services load
  useEffect(() => {
    if (projectTypeOptions.length > 0 && !projectTypeOptions.includes(projectType)) {
      setProjectType(projectTypeOptions[0]);
    }
  }, [projectTypeOptions, projectType]);

  const choices: Choice[] = [
    { label: "Project Service", options: projectTypeOptions, value: projectType },
    { label: "Timeline", options: cta.timelines, value: timeline },
    { label: "Budget", options: cta.budgets, value: budget },
  ];

  // Goal Gradient: seed progress with the pre-filled preferences.
  const progress = useMemo(() => {
    const steps = [
      true, // Preferences captured (defaults)
      projectType !== (projectTypeOptions[0] || cta.defaults.projectType) ||
        timeline !== cta.defaults.timeline ||
        budget !== cta.defaults.budget,
      name.trim().length > 1,
      /.+@.+\..+/.test(email),
    ];
    const done = steps.filter(Boolean).length;
    return {
      done,
      total: steps.length,
      pct: Math.max(25, Math.round((done / steps.length) * 100)),
    };
  }, [projectType, projectTypeOptions, timeline, budget, name, email]);

  const canSubmit = name.trim().length > 1 && /.+@.+\..+/.test(email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitError("");
    setSubmitting(true);
    try {
      const cleanBudget = budget.replace(/[₹$]/g, "").trim();
      const message = [
        "Discovery slot request submitted via homepage CTA",
        "",
        `Selected Service: ${projectType}`,
        `Target Timeline: ${timeline}`,
        `Estimated Budget: ${cleanBudget}`,
      ].join("\n");
      await submitContact({
        name: name.trim(),
        email: email.trim(),
        service: projectType,
        message,
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative px-0 pb-32 md:px-10">
      <div ref={ref}>
        <div className="relative mx-auto md:max-w-6xl w-full overflow-hidden md:rounded-[2rem] border border-border/60 bg-card dark:bg-transparent shadow-none p-8 md:p-14">
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
            <div className="shadow-none! rounded-2xl border-none!  p-0 md:p-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex flex-col items-center justify-center space-y-6 py-8 px-4 text-center"
                >
                  {/* Animated Green Checkmark Badge SVG */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
                    <div className="relative grid size-16 place-items-center rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-none">
                      <svg
                        className="w-8 h-8 stroke-emerald-400 fill-none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      You&apos;re on the list.
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      We&apos;ll send your scoped roadmap within 24 hours.
                    </p>
                  </div>

                  {/* Perk Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full pt-2">
                    <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border/50 bg-background/50 text-[11px] font-semibold text-foreground">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Audit Locked
                    </div>
                    <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border/50 bg-background/50 text-[11px] font-semibold text-foreground">
                      <Sparkles className="w-3 h-3 text-emerald-400" /> Roadmap 24h
                    </div>
                    <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border/50 bg-background/50 text-[11px] font-semibold text-foreground">
                      <Clock className="w-3 h-3 text-blue-400" /> No Obligation
                    </div>
                  </div>

                  {/* 10-Second Reset Progress Bar */}
                  <div className="w-full pt-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                      <span>Auto-resetting form</span>
                      <span className="font-mono text-foreground font-bold">{countdown}s</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                      <motion.div
                        className="h-full rounded-full bg-emerald-500"
                        initial={{ width: "100%" }}
                        animate={{ width: `${(countdown / 10) * 100}%` }}
                        transition={{ duration: 0.9, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Goal gradient */}
                  <div className="flex items-center justify-between text-xs shadow-none">
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

                    <Button
                      type="button"
                      size="lg"
                      variant="default"
                      className="mt-1 rounded-full"
                      disabled={!canSubmit || submitting}
                      onClick={handleSubmit}
                    >
                      {submitting ? "Sending…" : cta.primary.label}
                      <ArrowRight className="ml-1 size-4" />
                    </Button>
                    {submitError && (
                      <p className="text-center text-xs text-destructive">{submitError}</p>
                    )}
                    <p className="text-center text-[11px] text-muted-foreground">
                      Slots reset the 1st of each month · roadmap yours to keep
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
