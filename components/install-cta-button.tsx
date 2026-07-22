"use client";

import * as React from "react";
import { useInstallCta } from "@/components/use-install-cta";
import { InstallReassurance } from "@/components/install-reassurance";
import { useCtaImpression } from "@/components/use-cta-impression";
import { trackCtaHover, type InstallLocation } from "@/lib/analytics";

/**
 * Generic install CTA rendered as a <button> (so the mobile copy-link fallback
 * can replace the store navigation) while carrying arbitrary styling so it can
 * drop in where a store <a> used to live without changing its look. Fires
 * `install_click` with the given `location` on desktop; shows the fallback on
 * mobile/tablet.
 */
export function InstallCtaButton({
  location,
  postSlug = null,
  className,
  style,
  children,
}: {
  location: InstallLocation;
  postSlug?: string | null;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const { onClick, fallback } = useInstallCta(location, postSlug);
  const impressionRef = useCtaImpression(location);
  return (
    <div ref={impressionRef} data-install-cta className="group">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => trackCtaHover(location)}
        className={className}
        style={style}
      >
        {children}
      </button>
      <InstallReassurance location={location} align="left" />
      {fallback}
    </div>
  );
}
