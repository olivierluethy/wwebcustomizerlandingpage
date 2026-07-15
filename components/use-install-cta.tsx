"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import {
  CHROME_STORE_URL,
  CHROME_STORE_SHARE_URL,
  getDeviceType,
  trackInstallClick,
  trackMobileFallbackShown,
  trackMobileFallbackUsed,
} from "@/lib/analytics";

/**
 * Single source of truth for what an "Add to Chrome" click should do.
 *
 * - Desktop: fires `install_click` (with the given `location` + `post_slug`)
 *   and opens the store in a new tab — byte-for-byte the old behaviour.
 * - Mobile / tablet: a Chrome extension can't be installed here, so instead of
 *   burning the intent on a dead store page we swap in a "send this to your
 *   computer" copy-link affordance and fire the `mobile_install_fallback_*`
 *   events. `install_click` is deliberately NOT fired on mobile so it keeps
 *   meaning "went to the store".
 *
 * Each CTA keeps its own markup/styling and just wires `onClick={onClick}` and
 * renders `{fallback}` beneath itself, so desktop visuals are untouched.
 */
export function useInstallCta(location: string, postSlug: string | null = null) {
  const [showFallback, setShowFallback] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const onClick = React.useCallback(
    (e?: { preventDefault?: () => void }) => {
      const device = getDeviceType();
      if (device === "mobile" || device === "tablet") {
        e?.preventDefault?.();
        if (!showFallback) trackMobileFallbackShown(location);
        setShowFallback(true);
        return;
      }
      trackInstallClick(location, { postSlug });
      window.open(CHROME_STORE_URL, "_blank");
    },
    [location, postSlug, showFallback]
  );

  const copyLink = React.useCallback(async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(CHROME_STORE_SHARE_URL);
      ok = true;
    } catch {
      // Clipboard blocked (older iOS Safari / insecure context) — the input
      // below is still selectable, and we still record the intent.
    }
    setCopied(ok);
    trackMobileFallbackUsed("copy_link", location);
    if (ok) window.setTimeout(() => setCopied(false), 2500);
  }, [location]);

  const fallback = showFallback ? (
    <div className="mt-3 rounded-xl border border-border bg-card/60 p-4 text-left">
      <p className="mb-3 text-sm font-medium text-foreground">
        Chrome extensions can&apos;t be installed on a phone. Copy the link and
        open it on your computer:
      </p>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={CHROME_STORE_SHARE_URL}
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground"
        />
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy link
            </>
          )}
        </button>
      </div>
    </div>
  ) : null;

  return { onClick, fallback };
}
