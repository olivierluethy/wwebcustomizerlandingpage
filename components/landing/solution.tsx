"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Solution() {
  return (
    <section className="py-24 bg-card border-y border-border">
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
            The Solution
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            One extension.
            <br />
            Endless possibilities.
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
            WWeb Customizer transforms WhatsApp Web into the messaging
            experience you deserve. Custom themes, productivity shortcuts, and
            smart features—all in a lightweight browser extension that takes
            seconds to install.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-secondary rounded-full">
              Free & Open Source
            </span>
            <span className="px-3 py-1 bg-secondary rounded-full">
              No Account Required
            </span>
            <span className="px-3 py-1 bg-secondary rounded-full">
              Privacy First
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
