"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./animated-counter";
import { StatusPulse } from "./status-pulse";

const AVATARS = [
  { initials: "ML", from: "#34d399", to: "#10b981" },
  { initials: "SK", from: "#60a5fa", to: "#6366f1" },
  { initials: "JT", from: "#f59e0b", to: "#ef4444" },
  { initials: "AN", from: "#a78bfa", to: "#ec4899" },
  { initials: "RV", from: "#22d3ee", to: "#3b82f6" },
];

export function CommunityProof() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-md px-3 py-1.5"
    >
      <div className="flex -space-x-2" aria-hidden="true">
        {AVATARS.map((a, i) => (
          <span
            key={i}
            className="grid place-items-center h-6 w-6 rounded-full ring-2 ring-background text-[9px] font-semibold text-black/80"
            style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
          >
            {a.initials}
          </span>
        ))}
      </div>
      <span className="text-[12px] text-foreground/85">
        Joining{" "}
        <span className="font-semibold text-foreground tabular-nums">
          <AnimatedCounter to={2847} duration={2.0} />
        </span>{" "}
        makers customizing WhatsApp Web today
      </span>
      <span className="hidden sm:inline-flex items-center gap-1 text-[10.5px] uppercase tracking-wider text-accent/85 font-semibold">
        <StatusPulse size={6} /> live
      </span>
    </motion.div>
  );
}
