import { AnimatedBackground } from "@/components/animated-background"
import { BrandMark } from "@/components/brand-mark"
import { ProfileSection } from "@/components/profile-section"
import { BioSection } from "@/components/bio-section"
import { LinksSection } from "@/components/links-section"
import { FeaturedSection } from "@/components/featured-section"
import { FooterSection } from "@/components/footer-section"

export default function Page() {
  return (
    <main className="relative min-h-dvh w-full">
      <AnimatedBackground />

      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
        <BrandMark />
        <ProfileSection />
        <BioSection />
        <LinksSection />
        <FeaturedSection />
        <FooterSection />
      </div>
    </main>
  )
}
