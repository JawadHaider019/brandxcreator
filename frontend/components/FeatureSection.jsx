"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

const leftParagraphs = [
  "From Karachi to Islamabad, Lahore to Peshawar  Pakistani creativity is everywhere but undervalued. Algorithms miss the local context, opportunities are scattered and often exploitative.",
  "BrandXCreator changes this. We're building a platform that truly understands Pakistani creators valuing local talent, connecting authentic voices with meaningful opportunities, ensuring fair pay and respectful partnerships.",
  "This isn't just influencer marketing. It's about empowering Pakistan's creative economy to shine globally with the right tools and support."
];

const rightParagraphs = [
  "Pakistani creators are turning everyday moments into viral movements through reels, vlogs, tutorials, poetry, and education. Yet their talent often goes unseen and unpaid.",
  "BrandXCreator creates a home where creators rise on merit, not algorithms. Where you succeed by staying true to your style, with opportunities accessible beyond the top 1%.",
  "No fame required. Just real influence, real income, and a real path forward — built for Pakistani creators by those who believe in them."
];
  return (
    <>
      <div style={{ height: "10vh" }}></div>
      <section
        ref={sectionRef}
        className="w-full min-h-[60vh] flex flex-col md:flex-row py-10 items-center md:items-stretch px-4 md:px-0"
      >
        {/* Left: Bold Headline, wider */}
        <div className="flex-[3] flex items-center justify-center bg-gradient-to-br from-teal-900 to-black p-4 md:p-0 w-full">
          {/* Rotated headline only on md+ */}
          <div
            className="text-9xl font-bold uppercase font-oswald bg-clip-text text-transparent hidden md:inline-block"
            style={{
              transform: "rotate(-90deg)",
              lineHeight: 1,
              backgroundImage: "url('/hero-bg.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <h1>
            <span style={{ display: "block" }}>NOW, IT'S</span>
            <span style={{ display: "block" }}>TIME TO</span>
            <span style={{ display: "block" }}>RISE AND</span>
            <span style={{ display: "block" }}>SHINE.</span>
            </h1>
          </div>
          
         
        </div>

        {/* Right: Text content */}
        <div className="flex-[2] bg-white p-4 md:p-12 flex flex-col justify-center w-full max-w-xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            {/* Left paragraphs */}
            <div className="space-y-4 md:space-y-6">
              {leftParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-300 my-6 md:my-8"></div>

            {/* Right paragraphs */}
            <div className="space-y-4 md:space-y-6">
              {rightParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
