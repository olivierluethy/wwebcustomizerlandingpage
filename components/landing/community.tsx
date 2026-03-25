"use client";

import { motion } from "framer-motion";
import { MessageCircle, Users, Lightbulb, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackButtonClick } from "@/lib/analytics";

const features = [
  {
    icon: Users,
    title: "Active Community",
    description: "Connect with other power users and share tips",
  },
  {
    icon: Lightbulb,
    title: "Feature Requests",
    description: "Suggest new features and vote on what gets built next",
  },
  {
    icon: Share2,
    title: "Share Setups",
    description: "Show off your customizations and get inspired by others",
  },
];

export function Community() {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Join the Community
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Be part of a growing community of WhatsApp Web enthusiasts who are
              making messaging better together.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-background border border-border text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="inline-flex p-3 rounded-lg bg-secondary mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-[#5865F2] hover:bg-[#5865F2]/90 text-white px-8 py-6 text-base font-medium"
              onClick={() => {
                trackButtonClick("discord");
                window.open("https://discord.gg/cppbDz4qhn", "_blank");
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Our Discord Server
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
