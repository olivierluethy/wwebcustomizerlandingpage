"use client";

import * as React from "react";
import { isChromeStoreUrl, trackInstallClick } from "@/lib/analytics";

/**
 * Wraps the rendered blog markdown (`.prose`) and instruments every in-content
 * Chrome Web Store link via a SINGLE delegated click listener.
 *
 * Why delegation: the markdown renderer (app/blog/[slug]/page.tsx) emits links
 * as raw HTML strings through `dangerouslySetInnerHTML`, so there are no React
 * anchor components to add an onClick to — and there are ~100 such links across
 * the blog. One listener on the container catches all of them (and any added
 * later) without touching a single markdown body.
 *
 * Non-blocking on purpose: we do NOT preventDefault, so the link navigates
 * exactly as before (target="_blank"); `install_click` just fires first.
 *
 * The managed CTAs on the page (install banner, post-download prompt, footer
 * CTA) are <button>s that call window.open — they have no store href, so this
 * listener ignores them and they report their own precise `location`.
 */
export function BlogContent({
  postSlug,
  children,
}: {
  postSlug: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      if (!isChromeStoreUrl(anchor.getAttribute("href"))) return;
      trackInstallClick("blog_body", { postSlug });
    };

    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [postSlug]);

  return (
    <div ref={ref} className="prose prose-invert prose-lg max-w-none">
      {children}
    </div>
  );
}
