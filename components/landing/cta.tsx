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
  className="cursor-pointer border-white text-white hover:bg-white hover:text-black px-8 py-6 text-base font-medium"
  onClick={() => {
    trackButtonClick("discord");
    window.open("https://discord.com/invite/cppbDz4qhn", "_blank");
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
              variant="outline"
              className="cursor-pointer border-border text-foreground hover:bg-secondary px-8 py-6 text-base font-medium"
              onClick={() => {
                trackButtonClick("github");
                window.open("https://github.com/BaskLash/WhatsApp-Web-Customizer", "_blank");
              }}
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
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
              Buy Me a Coffee
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
