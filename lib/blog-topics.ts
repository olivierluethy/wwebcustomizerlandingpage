import { blogPosts, type BlogPost } from "@/lib/blog";

/**
 * Topic classification and related-post selection for blog posts.
 *
 * SERVER-ONLY BY CONVENTION. Everything here reads `blogPosts`, which is ~756K
 * of post markdown. Importing this module from a `"use client"` component would
 * bundle that entire corpus into the browser payload — the exact mistake that
 * put an 804K chunk on the homepage. Call these from server components and pass
 * the small results (slug + title) down as props.
 *
 * Posts carry no tags or category field, so topic is derived from the slug.
 * Slugs are stable, hand-written, and SEO-shaped, which makes them a better
 * signal than the body text and free to compute at build time.
 */

/**
 * Ordered slug patterns → topic. FIRST MATCH WINS, so more specific patterns
 * must come before broader ones: "whatsapp-web-font-not-changing" has to reach
 * `fonts`, and "how-to-change-whatsapp-web-notification-sound" has to reach
 * `notifications` rather than being swallowed by a generic "change" rule.
 */
const TOPIC_RULES: Array<{ topic: string; test: RegExp }> = [
  { topic: "not-loading", test: /not-loading|not-working|blank-screen|qr-code-not-working|calls-not-working/ },
  { topic: "logging-out", test: /logging-out|logs-out|keeps-logging/ },
  { topic: "notifications", test: /notification/ },
  { topic: "meta-ai", test: /meta-ai/ },
  { topic: "fonts", test: /font|typograph|monospace/ },
  { topic: "backgrounds", test: /background|wallpaper/ },
  { topic: "dark-mode", test: /dark-mode|oled|dark-whatsapp/ },
  { topic: "privacy", test: /privacy|blur|hide-|safe|without-showing-online|disappearing|archived/ },
  { topic: "colors", test: /color/ },
  { topic: "themes", test: /theme|look-like|aesthetic|setup|minimalist|declutter/ },
];

/** Topic for a post slug, or null when nothing matches (changelog/meta posts). */
export function getTopicForSlug(slug: string): string | null {
  const s = slug.toLowerCase();
  for (const { topic, test } of TOPIC_RULES) {
    if (test.test(s)) return topic;
  }
  return null;
}

/** The minimal shape a client component needs — deliberately NOT a BlogPost,
 *  so post bodies can never be serialized into the page payload. */
export interface RelatedPostLink {
  slug: string;
  title: string;
  readTime: string;
}

/** Slug words worth comparing — drops boilerplate every slug shares, which
 *  would otherwise make every post look related to every other post. */
const STOPWORDS = new Set([
  "how", "to", "the", "on", "in", "for", "your", "a", "an", "of", "and", "or",
  "you", "with", "whatsapp", "web", "2026", "guide", "best", "what", "is",
  "it", "that", "actually", "work", "works", "can", "do", "does",
]);

function slugTokens(slug: string): Set<string> {
  return new Set(
    slug
      .toLowerCase()
      .split("-")
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
  );
}

/**
 * Up to `limit` posts related to `slug`, best first.
 *
 * Scoring, in priority order:
 *   1. Same topic (+10) — the strongest signal we have, and what makes the
 *      block read as "more on your actual problem" rather than "more posts".
 *   2. Shared distinctive slug words (+1 each) — separates, say, two different
 *      font posts from two different theme posts within one topic.
 *   3. Recency, as the tie-breaker only.
 *
 * Excludes the current post and anything with `seoIndex: false` (changelog and
 * internal posts, which aren't useful next reads for a search visitor).
 *
 * Deterministic: no randomness, so the same post always links the same three
 * and the pages stay statically cacheable.
 */
export function getRelatedPosts(slug: string, limit = 3): RelatedPostLink[] {
  const topic = getTopicForSlug(slug);
  const tokens = slugTokens(slug);

  const scored = blogPosts
    .filter((p: BlogPost) => p.slug !== slug && p.seoIndex)
    .map((p: BlogPost) => {
      let score = 0;
      if (topic && getTopicForSlug(p.slug) === topic) score += 10;
      for (const t of slugTokens(p.slug)) if (tokens.has(t)) score += 1;
      return { post: p, score };
    })
    .filter((x) => x.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    );

  const picked = scored.slice(0, limit).map(({ post }) => post);

  // Top up to `limit` with the most recent indexed posts. Some posts genuinely
  // have no topical neighbours ("back up & restore", "for business users"), and
  // scoring alone left 8 posts with an empty list and 18 with fewer than three —
  // an empty "keep reading" block is worse than a loosely-related one, since the
  // entire point is to offer a second pageview.
  if (picked.length < limit) {
    const taken = new Set(picked.map((p) => p.slug));
    const filler = blogPosts
      .filter((p) => p.slug !== slug && p.seoIndex && !taken.has(p.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    for (const p of filler) {
      if (picked.length >= limit) break;
      picked.push(p);
    }
  }

  return picked.map((post) => ({
    slug: post.slug,
    title: post.title,
    readTime: post.readTime,
  }));
}

/**
 * Heading for the related block. "Fixes" is only truthful on troubleshooting
 * posts — on "make WhatsApp Web look like Notion" the reader has no problem to
 * fix, and calling the block "Related fixes" there would misdescribe the links.
 */
export function getRelatedHeading(slug: string): string {
  const topic = getTopicForSlug(slug);
  const troubleshooting =
    topic === "not-loading" ||
    topic === "logging-out" ||
    topic === "notifications" ||
    /not-changing|not-working|too-small|fixes|troubleshoot/.test(slug);
  return troubleshooting ? "Related fixes" : "Related guides";
}
