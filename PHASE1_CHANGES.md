# Phase 1 — Real, Verifiable Trust Signals

**Date:** 2026-06-01
**Scope:** Replace the space cleared in Phase 0 with calm, honest, verifiable trust signals appropriate for a privacy-aware technical audience.
**Prerequisite:** Phase 0 complete and verified (see `PHASE0_CHANGES.md`).
**Grounded in:** `TRUST_AUDIT_REPORT.md` §3.7 (R3/R4/R6).

---

## Summary

Two new trust signals were added to the hero, both fully verifiable by a skeptical user clicking through to the source. A third (press references) was already satisfied by an existing real component and needed no work. A fourth (testimonials) was deliberately skipped because no real source material is available — fabricating it would reintroduce exactly the risk this whole effort is removing.

The production build passes (`npx next build` ✓), and the new copy is confirmed present in the prerendered static HTML while all fabricated strings are confirmed gone (`grep` over `.next/server/app/index.html` → 0 fake matches).

---

## Signal 1 — Chrome Web Store rating badge ✅ implemented

**New file:** `components/landing/hero/cws-badge.tsx`
**Wired into:** `components/landing/hero/index.tsx` — directly below the CTA button row (`mt-8`, centered), visible above the fold on desktop.

**What it shows:** `Chrome Web Store · ★ 4.1 (9 ratings) · Featured`, the whole element linking to the live listing.

**Data source & honesty notes:**
- Numbers were read directly from the live Chrome Web Store listing on **2026-06-01** via the public listing page (`.../detail/whatsapp-web-customizer-…/pnelkhckhbbgaeilofckgeajggipnmkf`). Verified values: **rating 4.1**, **9 ratings**, **"Featured"** badge present.
- **Install/user count is intentionally omitted.** The CWS listing does **not** publicly disclose an install count for this extension. Rather than invent one, none is shown — this keeps the block fully verifiable. (Audit §3.7 R4: third-party-verified numbers only.)
- These are **third-party numbers** (Google's, not self-reported), which is exactly why they're trustworthy for this audience.
- **Static, no animation** — no counting/ticking. The numbers are facts, not "activity." A click confirms them.
- **Caveat for maintainers:** these are a point-in-time snapshot. When ratings change materially, update `4.1`/`9 ratings` in `cws-badge.tsx` (single source, clearly commented). Do not animate or auto-fake them.

## Signal 2 — Privacy-first statement elevated to hero ✅ implemented

**New file:** `components/landing/hero/privacy-note.tsx`
**Wired into:** `components/landing/hero/index.tsx` — between the subheadline and the CTA row (`mb-7`, centered), above the fold.

**What it shows:** A shield icon + **"No data collected. No account. Everything stays on your device."**

**Data source & honesty notes:**
- This is a direct, plain-language restatement of the product's real privacy model as documented in `app/privacy/page.tsx`: *"We do not collect personal data… does not transmit any personal information, messages, or contacts to external servers. All customization settings and preferences are stored locally on your device."*
- Resolves the audit's flagged contradiction (§3.4): the homepage previously implied surveillance while the policy promised the opposite. The homepage now leads with the truth.
- **Calm and static** — single one-time fade-in, no "live" indicator, no pulsing dot. This directly answers the privacy-aware visitor's #1 unspoken question before they scroll.

## Signal 3 — Press / inbound references ✅ already satisfied (no change)

- The audit's R-press recommendation is **already implemented** by the existing `components/landing/social-proof.tsx` "Featured in" carousel, which links to **real, verifiable articles** (MakeUseOf, TechPP, Androidphoria, TechView9, and others) with genuine external URLs.
- Adding a second press strip in the hero would be redundant, so no new element was created. This signal is considered complete.
- *(Recommended follow-up, not done here: spot-check that each linked article still names the extension, per the audit caveat — but the component itself is honest and verifiable as-is.)*

## Signal 4 — User testimonials ⏭️ deliberately skipped

- Per the prompt's condition, testimonials are only to be added **if real source material exists**, and must never be fabricated.
- The CWS listing currently has only **9 ratings**, and individual review text is not reliably retrievable in this environment. No other verified testimonial corpus (emails, GitHub discussions) was available to quote with attribution.
- An empty/fake testimonial block is worse than none, so this signal is **intentionally omitted**. Revisit once real reviews accumulate; attribute with first name + source + link, no stock avatars, no fake timestamps.

---

## Files touched (Phase 1)

| File | Change |
|---|---|
| `components/landing/hero/cws-badge.tsx` | **New** — Chrome Web Store rating badge (static, real numbers, links to listing) |
| `components/landing/hero/privacy-note.tsx` | **New** — privacy-first statement for the hero |
| `components/landing/hero/index.tsx` | Imported both; rendered `PrivacyNote` between subhead and CTAs, `CwsBadge` below the CTA row |

---

## Verification checklist (Phase 1)

- [x] CWS trust block shows **real** numbers (4.1★, 9 ratings, Featured) matching the live listing as of 2026-06-01; no fabricated install count.
- [x] Privacy statement is in the hero between subhead and CTAs — above the fold on a 1280px desktop viewport; confirmed present in prerendered HTML.
- [x] No new `Math.random()`, `setInterval`, or fake-data generation introduced (grep of both new files → none).
- [x] Every added signal is verifiable by clicking through: CWS badge → store listing; privacy note → backed by `/privacy`; press → real article URLs.
- [x] Production build passes (`npx next build` ✓) and `npx tsc --noEmit` is clean.
- [x] Prerendered `/` HTML contains the real trust copy and **zero** fabricated strings ("Just now", "Live now", "users.active", "2,847", etc. → 0 matches).
- [x] New elements use responsive Tailwind breakpoints (the "Featured" chip and a divider collapse below `sm`); the badge and note are centered and wrap gracefully.
- [x] No console/build errors.

> Note: automated build + static-HTML inspection were used to verify rendering in this environment; a final human visual QA pass in a browser at mobile + desktop widths is recommended before publishing, but no code-level issues remain.

---

## Out of scope (reserved for Phase 2, intentionally not done)

Curated theme gallery, a "How it works / what can the extension see?" explainer, an open-source/GitHub trust section, layout/visual redesign, and any copy/headline changes beyond the two additions above (e.g. reframing the "Fastest growing" badge flagged in `PHASE0_CHANGES.md`).
