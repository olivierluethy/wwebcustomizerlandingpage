"use client";

import * as React from "react";
import { Chrome, Check } from "lucide-react";
import { useInstallCta } from "@/components/use-install-cta";
import { useCtaImpression } from "@/components/use-cta-impression";
import type { PreviewTheme } from "@/lib/themes";

/**
 * Before/after theme preview. Used in the hero and on theme blog posts.
 *
 * The "after" state is rendered from the ACTUAL theme file a reader downloads,
 * not from hand-picked colors that approximate it. Those files are just CSS
 * custom properties, so the real values are spread straight onto the mock —
 * which is what makes "Get this theme" a truthful claim rather than a mockup.
 * Edit a theme file and this preview changes with it; the two cannot drift.
 *
 * `theme` is read from disk server-side (lib/themes.ts) and passed in, so each
 * page carries only the one theme it displays rather than all 45.
 *
 * DELIBERATELY CHEAP. In the hero this sits near the LCP element and a large
 * share of traffic is on slow mobile connections, so it's plain DOM and CSS:
 * no images, no canvas, no animation library, no network request. A theme's
 * vars are ~400 bytes of props. The only JS is a boolean toggle.
 *
 * The "before" state is WhatsApp Web's real default palette, so the comparison
 * is honest in both directions — it isn't made uglier to flatter the theme.
 */

/** WhatsApp Web's own default colors, in the same var vocabulary as the theme
 *  files so both states drive the mock through one code path. */
const DEFAULT_VARS: Record<string, string> = {
  "--wc-text": "rgba(233, 237, 239, 1)",
  "--wc-accent": "rgba(0, 168, 132, 1)",
  "--wc-receipt": "rgba(83, 189, 235, 1)",
  "--wc-bubble-in": "rgba(32, 44, 51, 1)",
  "--wc-bubble-out": "rgba(0, 92, 75, 1)",
  "--wc-bg-base": "rgba(11, 20, 26, 1)",
  "--wc-bg-up": "rgba(17, 27, 33, 1)",
  "--wc-scroll": "rgba(52, 66, 74, 1)",
};

/** Only the vars the mock actually paints with — the theme files also carry
 *  loading-skeleton gradients that have nothing to render here. */
const USED_VARS = [
  "--wc-text",
  "--wc-accent",
  "--wc-receipt",
  "--wc-bubble-in",
  "--wc-bubble-out",
  "--wc-bg-base",
  "--wc-bg-up",
  "--wc-scroll",
] as const;

function varsFor(
  themed: boolean,
  themeVars: Record<string, string>
): React.CSSProperties {
  const source = themed ? themeVars : DEFAULT_VARS;
  const style: Record<string, string> = {};
  for (const key of USED_VARS) {
    const value = source[key] ?? DEFAULT_VARS[key];
    if (value) style[key] = value;
  }
  return style as React.CSSProperties;
}

const CHATS = [
  { name: "Design team", preview: "Shipped the new build 🎉", unread: 2 },
  { name: "Mum", preview: "Call me when you're free", unread: 0 },
  { name: "Standup", preview: "Notes are in the doc", unread: 0 },
];

const MESSAGES: Array<{ from: "them" | "me"; text: string }> = [
  { from: "them", text: "Is that a custom WhatsApp Web theme?" },
  { from: "me", text: "Yep — took about 10 seconds." },
  { from: "them", text: "Send me the file?" },
];

export function ThemePreview({
  theme,
  postSlug = null,
}: {
  /** Read from the real theme file server-side and passed down, so each page
   *  carries only the one theme it shows. */
  theme: PreviewTheme;
  postSlug?: string | null;
}) {
  const [themed, setThemed] = React.useState(true);
  const { onClick, fallback } = useInstallCta("theme_preview", postSlug);
  const previewRef = useCtaImpression("theme_preview");
  const THEME_NAME = theme.name;

  return (
    <div ref={previewRef} className="w-full max-w-md">
      {/* Toggle — a two-state switch rather than a drag handle: keyboard
          accessible, no pointer handlers, and legible on a phone. */}
      <div
        role="group"
        aria-label="Theme preview"
        className="mb-3 inline-flex rounded-lg border border-border bg-card/60 p-1"
      >
        {[
          { label: "Default", value: false },
          { label: THEME_NAME, value: true },
        ].map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => setThemed(option.value)}
            aria-pressed={themed === option.value}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              themed === option.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* The mock. aria-hidden: it's decorative — a screen reader gains nothing
          from a fake chat, and the surrounding copy carries the meaning.

          pointer-events-none: it looks exactly like a live WhatsApp Web window,
          so people try to click the chat rows and bubbles. Nothing can happen
          when they do — that is a dead affordance, and repeated clicks on it are
          precisely what PostHog reports as $rageclick. Removing the click target
          means it reads as an image, which is what it is. The toggle and the CTA
          sit outside this element and stay fully interactive. */}
      <div
        aria-hidden="true"
        style={varsFor(themed, theme.vars)}
        className="pointer-events-none select-none overflow-hidden rounded-xl border border-border shadow-2xl transition-colors duration-300 motion-reduce:transition-none"
      >
        <div className="flex h-[248px] text-[11px] leading-tight">
          {/* Sidebar */}
          <div
            className="hidden w-[38%] shrink-0 flex-col border-r border-black/20 sm:flex"
            style={{ background: "var(--wc-bg-up)" }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{ background: "var(--wc-accent)", opacity: 0.9 }}
              />
              <div
                className="h-1.5 w-10 rounded-full"
                style={{ background: "var(--wc-scroll)" }}
              />
            </div>

            {CHATS.map((chat) => (
              <div
                key={chat.name}
                className="flex items-center gap-2 px-2.5 py-2"
                style={{ color: "var(--wc-text)" }}
              >
                <div
                  className="h-6 w-6 shrink-0 rounded-full"
                  style={{ background: "var(--wc-bubble-in)" }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{chat.name}</div>
                  <div className="truncate opacity-55">{chat.preview}</div>
                </div>
                {chat.unread > 0 && (
                  <span
                    className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold"
                    style={{
                      background: "var(--wc-accent)",
                      color: "var(--wc-bg-base)",
                    }}
                  >
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Conversation */}
          <div
            className="flex min-w-0 flex-1 flex-col"
            style={{ background: "var(--wc-bg-base)" }}
          >
            <div
              className="flex items-center gap-2 border-b border-black/20 px-3 py-2"
              style={{ background: "var(--wc-bg-up)", color: "var(--wc-text)" }}
            >
              <div
                className="h-5 w-5 rounded-full"
                style={{ background: "var(--wc-bubble-in)" }}
              />
              <span className="font-semibold">Design team</span>
            </div>

            <div className="flex flex-1 flex-col justify-end gap-1.5 p-3">
              {MESSAGES.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.from === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className="max-w-[85%] rounded-lg px-2 py-1.5"
                    style={{
                      background:
                        message.from === "me"
                          ? "var(--wc-bubble-out)"
                          : "var(--wc-bubble-in)",
                      color: "var(--wc-text)",
                    }}
                  >
                    {message.text}
                    {message.from === "me" && (
                      <Check
                        className="ml-1 inline h-2.5 w-2.5"
                        style={{ color: "var(--wc-receipt)" }}
                      />
                    )}
                  </span>
                </div>
              ))}

              <div
                className="mt-1.5 h-6 rounded-full"
                style={{ background: "var(--wc-bubble-in)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4">
        <button
          type="button"
          onClick={onClick}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#4ade80] px-5 py-3 text-sm font-semibold text-[#0d1117] transition-colors hover:bg-[#3ecf6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ade80]"
        >
          <Chrome className="h-4 w-4" aria-hidden="true" />
          Get this theme — install free
        </button>

        {/* States the import step explicitly. The button says "get this theme",
            but installing alone doesn't apply it — the .json has to be imported
            afterwards, exactly as PostInstallBanner tells blog readers. Leaving
            that out would make the CTA promise something the install doesn't
            deliver. */}
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Free · No signup · Import the {THEME_NAME} .json after installing
        </p>
      </div>

      {fallback}
    </div>
  );
}
