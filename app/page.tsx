import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Impact } from "@/components/landing/impact";
import { Problems } from "@/components/landing/problems";
import { Solution } from "@/components/landing/solution";
import { FeatureValue } from "@/components/landing/feature-value";
import { CTA } from "@/components/landing/cta";
import { Community } from "@/components/landing/community";
import { BlogPreview } from "@/components/landing/blog-preview";
import { Footer } from "@/components/landing/footer";
import { ScrollTracker } from "@/components/landing/scroll-tracker";
import { StructuredData } from "@/components/StructuredData";
import { getAllPosts } from "@/lib/blog";
import { getHeroTheme } from "@/lib/themes";

export default function Home() {
  // Read here, in the server component, and pass down only what the card shows.
  // BlogPreview is a client component: if it imported the posts itself, all of
  // lib/blog.ts (~756K of markdown) would land in the browser bundle.
  // Read server-side: the hero is a client component, and lib/themes uses fs.
  const heroTheme = getHeroTheme();

  const previewPosts = getAllPosts()
    .slice(0, 3)
    .map(({ slug, title, description, date, readTime }) => ({
      slug,
      title,
      description,
      date,
      readTime,
    }));

  return (
    <main className="min-h-screen bg-background">
      <StructuredData />
      <Navigation />
      <ScrollTracker />
      <Hero theme={heroTheme} />
      <SocialProof />
      <Impact />
      <Problems />
      <Solution />
      <FeatureValue />
      <CTA />
      <Community />
      <BlogPreview posts={previewPosts} />
      <Footer />
    </main>
  );
}
