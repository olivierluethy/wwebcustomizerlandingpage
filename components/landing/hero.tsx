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
          {/* Featured Badge & Category */}
          <motion.div 
            className="flex flex-col items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest">
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <g transform="translate(3.456 1.559)">
                  <path d="M 6.4 8.8 C 5.733 8.8 5.167 8.567 4.7 8.1 C 4.233 7.633 4 7.067 4 6.4 C 4 5.733 4.233 5.167 4.7 4.7 C 5.167 4.233 5.733 4 6.4 4 C 7.067 4 7.633 4.233 8.1 4.7 C 8.567 5.167 8.8 5.733 8.8 6.4 C 8.8 7.067 8.567 7.633 8.1 8.1 C 7.633 8.567 7.067 8.8 6.4 8.8 Z M 1.6 16.8 L 1.6 10.62 C 1.093 10.06 0.7 9.42 0.42 8.7 C 0.14 7.98 0 7.213 0 6.4 C 0 4.613 0.62 3.1 1.86 1.86 C 3.1 0.62 4.613 0 6.4 0 C 8.187 0 9.7 0.62 10.94 1.86 C 12.18 3.1 12.8 4.613 12.8 6.4 C 12.8 7.213 12.66 7.98 12.38 8.7 C 12.1 9.42 11.707 10.06 11.2 10.62 L 11.2 16.8 L 6.4 15.2 Z M 6.4 11.2 C 7.733 11.2 8.867 10.733 9.8 9.8 C 10.733 8.867 11.2 7.733 11.2 6.4 C 11.2 5.067 10.733 3.933 9.8 3 C 8.867 2.067 7.733 1.6 6.4 1.6 C 5.067 1.6 3.933 2.067 3 3 C 2.067 3.933 1.6 5.067 1.6 6.4 C 1.6 7.733 2.067 8.867 3 9.8 C 3.933 10.733 5.067 11.2 6.4 11.2 Z M 3.2 14.42 L 6.4 13.6 L 9.6 14.42 L 9.6 11.94 C 9.133 12.207 8.63 12.417 8.09 12.57 C 7.55 12.723 6.987 12.8 6.4 12.8 C 5.813 12.8 5.25 12.723 4.71 12.57 C 4.17 12.417 3.667 12.207 3.2 11.94 Z"></path>
                </g>
              </svg>
              Featured on Chrome Web Store
            </div>
            <p className="text-accent text-sm font-medium tracking-wider uppercase">
              Browser Extension
            </p>
          </motion.div>

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
            🚀 More than 220 active users already use this tool every week
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
  {/* Discord SVG Icon */}
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="mr-2 h-5 w-5"
    xmlns="http://w3.org"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0775-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0951 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0951 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
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