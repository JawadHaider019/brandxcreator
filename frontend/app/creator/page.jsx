import BannerSection from "@/components/BannerSection";
import CreatorInfoSection from "@/components/creator/CreatorInfoSection";
import CreatorBenefitsSection from "@/components/creator/CreatorBenefitsSection";
import CreatorPlatformsSection from "@/components/creator/CreatorPlatformsSection";

export default function ContactPage() {
  return (
    <>
      <BannerSection
        mainTitle="For Creator"
        title="Let's Talk"
        subtitle="At BrandXCreator, we don’t just manage creators — we elevate them. From refining your content to landing brand deals, we empower you to grow and earn on your terms."
        bgImage="/hero-bg.avif"
        showButton={false}
      />
      <CreatorInfoSection/>
     <CreatorPlatformsSection/>
     <CreatorBenefitsSection/>
    </>
  );
}
