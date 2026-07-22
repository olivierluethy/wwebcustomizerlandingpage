"use client";

import { Chrome } from "lucide-react";
import { useInstallCta } from "@/components/use-install-cta";
import { InstallReassurance } from "@/components/install-reassurance";
import { useCtaImpression } from "@/components/use-cta-impression";
import { trackCtaHover } from "@/lib/analytics";
import { INSTALL_BUTTON_LABEL } from "@/lib/install-cta-copy";

/**
 * The dominant install CTA on any post that offers theme downloads. Rendered by
 * the markdown renderer immediately BEFORE the first download button so the
 * dependency ("these files need the extension") is stated before anyone grabs a
 * JSON. Intentionally louder than the (now secondary) download buttons — this
 * is the product; the JSON is just an artifact.
 */
export function PostInstallBanner({ postSlug }: { postSlug: string }) {
  const { onClick, fallback } = useInstallCta("blog_install_banner", postSlug);
  const impressionRef = useCtaImpression("blog_install_banner");

  return (
    <div
      ref={impressionRef}
      data-install-cta
      className="group my-8 rounded-2xl border border-primary/30 bg-primary/[0.06] p-6 shadow-sm"
    >
      <p className="mb-1 text-lg font-bold text-foreground">
        These themes need the free WhatsApp Web Customizer extension
      </p>
      <p className="mb-4 text-sm text-muted-foreground">
        The downloads below are theme files you import <em>into</em> the
        extension — they don&apos;t do anything on their own. Install it first
        (Chrome, free, ~30 seconds), then grab as many themes as you like.
      </p>

      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => trackCtaHover("blog_install_banner")}
        className="inline-flex items-center gap-2 rounded-lg bg-[#4ade80] px-6 py-3 text-base font-semibold text-[#0d1117] no-underline shadow-sm transition-colors hover:bg-[#3ecf6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ade80]"
      >
        <Chrome className="h-5 w-5" />
        {INSTALL_BUTTON_LABEL}
      </button>

      <InstallReassurance location="blog_install_banner" align="left" />

      {fallback}
    </div>
  );
}
