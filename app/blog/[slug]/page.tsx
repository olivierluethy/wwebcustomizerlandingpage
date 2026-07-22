import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Chrome } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";
import { ThemeDownloadButton } from "@/components/theme-download-button";
import { PostInstallBanner } from "@/components/post-install-banner";
import { BlogContent } from "@/components/blog-content";
import { InstallCtaButton } from "@/components/install-cta-button";
import { BlogInstallCTA } from "@/components/blog-install-cta";
import { BlogStickyBar } from "@/components/blog-sticky-bar";
import { RelatedPosts } from "@/components/related-posts";
import { ExtensionFeatureCard } from "@/components/extension-feature-card";
import { ThemePreview } from "@/components/landing/hero/theme-preview";
import { getThemeForPost, type PreviewTheme } from "@/lib/themes";
import { INSTALL_BUTTON_LABEL } from "@/lib/install-cta-copy";
import {
  getRelatedPosts,
  getRelatedHeading,
  getTopicForSlug,
} from "@/lib/blog-topics";

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

function renderMarkdown(
  content: string,
  postSlug: string,
  previewTheme: PreviewTheme | null
) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];

  // The "what our extension does" card + the sticky-bar sentinel are injected
  // once, immediately before the post's first H2 — i.e. at the end of the
  // intro. Doing it here rather than in the page body means placement follows
  // each post's actual structure instead of a guessed character offset.
  const postTopic = getTopicForSlug(postSlug);
  let introBreakRendered = false;
  const renderIntroBreak = () => {
    if (introBreakRendered) return;
    introBreakRendered = true;
    elements.push(
      // On posts that publish a theme, the live preview replaces the feature
      // card: it makes the same point — here is what this does — but with the
      // reader's actual theme instead of a list, and it earns its place because
      // downloads are what correlate with engaged sessions. Stacking both would
      // put two blocks between the intro and the first real section.
      previewTheme ? (
        <div key="theme-preview" className="my-8">
          <ThemePreview theme={previewTheme} postSlug={postSlug} />
        </div>
      ) : (
        <ExtensionFeatureCard key="feature-card" topic={postTopic} />
      ),
      // Watched by BlogStickyBar: the bar stays hidden until this scrolls out
      // of view above the viewport, so a reader who bounces never sees it.
      <div key="sticky-sentinel" data-sticky-sentinel aria-hidden="true" />
    );
  };

  // On posts that offer theme downloads, the install CTA must appear (and
  // dominate) ABOVE the first download button — a theme JSON is useless without
  // the extension. We inject the prominent banner right before the first one.
  let firstDownloadRendered = false;

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
        className="my-10 overflow-hidden rounded-2xl border border-border bg-card max-md:rounded-lg max-md:border-[0.5px] max-md:border-white/[0.08]"
      >
        <div className="overflow-x-auto max-md:[-webkit-overflow-scrolling:touch] max-md:[mask-image:linear-gradient(to_right,black_85%,transparent_100%)]">
          <table className="w-full border-collapse max-md:min-w-[500px] max-md:text-[13px]">
            <thead className="bg-muted/40">
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className={`border-b border-border px-5 py-4 text-left text-sm font-bold text-foreground max-md:px-3 max-md:py-2.5 max-md:text-[12px] max-md:whitespace-nowrap${idx === 0 ? " max-md:min-w-[110px]" : ""}`}
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
                      className={`px-5 py-4 align-top text-sm leading-7 text-muted-foreground max-md:px-3 max-md:py-2.5 max-md:text-[13px]${cellIdx === 0 ? " max-md:min-w-[110px] max-md:font-medium" : ""}`}
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
    // INLINE INSTALL CTA
    // Marker: [[install-cta topic="fonts"]]   (topic optional)
    //
    // Placed after the inCodeBlock guard above, so the syntax can be written
    // inside a fenced block when documenting it without rendering a CTA.
    // ========================================

    const installCtaMatch = trimmed.match(
      /^\[\[install-cta(?:\s+topic="([A-Za-z0-9_-]+)")?\]\]$/
    );

    if (installCtaMatch) {
      flushList();
      flushTable();

      elements.push(
        <BlogInstallCTA
          key={`install-cta-${i}`}
          topic={installCtaMatch[1]}
          postSlug={postSlug}
        />
      );

      return;
    }

    // ========================================
    // THEME DOWNLOAD BUTTON
    // Marker: **[⬇ Download <Name>.json]**  (replaces the old download slots)
    // ========================================

    const downloadMatch = trimmed.match(
      /^\*\*\[[^\]]*Download\s+([A-Za-z0-9_-]+)\.json\]\*\*$/
    );

    if (downloadMatch) {
      flushList();
      flushTable();

      if (!firstDownloadRendered) {
        elements.push(
          <PostInstallBanner key={`install-banner-${i}`} postSlug={postSlug} />
        );
        firstDownloadRendered = true;
      }

      elements.push(
        <ThemeDownloadButton
          key={i}
          themeName={downloadMatch[1]}
          postSlug={postSlug}
        />
      );

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

  // End of the intro: everything before the first H2 is the intro by
  // convention in these posts. H1 is the title, so it doesn't count.
  if (level === 2) renderIntroBreak();

  const classes = {
    1: "mt-10 mb-8 text-4xl md:text-5xl font-black tracking-tight leading-tight max-md:text-[28px] max-md:leading-[1.25] max-md:tracking-[-0.2px] max-[480px]:text-[24px]",
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

  // Posts with no H2 at all (a few short changelog entries) still need the card
  // and sentinel, or the sticky bar would never appear on them.
  renderIntroBreak();

  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Computed on the server at build time. Only {slug, title, readTime} crosses
  // into the client component below — importing the post corpus from a client
  // component would ship ~756K of markdown to every reader.
  // Read from disk at build time; only this post's theme vars cross to the
  // client, not all 45 theme files.
  const previewTheme = getThemeForPost(post.slug);
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const relatedHeading = getRelatedHeading(post.slug);

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
            <BlogContent postSlug={post.slug}>
              {renderMarkdown(post.content, post.slug, previewTheme)}
            </BlogContent>

            {/* Blog-post CTA block */}
            <div
              className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
              style={{
                background: "#0d1117",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "28px 32px",
                marginTop: "48px",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#e6edf3",
                    marginBottom: "6px",
                  }}
                >
                  Customize WhatsApp Web while you&apos;re at it.
                </h3>
                <p style={{ fontSize: "14px", color: "#8b949e" }}>
                  Free Chrome extension. No account. No data collected.
                </p>
              </div>

              <InstallCtaButton
                location="blog_footer_cta"
                postSlug={post.slug}
                className="inline-flex items-center gap-2"
                style={{
                  background: "#4ade80",
                  color: "#0d1117",
                  border: "none",
                  borderRadius: "8px",
                  padding: "11px 20px",
                  fontSize: "14px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                <Chrome className="h-4 w-4" />
                {INSTALL_BUTTON_LABEL}
              </InstallCtaButton>
            </div>

            <RelatedPosts heading={relatedHeading} posts={relatedPosts} />

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

      <BlogStickyBar postSlug={post.slug} />

      <Footer />
    </>
  );
}
