"use client";

import { motion } from "framer-motion";
import { Sparkles, Rocket, Eye, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Make WhatsApp Web truly yours",
    description:
      "Themes, fonts, custom backgrounds — turn the same boring interface into a space you actually enjoy opening.",
    glow: "from-accent/30 to-emerald-400/10",
  },
  {
    icon: Rocket,
    title: "Reply faster with less effort",
    description:
      "Quick replies, templates, and smart shortcuts cut repetitive typing down to a single tap.",
    glow: "from-emerald-400/30 to-cyan-400/10",
  },
  {
    icon: Eye,
    title: "Stay focused on what matters",
    description:
      "Minimal mode hides the noise so you can finish a conversation without losing your train of thought.",
    glow: "from-cyan-400/30 to-violet-400/10",
  },
  {
    icon: ShieldCheck,
    title: "Protect your conversations anywhere",
    description:
      "Blur names, previews, and avatars on the fly — perfect for cafés, screen shares, and shared screens.",
    glow: "from-violet-400/30 to-accent/10",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FeatureValue() {
  return (
    <section className="py-24 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14 md:mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
            What you actually get
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Real outcomes.
            <br />
            <span className="text-muted-foreground">Not just features.</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-7 md:p-8 hover:border-accent/40 transition-all"
            >
              <div
                className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${value.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              />
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-5">
                  <value.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 text-balance">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
