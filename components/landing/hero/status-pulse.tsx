"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Color = "accent" | "amber" | "rose" | "sky";

const colorMap: Record<Color, string> = {
  accent: "bg-accent",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  sky: "bg-sky-400",
};

type Props = {
  className?: string;
  size?: number;
  color?: Color;
  ringScale?: number;
};

export function StatusPulse({
  className,
  size = 8,
  color = "accent",
  ringScale = 2.4,
}: Props) {
  return (
    <span
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <motion.span
        className={cn("absolute inset-0 rounded-full", colorMap[color])}
        animate={{ scale: [1, ringScale, 1], opacity: [0.55, 0, 0.55] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      <span
        className={cn("relative rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]", colorMap[color])}
        style={{ width: size, height: size }}
      />
    </span>
  );
}
