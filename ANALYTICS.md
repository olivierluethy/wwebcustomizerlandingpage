# Analytics

The website runs **two analytics tools in parallel**, on purpose:

| Tool | Answers | Wiring |
|---|---|---|
| **Google Analytics** (GA4) | *Acquisition* — how many people came, from where. | `@next/third-parties/google` in `app/layout.tsx`, `window.gtag`, wrapped by `lib/analytics.ts`. Unchanged. |
| **PostHog** | *Behaviour* — what people actually do here (clicks, hovers, scroll, paths). | `posthog-js` via `components/posthog-provider.tsx`, wrapped into `app/layout.tsx`. |
| **Vercel Analytics** | Core Web Vitals / traffic. | `@vercel/analytics` in `app/layout.tsx`. Unchanged. |

## Setup (required for PostHog to send anything)

Set these env vars locally (`.env.local`) **and** in Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_POSTHOG_KEY=<your PostHog Project API Key>
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com   # or https://us.i.posthog.com
```

- Get the key from **PostHog → Project Settings → Project API Key**.
- The host **must match the region** where your PostHog project lives (EU vs US).
- If `NEXT_PUBLIC_POSTHOG_KEY` is empty/absent, PostHog stays completely **off** and every capture call is a silent no-op — the site behaves exactly as before. GA is unaffected either way.

See `.env.example` for the full list.

## What PostHog captures

Configured in `components/posthog-provider.tsx`:

- **Autocapture** — every click, input change and form submit, with no per-element code.
- **Heatmaps** (`capture_heatmaps`) — click, scroll and mouse-movement heat.
- **Pageviews / pageleaves** — captured manually per route (App Router SPA navigations) for accurate path and scroll-depth analysis.
- **Session replay** — intentionally **disabled** (`disable_session_recording: true`).
- **Person profiles** — `identified_only` (traffic is anonymous; keeps cost/PII down).

## Named events (dual-sent to GA **and** PostHog)

Every helper in `lib/analytics.ts` funnels through `trackEvent()`, which sends to **both** GA and PostHog. PostHog event name = the GA action; GA's `category`/`label`/`value` become PostHog properties.

| Event (PostHog) | Fired by | Properties |
|---|---|---|
| `install_click` | **Every** Chrome Web Store click anywhere on the site (see schema below) | `location`, `pathname`, `post_slug`, `device_type` |
| `install_prompt_shown` | The "you need the extension" callout shown after a theme download | `theme_name`, `post_slug` |
| `discord_click` / `github_click` / `donation_click` | CTA + community buttons | `category: "button"` |
| `cws_badge_click` | Chrome Web Store trust badge | `category: "button"` |
| `nav_click` | Top navigation links | `category: "navigation"`, `label` |
| `footer_click` | Footer links | `category: "footer"`, `label` |
| `article_click` | Blog preview / social proof | `category: "article"`, `label: slug` |
| `scroll_depth` | Scroll tracker | `category: "engagement"`, `value: %` |
| `legal_page_view` | terms / privacy / contact | `category: "legal"`, `label` |

## PostHog-only events

Not sent to GA (to avoid GA noise):

| Event | Fired by | Properties |
|---|---|---|
| `cta_hover` | Hover on primary install CTAs (hero, CTA section, nav, CWS badge) | `cta: "install_hero" \| "install_cta_section" \| "install_nav" \| "install_nav_mobile" \| "cws_badge"` |
| `theme_json_downloaded` | Blog theme download buttons *(added with the theme-download feature)* | `theme_name`, `post_slug`, `source: "blog"` |
| `mobile_install_fallback_shown` | A mobile/tablet visitor tapped an install CTA (can't install a Chrome extension on a phone) | `location` |
| `mobile_install_fallback_used` | That visitor used the fallback (copied the store link) | `method: "copy_link"`, `location` |

> Building a **hover → click funnel** on the money buttons: `cta_hover` (filtered by `cta`) → `install_click`.

## `install_click` property schema

`install_click` is the single conversion event and fires on **every** Chrome Web Store click anywhere on the site (dual-sunk to GA + PostHog). Blog-body links are captured with **one delegated click listener** on the rendered post container (`components/blog-content.tsx`) — the markdown renderer emits links as raw HTML, so per-link React handlers aren't possible; delegation covers all ~100 in-content links with zero markdown edits.

| Property | Type | Values / notes |
|---|---|---|
| `location` | string | `install_nav`, `install_hero`, `install_cta_section` (reused from `cta_hover`), `blog_body` (in-content post links), `blog_install_banner` (prominent CTA above theme downloads), `post_download_prompt` (install button in the post-download callout), `blog_footer_cta` (bottom-of-post CTA block), `cws_badge` (trust badge) |
| `pathname` | string \| null | `window.location.pathname` of the page the click happened on |
| `post_slug` | string \| null | the blog post slug when on a post, otherwise `null` |
| `device_type` | `"desktop" \| "mobile" \| "tablet"` | UA-derived, mirrors PostHog's `$device_type` (`lib/analytics.ts` → `getDeviceType`) |

On **mobile/tablet** the primary install CTAs do **not** open the store (a Chrome extension can't be installed there). Instead they render a copy-link "send this to your computer" affordance and fire `mobile_install_fallback_shown` / `mobile_install_fallback_used` — so `install_click` keeps meaning "went to the store" and is desktop-dominated by design. (The in-body prose links and the trust badge remain plain links on mobile.)

> **Extension-installed detection:** not reliably possible from a website without extension-side cooperation (`externally_connectable` / a known web-accessible resource, both of which live in the extension repo and are out of scope). We therefore do **not** detect it — the post-download prompt shows for everyone.
