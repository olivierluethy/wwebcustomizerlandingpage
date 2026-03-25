import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - WWeb Customizer",
  description:
    "Tips, tutorials, and insights to help you get the most out of WhatsApp Web customization.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Tips, tutorials, and insights to help you get the most out of
              WhatsApp Web.
            </p>
          </header>

          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-all group"
                >
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed">
                    {post.description}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
