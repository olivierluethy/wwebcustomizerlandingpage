"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { trackArticleClick } from "@/lib/analytics";
import type { RelatedPostLink } from "@/lib/blog-topics";

/**
 * End-of-post "keep reading" block — the second-pageview lever.
 *
 * 92% of sessions are a single pageview from search, so the cheapest win isn't
 * a louder install ask, it's giving the reader an obvious next thing to read.
 *
 * Takes the already-selected posts as props. It must NEVER import from
 * `@/lib/blog` or `@/lib/blog-topics` at runtime — this is a client component,
 * and either import would pull the ~756K post corpus into the browser bundle.
 * The `RelatedPostLink` import is a `type`, erased at compile time.
 *
 * Uses next/link so the second pageview is a client-side navigation rather than
 * a full document load — the whole point is that it must feel instant on a slow
 * connection.
 */
export function RelatedPosts({
  heading,
  posts,
}: {
  heading: string;
  posts: RelatedPostLink[];
}) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 border-t border-border pt-8">
      <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-muted-foreground">
        {heading}
      </h2>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              onClick={() => trackArticleClick(post.slug, "related_posts")}
              className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card/40 px-4 py-3.5 transition-colors hover:border-primary/40 hover:bg-card/70"
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-6 text-foreground group-hover:text-primary">
                  {post.title}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {post.readTime}
                </span>
              </span>

              <ArrowRight
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
