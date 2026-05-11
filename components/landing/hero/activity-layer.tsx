"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

type Terminal = {
  side: "left" | "right";
  top: string;
  delay: number;
  duration: number;
  lines: string[];
};

const TERMINALS: Terminal[] = [
  {
    side: "left",
    top: "48%",
    delay: 0.5,
    duration: 16,
    lines: ["$ wweb apply --theme=glass", "✓ injected 14 modules", "✓ broadcasting · live"],
  },
  {
    side: "right",
    top: "52%",
    delay: 1.6,
    duration: 18,
    lines: ["$ wweb stats --live", "users.active  2,847", "feed: streaming"],
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
      <span className="h-1.5 w-1.5 rounded-full bg-accent/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
    </div>
  );
}

function MiniTerminal({ t }: { t: Terminal }) {
  return (
    <div className="w-[200px] rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-white/[0.06]">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
        <span className="ml-1.5 text-[9px] uppercase tracking-wider text-muted-foreground/60">
          live
        </span>
      </div>
      <div className="px-2.5 py-2 font-mono text-[10px] leading-snug text-foreground/65 space-y-0.5">
        {t.lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "truncate",
              line.startsWith("✓") && "text-accent/80",
              line.startsWith("$") && "text-foreground/85"
            )}
          >
            {line}
          </div>
        ))}
      </div>
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

      {TERMINALS.map((t, i) => (
        <motion.div
          key={`tm-${i}`}
          className="absolute hidden xl:block"
          style={{
            top: t.top,
            ...(t.side === "left" ? { left: "2.5%" } : { right: "2.5%" }),
          }}
          initial={{ opacity: 0, x: t.side === "left" ? -12 : 12 }}
          animate={{
            opacity: [0, 0.45, 0.35, 0.45, 0],
            x: [0, t.side === "left" ? 8 : -8, 0],
          }}
          transition={{
            duration: t.duration,
            delay: t.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MiniTerminal t={t} />
        </motion.div>
      ))}
    </div>
  );
}
