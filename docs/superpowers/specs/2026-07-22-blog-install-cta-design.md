# BlogInstallCTA — inline install CTA for blog posts

**Date:** 2026-07-22
**Status:** Approved

## Problem

~90% of traffic lands on a blog troubleshooting post from Google search and never
reaches the homepage. Blog pages already drive most extension installs. The
existing install CTAs are the footer block and `PostInstallBanner` (which only
appears on posts offering theme downloads). Readers of troubleshooting posts —
the highest-volume segment — get no problem-relevant install prompt in the body.

## Goal

A reusable component that renders an install CTA inline mid-article, with copy
that maps the reader's specific problem to what the extension actually does, and
that reports its conversions separately from existing CTAs.

## Constraints discovered in the codebase

1. **Posts are not MDX.** Post bodies are markdown strings in `lib/blog.ts`,
   rendered by a hand-written line-by-line parser, `renderMarkdown()` in
   `app/blog/[slug]/page.tsx`. There is no JSX per post to edit. The parser
   already injects React components mid-content (`PostInstallBanner` before the
   first theme download), so marker-driven injection follows existing precedent.

2. **`location: "blog_body"` is already in use.** `components/blog-content.tsx`
   fires `install_click` with `location: "blog_body"` via a delegated listener on
   every Chrome Web Store link inside the markdown body (~100 links). Reusing
   that value would make the new component's conversions inseparable from plain
   in-content links — the exact number this work exists to measure.

3. **Mobile cannot install a Chrome extension.** `useInstallCta` already handles
   this: desktop opens the store and fires `install_click`; mobile/tablet shows a
   copy-link-to-your-computer affordance and fires `mobile_install_fallback_*`
   instead. Search traffic skews mobile, so the component must reuse this hook
   rather than rendering a plain store link.

4. **Numeric social proof is a flagged risk.** `TRUST_AUDIT_REPORT.md` rates
   fabricated user counts a critical credibility risk. "4,000+ users" is retained
   because it is the real Chrome Web Store install count and is verifiable by
   anyone who clicks through to the listing.

## Design

### Components

**`lib/install-cta-copy.ts`** — the copy map, kept separate from the component so
copy edits do not touch JSX. Exports a topic → `{ headline, body }` record plus a
generic fallback, and a resolver that returns the fallback for unknown/missing
topics.

**`components/blog-install-cta.tsx`** — client component.

```tsx
<BlogInstallCTA topic="fonts" postSlug={slug} />
```

- `topic?: string` — optional; unknown or missing resolves to the fallback copy.
- `postSlug: string` — passed through to analytics.
- Renders headline, body, primary button, trust microcopy.
- Click behavior delegates entirely to `useInstallCta("blog_inline_cta", postSlug)`.

### Copy principle: capability vs. bridge topics

The extension customizes WhatsApp Web (themes, colors, fonts, backgrounds,
dark mode, blur/privacy, quick replies, decluttering). It does **not** fix
WhatsApp or browser faults. The highest-traffic posts are troubleshooting posts
for faults it cannot fix.

Copy therefore splits in two:

- **Capability topics** (`themes`, `fonts`, `colors`, `backgrounds`, `dark-mode`,
  `privacy`) — direct claim. The reader wants a thing the extension does.
- **Bridge topics** (`notifications`, `logging-out`, `not-loading`, `meta-ai`) —
  **no fix claim**. Acknowledge that the fix is in the article and that the
  extension does not solve it, then pivot to a real adjacent capability.

Claiming the extension fixes dropped sessions or broken notifications would be a
false claim aimed at the most skeptical readers, and is the failure mode
`TRUST_AUDIT_REPORT.md` identifies as critical. Honest bridging is expected to
convert better on this audience than an overclaim.

### v1 topic coverage

`notifications`, `themes`, `fonts`, `logging-out`, `backgrounds`, `dark-mode`,
`colors`, `not-loading`, `privacy`, `meta-ai`, plus the generic fallback.

### Analytics

`install_click` with `{ location: "blog_inline_cta", topic, post_slug }`.

`trackInstallClick` currently accepts `(location, { postSlug })`. Its options
object gains an optional `topic`, emitted as the `topic` property (null when
absent). Additive — no existing caller changes. `location` is
`blog_inline_cta`, distinct from the existing `blog_body`; a PostHog query can
union the two when a combined blog-body figure is wanted.

Mobile keeps the established semantics: no `install_click`, the
`mobile_install_fallback_*` events fire instead, so `install_click` continues to
mean "reached the store".

### Marker syntax and parsing

Authors place a line in the post markdown:

```
[[install-cta topic="fonts"]]
```

`topic` is optional: `[[install-cta]]` renders the fallback copy.

Parsing happens in `renderMarkdown()`, in the line loop **after** the
`inCodeBlock` guard (so the syntax can be documented inside a fenced block
without rendering) and before paragraph handling. On match it calls `flushList()`
and `flushTable()`, then pushes `<BlogInstallCTA>`, matching how the theme
download marker is handled.

### Styling

Tailwind only, dark mode only, matching `PostInstallBanner`'s vocabulary:
`rounded-2xl border border-primary/30 bg-primary/[0.06] p-6`, the `#4ade80`
button, `text-foreground` / `text-muted-foreground`.

Deliberately quieter than `PostInstallBanner`: that component must dominate on
download posts because a theme JSON is useless without the extension, whereas
this one appears twice per article and must not read as a popup.

Trust microcopy under the button, `text-xs text-muted-foreground`:
`Free · No signup · 4,000+ users`.

### Insertability

The component is position-independent — no assumptions about surrounding
elements, own vertical margins. Multiple markers per post are supported; the
intended pattern is after the intro and again before the conclusion.

## Rollout

Wire into one post first:
`whatsapp-web-font-not-changing-common-causes-and-fixes-2026` — a capability
topic where the reader's stated problem (font won't change) maps directly to a
real feature. Two markers: after the intro, before the conclusion.

Verify the build passes and the rendered page looks correct before applying the
marker to any other post.

## Out of scope

- Auto-injection of CTAs across all posts without per-post markers.
- A/B testing of copy variants.
- Backfilling markers into the remaining ~85 posts (follow-up, once numbers
  from the first post are in).
