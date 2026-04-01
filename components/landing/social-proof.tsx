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
    name: "Huhu for Informatics",
    logo: "/huhu.ico",
    quote: '"Top 5 Free WhatsApp Web Add-ons.. The first addition will amaze you"',
    url: "https://www.igli5.com/2026/01/5_10.html/",
    id: "huhuforinformatics"
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
    name: "Arab Soft", // Geändert von xenForo zu Arab Soft
    logo: "/xenforo.svg",
    quote: '"Top 5 Free WhatsApp Web Add-ons.. The first addition will amaze you"',
    url: "https://absbs.org/threads/4789/",
    id: "xenforo"
  },
  {
    name: "Mau Lozano", // Geändert von xenForo zu Arab Soft
    logo: "/tecnologia-con.webp",
    quote: '"Top 5 best extensions for WhatsApp Web"',
    url: "https://tecnologiaconmau.com/aplicaciones/extensiones-para-whatsapp-web/",
    id: "tecnologia-con-mau"
  }
];

export function SocialProof() {
  const handleClick = (id: string) => {
    trackEvent("article_click", "social_proof", id);
  };

  return (
    <section className="py-16 border-t border-b border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
            Featured in
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick(article.id)}
              className="flex flex-col justify-between p-7 bg-card rounded-2xl border border-border/60 hover:border-accent/40 transition-all duration-300 group hover:shadow-xl hover:shadow-accent/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <div className="h-8 w-32 relative">
                    <Image
                      src={article.logo}
                      alt={`${article.name} Logo`}
                      fill
                      className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground/0 group-hover:text-accent group-hover:opacity-100 transition-all" />
                </div>

                <div className="space-y-3">
                  {/* Der Artikel-Name als stylischer Badge */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                    {article.name}
                  </span>
                  
                  <p className="text-foreground text-[15px] font-medium italic leading-relaxed tracking-tight">
                    {article.quote}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <p className="text-muted-foreground group-hover:text-accent transition-colors text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                  Read full coverage
                  <span className="block h-px w-4 bg-accent/30 group-hover:w-8 transition-all duration-300" />
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
