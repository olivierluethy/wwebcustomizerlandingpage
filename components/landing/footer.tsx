"use client";

import { Github, MessageCircle, Coffee } from "lucide-react";
import Link from "next/link";
import { trackFooterClick } from "@/lib/analytics";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

const socialLinks = [
  {
    href: "https://github.com",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://discord.com",
    label: "Discord",
    icon: MessageCircle,
  },
  {
    href: "https://buymeacoffee.com",
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
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W</span>
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
