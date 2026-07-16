"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";

/** Lemon Squeezy checkout cancel/return page. No purchase happened. */
export default function ProCancelPage() {
  useEffect(() => {
    trackEvent("pro_checkout_cancelled", "pro");
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Checkout cancelled
          </h1>
          <p className="text-muted-foreground mb-6">
            No worries — nothing was charged. Every animation that was free is
            still free. Whenever you&apos;re ready, you can unlock the premium
            ones from the extension&apos;s Backgrounds tab.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
