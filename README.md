# WhatsApp Web Customizer — Landing Page

The marketing landing page and site for the **WhatsApp Web Customizer** browser
extension (themes, custom fonts, and a privacy blur for WhatsApp Web). Built with
Next.js.

## Features

- Marketing home page with feature highlights and calls to action.
- **Blog** section, **contact** page, **pricing/Pro** page, and legal pages
  (**privacy**, **terms**).
- SEO essentials: `robots.ts`, `sitemap.ts`, and Open Graph / metadata.
- **Analytics**: Google Analytics and PostHog (behavioural events), both optional
  and disabled when their env keys are absent — see [`ANALYTICS.md`](ANALYTICS.md).
- **Lemon Squeezy webhook** endpoint that verifies signatures and emits purchase
  events.

## Tech

- Next.js (App Router) + React + TypeScript
- Tailwind CSS with shadcn/ui components
- PostHog + Google Analytics
- Deployed on Vercel

## Run

```bash
pnpm install   # or npm install
pnpm dev       # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Copy `.env.example` to `.env.local` and fill in the values you need (all are
optional — analytics and webhooks no-op when their keys are empty):

- `NEXT_PUBLIC_GA_ID` — Google Analytics measurement ID.
- `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` — PostHog project key and host.
- `LEMONSQUEEZY_WEBHOOK_SECRET` — Lemon Squeezy webhook signing secret (server-only).
