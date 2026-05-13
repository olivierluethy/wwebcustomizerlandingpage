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
    robots: post.seoIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

// 🔥 ERSETZE DEINEN GESAMTEN renderMarkdown() BLOCK MIT DIESEM

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];

  let listItems: React.ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  let inCodeBlock = false;
  let codeBlockLanguage = "";
  let codeLines: string[] = [];

  let tableRows: string[][] = [];
  let inTable = false;

  // ========================================
  // FLUSH LIST
  // ========================================

  const flushList = () => {
    if (!listItems.length) return;

    if (listType === "ul") {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="my-6 space-y-3"
        >
          {listItems}
        </ul>
      );
    }

    if (listType === "ol") {
      elements.push(
        <ol
          key={`ol-${elements.length}`}
          className="my-6 ml-6 space-y-4 list-decimal"
        >
          {listItems}
        </ol>
      );
    }

    listItems = [];
    listType = null;
  };

  // ========================================
  // FLUSH CODE BLOCK
  // ========================================

  const flushCodeBlock = () => {
    if (!inCodeBlock) return;

    elements.push(
      <div
        key={`code-${elements.length}`}
        className="group relative my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl"
      >
        {codeBlockLanguage && (
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              {codeBlockLanguage}
            </span>
          </div>
        )}

        <pre className="overflow-x-auto p-5 text-sm leading-7 text-gray-200">
          <code>{codeLines.join("\n")}</code>
        </pre>
      </div>
    );

    inCodeBlock = false;
    codeBlockLanguage = "";
    codeLines = [];
  };

  // ========================================
  // FLUSH TABLE
  // ========================================

  const flushTable = () => {
    if (!inTable || !tableRows.length) return;

    const headers = tableRows[0];
    const bodyRows = tableRows.slice(1);

    elements.push(
      <div
        key={`table-${elements.length}`}
        className="my-10 overflow-hidden rounded-2xl border border-border bg-card"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-muted/40">
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="border-b border-border px-5 py-4 text-left text-sm font-bold text-foreground"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatInline(header),
                      }}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {bodyRows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-b border-border/50 last:border-none hover:bg-muted/20 transition-colors"
                >
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-5 py-4 align-top text-sm leading-7 text-muted-foreground"
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: formatInline(cell),
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    tableRows = [];
    inTable = false;
  };

  // ========================================
  // INLINE FORMATTING
  // ========================================

  const formatInline = (text: string) => {
    return text

      // INLINE CODE
      .replace(
        /`([^`]+)`/g,
        '<code class="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">$1</code>'
      )

      // BOLD
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold text-foreground">$1</strong>'
      )

      // ITALIC
      .replace(
        /\*(.*?)\*/g,
        '<em class="italic">$1</em>'
      )

      // LINKS
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
      );
  };

  // ========================================
  // LOOP THROUGH LINES
  // ========================================

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // ========================================
    // CODE BLOCK START / END
    // ========================================

    if (trimmed.startsWith("```")) {
      flushList();
      flushTable();

      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = trimmed.replace(/```/, "").trim();
      } else {
        flushCodeBlock();
      }

      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    // ========================================
    // TABLES
    // ========================================

    if (trimmed.includes("|")) {
      const cols = trimmed
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);

      const isSeparator = cols.every((c) => /^-+$/.test(c));

      if (!isSeparator && cols.length > 1) {
        flushList();

        inTable = true;
        tableRows.push(cols);

        return;
      }

      if (isSeparator) {
        return;
      }
    } else {
      flushTable();
    }

    // ========================================
    // DIVIDER
    // ========================================

    if (trimmed === "---") {
      flushList();
      flushTable();

      elements.push(
        <div key={i} className="my-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          <div className="h-px flex-1 bg-border" />
        </div>
      );

      return;
    }

    // ========================================
    // HEADINGS H1-H6
    // ========================================

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);

    if (headingMatch) {
  flushList();

  const level = headingMatch[1].length;
  const text = headingMatch[2];

  const classes = {
    1: "mt-10 mb-8 text-4xl md:text-5xl font-black tracking-tight leading-tight",
    2: "mt-16 mb-6 text-3xl md:text-4xl font-bold tracking-tight",
    3: "mt-10 mb-4 text-2xl font-bold",
    4: "mt-8 mb-3 text-xl font-semibold",
    5: "mt-6 mb-2 text-lg font-semibold",
    6: "mt-5 mb-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground",
  };

  const Tag = `h${level}` as React.ElementType;

  elements.push(
    <Tag
      key={i}
      className={`${classes[level as keyof typeof classes]} text-foreground`}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: formatInline(text),
        }}
      />
    </Tag>
  );

  return;
}

    // ========================================
    // BLOCKQUOTE
    // ========================================

    if (trimmed.startsWith("> ")) {
      flushList();

      elements.push(
        <blockquote
          key={i}
          className="relative my-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.04] px-6 py-5"
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-primary" />

          <p className="text-lg italic leading-8 text-foreground/90">
            <span
              dangerouslySetInnerHTML={{
                __html: formatInline(trimmed.replace("> ", "")),
              }}
            />
          </p>
        </blockquote>
      );

      return;
    }

    // ========================================
    // UNORDERED LIST
    // ========================================

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }

      listItems.push(
        <li
          key={i}
          className="flex gap-3 leading-7 text-muted-foreground"
        >
          <div className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />

          <span
            dangerouslySetInnerHTML={{
              __html: formatInline(
                trimmed.replace(/^[-*]\s/, "")
              ),
            }}
          />
        </li>
      );

      return;
    }

    // ========================================
    // ORDERED LIST
    // ========================================

    if (/^\d+\./.test(trimmed)) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }

      listItems.push(
        <li
          key={i}
          className="pl-1 leading-7 text-muted-foreground marker:font-bold marker:text-accent"
        >
          <span
            dangerouslySetInnerHTML={{
              __html: formatInline(
                trimmed.replace(/^\d+\.\s*/, "")
              ),
            }}
          />
        </li>
      );

      return;
    }

    // ========================================
    // SHORTCUTS / COMMANDS
    // ========================================

    if (
      /^[A-Z0-9+\-\/\s]+$/.test(trimmed) &&
      trimmed.length <= 40 &&
      !trimmed.includes(".") &&
      trimmed !== ""
    ) {
      flushList();

      elements.push(
        <div
          key={i}
          className="mb-3 mr-2 inline-flex items-center rounded-xl border border-border bg-muted px-3 py-2 font-mono text-sm font-medium text-foreground shadow-sm"
        >
          {trimmed}
        </div>
      );

      return;
    }

    // ========================================
    // EMPTY LINE
    // ========================================

    if (trimmed === "") {
      flushList();
      return;
    }

    // ========================================
    // PARAGRAPH
    // ========================================

    flushList();

    elements.push(
      <p
        key={i}
        className="mb-6 text-[17px] leading-8 text-muted-foreground"
      >
        <span
          dangerouslySetInnerHTML={{
            __html: formatInline(trimmed),
          }}
        />
      </p>
    );
  });

  // ========================================
  // FINAL FLUSH
  // ========================================

  flushList();
  flushCodeBlock();
  flushTable();

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
