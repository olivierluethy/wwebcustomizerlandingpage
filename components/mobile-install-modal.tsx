"use client";

import * as React from "react";
import QRCode from "react-qr-code";
import { Check, Copy, Mail, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CHROME_STORE_SHARE_URL,
  trackMobileFallbackUsed,
  type InstallLocation,
} from "@/lib/analytics";

/**
 * What a mobile/tablet visitor gets instead of a dead Chrome Web Store page.
 *
 * A Chrome extension cannot be installed on a phone. Roughly a quarter of the
 * site's traffic is mobile, so the goal here isn't to convert the visit — it's
 * to carry the intent across to a device that can actually install, before the
 * visitor forgets about us.
 *
 * A modal rather than a redirect: sending someone to a store listing they can't
 * install from spends their intent on a dead end and loses the referrer. The
 * modal keeps them on the page they were reading.
 *
 * ORDERING IS DELIBERATE. Email is first because it's the only option that
 * survives leaving the page — it lands in an inbox the visitor will open on a
 * computer later. Copy-link is second (useful with a self-chat or a synced
 * clipboard). QR is last: the code renders on the phone, so scanning it needs
 * the desktop's webcam pointed at the phone, which most people can't do
 * comfortably. It's included for those who can, not as a headline path.
 *
 * The QR is generated locally as SVG. Using a hosted QR image API would send
 * every mobile visitor's request to a third party, which would contradict the
 * privacy claim the product is sold on.
 *
 * Analytics: `mobile_install_fallback_used { method, location, device_type }`.
 * NOT install_click — see lib/analytics.ts for why that distinction matters.
 */
export function MobileInstallModal({
  open,
  onOpenChange,
  location,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** CTA placement that triggered this, e.g. "install_hero". */
  location: InstallLocation;
}) {
  const [copied, setCopied] = React.useState(false);
  /** QR reveal is counted once per modal, so collapsing and reopening the panel
   *  doesn't inflate the method breakdown against copy/email. */
  const qrCountedRef = React.useRef(false);

  const emailHref = React.useMemo(() => {
    const subject = encodeURIComponent(
      "Install WhatsApp Web Customizer on my computer"
    );
    const body = encodeURIComponent(
      `Open this on your computer in Chrome to install WhatsApp Web Customizer:\n\n${CHROME_STORE_SHARE_URL}\n\nIt's free, needs no account, and takes a few seconds.`
    );
    return `mailto:?subject=${subject}&body=${body}`;
  }, []);

  const copyLink = React.useCallback(async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(CHROME_STORE_SHARE_URL);
      ok = true;
    } catch {
      // Clipboard blocked (older iOS Safari, or a non-secure context). The
      // input below is still selectable by hand, and the intent still counts.
    }
    setCopied(ok);
    // Recorded whether or not the write succeeded: the visitor asked for the
    // link either way, and silently dropping the failures would overstate the
    // recovery rate.
    trackMobileFallbackUsed("copy_link", location);
    if (ok) window.setTimeout(() => setCopied(false), 2500);
  }, [location]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card">
        <DialogHeader>
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>

          <DialogTitle className="text-left text-lg font-bold text-foreground">
            This one needs a computer
          </DialogTitle>

          <DialogDescription className="text-left text-sm leading-6 text-muted-foreground">
            WhatsApp Web Customizer is a Chrome extension, and Chrome doesn&apos;t
            support extensions on phones or tablets. Send yourself the link and
            it&apos;s a few seconds to install once you&apos;re at your desktop.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          {/* Primary: survives leaving the page. */}
          <a
            href={emailHref}
            onClick={() => trackMobileFallbackUsed("email", location)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4ade80] px-4 py-3 text-sm font-semibold text-[#0d1117] no-underline transition-colors hover:bg-[#3ecf6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ade80]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email the link to myself
          </a>

          {/* Secondary: clipboard + a selectable field for when it's blocked. */}
          <div className="rounded-lg border border-border bg-background/60 p-3">
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={CHROME_STORE_SHARE_URL}
                aria-label="Chrome Web Store link"
                onFocus={(e) => e.currentTarget.select()}
                className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground"
              />
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" /> Copy
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Paste it into a message to yourself, or into your computer&apos;s
              browser.
            </p>
          </div>

          {/* Tertiary: only works if their desktop has a usable webcam. */}
          <details
            className="group rounded-lg border border-border bg-background/60"
            onToggle={(e) => {
              if (
                (e.currentTarget as HTMLDetailsElement).open &&
                !qrCountedRef.current
              ) {
                qrCountedRef.current = true;
                trackMobileFallbackUsed("qr", location);
              }
            }}
          >
            <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary">
              Or scan a QR code from your computer
            </summary>

            <div className="border-t border-border px-3 py-4">
              {/* White plate: QR contrast is a scanning requirement, so this
                  stays light even though the site is dark-only. */}
              <div className="mx-auto w-fit rounded-lg bg-white p-3">
                <QRCode
                  value={CHROME_STORE_SHARE_URL}
                  size={140}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#0d1117"
                />
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Point your computer&apos;s webcam at this code. No webcam? Use
                the email or copy options above.
              </p>
            </div>
          </details>
        </div>
      </DialogContent>
    </Dialog>
  );
}
