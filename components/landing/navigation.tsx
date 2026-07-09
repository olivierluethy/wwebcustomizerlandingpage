"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Chrome, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackNavClick, trackCtaHover } from "@/lib/analytics";
import Image from 'next/image'

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (label: string) => {
    trackNavClick(label.toLowerCase().replace(" ", "_"));
    setIsOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground font-bold text-lg hover:text-accent transition-colors"
            onClick={() => handleNavClick("logo")}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
  <Image 
    src="/logo128x128.png" 
    alt="Logo" 
    width={32} 
    height={32} 
    className="object-contain" // Sorgt dafür, dass das Bild schön in das Div passt
  />
</div>
            <span className="hidden sm:inline">WWeb Customizer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                onClick={() => handleNavClick(link.label)}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-secondary"
              onClick={() => {
                handleNavClick("discord");
                window.open("https://discord.gg/cppbDz4qhn", "_blank");
              }}
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
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
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onMouseEnter={() => trackCtaHover("install_nav")}
              onClick={() => {
                handleNavClick("install");
                window.open("https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf?authuser=0&hl=de", "_blank");
              }}
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Chrome className="mr-2 h-4 w-4" />
                Add to Chrome
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground hover:text-accent transition-colors py-2"
                    onClick={() => handleNavClick(link.label)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-secondary"
                    onClick={() => {
                      handleNavClick("discord");
                      window.open("https://discord.gg/cppbDz4qhn", "_blank");
                    }}
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Join Discord
                    </a>
                  </Button>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onMouseEnter={() => trackCtaHover("install_nav_mobile")}
                    onClick={() => {
                      handleNavClick("install");
                      window.open("https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf?authuser=0&hl=de", "_blank");
                    }}
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Chrome className="mr-2 h-4 w-4" />
                      Add to Chrome
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
