import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Chrome } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";

// Discord SVG Komponente (wie zuvor)
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://w3.org">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0775-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0951 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0951 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

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
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <header className="mb-8">
              {/* Nur noch Datum und Lesezeit anzeigen */}
              <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-accent/60" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-accent/60" />
                  {post.readTime}
                </span>
              </div>
              
              {/* Trennlinie für eine saubere Optik vor dem Content */}
              <div className="h-px w-full bg-border/40 mt-6" />
            </header>

            {/* Der Titel (H1) und die Beschreibung kommen jetzt 
                direkt aus dem Markdown-Renderer unten */}
            <div className="prose prose-invert prose-lg max-w-none">
              {renderMarkdown(post.content)}
            </div>

            {/* 🔥 NEUE CTA BOX */}
            <div className="bg-card border border-accent/20 rounded-2xl p-8 mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    Love WWeb Customizer?
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base max-w-md">
                    Enhance your WhatsApp experience today or join our community to shape the future of the extension.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a
                    href="https://discord.gg/cppbDz4qhn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-xl font-bold transition-all text-sm"
                  >
                    <DiscordIcon className="h-5 w-5" />
                    Join Discord
                  </a>
                  <a
                    href="https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf?authuser=0&hl=de" // Hier Link zum Chrome Store einfügen
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background hover:opacity-90 px-6 py-3 rounded-xl font-bold transition-all text-sm"
                  >
                    <Chrome className="h-5 w-5" />
                    Get Extension
                  </a>
                </div>
              </div>
            </div>

            <footer className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-sm">
                <Link
                  href="/blog"
                  className="text-accent hover:text-accent/80 transition-colors font-bold uppercase tracking-wider"
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
