import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Impact } from "@/components/landing/impact";
import { Problems } from "@/components/landing/problems";
import { Solution } from "@/components/landing/solution";
import { FeatureValue } from "@/components/landing/feature-value";
import { VisualDemo } from "@/components/landing/visual-demo";
import { CTA } from "@/components/landing/cta";
import { Community } from "@/components/landing/community";
import { BlogPreview } from "@/components/landing/blog-preview";
import { Footer } from "@/components/landing/footer";
import { ScrollTracker } from "@/components/landing/scroll-tracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ScrollTracker />
      <Hero />
      <SocialProof />
      <Impact />
      <Problems />
      <Solution />
      <FeatureValue />
      <VisualDemo />
      <CTA />
      <Community />
      <BlogPreview />
      <Footer />
    </main>
  );
}
