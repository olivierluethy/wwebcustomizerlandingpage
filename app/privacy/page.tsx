"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { trackLegalPageView } from "@/lib/analytics";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    trackLegalPageView("privacy_policy");
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

        <article className="prose prose-invert prose-green max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              WWeb Customizer is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, and safeguard your information
              when you use our browser extension and visit our website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Data Collection
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">We do not collect personal data.</strong> The WWeb Customizer
              extension operates entirely within your browser and does not transmit
              any personal information, messages, or contacts to external servers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              All customization settings and preferences are stored locally on your
              device using browser storage APIs.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Google Analytics
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our website uses Google Analytics to understand how visitors interact
              with our site. This helps us improve the user experience and content.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Google Analytics collects anonymous information such as:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Pages visited and time spent on pages</li>
              <li>Browser type and device information</li>
              <li>Referral source</li>
              <li>Geographic region (country/city level)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This data is anonymized and cannot be used to personally identify you.
              You can opt out of Google Analytics by using browser extensions like{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use cookies for analytics purposes. Cookies are small
              text files stored on your device that help us understand usage
              patterns. You can control cookie settings through your browser
              preferences.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may link to or integrate with the following third-party services:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <strong className="text-foreground">Google Analytics</strong> - For website analytics
              </li>
              <li>
                <strong className="text-foreground">Discord</strong> - For community communication
              </li>
              <li>
                <strong className="text-foreground">GitHub</strong> - For open-source code hosting
              </li>
              <li>
                <strong className="text-foreground">Chrome Web Store</strong> - For extension distribution
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Each of these services has their own privacy policy governing how they
              handle your data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify
              users of any significant changes by updating the date at the top of
              this page.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please reach out
              to us through our{" "}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Discord community
              </a>{" "}
              or{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                GitHub repository
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
    <Footer />
    </>
  );
}
