# Vercel

## Mission

Create implementation-ready, token-driven UI guidance for Vercel that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

## Brand

- Product/brand: Vercel
- URL: https://vercel.com/adityakbr01s-projects
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations

- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=GeistSans`, `font.family.stack=GeistSans, GeistSans Fallback`, `font.size.base=14px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=14px`, `font.size.sm=16px`
- Color palette: `color.text.primary=#ededed`, `color.text.secondary=#a1a1a1`, `color.surface.muted=#0a0a0a`, `color.focus.ring=#52a8ff`, `color.surface.base=#000000`, `color.border.default=#1f1f1f`, `color.border.muted=#ffffff`
- Spacing scale: `space.1=1px`, `space.2=2px`, `space.3=4px`, `space.4=6px`, `space.5=8px`, `space.6=10px`, `space.7=12px`, `space.8=16px`
- Radius/shadow/motion tokens: `radius.xs=4px`, `radius.sm=6px`, `radius.md=40px`, `radius.lg=26843500px` | `shadow.1=rgba(255, 255, 255, 0.145) 0px 0px 0px 1px, rgba(0, 0, 0, 0.16) 0px 1px 2px 0px, rgb(0, 0, 0) 0px 0px 0px 1px`, `shadow.2=rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(46, 46, 46) 0px 0px 0px 1px`, `shadow.3=rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(0, 0, 0) 0px 0px 0px 2px, rgb(82, 168, 255) 0px 0px 0px 4px` | `motion.duration.instant=150ms`, `motion.duration.fast=200ms`

## Accessibility

- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone

Concise, confident, implementation-focused.

## Rules: Do

- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't

- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow

1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure

- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations

- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (150), buttons (93), inputs (9), navigation (4), lists (3), cards (1).

- Extraction diagnostics: Limited typography variety detected; size scale may need manual refinement. Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates

- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.

here is dashboard allready implemented github link
https://github.com/satnaing/shadcn-admin
https://shadcnuikit.com/dashboard/default

live link : https://shadcn-admin.netlify.app/

shadcn components
https://github.com/shadcn-ui/ui
https://dashboard.shadcnspace.com/
