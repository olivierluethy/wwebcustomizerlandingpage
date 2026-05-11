"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { QUICK_EASE } from "./motion";

type Props = {
  to: number;
  from?: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  /** Re-trigger every `pulseEveryMs` to simulate a live ticking number. */
  pulseEveryMs?: number;
  pulseDelta?: number;
};

const defaultFormat = (n: number) => Math.round(n).toLocaleString();

export function AnimatedCounter({
  to,
  from = 0,
  duration = 1.8,
  format = defaultFormat,
  className,
  pulseEveryMs,
  pulseDelta = 1,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion() ?? false;
  const mv = useMotionValue(from);
  const text = useTransform(mv, (v) => format(v));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration, ease: QUICK_EASE });
    return () => controls.stop();
  }, [inView, to, duration, mv, reduced]);

  useEffect(() => {
    if (!inView || !pulseEveryMs || reduced) return;
    let current = to;
    const t = window.setInterval(() => {
      current += pulseDelta;
      animate(mv, current, { duration: 0.9, ease: QUICK_EASE });
    }, pulseEveryMs);
    return () => window.clearInterval(t);
  }, [inView, pulseEveryMs, pulseDelta, mv, to, reduced]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
