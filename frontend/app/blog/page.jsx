import BannerSection from "@/components/BannerSection";
import BlogShowCase from "@/components/blog/BlogShowCase";

export default function BlogPage() {
  return (
    <>
      <BannerSection
        mainTitle="Blog"
        title="Insights & Stories"
        subtitle="Explore strategies, trends, and updates in influencer marketing."
        bgImage="/about-bg.avif"
        showButton={false}
      />

      <BlogShowCase/>

    </>
  );
}
