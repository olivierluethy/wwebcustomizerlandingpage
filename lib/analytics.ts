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

/**
 * THE CANONICAL PLACEMENT VOCABULARY.
 *
 * Every install CTA on the site reports one of these, and the same value is
 * used by `install_click`, `cta_hover` and `install_cta_viewed`, so the three
 * join on one property and a per-placement funnel needs no value mapping.
 *
 * This is a typed union, not a comment: `trackInstallClick("instal_hero")` is a
 * build error, which is the only way a vocabulary stays canonical over time.
 * Adding a placement means adding it here first.
 *
 * NOT IN THIS LIST — "mobile_fallback". Mobile and tablet visitors cannot
 * install a Chrome extension, so they never fire install_click at all; they get
 * the modal and fire `mobile_install_fallback_shown` / `_used` instead, which
 * already carry the originating `location` from this same list. Adding a
 * mobile_fallback location would fold non-installs back into the install metric
 * and inflate it by the whole ~24% mobile share.
 */
export const INSTALL_LOCATIONS = [
  /** Homepage hero, primary above-the-fold CTA. */
  "install_hero",
  /** Top navigation bar (desktop bar and mobile drawer both report this). */
  "install_nav",
  /** Mid-homepage "Ready to transform your WhatsApp Web?" section. */
  "install_cta_section",
  /** Chrome Web Store trust badge in the hero. Desktop clicks only. */
  "cws_badge",
  /** Chrome Web Store links inside post markdown, via a delegated listener. */
  "blog_body",
  /** <BlogInstallCTA>, injected mid-article by an [[install-cta]] marker. */
  "blog_inline_cta",
  /** <PostInstallBanner>, above the first theme download on a post. */
  "blog_install_banner",
  /** End-of-post CTA block. */
  "blog_footer_cta",
  /** Dismissible sticky bar on blog posts. */
  "blog_sticky_bar",
  /** Before/after theme preview (hero and theme posts). */
  "theme_preview",
  /** Theme acquisition block on theme posts. */
  "post_download_prompt",
] as const;

export type InstallLocation = (typeof INSTALL_LOCATIONS)[number];

export type DeviceType = "desktop" | "mobile" | "tablet";

/**
 * True when the PRIMARY input device is a finger/stylus rather than a mouse.
 *
 * Note `pointer:` describes the primary pointing device, not merely an
 * available one. A touchscreen laptop driven by a trackpad reports
 * `pointer: fine`, so it is correctly left as desktop — `any-pointer: coarse`
 * would wrongly catch it, which is why it isn't used here.
 *
 * Returns false whenever matchMedia is unavailable, so the UA classifier below
 * remains the sole authority rather than the check failing open.
 */
const hasCoarsePrimaryPointer = (): boolean => {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia !== "function") return false;
  try {
    return window.matchMedia("(pointer: coarse)").matches;
  } catch {
    return false;
  }
};

/**
 * Best-effort device classifier that mirrors what PostHog reports as
 * `$device_type` (which is itself UA-derived).
 *
 * Deliberately NOT viewport-based. The conversion question is "can this person
 * install a Chrome extension" — a device fact, not a window-size fact. A
 * desktop user with a half-width or split-screen window must keep the ability
 * to install, and a width breakpoint would take it away from them. Being wrong
 * in that direction costs a real install, so the check is built to avoid false
 * "mobile" positives specifically.
 *
 * Two independent signals:
 *   1. User-Agent — primary, unchanged.
 *   2. Primary pointer type — corroboration only, and only ever able to move a
 *      device from desktop to tablet, never the reverse.
 *
 * Signal 2 exists for iPadOS, whose Safari requests desktop sites by default
 * and reports a Macintosh UA. Those visitors were previously classified as
 * desktop and sent to a store page they cannot install from. A coarse primary
 * pointer on a Mac-looking UA is, in practice, an iPad.
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
  // UA says desktop. Only a coarse PRIMARY pointer overrides that, and only to
  // "tablet" — a real desktop with a mouse can never land here.
  if (hasCoarsePrimaryPointer()) return "tablet";
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
  location: InstallLocation,
  opts?: { postSlug?: string | null; topic?: string | null }
) => {
  const props = {
    location,
    pathname: typeof window !== "undefined" ? window.location.pathname : null,
    post_slug: opts?.postSlug ?? null,
    // Only the inline blog CTA (location: "blog_inline_cta") sets this — it's
    // the reader's problem area, so conversions can be broken down by which
    // kind of post earned them. Null everywhere else.
    topic: opts?.topic ?? null,
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

/**
 * Mobile/tablet visitors can't install a Chrome extension. Instead of sending
 * them to a dead store page we open a "continue on your computer" modal; these
 * two events measure that it's shown and used. PostHog-only.
 *
 * These — NOT install_click — are the mobile conversion metric. install_click
 * means "reached the Chrome Web Store", which a phone visitor by definition
 * hasn't done; firing it here would inflate the site-wide install number by the
 * whole mobile share (~24% of traffic) with events where nobody arrived at a
 * store, and would silently pollute the desktop hover→click funnel.
 *
 * Recovery rate = mobile_install_fallback_used / mobile_install_fallback_shown,
 * broken down by `method` to see which path people actually take.
 */
export const trackMobileFallbackShown = (location: InstallLocation) => {
  capturePosthog("mobile_install_fallback_shown", {
    location,
    device_type: getDeviceType(),
    pathname: typeof window !== "undefined" ? window.location.pathname : null,
  });
};

export type MobileFallbackMethod = "copy_link" | "email" | "qr";

export const trackMobileFallbackUsed = (
  method: MobileFallbackMethod,
  location: InstallLocation
) => {
  capturePosthog("mobile_install_fallback_used", {
    method,
    location,
    device_type: getDeviceType(),
    pathname: typeof window !== "undefined" ? window.location.pathname : null,
  });
};

/**
 * Navigation to another post — the related-posts block and the homepage blog
 * strip. `article_slug` is the DESTINATION; `pathname` is where the click came
 * from, so second-pageview paths read end to end.
 *
 * GA still receives the slug as `event_label` so existing reports resolve;
 * query PostHog on `article_slug` for anything new.
 */
/**
 * CTA IMPRESSION — fired once per placement per page view, the first time an
 * install CTA is at least half visible in the viewport.
 *
 * NAMED install_cta_viewed, NOT install_prompt_shown. `install_prompt_shown`
 * already exists and means something narrower and unrelated: the theme-download
 * block turning into its "you still need the extension" confirmation, carrying
 * {theme_name, post_slug}. Reusing that name for generic CTA impressions would
 * merge two different things into one series and silently corrupt the existing
 * download→install funnel it was added for.
 *
 * Completes the per-placement funnel:
 *   install_cta_viewed → cta_hover (desktop only) → install_click
 * all keyed on the same `location`.
 */
export const trackInstallCtaViewed = (location: InstallLocation) => {
  capturePosthog("install_cta_viewed", {
    location,
    device_type: getDeviceType(),
    pathname: typeof window !== "undefined" ? window.location.pathname : null,
  });
};

export const trackArticleClick = (
  articleSlug: string,
  source: "related_posts" | "blog_preview" | "other" = "other"
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "article_click", {
      event_category: "article",
      event_label: articleSlug,
    });
  }
  capturePosthog("article_click", {
    article_slug: articleSlug,
    source,
    pathname: typeof window !== "undefined" ? window.location.pathname : null,
    device_type: getDeviceType(),
  });
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
 *
 * Emits `location` using the SAME taxonomy as trackInstallClick, so a
 * hover→click funnel can be built on one shared property. It previously
 * emitted only `cta`, which meant the two ends of the funnel had different
 * property names and could not be joined without hand-mapping values. `cta` is
 * still emitted, unchanged, so existing saved insights keep working — treat it
 * as deprecated and filter on `location` for anything new.
 *
 * Only ever fires on devices with a real pointer, so any hover→click rate
 * derived from it is a DESKTOP rate. Mobile/tablet cannot hover and cannot
 * install a Chrome extension (see useInstallCta), so they are absent from both
 * ends of the funnel by design.
 *
 * Deliberately NOT fired by:
 *   - the Chrome Web Store trust badge — people hover it to read the rating,
 *     not to install, so it logged reading-hovers that could never convert;
 *   - the mobile nav button — a tap there opens the copy-link fallback, which
 *     does not fire install_click, so those hovers were structurally
 *     unconvertible.
 */
export const trackCtaHover = (location: InstallLocation) => {
  capturePosthog("cta_hover", {
    location,
    /** @deprecated use `location` */
    cta: location,
    pathname: typeof window !== "undefined" ? window.location.pathname : null,
    device_type: getDeviceType(),
  });
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
