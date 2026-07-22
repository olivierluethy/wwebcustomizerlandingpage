"use client";

import * as React from "react";
import {
  CHROME_STORE_URL,
  getDeviceType,
  trackInstallClick,
  trackMobileFallbackShown,
  type InstallLocation,
} from "@/lib/analytics";
import dynamic from "next/dynamic";

/**
 * Code-split: the modal pulls in the dialog primitive and the QR generator, and
 * only mobile/tablet visitors ever open it — after a tap, never on first paint.
 * Loading it eagerly would put that weight on every desktop visitor, who can
 * never see it. `ssr: false` because it's purely a client interaction.
 */
const MobileInstallModal = dynamic(
  () =>
    import("@/components/mobile-install-modal").then(
      (m) => m.MobileInstallModal
    ),
  { ssr: false }
);

/**
 * Single source of truth for what an "Add to Chrome" click should do.
 *
 * - Desktop: fires `install_click` (with the given `location` + `post_slug`)
 *   and opens the store in a new tab — byte-for-byte the old behaviour.
 * - Mobile / tablet: a Chrome extension can't be installed here, so instead of
 *   burning the intent on a dead store page we open the "continue on your
 *   computer" modal (email / copy link / QR) and fire the
 *   `mobile_install_fallback_*` events. `install_click` is deliberately NOT
 *   fired on mobile so it keeps meaning "went to the store".
 *
 * Each CTA keeps its own markup/styling and just wires `onClick={onClick}` and
 * renders `{fallback}` beneath itself, so desktop visuals are untouched.
 *
 * `fallback` renders nothing at all on desktop, and the modal is only mounted
 * once a mobile visitor has actually tapped a CTA — so the QR dependency stays
 * out of the initial render path for everyone.
 */
export function useInstallCta(
  location: InstallLocation,
  postSlug: string | null = null,
  topic: string | null = null
) {
  const [modalOpen, setModalOpen] = React.useState(false);
  /** Once true, this visitor has opened the modal at least once — used to keep
   *  `mobile_install_fallback_shown` at one event per CTA per visitor, so the
   *  recovery-rate denominator counts people, not reopens. */
  const shownRef = React.useRef(false);

  const onClick = React.useCallback(
    (e?: { preventDefault?: () => void }) => {
      const device = getDeviceType();
      if (device === "mobile" || device === "tablet") {
        // Stop the anchor navigating: some CTAs are <a> elements, and letting
        // them through would send the visitor to the very dead store page the
        // modal exists to replace.
        e?.preventDefault?.();
        if (!shownRef.current) {
          trackMobileFallbackShown(location);
          shownRef.current = true;
        }
        setModalOpen(true);
        return;
      }
      trackInstallClick(location, { postSlug, topic });
      window.open(CHROME_STORE_URL, "_blank");
    },
    [location, postSlug, topic]
  );

  // Mounted only after a mobile visitor taps — desktop never renders it, so the
  // QR code and dialog never enter the desktop render path.
  const fallback = modalOpen ? (
    <MobileInstallModal
      open={modalOpen}
      onOpenChange={setModalOpen}
      location={location}
    />
  ) : null;

  return { onClick, fallback };
}
