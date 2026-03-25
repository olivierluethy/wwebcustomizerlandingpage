import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - WWeb Customizer",
    };
  }

  return {
    title: `${post.title} - WWeb Customizer Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
    <Navigation />
    <main className="min-h-screen bg-background pt-24 pb-16">
      <article className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.split("\n").map((line, index) => {
              if (line.startsWith("# ")) {
                return (
                  <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-foreground">
                    {line.replace("# ", "")}
                  </h1>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={index} className="text-muted-foreground ml-4 mb-2">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.match(/^\d+\./)) {
                return (
                  <li key={index} className="text-muted-foreground ml-4 mb-2 list-decimal">
                    {line.replace(/^\d+\.\s*/, "")}
                  </li>
                );
              }
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p key={index} className="font-semibold text-foreground my-4">
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (line.trim() === "") {
                return <br key={index} />;
              }
              return (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {line}
                </p>
              );
            })}
          </div>

          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <Link
                href="/blog"
                className="text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Read more articles
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to WWeb Customizer
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </main>
    <Footer />
    </>
  );
}
