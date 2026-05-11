"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight, Users } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";
import { StatusPulse } from "./status-pulse";

function Cell({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-background/40 px-4 py-3 sm:py-3.5 flex flex-col items-start gap-1">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70 font-semibold">
        {icon}
        <span>{label}</span>
      </div>
      <div className="font-mono text-[15px] sm:text-base font-semibold text-foreground tabular-nums">
        {children}
      </div>
    </div>
  );
}

export function GrowthStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-xl mx-auto"
    >
      <div
        className="absolute -inset-px rounded-2xl opacity-70 blur-[1px]"
        style={{
          background:
            "linear-gradient(120deg, oklch(0.72 0.19 142 / 0.18), transparent 40%, transparent 60%, oklch(0.72 0.19 142 / 0.10))",
        }}
        aria-hidden="true"
      />
      <div className="relative grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-md">
        <Cell label="Active this week" icon={<Users className="h-3 w-3" />}>
          <AnimatedCounter to={2847} duration={1.8} pulseEveryMs={9000} pulseDelta={1} />
        </Cell>
        <Cell label="New today" icon={<ArrowUpRight className="h-3 w-3" />}>
          <span className="text-accent">
            +<AnimatedCounter to={183} duration={1.6} />
          </span>
        </Cell>
        <Cell label="Live now" icon={<Activity className="h-3 w-3" />}>
          <span className="inline-flex items-center gap-1.5">
            <StatusPulse size={7} />
            <AnimatedCounter to={47} duration={1.4} pulseEveryMs={5500} pulseDelta={1} />
          </span>
        </Cell>
      </div>
    </motion.div>
  );
}
