/**
 * Copy for the inline blog install CTA (components/blog-install-cta.tsx).
 *
 * Kept out of the component so copy can be edited without touching JSX — this
 * text changes far more often than the markup does.
 *
 * TWO KINDS OF TOPIC, and the distinction matters:
 *
 * - CAPABILITY topics (themes, fonts, colors, backgrounds, dark-mode, privacy)
 *   describe something the extension genuinely does. The copy makes a direct
 *   claim, because it's true.
 *
 * - BRIDGE topics (notifications, logging-out, not-loading, meta-ai) are posts
 *   about WhatsApp/browser faults the extension does NOT fix. The copy must not
 *   imply otherwise. It says so plainly, then pivots to a real adjacent
 *   capability.
 *
 * Writing "fix your notifications — install our extension" would be a false
 * claim aimed at the most skeptical readers on the site. TRUST_AUDIT_REPORT.md
 * rates exactly that class of overclaim a critical credibility risk. Honest
 * bridging is the whole point of a per-topic map; if a topic's copy can't be
 * written honestly, it belongs on the fallback instead.
 */

/**
 * Shared label for every "add to Chrome" button on the site.
 *
 * States the OUTCOME, not the mechanism: a visitor deciding whether to trust an
 * extension needs to know what the click does to their browser, and "Install"
 * describes our process rather than their result. "Free" is in the label rather
 * than only the microcopy because price is the first hesitation and it should
 * not require a second glance to resolve.
 *
 * Any button using this label must also show the Chrome mark — the label
 * promises an add-to-Chrome action and the icon confirms it before the click.
 */
export const INSTALL_BUTTON_LABEL = "Add to Chrome — Free";

/**
 * Reassurance line shown under every install CTA. Identical everywhere on
 * purpose: a visitor who sees it in the nav, again in the hero, and again at the
 * end of a blog post reads consistency as a claim that will hold up, whereas
 * three differently-worded promises invite the question of which is true.
 *
 * Deliberately contains NO user count. TRUST_AUDIT_REPORT.md rates unverifiable
 * numeric social proof a critical credibility risk, and the Chrome Web Store
 * does not publish an install count for this listing (see hero/cws-badge.tsx).
 * Every claim in this line is one a visitor can verify within a minute of
 * installing. Don't add a number here without a public source to point at.
 */
export const INSTALL_TRUST_LINE = "Free · No signup · Works in seconds";

/**
 * One-line hover preview: what the visitor actually gets, revealed on hover of
 * the CTA. Answers "what happens if I click" at the moment of hesitation,
 * without spending permanent page space on it.
 *
 * Keyed by the same `location` taxonomy used by trackInstallClick/trackCtaHover
 * so a placement has exactly one identity across analytics and copy.
 *
 * Desktop-only by nature — touch devices have no hover. Nothing load-bearing
 * goes here; it is reassurance layered on top of copy that already stands
 * alone, so a phone visitor loses nothing by never seeing it.
 */
const PREVIEWS: Record<string, string> = {
  install_hero:
    "Themes, fonts, colors, backgrounds and privacy blur — all saved locally on your machine.",
  install_nav:
    "Restyle WhatsApp Web in seconds. Nothing you set ever leaves your browser.",
  install_cta_section:
    "Hundreds of editable properties, live preview, and import/export to move your setup between computers.",
  blog_footer_cta:
    "The extension behind these guides: themes, fonts, colors and privacy blur for WhatsApp Web.",
  blog_inline_cta:
    "Free Chrome extension. Set it up once, and it reapplies your look every time WhatsApp Web loads.",
  blog_install_banner:
    "Import the theme files below, tweak anything you like, and export your own.",
  post_download_prompt:
    "Import the file you just downloaded, then edit any part of it — colors, fonts, spacing.",
};

const PREVIEW_FALLBACK =
  "Free Chrome extension for restyling WhatsApp Web — themes, fonts, colors and privacy controls.";

/** Hover-preview line for a CTA placement; generic copy for unknown placements. */
export function getInstallPreview(location: string): string {
  return PREVIEWS[location] ?? PREVIEW_FALLBACK;
}

export interface InstallCtaCopy {
  headline: string;
  body: string;
}

const FALLBACK: InstallCtaCopy = {
  headline: "Make WhatsApp Web actually yours",
  body: "WhatsApp Web Customizer is a free Chrome extension for restyling WhatsApp Web — themes, fonts, colors, backgrounds, and privacy controls, all stored locally on your machine.",
};

const COPY: Record<string, InstallCtaCopy> = {
  // ---------------------------------------------------------------
  // CAPABILITY TOPICS — the extension really does this
  // ---------------------------------------------------------------

  fonts: {
    headline: "Change the font without fighting WhatsApp Web",
    body: "WhatsApp Web gives you no font setting at all — that's why the workarounds above are so fiddly. The extension adds a real one: pick any font, including your own uploads, and set the size once. It sticks across reloads.",
  },

  themes: {
    headline: "Install a theme in a couple of clicks",
    body: "The extension is what applies these themes. Import a preset, tweak it, or build your own — and export the result as a file you can carry to another computer.",
  },

  colors: {
    headline: "Set your own colors, not the four WhatsApp offers",
    body: "The extension exposes the colors WhatsApp Web keeps locked: bubbles, backgrounds, accents, and the chat list. Change them individually and keep the result.",
  },

  backgrounds: {
    headline: "Use any background you want",
    body: "The extension lets you set your own chat wallpaper — your own image, a gradient, or an animated background — instead of choosing from WhatsApp's short built-in list.",
  },

  "dark-mode": {
    headline: "Go past WhatsApp's one dark mode",
    body: "WhatsApp Web ships exactly one dark theme, and it isn't very dark. The extension lets you set true black for OLED screens, or a softer dark that isn't the default grey.",
  },

  privacy: {
    headline: "Blur messages before someone else reads them",
    body: "The extension can blur message previews and hide contact names until you hover — useful on a shared screen or in an office. Everything stays local; nothing is sent anywhere.",
  },

  // ---------------------------------------------------------------
  // BRIDGE TOPICS — the extension does NOT fix these. Say so.
  // ---------------------------------------------------------------

  notifications: {
    headline: "Once notifications are working again",
    body: "The extension can't fix notification permissions — that's between your browser and WhatsApp, and the steps above are the real fix. What it does do is let you restyle WhatsApp Web afterwards: themes, fonts, colors, and backgrounds.",
  },

  "logging-out": {
    headline: "Worth knowing once you're back in",
    body: "Nothing here can stop WhatsApp from dropping a session — that's on WhatsApp's side. But the extension does save your customization locally and reapply it automatically, so a re-login doesn't cost you your setup twice.",
  },

  "not-loading": {
    headline: "After you've got it loading again",
    body: "The extension won't fix a blank screen or a failed connection — follow the steps above for that. It's for what comes next: making WhatsApp Web look like something you actually want open all day.",
  },

  "meta-ai": {
    headline: "For the clutter you can control",
    body: "Meta AI can't be removed by an extension — if the steps above didn't hide it, nothing here will either. What the extension can clear out is the rest of the noise: channels, status, and archived chats you never open.",
  },
};

/**
 * Resolves topic copy, falling back to the generic message for unknown or
 * missing topics. Unknown topics are expected — markers are hand-written into
 * markdown, so a typo should degrade to generic copy rather than break a post.
 */
export function getInstallCtaCopy(topic?: string | null): InstallCtaCopy {
  if (!topic) return FALLBACK;
  return COPY[topic.trim().toLowerCase()] ?? FALLBACK;
}

/** Topics with tailored copy. Exported for tests and authoring reference. */
export const INSTALL_CTA_TOPICS = Object.keys(COPY);
