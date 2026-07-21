---
name: ux-psychology-conversion
description: Apply behavioral psychology (smart defaults, goal gradient, reciprocity, IKEA/endowment effect, loss aversion, contrast effect) when designing or reviewing conversion-critical UI — forms, onboarding, pricing, CTAs, empty states.
---

# UX Psychology for High-Converting Product Design

Design for how humans actually decide, not how they should. Apply these six principles whenever you touch onboarding, forms, pricing, empty states, or CTAs.

## The six principles

1. **Smart Defaults — decision fatigue.** Pre-fill every field you can reasonably guess (location, date=tomorrow, guests=2, currency, plan). 70–90% of users never change defaults. Never ship an empty form when the most-likely value is knowable.
2. **Goal Gradient — momentum beats zero.** Never start progress at 0%. Count "Account created" or "Preferences captured" as done so the bar starts at 20–30%. Show `2 of 5 complete` early.
3. **Reciprocity — give value before asking.** Deliver a useful result (score, preview, partial report, generated artifact) _before_ the signup wall. Gate the _export/save_, not the _insight_.
4. **IKEA / Endowment Effect — ownership creates commitment.** Let users pick a theme, name their workspace, customize, or complete a first task _before_ the signup form. Abandoning must feel like losing something they built.
5. **Loss Aversion — losses hurt ~2× gains.** Frame CTAs around what disappears: "3 discovery slots left this month", "Your draft expires in 24h", "Files may stop syncing". Avoid pure "Get more / Upgrade" framing when a loss frame fits.
6. **Contrast Effect — first number anchors.** Show the expensive item / annual price / competitor cost first, then the ask. "$1,900 laptop · protection just $50/mo (2.6%)". Reorder pricing tables so the anchor sits leftmost or on top.

## Ship checklist (run before merging any conversion surface)

- **Cognitive load:** every field has a sensible default; removable decisions removed.
- **Motivation:** progress bar never shows 0%; next step is a single verb.
- **Trust:** at least one unit of value delivered before any signup/payment wall.
- **Ownership:** user has customized, named, or created something before commit.
- **Conversion copy:** primary CTA frames a loss to avoid, not only a gain.
- **Pricing:** the first number a user sees is the anchor, not the ask.

## Anti-patterns to reject

- Blank forms with placeholder-only labels.
- "0% complete" onboarding meters.
- Signup walls before any output is shown.
- Pricing pages that lead with the cheapest plan (no anchor).
- CTAs that only promise gains ("Get more storage") when a loss frame exists ("Your files may stop syncing").
- Asking for email as the first step of a multi-step tool.

## Applying to an existing screen

1. List every decision the screen forces on the user. Remove or pre-fill each one you can.
2. Find the first "0" (0%, empty list, blank state) and replace with earned progress or a seeded example.
3. Find the signup/payment wall. Move at least one useful output _above_ it.
4. Find the primary CTA copy. Rewrite once as loss-framed; keep whichever tests better.
5. Find the first price shown. Ensure a larger, relevant anchor precedes it.
