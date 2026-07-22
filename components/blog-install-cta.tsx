"use client";

import { Chrome } from "lucide-react";
import { useInstallCta } from "@/components/use-install-cta";
import { InstallReassurance } from "@/components/install-reassurance";
import { useCtaImpression } from "@/components/use-cta-impression";
import { trackCtaHover } from "@/lib/analytics";
import { getInstallCtaCopy, INSTALL_BUTTON_LABEL } from "@/lib/install-cta-copy";

/**
 * Inline install CTA for the middle of a blog post.
 *
 * Most search traffic lands on a post and never sees the homepage or the footer
 * CTA, so this puts a problem-specific install prompt where the reader already
 * is. Rendered by the markdown renderer wherever a post contains the marker
 *
 *     [[install-cta topic="fonts"]]
 *
 * `topic` selects copy from lib/install-cta-copy.ts; unknown or missing topics
 * fall back to a generic message. Intended to appear more than once per post
 * (typically after the intro and before the conclusion), so it carries its own
 * vertical margin and assumes nothing about what surrounds it.
 *
 * Quieter on purpose than PostInstallBanner. That banner has to dominate — a
 * downloaded theme JSON is useless without the extension, so the dependency
 * must be unmissable. This one shows up twice in an article a reader came to
 * for help with a problem; if it reads like a popup it costs more trust than
 * the install is worth.
 *
 * Click behaviour is entirely useInstallCta's: desktop opens the store and
 * fires `install_click`; mobile/tablet gets the copy-link fallback instead,
 * since a Chrome extension can't be installed on a phone.
 */
export function BlogInstallCTA({
  topic,
  postSlug,
}: {
  topic?: string;
  postSlug: string;
}) {
  const { headline, body } = getInstallCtaCopy(topic);
  const impressionRef = useCtaImpression("blog_inline_cta");
  const { onClick, fallback } = useInstallCta(
    "blog_inline_cta",
    postSlug,
    topic ?? null
  );

  return (
    <div
      ref={impressionRef}
      data-install-cta
      className="group my-10 rounded-2xl border border-primary/30 bg-primary/[0.06] p-6"
    >
      <p className="mb-2 text-base font-bold text-foreground">{headline}</p>

      <p className="mb-5 text-sm leading-7 text-muted-foreground">{body}</p>

      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => trackCtaHover("blog_inline_cta")}
        className="inline-flex items-center gap-2 rounded-lg bg-[#4ade80] px-5 py-2.5 text-sm font-semibold text-[#0d1117] no-underline shadow-sm transition-colors hover:bg-[#3ecf6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ade80]"
      >
        <Chrome className="h-4 w-4" />
        {INSTALL_BUTTON_LABEL}
      </button>

      <InstallReassurance location="blog_inline_cta" align="left" />

      {fallback}
    </div>
  );
}
