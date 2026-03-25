"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import Image from 'next/image'

export function SocialProof() {
  const handleClick = () => {
    trackEvent("article_click", "social_proof", "makeuseof");
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
            href="https://www.makeuseof.com/whatsapp-web-feels-incomplete-until-you-add-these-extensions/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-6 px-8 py-6 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300 group hover:shadow-lg hover:shadow-accent/5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* MakeUseOf Logo */}
<div className="flex-shrink-0 flex items-center">
  <Image
    src="/makeuseof.avif" // Stelle sicher, dass die Datei im "public"-Ordner liegt
    alt="MakeUseOf Logo"
    width={120}              // Breite anpassen (passend zum alten SVG Viewbox)
    height={40}              // Höhe passend zu h-10
    className="h-10 w-auto object-contain"
    priority                 // Lädt das Logo sofort (wichtig für den Header)
  />
</div>

            <div className="text-left border-l border-border pl-6">
              <p className="text-foreground text-lg font-medium italic text-balance">
                {
                  '"WhatsApp Web feels incomplete until you add these 5 extensions"'
                }
              </p>
              <p className="text-accent mt-2 flex items-center gap-2 text-sm">
                Read the article
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
