import BannerSection from "@/components/BannerSection";
import DifferenceSection from "@/components/about/DifferenceSection";
import AboutIntroSection from "@/components/about/AboutIntroSection";
import CreatorServicesSection from "@/components/about/CreatorServicesSection";
import BrandServicesSection from "@/components/about/BrandServicesSection";
import ContentFormatsSection from "@/components/about/ContentFormatsSection";
import CallToAction from "@/components/about/CallToAction";

export default function About() {
  return (
    <>
      <BannerSection
        mainTitle="Get TO Know Us"
        title="Gamechanger for Pakistani Content Creators"
        subtitle="We manage creators, we help them grow and earn from their content. We assist companies with their influencer marketing and digital content needs."
        bgImage="/about-bg.avif"
        showButton={false}
      />
 <AboutIntroSection />
      <DifferenceSection />
      <BrandServicesSection />
      <CreatorServicesSection />
      <ContentFormatsSection />
      <CallToAction />
    </>
  );
}
