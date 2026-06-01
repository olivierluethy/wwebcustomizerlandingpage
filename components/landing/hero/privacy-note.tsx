"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

/**
 * Privacy-first statement, elevated into the hero.
 *
 * This is a direct, plain-language restatement of the product's actual privacy
 * model as documented in app/privacy/page.tsx ("We do not collect personal
 * data ... everything is stored locally on your device"). For a privacy-aware
 * audience this is the single most conversion-positive fact, so it is stated up
 * front. Intentionally calm and static — no "live" indicator, no animation
 * beyond a one-time fade-in.
 */
export function PrivacyNote() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground"
    >
      <ShieldCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      <span>
        <span className="font-medium text-foreground">No data collected.</span>{" "}
        No account. Everything stays on your device.
      </span>
    </motion.p>
  );
}
