# Phase 0 — Removal of Fabricated Activity Signals

**Date:** 2026-06-01
**Scope:** Remove every fabricated "live" activity signal from the homepage hero. No replacements added in this phase (see `PHASE1_CHANGES.md`).
**Grounded in:** `TRUST_AUDIT_REPORT.md` — Step 1 Signal Inventory (items #1–#7).

---

## Summary

All client-side fabricated activity signals have been **deleted from the codebase** (not hidden). Seven hero component files were removed in full, two files were edited to strip fabricated content, and one file (`app/page.tsx`) was unaffected because the hero is self-contained. The build typechecks clean (`npx tsc --noEmit` → no errors) and there are no orphaned imports, dead timers, or leftover fake constants.

---

## Files DELETED (7)

| File | What it was | Audit item |
|---|---|---|
| `components/landing/hero/live-notifications.tsx` | Floating notification cards ("Lucas from Germany activated Glass Theme · Just now") cycled by `setTimeout`; used `Math.random()` | #1 |
| `components/landing/hero/notifications.ts` | Fake data pool/generator — random names, countries, themes, weighted picks (`Math.random()`) | #1 |
| `components/landing/hero/growth-strip.tsx` | "Active this week 2,847 / New today +183 / Live now 47" counters with fake live ticking | #3 |
| `components/landing/hero/community-proof.tsx` | "Joining 2,847 makers … today · live" + 5 CSS-gradient fake avatars | #4 |
| `components/landing/hero/trending-rail.tsx` | "Trending on Chrome Web Store / +214% growth this month / 1 install every few minutes" | #5 |
| `components/landing/hero/animated-counter.tsx` | The counter engine; `setInterval` that ticked numbers up by `pulseDelta` to fake "live" updates. Only consumer was the three deleted components above | #3 (engine) |
| `components/landing/hero/status-pulse.tsx` | The pulsing green "live" dot reused ~8× across the hero | #6 (the "live" motif) |

## Files EDITED (2)

### `components/landing/hero/activity-layer.tsx` (rewritten)
- **Removed** the fake `TERMINALS` data (`$ wweb stats --live` / `users.active 2,847` / `feed: streaming` / `✓ broadcasting · live`), the `MiniTerminal` component, the `Terminal` type, and the terminal render block — this was the most surveillance-suggestive element (audit item #2) and contained one of the three `2847` instances.
- **Removed** the small pulsing green "live" glow dot from each theme swatch (part of the "live" motif).
- **Removed** the now-unused `cn` import.
- **Kept** the purely decorative floating theme swatches (Glass / Midnight / Aurora / Focus) — audit item #7, rated LOW, no PII/surveillance implication. They remain `aria-hidden` background decoration.

### `components/landing/hero/index.tsx`
- Removed imports of `LiveNotifications`, `TrendingRail`, `GrowthStrip`, `CommunityProof`, `StatusPulse` (kept `ActivityLayer`).
- Removed `<LiveNotifications />` render (the floating notification layer).
- Removed the "Trending pills row" block (`<TrendingRail />`).
- Removed the `<StatusPulse />` pulsing dot from the "Fastest growing" badge.
- Removed the "Live growth strip" block (`<GrowthStrip />`) — this slot is where Phase 1 adds the real Chrome Web Store trust block + privacy statement.
- Removed the "Community proof row" block (`<CommunityProof />`).
- **Note (scope):** The badge text "🚀 Fastest growing WhatsApp Web extension" was left in place. It is an unverifiable superlative the audit flagged (item #6, disposition "reframe"), but rewriting it is a copy change explicitly reserved for a later phase. Flagged here as a Phase 2 candidate.

---

## Verification checklist (Phase 0)

- [x] No `setInterval`/`setTimeout` from fake signals remain in landing components. *(The only remaining `setTimeout`s are in `visual-demo.tsx:97,107` — legitimate scroll-to-bottom and input-focus for the interactive demo, not fabricated data.)*
- [x] No `Math.random()` remains in `components/landing`. *(Remaining `Math.random` in `components/ui/sidebar.tsx` is unrelated shadcn library skeleton code, not a landing/homepage signal.)*
- [x] The constant `2847`/`2,847` appears **zero** times in `components/`, `app/`, `lib/`.
- [x] No pulsing-dot animation remains in the hero (`status-pulse.tsx` deleted; swatch glow dot removed).
- [x] No floating-card component is imported or rendered anywhere.
- [x] The terminal/stats UI is fully removed from source, not CSS-hidden.
- [x] No orphaned references to any deleted module/component (grep across `components/landing` + `app` → none).
- [x] No orphaned CSS class references — all removed styling was inline Tailwind/framer-motion scoped to the deleted components; no separate CSS files referenced them.
- [x] No console/build errors — `npx tsc --noEmit` passes with no output.
- [x] Hero still renders coherently (badge → headline → subhead → CTAs → scroll indicator); decorative ambient background and theme swatches preserved for both mobile and desktop breakpoints.

**Result:** The homepage now contains zero fabricated activity signals. Ready for Phase 1.
