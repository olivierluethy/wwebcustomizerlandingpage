import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Blog - WWeb Customizer",
  description:
    "Tips, tutorials, and insights to help you get the most out of WhatsApp Web customization.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breiterer Container für das Grid-Layout */}
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <header className="mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Blog
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                Tips, tutorials, and insights to help you get the most out of
                WhatsApp Web.
              </p>
            </header>

            {/* Grid System: 1 Spalte (Mobile), 2 Spalten (Tablet), 3 Spalten (Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.slug} className="flex">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col p-5 md:p-6 rounded-2xl bg-card border border-border/60 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group w-full"
                  >
                    <div className="flex items-center gap-4 text-[11px] md:text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-accent/60" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-accent/60" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">
                      {post.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-border/40 flex items-center text-xs font-bold text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read Article
                      <span className="ml-2 block h-px w-4 bg-accent" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
