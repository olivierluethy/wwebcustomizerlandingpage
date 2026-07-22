"use client";

import * as React from "react";
import { trackInstallCtaViewed, type InstallLocation } from "@/lib/analytics";

/**
 * Fires `install_cta_viewed` the first time an install CTA is actually seen.
 *
 * Returns a ref to attach to the CTA's outermost element:
 *
 *     const ref = useCtaImpression("install_hero");
 *     return <div ref={ref}>…</div>;
 *
 * WHY A HOOK AND NOT ONE GLOBAL OBSERVER: several CTAs mount late or
 * conditionally — the sticky bar appears mid-scroll, the theme preview only on
 * theme posts, the mobile drawer only when opened. A single observer that
 * scanned the DOM once at page load would silently miss exactly those, which
 * are the placements we most need impression data for. Per-component
 * observation follows each element's real lifecycle.
 *
 * ONCE PER MOUNT: the observer disconnects after firing, so scrolling a CTA in
 * and out doesn't inflate the denominator. The rate we want is
 * `install_click / install_cta_viewed` per person per page, not per scroll pass.
 *
 * 50% VISIBILITY: an element clipped to a sliver at the viewport edge hasn't
 * been "seen" in any sense that should count against a conversion rate.
 *
 * Degrades silently where IntersectionObserver is unavailable — an impression
 * is a measurement, and a missing measurement must never break a CTA.
 */
export function useCtaImpression(location: InstallLocation) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          trackInstallCtaViewed(location);
          observer.disconnect();
          return;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [location]);

  return ref;
}
