"use client";

import { Download } from "lucide-react";
import { trackThemeDownload } from "@/lib/analytics";

/**
 * Working theme-download CTA rendered in place of the old `(download slot)`
 * placeholders in blog posts.
 *
 * - Links to /themes/<name>.json. The file is served with
 *   `Content-Disposition: attachment` (see next.config.mjs), so it downloads
 *   rather than opening as raw JSON; the `download` attribute reinforces this
 *   and pins the filename.
 * - Fires `theme_json_downloaded` (GA + PostHog) with theme_name + post_slug.
 * - Styled as a button/CTA (matches the green install CTA used across the blog).
 */
export function ThemeDownloadButton({
  themeName,
  postSlug,
}: {
  themeName: string;
  postSlug: string;
}) {
  const href = `/themes/${themeName}.json`;
  return (
    <div className="my-6">
      <a
        href={href}
        download={`${themeName}.json`}
        onClick={() => trackThemeDownload(themeName, postSlug)}
        className="inline-flex items-center gap-2 rounded-lg bg-[#4ade80] px-5 py-3 text-sm font-semibold text-[#0d1117] no-underline shadow-sm transition-colors hover:bg-[#3ecf6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ade80]"
      >
        <Download className="h-4 w-4" />
        Download {themeName}.json
      </a>
    </div>
  );
}
