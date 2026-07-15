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

/**
 * The live Chrome Web Store listing. This exact string (incl. the ?authuser/hl
 * query) is what every install CTA has always opened — kept verbatim so desktop
 * behaviour is byte-for-byte unchanged. `CHROME_STORE_SHARE_URL` is the clean
 * variant we hand to mobile users to open on their computer.
 */
export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf?authuser=0&hl=de";
export const CHROME_STORE_SHARE_URL = CHROME_STORE_URL.split("?")[0];

/** True for any href that points at our Chrome Web Store listing, regardless of
 *  query params — used by the blog-body click delegate to catch in-content
 *  store links without editing ~100 markdown bodies. */
export const isChromeStoreUrl = (href: string | null | undefined): boolean =>
  !!href && href.includes("chromewebstore.google.com");

export type DeviceType = "desktop" | "mobile" | "tablet";

/**
 * Best-effort device classifier that mirrors what PostHog reports as
 * `$device_type` (which is itself UA-derived). We classify from the User-Agent
 * rather than viewport width so a narrow desktop window isn't mislabelled as
 * mobile — the conversion question is "can this person install a Chrome
 * extension", which is a device fact, not a viewport fact.
 */
export const getDeviceType = (): DeviceType => {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) {
    return "tablet";
  }
  if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
};

/**
 * The conversion event. Fires on EVERY Chrome Web Store click anywhere on the
 * site (homepage CTAs, blog-body links, the post CTA blocks, the trust badge)
 * so we can attribute installs to the page + surface they came from. Dual-sunk
 * to GA and PostHog. `location` reuses the `cta_hover` taxonomy where it
 * overlaps (install_nav / install_hero / install_cta_section).
 */
export const trackInstallClick = (
  location: string,
  opts?: { postSlug?: string | null }
) => {
  const props = {
    location,
    pathname: typeof window !== "undefined" ? window.location.pathname : null,
    post_slug: opts?.postSlug ?? null,
    device_type: getDeviceType(),
  };
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "install_click", props);
  }
  capturePosthog("install_click", props);
};

/**
 * Fired when the "you need the extension" prompt is shown after a theme
 * download (see components/theme-download-button.tsx). Lets us measure the
 * download → install funnel the prompt is meant to repair.
 */
export const trackInstallPromptShown = (themeName: string, postSlug: string) => {
  const props = { theme_name: themeName, post_slug: postSlug };
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "install_prompt_shown", props);
  }
  capturePosthog("install_prompt_shown", props);
};

/** Mobile/tablet visitors can't install a Chrome extension. Instead of sending
 *  them to a dead store page we show a "send this to your computer" affordance;
 *  these two events measure that it's shown and used. PostHog-only. */
export const trackMobileFallbackShown = (location: string) => {
  capturePosthog("mobile_install_fallback_shown", { location });
};

export const trackMobileFallbackUsed = (method: string, location: string) => {
  capturePosthog("mobile_install_fallback_used", { method, location });
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
