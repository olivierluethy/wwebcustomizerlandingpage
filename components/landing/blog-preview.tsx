"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { trackArticleClick } from "@/lib/analytics";

/** Only the fields this card renders. Deliberately NOT `BlogPost` — that type
 *  carries `content`, and accepting it would invite passing whole posts, which
 *  would serialize ~756K of markdown into the page payload. */
export interface BlogPreviewItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

/**
 * Homepage "From the Blog" strip.
 *
 * Posts arrive as PROPS from the server component that renders this. It used to
 * call `getAllPosts()` directly, and because this file is `"use client"` that
 * pulled all of `lib/blog.ts` — every post's full markdown body — into an 804K
 * client chunk the homepage downloaded, in order to show three titles.
 *
 * Never import `@/lib/blog` from this file.
 */
export function BlogPreview({ posts }: { posts: BlogPreviewItem[] }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              From the Blog
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl text-pretty">
              Tips, tutorials, and insights to help you get the most out of
              WhatsApp Web.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mt-4 md:mt-0 font-medium"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                onClick={() => trackArticleClick(post.slug, "blog_preview")}
                className="block p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-all h-full group"
              >
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {post.description}
                </p>

                <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
