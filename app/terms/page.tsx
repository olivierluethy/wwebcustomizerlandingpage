"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { trackLegalPageView } from "@/lib/analytics";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";

export default function TermsOfServicePage() {
  useEffect(() => {
    trackLegalPageView("terms_of_service");
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By installing or using the WWeb Customizer browser extension, you agree
              to be bound by these Terms of Service. If you do not agree to these
              terms, please do not use the extension.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Description of Service
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              WWeb Customizer is a browser extension that enhances the WhatsApp Web
              experience by providing customization options such as themes, keyboard
              shortcuts, and other features. The extension modifies the visual
              appearance and adds functionality to the WhatsApp Web interface.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Open Source License
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              WWeb Customizer is open-source software. The source code is available
              on GitHub and is provided under an open-source license. You are free to
              view, modify, and distribute the code in accordance with the license
              terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              No Affiliation with WhatsApp or Meta
            </h2>
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <p className="text-foreground font-medium">
                WWeb Customizer is an independent, open-source project and is not
                affiliated with, endorsed by, or sponsored by WhatsApp or Meta.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              WhatsApp is a trademark of Meta Platforms, Inc. We use the name
              &quot;WhatsApp Web&quot; solely to describe the platform our extension works
              with.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Use at Your Own Risk
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The extension is provided &quot;as is&quot; without warranty of any kind, express
              or implied. By using WWeb Customizer, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                You use the extension at your own risk
              </li>
              <li>
                The developers are not responsible for any issues that may arise from
                using the extension
              </li>
              <li>
                WhatsApp may update their platform at any time, which could affect
                the functionality of the extension
              </li>
              <li>
                The use of third-party extensions may be against WhatsApp&apos;s Terms of
                Service
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Disclaimer of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall the developers or contributors of WWeb Customizer be
              liable for any direct, indirect, incidental, special, exemplary, or
              consequential damages (including, but not limited to, loss of data,
              account suspension, or service interruption) arising out of or in
              connection with the use of the extension.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              User Responsibilities
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a user of WWeb Customizer, you agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Use the extension in compliance with all applicable laws</li>
              <li>Not use the extension for any malicious or harmful purposes</li>
              <li>
                Respect the intellectual property rights of the developers and
                contributors
              </li>
              <li>Report any bugs or security vulnerabilities responsibly</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Changes to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting. Your continued use
              of the extension after any changes constitutes acceptance of the new
              terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please reach
              out to us through our{" "}
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
