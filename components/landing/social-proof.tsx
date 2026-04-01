"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";

const ARTICLES = [
  {
    name: "MakeUseOf",
    logo: "/makeuseof.avif",
    quote: '"WhatsApp Web feels incomplete until you add these 5 extensions"',
    url: "https://www.makeuseof.com/whatsapp-web-feels-incomplete-until-you-add-these-extensions/",
    id: "makeuseof"
  },
  {
    name: "TechPP",
    logo: "/TechPP-2020.png",
    quote: '"7 Must-Have WhatsApp Web Extensions to Unlock Hidden Features"',
    url: "https://techpp.com/2025/11/07/whatsapp-web-chrome-extensions/",
    id: "techpp"
  },
  {
    name: "Androidphoria",
    logo: "/androidphoria.jpg",
    quote: '"Top 5 Best Free Extensions for WhatsApp Web"',
    url: "https://androidphoria.com/aplicaciones/mejores-extensiones-para-whatsapp-web-gratis/",
    id: "androidphoria"
  },
  {
    name: "TechView9",
    logo: "/techview9.png",
    quote: '"7 essential WhatsApp Web add-ons to unlock hidden features"',
    url: "https://www.techview9.com/2025/11/whatsapp-web-chrome-extensions.html",
    id: "techview9"
  },
  {
    name: "Arab Soft",
    logo: "/xenforo.svg",
    quote: '"Top 5 Free WhatsApp Web Add-ons.. The first addition will amaze you"',
    url: "https://absbs.org/threads/4789/",
    id: "xenforo"
  },
  {
    name: "Mau Lozano",
    logo: "/tecnologia-con.webp",
    quote: '"Top 5 best extensions for WhatsApp Web"',
    url: "https://tecnologiaconmau.com/aplicaciones/extensiones-para-whatsapp-web/",
    id: "tecnologia-con-mau"
  },
  {
    name: "Huhu for Informatics",
    logo: "/huhu.ico",
    quote: '"Top 5 Free WhatsApp Web Add-ons.. The first addition will amaze you"',
    url: "https://www.igli5.com/2026/01/5_10.html/",
    id: "huhuforinformatics"
  }
];

export function SocialProof() {
  const handleClick = (id: string) => {
    trackEvent("article_click", "social_proof", id);
  };

  const duplicatedArticles = [...ARTICLES, ...ARTICLES];

  return (
    <section className="py-12 md:py-20 border-t border-b border-border bg-muted/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 md:mb-12 text-center">
        <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold opacity-80">
          Featured in
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative flex overflow-hidden group">
        <motion.div
          className="flex gap-4 md:gap-6 whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 35, // Etwas schneller für besseren Flow
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedArticles.map((article, index) => (
            <a
              key={`${article.id}-${index}`}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick(article.id)}
              // Responsive Breite: 280px auf Mobile, 350px auf Desktop
              className="w-[280px] md:w-[350px] inline-flex flex-col justify-between p-5 md:p-6 bg-card rounded-xl border border-border/50 hover:border-accent/40 transition-all duration-300 group/card hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="h-5 md:h-6 w-20 md:w-24 relative">
                  <Image
                    src={article.logo}
                    alt={article.name}
                    fill
                    className="object-contain grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-500"
                  />
                </div>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-40 group-hover/card:opacity-100 transition-opacity" />
              </div>

              <p className="text-foreground text-xs md:text-sm font-medium italic leading-relaxed whitespace-normal line-clamp-2 mb-4">
                {article.quote}
              </p>

              <div className="flex items-center gap-2 mt-auto">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-accent/80 group-hover/card:text-accent transition-colors">
                  {article.name}
                </span>
                <div className="h-px flex-1 bg-border/30 group-hover/card:bg-accent/20 transition-colors" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Responsive Fade-Effekte: Kleiner auf Mobile (w-16), grösser auf Desktop (w-40) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
      </div>
    </section>
  );
}
