"use client";

import { motion } from "framer-motion";
import { Chrome, Star } from "lucide-react";
import {
  getDeviceType,
  trackButtonClick,
  trackInstallClick,
} from "@/lib/analytics";

/**
 * Chrome Web Store trust block.
 *
 * All figures are real, third-party-verified numbers taken directly from the
 * live CWS listing (verified 2026-06-01): rating 4.1 from 9 ratings, with a
 * "Featured" badge. The Chrome Web Store does not publicly disclose an install
 * count for this listing, so none is shown — we do not invent one. Numbers are
 * static (no animation, no live ticking) — they are facts, not activity.
 */

const CWS_URL =
  "https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf";

export function CwsBadge() {
  return (
    <motion.a
      href={CWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      /* No cta_hover: this is a trust badge, not a CTA. Visitors hover it to
         READ the rating, so it logged reading-hovers that were never install
         intent — they sat in the hover→click numerator and dragged the measured
         rate down. It still fires install_click, because a click here really
         does reach the store listing. */
      onClick={() => {
        trackButtonClick("cws_badge");
        // Navigation is NOT blocked on mobile: unlike the install buttons, this
        // badge's job is "go read the listing and its reviews", which works
        // fine on a phone. It is not a dead end, so it gets no modal.
        //
        // install_click is desktop-only though — it means "reached the store
        // with the ability to install", and a phone visitor arriving at the
        // listing can't. Counting them would inflate the conversion metric with
        // people who were only reading.
        if (getDeviceType() === "desktop") {
          trackInstallClick("cws_badge");
        }
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.6 }}
      className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 backdrop-blur-md px-4 py-2 text-sm hover:border-accent/40 transition-colors"
    >
      <Chrome className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      <span className="font-medium text-foreground">Chrome Web Store</span>

      <span className="h-3.5 w-px bg-border" aria-hidden="true" />

      <span className="inline-flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
        <span className="font-semibold text-foreground tabular-nums">4.1</span>
        <span className="text-muted-foreground">(9 ratings)</span>
      </span>

      <span className="h-3.5 w-px bg-border hidden sm:block" aria-hidden="true" />

      <span className="hidden sm:inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
        Featured
      </span>
    </motion.a>
  );
}
