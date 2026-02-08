import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import FeatureSection from "@/components/FeatureSection";
import FeatureSectionn from "@/components/FeatureSectionn";
import OurNetworkSection from "@/components/OurNetworkSection";
import CreatorsWithPurpose from "@/components/CreatorsWithPurpose";
import WhyChooseUs from "@/components/WhyChooseUs";
import AppPromotionSection from "@/components/AppPromotionSection";

import StarsSection from "@/components/StarsSection";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <WelcomeSection/> 
   <FeatureSection />
   <FeatureSectionn />
   <OurNetworkSection />
   <CreatorsWithPurpose />
   <StarsSection />
   <WhyChooseUs/>
   <AppPromotionSection/>
    </main>
  );
}
