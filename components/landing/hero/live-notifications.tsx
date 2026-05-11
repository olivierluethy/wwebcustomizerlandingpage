"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StatusPulse } from "./status-pulse";
import { notifyVariants } from "./motion";
import {
  nextNotification,
  NOTIFICATION_POOL,
  type LiveNotification,
} from "./notifications";

type Channel = {
  id: string;
  className: string;
  initialDelay: number;
  intervalRange: [number, number];
  visibleRange: [number, number];
};

const CHANNELS: Channel[] = [
  {
    id: "top-right",
    className:
      "top-24 right-3 sm:top-28 sm:right-6 md:top-32 md:right-8 lg:right-12",
    initialDelay: 1400,
    intervalRange: [5500, 8500],
    visibleRange: [4200, 5200],
  },
  {
    id: "bottom-left",
    className:
      "bottom-24 left-3 sm:bottom-28 sm:left-6 md:bottom-32 md:left-8 lg:left-12 hidden sm:block",
    initialDelay: 3200,
    intervalRange: [6500, 10000],
    visibleRange: [4400, 5400],
  },
  {
    id: "mid-right",
    className: "top-1/2 right-3 md:right-12 lg:right-20 hidden lg:block",
    initialDelay: 5200,
    intervalRange: [7000, 11000],
    visibleRange: [4000, 5000],
  },
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function NotificationCard({ n }: { n: LiveNotification }) {
  return (
    <motion.div
      variants={notifyVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative w-[268px] md:w-[308px] rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.55)] overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.19 142 / 0.18) 0%, transparent 35%, transparent 65%, oklch(0.72 0.19 142 / 0.10) 100%)",
        }}
      />
      <div className="absolute inset-x-3 -top-px h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent" />

      <div className="relative flex items-start gap-3 p-3.5">
        <div className="relative shrink-0">
          <div className="grid place-items-center w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 text-base">
            <span aria-hidden="true">{n.emoji ?? "⚡"}</span>
          </div>
          <span className="absolute -top-0.5 -right-0.5">
            <StatusPulse size={6} color="accent" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-foreground/95 leading-snug truncate">
            {n.title}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground/75 flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-accent/70" />
            {n.meta ?? "Just now"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ChannelSlot({
  channel,
  reduced,
}: {
  channel: Channel;
  reduced: boolean;
}) {
  const [current, setCurrent] = useState<LiveNotification | null>(null);
  const recentRef = useRef<string[]>([]);

  useEffect(() => {
    if (reduced) return;
    let mounted = true;
    const timeouts: number[] = [];

    const schedule = (delay: number) => {
      const t = window.setTimeout(() => {
        if (!mounted) return;
        const recent = new Set(recentRef.current);
        const n = nextNotification(NOTIFICATION_POOL, recent);
        recentRef.current = [n.title, ...recentRef.current].slice(0, 3);
        setCurrent(n);

        const visibleFor = rand(channel.visibleRange[0], channel.visibleRange[1]);
        const t2 = window.setTimeout(() => {
          if (!mounted) return;
          setCurrent(null);
          schedule(rand(channel.intervalRange[0], channel.intervalRange[1]));
        }, visibleFor);
        timeouts.push(t2);
      }, delay);
      timeouts.push(t);
    };

    schedule(channel.initialDelay);

    return () => {
      mounted = false;
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [channel, reduced]);

  return (
    <div
      className={cn("pointer-events-none absolute z-30", channel.className)}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        {current && <NotificationCard key={current.id} n={current} />}
      </AnimatePresence>
    </div>
  );
}

export function LiveNotifications() {
  const reduced = useReducedMotion() ?? false;
  return (
    <>
      {CHANNELS.map((c) => (
        <ChannelSlot key={c.id} channel={c} reduced={reduced} />
      ))}
    </>
  );
}
