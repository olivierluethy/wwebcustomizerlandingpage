"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContactForm } from "@easycontact/react";
import { trackLegalPageView } from "@/lib/analytics";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";

export default function ContactPage() {
  useEffect(() => {
    trackLegalPageView("contact");
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Contact Us
            </h1>
            <p className="text-muted-foreground">
              Got a question, feature request, or feedback? Send us a message and
              we&apos;ll get back to you as soon as possible.
            </p>
          </header>

          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <ContactForm projectId="09bb35272955eee856a980e9" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
