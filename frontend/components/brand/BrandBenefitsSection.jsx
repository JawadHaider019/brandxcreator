"use client";
import React from "react";

const Benefits = [
  {
    number: "01",
    title: "Authentic Brand Storytelling",
    description: [
      "Creators craft content that feels real — not ads, but stories. Audiences trust their favorite influencers, and that trust becomes your brand equity.",
    ]
  },
  {
    number: "02",
    title: "Access to Engaged Audiences",
    description: [
      "Tap into existing communities across platforms like Instagram, YouTube, and TikTok. Reach audiences that are already listening, liking, and sharing.",
    ]
  },
  {
    number: "03",
    title: "Cost-Effective Campaigns",
    description:[
      "Influencer marketing often delivers better ROI than traditional ads. Whether you run micro or macro campaigns — you're paying for real engagement.",
    ]
  },
  {
    number: "04",
    title: "Scalable Reach Across Platforms",
    description:[
      "Run unified campaigns across multiple platforms through one system. From Reels to Shorts to Stories, expand your impact without extra overhead.",
    ]
  },
  {
    number: "05",
    title: "Trust & Social Proof",
    description:[
      "People trust people more than ads. When a creator shares your product with authenticity, their endorsement builds immediate credibility.",
    ]
  },
  {
    number: "06",
    title: "Measurable Results & Insights",
    description:[
      "With BrandXCreator, you get live performance dashboards. Track clicks, engagement, content performance, and ROI all in one place.",
    ]
  },
];

  
  // export default function BrandBenefitsSection() {
  //   return (
  //     <section className="w-full bg-black text-white py-24 px-6 md:px-20">
  //       {/* Section Header */}
  //       <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 text-white gap-8 md:gap-0">
  //         <h1 className="text-6xl md:text-8xl font-extrabold uppercase leading-tight tracking-tight text-left mt-8 md:mt-0">
  //           Benefits <br />for <br />
  //           <span className="text-holo" style={{ WebkitTextStroke: "1.5px white" }}>
  //             Brands
  //           </span>
  //         </h1>
  //         <p className="text-base md:text-lg text-white/80 tracking-wide max-w-md mt-4 md:mt-0">
  //           Discover the advantages of joining BrandXBrand: personalized campaign matching, real-time analytics, local brand access, and a supportive community. Everything you need to grow, earn, and thrive as a Brand in Pakistan.
  //         </p>
  //       </div>
  //       {/* Benefits List */}
  //       <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-black shadow-xl overflow-hidden divide-y divide-white/10">
  //         {Benefits.map((benefit, idx) => (
  //           <div
  //             key={idx}
  //             className="flex flex-col md:flex-row items-start md:items-center px-6 md:px-12 py-8 md:py-10 gap-4 md:gap-0"
  //           >
  //             {/* Left: Number */}
  //             <div className="flex flex-col items-start justify-start md:w-1/6 w-full text-left">
  //               <span className="text-5xl md:text-6xl font-bold tracking-widest text-white">
  //                 {String(idx + 1).padStart(2, "0")}
  //               </span>
  //             </div>
  //             {/* Center: Title & Description */}
  //             <div className="flex-1 flex flex-col justify-center md:w-5/6 w-full pl-0 md:pl-4 md:pr-8 min-h-[60px]">
  //               <span className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-left w-full mb-2">
  //                 {benefit.title}
  //               </span>
  //               <div className="w-full flex flex-col gap-2 mt-1">
  //                 {benefit.description.map((desc, i) => (
  //                   <p
  //                     key={i}
  //                     className="text-white/80 text-base md:text-lg leading-relaxed"
  //                   >
  //                     {desc}
  //                   </p>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </section>
  //   );
  // }
  export default function BrandBenefitsSection() {
      return (
        <section className="w-full bg-black text-white py-24 px-10">
          <div className=" mx-auto flex flex-col gap-20">
            {/* Section Heading */}
            <div className="text-center">
              <h2 className="text-8xl font-extrabold uppercase tracking-tight mb-4">
                Influencer <span className="text-holo" style={{ WebkitTextStroke: "1.5px #fff" }}>Marketing</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                Influencer marketing isn’t just a trend — it’s a shift. Reach your audience through relatable voices and build trust through real content.
              </p>
            </div>
    
            {/* Benefit Blocks */}
            {Benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16"
              >
                {/* Outlined Number */}
                <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
                  <span
                    className="text-[8rem] md:text-[12rem] font-extrabold text-transparent leading-none select-none"
                    style={{ WebkitTextStroke: "2px #444" }}
                  >
                    {benefit.number}
                  </span>
                </div>
    
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-3xl md:text-5xl font-bold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }