import posthog from "posthog-js";

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Analytics is DUAL-SINK:
 *   1. Google Analytics (gtag) — kept exactly as before, still the source of
 *      truth for acquisition ("how many people came, from where").
 *   2. PostHog — product analytics for behaviour ("what did they do here").
 *
 * Every event fired through trackEvent() below now lands in BOTH. PostHog also
 * autocaptures raw clicks/inputs and records heatmaps on top of these named
 * events (see components/posthog-provider.tsx), so funnels can use either the
 * clean semantic events (install_click, nav_click, …) or raw autocapture.
 *
 * PostHog capture is a safe no-op until posthog.init() has run (i.e. when
 * NEXT_PUBLIC_POSTHOG_KEY is set), so nothing breaks when it isn't configured.
 */

const capturePosthog = (
  event: string,
  properties?: Record<string, unknown>
) => {
  if (typeof window === "undefined") return;
  if (!posthog.__loaded) return;
  posthog.capture(event, properties);
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  // Google Analytics (unchanged).
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // PostHog — same event name, structured properties.
  capturePosthog(action, {
    category,
    ...(label !== undefined ? { label } : {}),
    ...(value !== undefined ? { value } : {}),
  });
};

export const trackButtonClick = (buttonName: string) => {
  trackEvent(`${buttonName}_click`, "button", buttonName);
};

export const trackArticleClick = (articleSlug: string) => {
  trackEvent("article_click", "article", articleSlug);
};

export const trackScrollDepth = (depth: number) => {
  trackEvent("scroll_depth", "engagement", `${depth}%`, depth);
};

export const trackNavClick = (linkName: string) => {
  trackEvent("nav_click", "navigation", linkName);
};

export const trackFooterClick = (linkName: string) => {
  trackEvent("footer_click", "footer", linkName);
};

export const trackLegalPageView = (pageName: string) => {
  trackEvent("legal_page_view", "legal", pageName);
};

/**
 * Explicit hover tracking on the primary conversion CTAs (the "Add to
 * Chrome" / install buttons). Autocapture + heatmaps already show hover
 * heat, but a named event lets us build a precise hover→click funnel on the
 * money buttons. PostHog-only on purpose — we don't add hover noise to GA.
 */
export const trackCtaHover = (ctaName: string) => {
  capturePosthog("cta_hover", { cta: ctaName });
};

/**
 * Blog theme download. This is the measurement that tells us which aesthetics
 * people actually want (→ future built-in / premium presets). Dual-sunk to GA
 * and PostHog with the exact agreed property names.
 */
export const trackThemeDownload = (themeName: string, postSlug: string) => {
  const props = {
    theme_name: themeName,
    post_slug: postSlug,
    source: "blog" as const,
  };
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "theme_json_downloaded", props);
  }
  capturePosthog("theme_json_downloaded", props);
};
