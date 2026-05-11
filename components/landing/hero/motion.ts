import type { Variants } from "framer-motion";

export const SOFT_EASE = [0.22, 1, 0.36, 1] as const;
export const QUICK_EASE = [0.16, 1, 0.3, 1] as const;

export const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SOFT_EASE } },
};

export const notifyVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: SOFT_EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    filter: "blur(4px)",
    transition: { duration: 0.45, ease: SOFT_EASE },
  },
};

export const ambientFloat = (duration: number, delay = 0): Variants => ({
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: [0, 0.55, 0.4, 0.55, 0],
    y: [0, -16, -10, -16, 0],
    transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
  },
});
