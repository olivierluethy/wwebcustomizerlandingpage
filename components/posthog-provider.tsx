"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

/**
 * PostHog product analytics — runs ALONGSIDE Google Analytics, not instead of it.
 *
 * GA (see app/layout.tsx) still answers "how many people came and from where".
 * PostHog answers "what did they actually DO once here" — every click, button
 * press, link navigation and scroll is captured via autocapture + heatmaps, and
 * every explicit event fired through lib/analytics.ts is mirrored here too.
 *
 * Configuration is env-driven so nothing is hardcoded:
 *   - NEXT_PUBLIC_POSTHOG_KEY   the project API key (set in Vercel)
 *   - NEXT_PUBLIC_POSTHOG_HOST  ingestion host (defaults to EU cloud)
 *
 * If NEXT_PUBLIC_POSTHOG_KEY is absent, PostHog stays completely off and every
 * capture call becomes a silent no-op — so local dev and preview builds without
 * the key behave exactly as before.
 */

const DEFAULT_HOST = "https://eu.i.posthog.com";

/** Manual pageview capture — required for the App Router (SPA navigations don't
 *  trigger a full page load). Wrapped in <Suspense> because useSearchParams()
 *  opts the subtree into client-side rendering. */
function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    // Only capture once PostHog has actually initialised (key present).
    if (!posthog.__loaded) return;

    let url = window.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += `?${qs}`;

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return; // Not configured — PostHog stays off.
    if (posthog.__loaded) return; // Guard against a second init on Fast Refresh.

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || DEFAULT_HOST,
      person_profiles: "identified_only", // anonymous marketing traffic — no login
      capture_pageview: false, // handled manually above for the App Router
      capture_pageleave: true, // needed for bounce + scroll-depth analysis
      autocapture: true, // every click / input / submit, no per-element code
      capture_heatmaps: true, // click + scroll + mouse-movement heatmaps
      disable_session_recording: true, // session replay intentionally OFF
    });
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </>
  );
}
