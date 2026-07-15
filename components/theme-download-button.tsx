"use client";

import * as React from "react";
import { Download, Chrome, X } from "lucide-react";
import { trackThemeDownload, trackInstallPromptShown } from "@/lib/analytics";
import { useInstallCta } from "@/components/use-install-cta";

/**
 * Theme-download CTA rendered in place of the old `(download slot)` markers.
 *
 * Funnel design (Problem 2): the theme JSON is useless without the extension,
 * so this button is now a SECONDARY action (muted/outline) sitting under the
 * dominant install banner (components/post-install-banner.tsx). Its label reads
 * "Import into WhatsApp Web Customizer" to make the dependency explicit.
 *
 * On download it still fires `theme_json_downloaded` (unchanged) AND — because
 * we can't reliably detect whether the extension is installed from a website —
 * shows a small non-blocking inline callout telling the visitor the theme needs
 * the extension, with an install button (`install_click` location
 * `post_download_prompt`). The <a download> still writes the real .json to disk.
 */
export function ThemeDownloadButton({
  themeName,
  postSlug,
}: {
  themeName: string;
  postSlug: string;
}) {
  const href = `/themes/${themeName}.json`;
  const [showPrompt, setShowPrompt] = React.useState(false);
  const { onClick: onInstallClick, fallback } = useInstallCta(
    "post_download_prompt",
    postSlug
  );

  const handleDownload = () => {
    trackThemeDownload(themeName, postSlug);
    if (!showPrompt) trackInstallPromptShown(themeName, postSlug);
    setShowPrompt(true);
  };

  return (
    <div className="my-6">
      <a
        href={href}
        download={`${themeName}.json`}
        onClick={handleDownload}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground no-underline transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border"
      >
        <Download className="h-4 w-4" />
        Import into WhatsApp Web Customizer
      </a>

      {showPrompt && (
        <div className="relative mt-3 max-w-xl rounded-xl border border-primary/30 bg-primary/[0.06] p-4">
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setShowPrompt(false)}
            className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <p className="mb-1 pr-6 text-sm font-semibold text-foreground">
            Saved {themeName}.json — now import it with the extension
          </p>
          <p className="mb-3 text-sm text-muted-foreground">
            A theme file can&apos;t change WhatsApp Web on its own. Install the
            free extension, then import the file you just downloaded.
          </p>

          <button
            type="button"
            onClick={onInstallClick}
            className="inline-flex items-center gap-2 rounded-lg bg-[#4ade80] px-4 py-2 text-sm font-semibold text-[#0d1117] no-underline shadow-sm transition-colors hover:bg-[#3ecf6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ade80]"
          >
            <Chrome className="h-4 w-4" />
            Add to Chrome — it&apos;s free
          </button>

          {fallback}
        </div>
      )}
    </div>
  );
}
