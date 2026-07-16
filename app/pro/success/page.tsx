"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";

/**
 * Lemon Squeezy post-purchase success page.
 *
 * The authoritative conversion signal is the server-side webhook
 * (app/api/lemonsqueezy/webhook) — this page is just the buyer-facing
 * thank-you + activation instructions. If Lemon Squeezy is configured to append
 * `?license_key=...` to the redirect (or the buyer pastes it), we surface it for
 * convenient copy/paste into the extension; otherwise we point them to their
 * emailed receipt.
 */
function SuccessInner() {
  const params = useSearchParams();
  const licenseKey = params.get("license_key");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Page-view only. NOT the conversion event — checkout_completed is emitted
    // by the webhook so it can't be inflated by refreshes or shared links.
    trackEvent(
      "pro_success_page_viewed",
      "pro",
      licenseKey ? "with_key" : "no_key"
    );
  }, [licenseKey]);

  const copyKey = async () => {
    if (!licenseKey) return;
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable; the key is still visible to select */
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            You&apos;re Pro. Thank you!
          </h1>
        </div>

        <p className="text-muted-foreground mb-6">
          Your purchase is complete. Here&apos;s how to unlock the premium
          animated backgrounds in the extension:
        </p>

        <ol className="list-decimal list-inside space-y-2 text-foreground mb-8">
          <li>Open the WhatsApp Web Customizer popup.</li>
          <li>
            Go to the <strong>About</strong> tab → <strong>Pro</strong> section.
          </li>
          <li>
            Paste your <strong>license key</strong> into “Activate your license
            key” and press <strong>Activate</strong>.
          </li>
        </ol>

        {licenseKey ? (
          <div className="rounded-lg border border-border bg-card p-4 mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              Your license key
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 break-all rounded bg-muted px-3 py-2 text-sm text-foreground">
                {licenseKey}
              </code>
              <button
                type="button"
                onClick={copyKey}
                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-4 mb-8">
            <p className="text-sm text-muted-foreground">
              Your license key was shown on the checkout confirmation and emailed
              to you by Lemon Squeezy. Copy it from there and paste it into the
              extension.
            </p>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Every animation that was free before stays free — Pro simply adds new
          premium ones. Need help? Reach us from the extension&apos;s About tab.
        </p>
      </div>
    </main>
  );
}

export default function ProSuccessPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={null}>
        <SuccessInner />
      </Suspense>
      <Footer />
    </>
  );
}
