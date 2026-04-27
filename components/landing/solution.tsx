"use client";

import { motion } from "framer-motion";
import { ArrowRight, Palette, Zap, Focus, Lock } from "lucide-react";

const pillars = [
  {
    icon: Palette,
    title: "Personalize",
    description: "Themes, fonts, and backgrounds — make it yours.",
  },
  {
    icon: Zap,
    title: "Productivity",
    description: "Quick replies and smart suggestions that save time.",
  },
  {
    icon: Focus,
    title: "Focus",
    description: "Minimal mode strips away every distraction.",
  },
  {
    icon: Lock,
    title: "Privacy",
    description: "Blur sensitive elements wherever you are.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Solution() {
  return (
    <section className="py-24 bg-card/40 border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ArrowRight className="h-4 w-4" />
            Meet WhatsApp Web Customizer
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            One extension.
            <br />
            <span className="bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">
              Endless control.
            </span>
          </h2>

          <p className="text-lg text-muted-foreground mb-12 leading-relaxed text-pretty">
            A lightweight browser extension that gives you the messaging
            experience you actually want — installs in seconds, no account
            required.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={itemVariants}
              className="p-5 md:p-6 rounded-2xl bg-background/50 border border-border hover:border-accent/40 transition-colors"
            >
              <div className="inline-flex p-2.5 rounded-lg bg-accent/10 mb-3">
                <pillar.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mt-12">
          <span className="px-3 py-1 bg-secondary rounded-full">
            Free &amp; Open Source
          </span>
          <span className="px-3 py-1 bg-secondary rounded-full">
            No Account Required
          </span>
          <span className="px-3 py-1 bg-secondary rounded-full">
            Privacy First
          </span>
        </div>
      </div>
    </section>
  );
}
