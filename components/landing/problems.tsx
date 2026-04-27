"use client";

import { motion } from "framer-motion";
import { Palette, Zap, Focus, ShieldOff } from "lucide-react";

const problems = [
  {
    icon: Palette,
    title: "Your chats should feel like yours",
    description:
      "The same green interface. The same layout. Every day. Your most-used app should reflect who you are — not the other way around.",
  },
  {
    icon: Zap,
    title: "Repetitive replies slow you down",
    description:
      'How many times have you typed "I\'ll get back to you"? Every reply you re-type is time you\'ll never get back.',
  },
  {
    icon: Focus,
    title: "Too much clutter, not enough focus",
    description:
      "Notifications, sidebars, distractions. Default WhatsApp Web doesn't help you concentrate — it competes for your attention.",
  },
  {
    icon: ShieldOff,
    title: "No privacy when you need it most",
    description:
      "Coworkers behind you. Screens shared on calls. Default WhatsApp Web shows everything, to everyone, all the time.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
          className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors">
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
