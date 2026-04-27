"use client";

import { motion } from "framer-motion";

const lines = [
  "Same interface. Every day.",
  "Too many clicks.",
  "Too many distractions.",
  "Not enough control.",
];

export function Impact() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.19 142 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground/70 tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {line}
            </motion.p>
          ))}

          <motion.div
            className="pt-6 md:pt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: lines.length * 0.15 + 0.1 }}
          >
            <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
              You deserve{" "}
              <span className="bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">
                better.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
