"use client";

import { motion } from "framer-motion";
import { Chrome, Github, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackButtonClick } from "@/lib/analytics";
import { ActivityLayer } from "./activity-layer";
import { LiveNotifications } from "./live-notifications";
import { TrendingRail } from "./trending-rail";
import { GrowthStrip } from "./growth-strip";
import { CommunityProof } from "./community-proof";
import { StatusPulse } from "./status-pulse";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background ----------------------------------------------- */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.19 142 / 0.35) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.19 142 / 0.25) 0%, transparent 70%)",
          }}
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Lighting glow behind the heading */}
        <motion.div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full blur-3xl opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.19 142 / 0.55) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.16, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <ActivityLayer />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.98 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0 0) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Soft top-to-bottom vignette so foreground content stays readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.07_0_0/0.55)_100%)]" />
      </div>

      {/* Floating live notifications -------------------------------------- */}
      <LiveNotifications />

      {/* Foreground content ------------------------------------------------ */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Trending pills row */}
          <div className="mb-5">
            <TrendingRail />
          </div>

          {/* Featured Badge */}
          <motion.div
            className="flex flex-col items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-widest overflow-hidden">
              <motion.span
                className="absolute inset-0 -translate-x-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.72 0.19 142 / 0.18), transparent)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }}
              />
              <span className="relative inline-flex items-center gap-2">
                <StatusPulse size={6} />
                <span aria-hidden="true">🚀</span>
                Fastest growing WhatsApp Web extension
              </span>
            </div>
            <p className="text-accent text-sm font-medium tracking-wider uppercase">
              Browser Extension
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            WhatsApp Web feels limited.
            <br />
            <span className="text-muted-foreground">
              {"It doesn't have to be."}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-7 text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Customize your chats, boost your speed, and take full control of
            your messaging experience.
          </motion.p>

          {/* Live growth strip */}
          <div className="mb-7">
            <GrowthStrip />
          </div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="relative">
              <motion.span
                className="absolute -inset-1 rounded-xl opacity-40 blur-md"
                style={{
                  background:
                    "linear-gradient(120deg, oklch(0.72 0.19 142 / 0.55), transparent 60%)",
                }}
                animate={{ opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <Button
                size="lg"
                className="relative cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium shadow-lg shadow-primary/10"
                onClick={() => {
                  trackButtonClick("install");
                  window.open(
                    "https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf?authuser=0&hl=de",
                    "_blank"
                  );
                }}
              >
                <Chrome className="mr-2 h-5 w-5" />
                Install Extension
              </Button>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer border-border text-foreground hover:bg-secondary px-8 py-6 text-base font-medium"
              onClick={() => {
                trackButtonClick("discord");
                window.open("https://discord.gg/cppbDz4qhn", "_blank");
              }}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
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
                window.open(
                  "https://github.com/BaskLash/WhatsApp-Web-Customizer",
                  "_blank"
                );
              }}
            >
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="cursor-pointer text-muted-foreground hover:text-foreground hover:bg-secondary px-8 py-6 text-base font-medium"
              onClick={() => {
                trackButtonClick("donation");
                window.open("https://buymeacoffee.com/olivierluethy", "_blank");
              }}
            >
              <Coffee className="mr-2 h-5 w-5" />
              Support the Project
            </Button>
          </motion.div>

          {/* Community proof row */}
          <div className="mt-10 flex justify-center">
            <CommunityProof />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
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
