"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function SocialProof() {
  const handleClick = () => {
    trackEvent("featured_click", "social_proof", "makeuseof");
  };

  return (
    <section className="py-16 border-t border-b border-border">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
            Featured in
          </p>

          <motion.a
            href="https://www.makeuseof.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-3 px-6 py-4 bg-card rounded-lg border border-border hover:border-accent/50 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-left">
              <p className="text-foreground text-lg font-medium italic text-balance">
                {
                  '"WhatsApp Web feels incomplete until you add these 5 extensions"'
                }
              </p>
              <p className="text-accent mt-1 flex items-center gap-1">
                — MakeUseOf
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
