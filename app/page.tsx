import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Problems } from "@/components/landing/problems";
import { Solution } from "@/components/landing/solution";
import { CTA } from "@/components/landing/cta";
import { Community } from "@/components/landing/community";
import { BlogPreview } from "@/components/landing/blog-preview";
import { Footer } from "@/components/landing/footer";
import { ScrollTracker } from "@/components/landing/scroll-tracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollTracker />
      <Hero />
      <SocialProof />
      <Problems />
      <Solution />
      <Community />
      <BlogPreview />
      <CTA />
      <Footer />
    </main>
  );
}
