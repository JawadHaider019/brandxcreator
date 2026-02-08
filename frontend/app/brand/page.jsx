import BannerSection from "@/components/BannerSection";
import BrandInfoSection from "@/components/Brand/BrandInfoSection";
import BrandBenefitsSection from "@/components/Brand/BrandBenefitsSection";
// import OurNetworkEditorial from "@/components/brand/BrandPlatformSection";
import BrandPlatformSection from "@/components/brand/BrandPlatofromSection";

export default function ContactPage() {
  return (
    <>
      <BannerSection
        mainTitle="For Brand"
        title="Let's Talk"
        subtitle="At BrandXBrand, we don’t just manage Brands — we elevate them. From refining your content to landing brand deals, we empower you to grow and earn on your terms."
        bgImage="/hero-bg.avif"
        showButton={false}
        buttonLabel="Start Conversation"
        buttonLink="/contact/form"
      />

      <BrandInfoSection/>
      <BrandPlatformSection/>
      <BrandBenefitsSection/>
     
    </>
  );
}
