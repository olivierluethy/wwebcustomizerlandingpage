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
| `install_click` | Hero, CTA section, nav "Add to Chrome" | `category: "button"`, `label: "install"` |
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

> Building a **hover → click funnel** on the money buttons: `cta_hover` (filtered by `cta`) → `install_click`.
