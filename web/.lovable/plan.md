## Goal

Make the Process section feel like a guided journey, not just cards fading in. Every scroll tick should reward the user with subtle, coordinated motion.

## Polish moves (Process section only)

### 1. Smoother spine + traveller

- Replace `scrub: 0.6` with `scrub: 1.2` so the traveller glides instead of snaps.
- Extend scroll range (`start: "top 60%"`, `end: "bottom 60%"`) so the draw feels paced with reading.
- Add a soft trailing "comet" — a second, larger, low-opacity circle following the traveller with a slight GSAP lag using `quickTo` for buttery interpolation.
- Layer a faint pulsing halo on the traveller (GSAP `repeat: -1 yoyo` scale 1 → 1.4, opacity 0.6 → 0).

### 2. Stage reveals with depth

- Replace the single fade/rise with a coordinated timeline per stage:
  - Chapter eyebrow: slide from side (respecting left/right alignment), 0.5s.
  - Title: mask-reveal (clip-path inset) 0.6s, staggered 0.08s after eyebrow.
  - Description: fade + 12px rise, 0.5s after title.
  - Illustration card: scale from 0.94 + fade + subtle y-tilt (rotateX 6deg → 0), 0.7s, easing `expo.out`.
- Trigger on `top 80%` with `toggleActions: "play none none reverse"` so scrolling back re-plays gently.

### 3. Node markers feel tactile

- On enter: `back.out(2.4)` pop (already there) + a one-shot ring ripple (SVG circle scaling 1 → 2.2, opacity 0.5 → 0) using GSAP.
- Persistent slow breathing pulse on the glow behind each node (opacity 0.3 → 0.55, 3s, yoyo).
- When the traveller passes a node (progress ≥ node position), swap that node's ring to fully saturated + emit a single ripple — gives the sense of "checkpoints reached".

### 4. Active-stage highlight tied to traveller

- Compute each stage's progress threshold (i / process.length).
- On spine `onUpdate`, mark the current stage `data-active="true"`; use CSS transitions (300ms) to:
  - Boost illustration card border to `p.color` at 40% opacity.
  - Lift card `translateY(-4px)` and increase shadow.
  - Fade sibling stages to `opacity: 0.55`.

### 5. Illustration micro-life

- Each illustration's `.p-illus-draw` already draws on enter — add a subtle idle loop after draw completes: e.g. a floating dot, a rotating gear, or a pulsing endpoint, GSAP `repeat: -1`, 4–6s, `sine.inOut`.
- Parallax the illustration inside its card: `y: -10 → 10` mapped to card's own ScrollTrigger scrub, so it drifts as you scroll past.

### 6. Section-level ambience

- Add a soft radial glow behind the whole section that follows the traveller vertically (a single absolutely-positioned blurred div; update `top` via the same `onUpdate` used for the traveller). Uses `p.color` of the currently active stage → the section literally "warms up" in the color of the current chapter.
- Ensure the glow sits behind cards (`z-0`) and respects `prefers-reduced-motion` (skip entirely).

### 7. Reduced-motion + perf

- Wrap all new tweens in the existing `prefersReduced` guard: fall back to instant reveals, no idle loops, no parallax, no ambient glow motion.
- Use `will-change: transform, opacity` on animated elements; clean up in `ctx.revert()`.
- Cap ambient loops to `gsap.ticker` friendly durations; avoid layout-thrashing properties (stick to transform/opacity/filter).

## Files touched

- `src/components/sections/process.tsx` — timelines, active-stage state, ambient glow, traveller comet + halo.
- `src/components/sections/process-illustrations.tsx` — add idle-loop targets (class hooks like `.p-illus-idle`) inside each SVG so `process.tsx` can animate them generically.

## Out of scope

- No content, copy, palette, or layout changes.
- No changes to other sections. If the "smoothness" needs to extend site-wide (Lenis tuning, section transitions), that's a follow-up plan.
