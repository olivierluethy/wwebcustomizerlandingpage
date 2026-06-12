"use client";

import { motion } from "framer-motion";
import {
  Chrome,
  Github,
  Coffee,
  Palette,
  MessageCircle,
  Type,
  Image as ImageIcon,
  ShieldCheck,
  Laptop,
  Moon,
  Brush,
  Keyboard,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackButtonClick } from "@/lib/analytics";
import { ActivityLayer } from "./activity-layer";

/**
 * Feature benefit row shown above the primary CTA so visitors can answer
 * "what do I get?" before deciding to install.
 *
 * NOTE ON ICONS: the design brief specifies Tabler outline webfont icons
 * (`<i class="ti ti-…">`), but this codebase is a React/Next.js app that has no
 * Tabler webfont loaded — it standardises on lucide-react. Each Tabler name has
 * been mapped 1:1 to its lucide equivalent so the icons actually render and stay
 * visually consistent with the rest of the hero:
 *   ti-palette        → Palette          ti-brand-chrome  → Chrome
 *   ti-message-circle → MessageCircle    ti-shield-check  → ShieldCheck
 *   ti-typography     → Type             ti-device-laptop → Laptop
 *   ti-photo          → Image            ti-moon          → Moon
 *   ti-brush          → Brush            ti-keyboard      → Keyboard
 */
const BENEFITS = [
  { Icon: Palette, label: "Custom themes & dark mode" },
  { Icon: MessageCircle, label: "Chat bubble styles" },
  { Icon: Type, label: "Font & size control" },
  { Icon: ImageIcon, label: "Background images" },
];

const FEATURE_CARDS = [
  { Icon: Moon, title: "Dark themes", desc: "OLED-ready, no eye strain" },
  { Icon: Brush, title: "Bubble styles", desc: "iMessage, Slack, custom" },
  { Icon: Keyboard, title: "Font control", desc: "Size, family, weight" },
  { Icon: ImageIcon, title: "Backgrounds", desc: "Upload your own image" },
];

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

      {/* Foreground content ------------------------------------------------ */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Featured Badge (preserved) */}
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
                <span aria-hidden="true">🚀</span>
                Fastest growing WhatsApp Web extension
              </span>
            </div>
          </motion.div>

          {/* 1. Headline — value-forward, two lines */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance"
            style={{ color: "#ffffff" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            Make WhatsApp Web
            <br />
            actually <span style={{ color: "#4ade80" }}>yours.</span>
          </motion.h1>

          {/* 2. Subtitle */}
          <motion.p
            className="mx-auto mb-7 text-pretty"
            style={{
              color: "#8b949e",
              fontSize: "16px",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Custom themes, chat bubble styles, font control, and background
            images — all without sharing your data or needing an account.
          </motion.p>

          {/* 3. Feature benefit row */}
          <motion.div
            className="flex flex-wrap justify-center mb-7"
            style={{ gap: "10px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {BENEFITS.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5"
                style={{ fontSize: "13px", color: "#c9d1d9" }}
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#4ade80" }}
                  aria-hidden="true"
                />
                {label}
              </span>
            ))}
          </motion.div>

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
              {/* 4. Primary CTA copy */}
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
                Add to Chrome — it&apos;s free
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

          {/* 5. Social proof — directly under the CTA row */}
          <motion.div
            className="flex flex-wrap items-center justify-center"
            style={{
              marginTop: "12px",
              gap: "18px",
              fontSize: "12px",
              color: "#6e7681",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex items-center" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <Star
                    key={i}
                    style={{
                      width: "14px",
                      height: "14px",
                      color: "#f0b429",
                      fill: "#f0b429",
                    }}
                  />
                ))}
              </span>
              4.1 on Chrome Web Store
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck style={{ width: "14px", height: "14px" }} aria-hidden="true" />
              No data collected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Laptop style={{ width: "14px", height: "14px" }} aria-hidden="true" />
              Stays on your device
            </span>
          </motion.div>

          {/* 6. Feature card strip at the bottom of the hero */}
          <motion.div
            style={{
              borderTop: "0.5px solid rgba(255,255,255,0.07)",
              paddingTop: "28px",
              marginTop: "36px",
              textAlign: "left",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#6e7681",
                marginBottom: "14px",
              }}
            >
              What you can do
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "10px",
              }}
            >
              {FEATURE_CARDS.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                >
                  <Icon
                    style={{
                      color: "#4ade80",
                      width: "20px",
                      height: "20px",
                      display: "block",
                      marginBottom: "6px",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    style={{
                      color: "#e6edf3",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      color: "#6e7681",
                      fontSize: "11px",
                      marginTop: "2px",
                      lineHeight: 1.4,
                    }}
                  >
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
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
