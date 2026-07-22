import { Check } from "lucide-react";

/**
 * Compact "what our extension does" card, rendered after the post intro.
 *
 * NO "use client" — this is a server component with no interactivity, so it
 * ships zero JavaScript. On a slow connection it's part of the initial HTML and
 * costs nothing to render, which is why it has no install button of its own:
 * that would make it a fourth install ask on the page and require client JS.
 * The reader is told what the tool does; the asking is left to the CTAs that
 * already exist.
 *
 * Feature lines are per-topic and describe only things the extension actually
 * does. For troubleshooting topics it cannot fix (notifications, dropped
 * sessions, loading failures) the card lists adjacent real capabilities rather
 * than implying a fix — same rule as lib/install-cta-copy.ts.
 */

const FEATURES: Record<string, { lead: string; points: string[] }> = {
  fonts: {
    lead: "WhatsApp Web has no font setting. The extension adds one.",
    points: [
      "Any font, including your own uploads",
      "Set the size independently of browser zoom",
      "Reapplied automatically on every reload",
    ],
  },
  themes: {
    lead: "Full visual control over WhatsApp Web.",
    points: [
      "Hundreds of editable properties with live preview",
      "Import and export themes as files",
      "Build your own or start from a preset",
    ],
  },
  colors: {
    lead: "The colors WhatsApp Web keeps locked.",
    points: [
      "Bubbles, backgrounds, accents and chat list",
      "Each surface editable on its own",
      "Live preview as you change them",
    ],
  },
  backgrounds: {
    lead: "Any chat wallpaper you want.",
    points: [
      "Your own image, a gradient, or an animated background",
      "Not limited to WhatsApp's built-in set",
      "Stored locally, reapplied on reload",
    ],
  },
  "dark-mode": {
    lead: "Past WhatsApp's single dark theme.",
    points: [
      "True black for OLED screens",
      "Or a softer dark that isn't the default grey",
      "Adjust every surface independently",
    ],
  },
  privacy: {
    lead: "Control what's visible on your screen.",
    points: [
      "Blur message previews until you hover",
      "Hide contact names and avatars",
      "Everything local — nothing is sent anywhere",
    ],
  },
  notifications: {
    lead: "Not a notification fix — the steps above are that.",
    points: [
      "What it does: restyle WhatsApp Web once it's working",
      "Themes, fonts, colors and backgrounds",
      "Free, no account, settings stay on your machine",
    ],
  },
  "logging-out": {
    lead: "It can't stop WhatsApp dropping a session.",
    points: [
      "It does save your customization locally",
      "Reapplied automatically after you log back in",
      "So a re-login doesn't cost you your setup twice",
    ],
  },
  "not-loading": {
    lead: "It won't fix a blank screen — follow the steps above.",
    points: [
      "It's for once WhatsApp Web is loading again",
      "Themes, fonts, colors, backgrounds, privacy blur",
      "Free, no account needed",
    ],
  },
  "meta-ai": {
    lead: "No extension can remove Meta AI.",
    points: [
      "It can clear the rest of the clutter",
      "Hide channels, status and archived chats",
      "Plus full theming of what's left",
    ],
  },
};

const FALLBACK = {
  lead: "WhatsApp Web Customizer is a free Chrome extension.",
  points: [
    "Themes, fonts, colors and backgrounds",
    "Privacy blur for message previews",
    "Settings stored locally on your machine",
  ],
};

export function ExtensionFeatureCard({ topic }: { topic?: string | null }) {
  const { lead, points } = (topic && FEATURES[topic]) || FALLBACK;

  return (
    <aside className="my-8 rounded-2xl border border-border bg-card/40 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        What our extension does
      </p>

      <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
        {lead}
      </p>

      <ul className="mt-3 space-y-1.5">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
          >
            <Check
              className="mt-1 h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            {point}
          </li>
        ))}
      </ul>
    </aside>
  );
}
