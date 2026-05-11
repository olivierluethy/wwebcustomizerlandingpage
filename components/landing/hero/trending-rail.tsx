"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusPulse } from "./status-pulse";
import { AnimatedCounter } from "./animated-counter";

function Pill({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -1 }}
      className={cn(
        "group relative inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3 py-1.5 text-[11.5px] text-foreground/85 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative inline-flex items-center gap-1.5 whitespace-nowrap">
        {children}
      </span>
    </motion.span>
  );
}

export function TrendingRail() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="flex flex-wrap justify-center items-center gap-2"
    >
      <Pill delay={0.05}>
        <Flame className="h-3.5 w-3.5 text-amber-400" />
        <span className="font-semibold tracking-tight">
          Trending on Chrome Web Store
        </span>
      </Pill>
      <Pill delay={0.15}>
        <TrendingUp className="h-3.5 w-3.5 text-accent" />
        <span className="tabular-nums">
          +<AnimatedCounter to={214} duration={1.4} />% growth this month
        </span>
      </Pill>
      <Pill delay={0.25} className="hidden sm:inline-flex">
        <StatusPulse size={6} />
        <span>1 install every few minutes</span>
      </Pill>
    </motion.div>
  );
}
