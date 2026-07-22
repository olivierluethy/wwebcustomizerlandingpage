"use client";

import * as React from "react";
import { Chrome, X } from "lucide-react";
import { useInstallCta } from "@/components/use-install-cta";
import { useCtaImpression } from "@/components/use-cta-impression";
import { INSTALL_BUTTON_LABEL } from "@/lib/install-cta-copy";

/**
 * Slim persistent install bar at the bottom of a blog post.
 *
 * VISIBILITY RULES — the point is to be available, not to nag:
 *   1. Hidden until the reader passes a sentinel placed after the intro
 *      (~a third of the way in). Someone who lands and bounces never sees it.
 *   2. Hidden again whenever any other install CTA is on screen. A post can
 *      carry two inline CTAs, a theme banner and a footer CTA; without this the
 *      reader would see two install asks stacked, which is what makes a page
 *      feel pushy.
 *   3. Dismissible, and dismissal sticks for the rest of the session.
 *
 * NO SCROLL LISTENER. Both rules 1 and 2 run on a single IntersectionObserver,
 * so nothing runs on the main thread during scroll — these pages have to stay
 * smooth on low-end phones over slow connections.
 *
 * Dismissal is stored in sessionStorage, not localStorage: it should survive
 * navigating to a second post in the same tab (that's the whole point of the
 * related-posts block) but not follow the reader across visits. Falls back to a
 * module-level flag when sessionStorage throws — Safari private mode does.
 */

const DISMISS_KEY = "wwc:blog-sticky-dismissed";

/** Fallback when sessionStorage is unavailable; also keeps the bar dismissed
 *  across client-side route changes within the same page load. */
let dismissedInMemory = false;

function readDismissed(): boolean {
  if (dismissedInMemory) return true;
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed(): void {
  dismissedInMemory = true;
  try {
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // Private mode / storage disabled — the in-memory flag still holds for
    // this page load, which is the behaviour that matters most.
  }
}

export function BlogStickyBar({ postSlug }: { postSlug: string }) {
  const [dismissed, setDismissed] = React.useState(true);
  const [pastIntro, setPastIntro] = React.useState(false);
  const [ctaOnScreen, setCtaOnScreen] = React.useState(false);

  const { onClick, fallback } = useInstallCta("blog_sticky_bar", postSlug);
  const barRef = useCtaImpression("blog_sticky_bar");

  // Read dismissal after mount, never during render: sessionStorage doesn't
  // exist on the server, and reading it during render would desync hydration.
  React.useEffect(() => {
    setDismissed(readDismissed());
  }, []);

  React.useEffect(() => {
    if (dismissed) return;
    if (typeof IntersectionObserver === "undefined") {
      // No IntersectionObserver (very old browsers): show the bar rather than
      // hide it forever. Degrading to "always visible" is the safe direction.
      setPastIntro(true);
      return;
    }

    const sentinel = document.querySelector("[data-sticky-sentinel]");
    const ctas = Array.from(document.querySelectorAll("[data-install-cta]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === sentinel) {
            // Show once the sentinel has been scrolled ABOVE the viewport, not
            // merely when it's visible — otherwise the bar appears while the
            // reader is still in the intro.
            setPastIntro(entry.boundingClientRect.top < 0);
          } else {
            setCtaOnScreen(entry.isIntersecting);
          }
        }
      },
      { threshold: 0 }
    );

    if (sentinel) observer.observe(sentinel);
    else setPastIntro(true); // No sentinel on the page — don't hide forever.
    ctas.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [dismissed]);

  const onDismiss = React.useCallback(() => {
    writeDismissed();
    setDismissed(true);
  }, []);

  if (dismissed) return null;

  const visible = pastIntro && !ctaOnScreen;

  return (
    <>
      <div
        // Kept mounted and animated with opacity/transform so showing and
        // hiding never reflows the document as the reader scrolls past a CTA.
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md transition-all duration-200 motion-reduce:transition-none ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
        aria-hidden={!visible}
      >
        <div
          ref={barRef}
          className="container mx-auto flex items-center gap-3 px-4 py-2.5"
        >
          <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              Restyle WhatsApp Web
            </span>{" "}
            — themes, fonts and colors, free.
          </p>

          <button
            type="button"
            onClick={onClick}
            tabIndex={visible ? 0 : -1}
            // aria-label rather than a second sr-only span: the visible label is
            // hidden on the narrowest screens, and two text nodes would make
            // screen readers announce the button twice.
            aria-label="Add to Chrome, free"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#4ade80] px-3.5 py-2 text-sm font-semibold text-[#0d1117] transition-colors hover:bg-[#3ecf6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ade80]"
          >
            <Chrome className="h-4 w-4" aria-hidden="true" />
            <span className="max-sm:hidden">{INSTALL_BUTTON_LABEL}</span>
          </button>

          <button
            type="button"
            onClick={onDismiss}
            tabIndex={visible ? 0 : -1}
            aria-label="Dismiss install bar"
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {fallback}
    </>
  );
}
