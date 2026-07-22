import fs from "node:fs";
import path from "node:path";

/**
 * Server-side lookup from a blog post to the theme file(s) it offers.
 *
 * SERVER-ONLY. Reads from disk with `node:fs`, so importing this from a
 * `"use client"` component will fail the build — which is the point. There are
 * 45 theme files (~66K); the alternative of importing them all into a client
 * component would ship every theme to every reader to render one preview.
 * Pages are statically generated, so these reads happen at build time only.
 */

const THEMES_DIR = path.join(process.cwd(), "public", "themes");

interface ThemeIndexEntry {
  name: string;
  filename: string;
  /** Blog post slug this theme is published on. */
  slug: string;
  id: string;
}

/** The subset of a theme file the preview paints with. Loading-skeleton
 *  gradients in the source file are dropped — nothing here renders them. */
export interface PreviewTheme {
  name: string;
  vars: Record<string, string>;
}

const PREVIEW_VARS = [
  "--wc-text",
  "--wc-accent",
  "--wc-receipt",
  "--wc-bubble-in",
  "--wc-bubble-out",
  "--wc-bg-base",
  "--wc-bg-up",
  "--wc-scroll",
];

let indexCache: ThemeIndexEntry[] | null = null;

function readIndex(): ThemeIndexEntry[] {
  if (indexCache) return indexCache;
  try {
    const raw = fs.readFileSync(path.join(THEMES_DIR, "index.json"), "utf8");
    indexCache = (JSON.parse(raw).themes ?? []) as ThemeIndexEntry[];
  } catch {
    // Missing or malformed index: the preview is an enhancement, so degrade to
    // "no preview" rather than failing the build of every blog page.
    indexCache = [];
  }
  return indexCache;
}

function readTheme(filename: string): PreviewTheme | null {
  try {
    const raw = fs.readFileSync(path.join(THEMES_DIR, filename), "utf8");
    const parsed = JSON.parse(raw) as {
      name?: string;
      vars?: Record<string, string>;
    };
    if (!parsed?.vars) return null;

    const vars: Record<string, string> = {};
    for (const key of PREVIEW_VARS) {
      const value = parsed.vars[key];
      if (typeof value === "string") vars[key] = value;
    }
    // A theme with none of the vars we paint with would render as an unstyled
    // box — worse than showing nothing.
    if (Object.keys(vars).length === 0) return null;

    return { name: parsed.name ?? filename.replace(/\.json$/, ""), vars };
  } catch {
    return null;
  }
}

/**
 * The theme to preview on a given blog post, or null if the post offers none.
 *
 * Posts that publish several themes get the first indexed one — the preview is
 * a hook, not a catalogue, and the post body already lists the full set with
 * its own download buttons.
 */
export function getThemeForPost(slug: string): PreviewTheme | null {
  const entry = readIndex().find((theme) => theme.slug === slug);
  if (!entry) return null;
  return readTheme(entry.filename);
}

/**
 * Theme featured in the homepage hero. Dracula: a widely recognised palette
 * whose purple reads as obviously non-default next to WhatsApp's green, so the
 * before/after difference is legible at a glance.
 */
export function getHeroTheme(): PreviewTheme | null {
  return readTheme("Dracula.json");
}
