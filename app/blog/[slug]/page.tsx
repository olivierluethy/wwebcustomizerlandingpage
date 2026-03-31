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

// 🔥 NEUER MARKDOWN RENDERER
function renderMarkdown(content: string) {
  const lines = content.trimStart().split("\n");
  const elements: React.ReactNode[] = [];

  let listItems: React.ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === "ul") {
        elements.push(
          <ul key={`ul-${elements.length}`} className="ml-6 mb-4 list-disc text-muted-foreground">
            {listItems}
          </ul>
        );
      } else if (listType === "ol") {
        elements.push(
          <ol key={`ol-${elements.length}`} className="ml-6 mb-4 list-decimal text-muted-foreground">
            {listItems}
          </ol>
        );
      }
      listItems = [];
      listType = null;
    }
  };

  const formatInline = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-primary underline hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
      );

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // Divider
    if (trimmed === "---") {
      flushList();
      elements.push(<hr key={i} className="my-6 border-border" />);
    }

    // Headings
    else if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={i} className="text-3xl font-bold mt-8 mb-4 text-foreground">
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace("# ", "")) }} />
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-foreground">
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace("## ", "")) }} />
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-foreground">
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace("### ", "")) }} />
        </h3>
      );
    }

    // 🔥 Blockquote (FIX für dein Problem)
    else if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4"
        >
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace("> ", "")) }} />
        </blockquote>
      );
    }

    // Unordered List
    else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }

      listItems.push(
        <li key={i}>
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace(/^[-*] /, "")) }} />
        </li>
      );
    }

    // Ordered List
    else if (/^\d+\./.test(trimmed)) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }

      listItems.push(
        <li key={i}>
          <span
            dangerouslySetInnerHTML={{
              __html: formatInline(trimmed.replace(/^\d+\.\s*/, "")),
            }}
          />
        </li>
      );
    }

    // Empty line
    else if (trimmed === "") {
      flushList();
    }

    // Paragraph
    else {
      flushList();
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
        </p>
      );
    }
  });

  flushList();
  return elements;
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

            {/* 🔥 HIER IST DER NEUE RENDERER */}
            <div className="prose prose-invert prose-lg max-w-none">
              {renderMarkdown(post.content)}
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