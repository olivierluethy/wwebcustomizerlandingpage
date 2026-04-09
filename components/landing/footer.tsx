"use client";

import { Github, MessageCircle, Coffee } from "lucide-react";
import Link from "next/link";
import { trackFooterClick } from "@/lib/analytics";
import Image from 'next/image'

// 1. Die Discord SVG-Komponente definieren
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://w3.org"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0775-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0951 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0951 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

const socialLinks = [
  {
    href: "https://github.com/BaskLash/WhatsApp-Web-Customizer",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://discord.gg/cppbDz4qhn",
    label: "Discord",
    icon: DiscordIcon, // 2. Hier wird die neue Komponente genutzt
  },
  {
    href: "https://buymeacoffee.com/olivierluethy",
    label: "Buy Me a Coffee",
    icon: Coffee,
  },
];

export function Footer() {
  const handleLinkClick = (label: string) => {
    trackFooterClick(label.toLowerCase().replace(" ", "_"));
  };

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
                <Image 
                  src="/logo128x128.png" 
                  alt="Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain" // Sorgt dafür, dass das Bild schön in das Div passt
                />
              </div>
              <span className="text-xl font-bold text-foreground">
                WWeb Customizer
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Transform your WhatsApp Web experience with themes, shortcuts, and
              smart features. Open source and free forever.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick(link.label)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link.label)}
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground/70 text-center mb-4 max-w-2xl mx-auto">
            WWeb Customizer is an independent, open-source project and is not
            affiliated with, endorsed by, or sponsored by WhatsApp or Meta.
          </p>
          <p className="text-sm text-muted-foreground text-center">
            {new Date().getFullYear()} WWeb Customizer. Open source and free
            forever.
          </p>
        </div>
      </div>
    </footer>
  );
}
