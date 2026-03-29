"use client";

import { motion } from "framer-motion";
import { Chrome, Github, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackButtonClick } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.19 142 / 0.3) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.19 142 / 0.2) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-accent text-sm font-medium tracking-wider uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Browser Extension
          </motion.p>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            WhatsApp Web feels limited.
            <br />
            <span className="text-muted-foreground">
              {"It doesn't have to be."}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transform your messaging experience from frustrating to delightful.
            Make WhatsApp Web truly yours with themes, shortcuts, and smart
            features.
          </motion.p>

          {/* Social proof */}
          <motion.p
            className="text-sm text-accent font-medium mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            🚀 More than 180 active users already use this tool every week
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium"
              onClick={() => {
                trackButtonClick("install");
                window.open("https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf?authuser=0&hl=de", "_blank");
              }}
            >
              <Chrome className="mr-2 h-5 w-5" />
              Install Extension
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer border-border text-foreground hover:bg-secondary px-8 py-6 text-base font-medium"
              onClick={() => {
                trackButtonClick("discord");
                window.open("https://discord.gg/cppbDz4qhn", "_blank");
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Discord
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="cursor-pointer text-muted-foreground hover:text-foreground hover:bg-secondary px-8 py-6 text-base font-medium"
              onClick={() => {
                trackButtonClick("github");
                window.open("https://github.com/BaskLash/WhatsApp-Web-Customizer", "_blank");
              }}
            >
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-muted-foreground/50 rounded-full mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}