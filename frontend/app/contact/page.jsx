import BannerSection from "@/components/BannerSection";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import EmpowerCreatorsSection from "@/components/contact/EmpowerCreatorsSection";
export default function ContactPage() {
  return (
    <>
      <BannerSection
        mainTitle="Contact"
        title="Let's Talk"
        subtitle="We’re ready to collaborate. Drop us a line."
        bgImage="/hero-bg.avif"
        showButton={false}
        buttonLabel="Start Conversation"
        buttonLink="/contact/form"
      />
      <ContactInfoSection/>
      <EmpowerCreatorsSection/>
    </>
  );
}
