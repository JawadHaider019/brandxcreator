"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutIntroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".fade-in"), {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-black flex flex-col items-center justify-center pt-5 px-4 md:px-0"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 pt-12 rounded-2xl bg-white shadow-sm">
        {/* Main Content */}
        <div className="fade-in w-full flex flex-col gap-10 p-8">
          <h1 className="text-9xl font-extrabold uppercase tracking-tight">About <span className="text-holo" style={{WebkitTextStroke: "1.5px black"}}>Us</span></h1>

          {/* Mission Section */}
          <div>
            <h2 className="font-bold text-lg mb-4 uppercase tracking-wide">Values & Mission</h2>
            <div className="w-full flex flex-col md:flex-row gap-6">
              <p className="w-full md:w-1/2 text-black/80 text-base leading-relaxed">
                We’re a creative ecosystem connecting Pakistani creators and brands through campaigns, strategy, and support. Built for growth, trust, and transparency — so everyone can tell their story and earn from it.
              </p>
              <p className="w-full md:w-1/2 text-black/80 text-base leading-relaxed">
                We promote a positive, inclusive message through our content and community. Our goal is to inspire, support, and empower creators to make an impact and live confidently.
              </p>
            </div>
          </div>

          {/* Audience Section */}
      <div className="flex flex-row w-full gap-4">
      <div className="flex flex-col gap-4 mt-6 w-1/2">
            <h2 className="font-bold text-lg uppercase tracking-wide">Audience</h2>
            <div className="text-black/80 text-base leading-relaxed space-y-1">
              <div><span className="font-semibold">Age Range:</span> 18–60</div>
              <div><span className="font-semibold">Gender:</span> 70% Female, 30% Male</div>
              <div><span className="font-semibold">Location:</span> Pakistan, GCC, UK</div>
              <div><span className="font-semibold">Interests:</span> Fashion, beauty, wellness, lifestyle, tech</div>
            </div>

              {/* Quote Section */}
          <div className="p-6 border-t-2 border-b-2 border-teal-800 mt-10">
            <p className="italic text-4xl font-light text-black/60 ">
              “Our work is driven by a passion for creativity & authenticity. We aim to inspire others to live confidently and make mindful choices.”
            </p>
            <div className="text-sm text-teal-900 font-semibold mt-5">— BrandXCreator Team</div>
          </div>
          </div>

          {/* Social Stats Card (Centered Below) */}
          <div className="w-1/2 fade-in flex justify-center py-10">
          <div className="backdrop-blur-lg  bg-gradient-to-br from-teal-900 to-black text-white w-[350px] h-[450px] rounded-2xl py-8 px-2">
  <h3 className="text-2xl font-bold uppercase tracking-wide my-6  text-center">
    Our Reach
  </h3>

  <div className="grid grid-cols-2 gap-8">
    {[
      ["Instagram", "40.2K"],
      ["YouTube", "25.8K"],
      ["TikTok", "89.1K"],
      ["Facebook", "17.5K"],
      ["SnapChat", "50.4K"],
      ["Total Creators", "500+"],
    ].map(([label, stat], index) => (
      <div
        key={index}
        className="flex flex-col items-center text-center"
      >
        <span className="uppercase text-sm  ">{label}</span>
        <span className="text-3xl font-bold ">{stat}</span>
      </div>
    ))}
  </div>
</div>

          </div>
      </div>

        </div>
      </div>
    </section>
  );
}
