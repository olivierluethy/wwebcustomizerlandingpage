"use client";

import { motion } from "framer-motion";
import { Chrome, Github, MessageCircle, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackButtonClick } from "@/lib/analytics";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Ready to transform your WhatsApp Web?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            {"Join thousands of users who've already upgraded their messaging experience. It only takes a minute to get started."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium"
              onClick={() => trackButtonClick("install")}
            >
              <Chrome className="mr-2 h-5 w-5" />
              Install Extension
            </Button>

            <Button
  size="lg"
  variant="outline"
  className="cursor-pointer border-white text-white hover:bg-white hover:text-black px-8 py-6 text-base font-medium"
  onClick={() => trackButtonClick("discord")}
>
  <MessageCircle className="mr-2 h-5 w-5" />
  Join Discord
</Button>

            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer border-border text-foreground hover:bg-secondary px-8 py-6 text-base font-medium"
              onClick={() => trackButtonClick("github")}
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="cursor-pointer text-muted-foreground hover:text-foreground hover:bg-secondary px-8 py-6 text-base font-medium"
              onClick={() => trackButtonClick("donation")}
            >
              <Coffee className="mr-2 h-5 w-5" />
              Buy Me a Coffee
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
