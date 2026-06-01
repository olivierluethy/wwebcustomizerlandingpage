"use client";

import { motion } from "framer-motion";

type Swatch = {
  left: string;
  top: string;
  delay: number;
  duration: number;
  label: string;
  colors: [string, string];
};

const SWATCHES: Swatch[] = [
  {
    left: "5%",
    top: "26%",
    delay: 0,
    duration: 11,
    label: "Glass",
    colors: ["#34d399", "#10b981"],
  },
  {
    left: "86%",
    top: "22%",
    delay: 1.4,
    duration: 13,
    label: "Midnight",
    colors: ["#1e3a8a", "#3b82f6"],
  },
  {
    left: "8%",
    top: "72%",
    delay: 0.8,
    duration: 12,
    label: "Aurora",
    colors: ["#22d3ee", "#a78bfa"],
  },
  {
    left: "84%",
    top: "70%",
    delay: 2.0,
    duration: 14,
    label: "Focus",
    colors: ["#10b981", "#f59e0b"],
  },
];

function ThemeSwatch({ s }: { s: Swatch }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-2.5 py-1.5 shadow-[0_4px_18px_-8px_rgba(0,0,0,0.6)]">
      <div className="flex -space-x-1">
        <span
          className="h-3 w-3 rounded-full ring-1 ring-white/20"
          style={{ background: s.colors[0] }}
        />
        <span
          className="h-3 w-3 rounded-full ring-1 ring-white/20"
          style={{ background: s.colors[1] }}
        />
      </div>
      <span className="text-[10.5px] font-medium text-foreground/70 tracking-tight">
        {s.label}
      </span>
    </div>
  );
}

export function ActivityLayer() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block"
      aria-hidden="true"
    >
      {SWATCHES.map((s, i) => (
        <motion.div
          key={`sw-${i}`}
          className="absolute"
          style={{ left: s.left, top: s.top }}
          initial={{ opacity: 0, y: 6 }}
          animate={{
            opacity: [0, 0.6, 0.45, 0.6, 0],
            y: [0, -16, -10, -16, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ThemeSwatch s={s} />
        </motion.div>
      ))}
    </div>
  );
}
