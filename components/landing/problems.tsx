"use client";

import { motion } from "framer-motion";
import { Palette, Clock, Focus, Sparkles } from "lucide-react";

const problems = [
  {
    icon: Palette,
    title: "Your chats should feel like yours",
    description:
      "The same green interface for everyone. No personality, no customization. Your digital space should reflect who you are.",
  },
  {
    icon: Clock,
    title: "Stop wasting time on repetitive messages",
    description:
      'How many times have you typed "I\'ll get back to you"? Quick replies and templates save hours every week.',
  },
  {
    icon: Focus,
    title: "Too many distractions in your workspace",
    description:
      "Every notification demands attention. Every chat fights for focus. Work smarter by controlling what you see and when.",
  },
  {
    icon: Sparkles,
    title: "Why settle for default?",
    description:
      "You customize everything else—your phone, your desktop, your browser. Why should your most-used app be any different?",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function Problems() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Sound familiar?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            {"These frustrations shouldn't be part of your daily routine."}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
                  <problem.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
