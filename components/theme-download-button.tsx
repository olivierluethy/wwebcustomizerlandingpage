"use client";

import * as React from "react";
import { Download, Chrome, Check } from "lucide-react";
import {
  trackThemeDownload,
  trackInstallPromptShown,
  trackCtaHover,
} from "@/lib/analytics";
import { useInstallCta } from "@/components/use-install-cta";
import { InstallReassurance } from "@/components/install-reassurance";
import { useCtaImpression } from "@/components/use-cta-impression";
import { INSTALL_BUTTON_LABEL } from "@/lib/install-cta-copy";

/**
 * Theme acquisition block, rendered in place of the old `(download slot)`
 * markers. Presents both routes to having the theme at the same moment:
 * install the extension, or take the .json.
 *
 * WHY BOTH, SIDE BY SIDE: theme downloads correlate with engaged sessions, so
 * the download is a signal worth protecting, not a leak to plug. It stays ONE
 * click — it is not gated behind a modal or an interstitial. The extension is
 * offered alongside it rather than in front of it, because a file the reader
 * can't use is a dead end for them and a wasted signal for us.
 *
 * The block MUTATES into a confirmation after download rather than spawning a
 * second panel underneath. Previously the download produced an additional
 * install prompt below the button, which — combined with the inline CTAs, the
 * theme banner and the sticky bar — stacked two install asks in one viewport.
 *
 * COPY ACCURACY: it does not say installing "applies the theme in one click".
 * Installing the extension does not apply this theme; the .json still has to be
 * imported afterwards. Same reason PostInstallBanner spells the dependency out.
 *
 * Events: `theme_json_downloaded { theme_name, post_slug, source }` on download
 * (unchanged), `install_prompt_shown` the first time the confirmation appears,
 * and `install_click { location: "post_download_prompt" }` from the install
 * button via useInstallCta.
 */
export function ThemeDownloadButton({
  themeName,
  postSlug,
}: {
  themeName: string;
  postSlug: string;
}) {
  const href = `/themes/${themeName}.json`;
  const impressionRef = useCtaImpression("post_download_prompt");
  const [downloaded, setDownloaded] = React.useState(false);
  const { onClick: onInstallClick, fallback } = useInstallCta(
    "post_download_prompt",
    postSlug
  );

  const handleDownload = () => {
    trackThemeDownload(themeName, postSlug);
    if (!downloaded) trackInstallPromptShown(themeName, postSlug);
    setDownloaded(true);
  };

  return (
    <div
      ref={impressionRef}
      data-install-cta
      className="group my-6 max-w-xl rounded-xl border border-primary/30 bg-primary/[0.06] p-4"
    >
      <p className="text-sm font-semibold text-foreground">
        {downloaded
          ? `Saved ${themeName}.json — now import it`
          : `Get the ${themeName} theme`}
      </p>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {downloaded ? (
          <>
            A theme file can&apos;t change WhatsApp Web on its own. Install the
            free extension, then import the file you just downloaded.
          </>
        ) : (
          <>
            Download the .json and import it into the extension — or install the
            extension first if you don&apos;t have it yet.
          </>
        )}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onInstallClick}
          onMouseEnter={() => trackCtaHover("post_download_prompt")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#4ade80] px-4 py-2 text-sm font-semibold text-[#0d1117] no-underline shadow-sm transition-colors hover:bg-[#3ecf6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ade80]"
        >
          <Chrome className="h-4 w-4" aria-hidden="true" />
          {INSTALL_BUTTON_LABEL}
        </button>

        {/* Stays a real <a download> and a single click. Labelled for what it
            does — it writes a file. The old label said "Import into WhatsApp
            Web Customizer", which described an action this control can't
            perform. */}
        <a
          href={href}
          download={`${themeName}.json`}
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground no-underline transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border"
        >
          {downloaded ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Download className="h-4 w-4" aria-hidden="true" />
          )}
          {downloaded ? "Download again" : `Download ${themeName}.json`}
        </a>
      </div>

      <InstallReassurance location="post_download_prompt" align="left" />

      {fallback}
    </div>
  );
}
