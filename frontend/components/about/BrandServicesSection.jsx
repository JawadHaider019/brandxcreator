"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".fade-in"), {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
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
      className="w-full bg-white text-black flex flex-col items-center justify-center px-4 md:px-0 py-24 border-t border-black/10"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-20">
        {/* Section Heading */}
        <div className="fade-in w-full text-center mb-8">
          <h2 className="text-8xl  font-extrabold uppercase tracking-tight mb-2">
            Brand <span className="text-holo" style={{WebkitTextStroke:"1.5px black"}}>Services</span>
          </h2>
          <p className="text-black/40 text-base md:text-lg max-w-2xl mx-auto tracking-widest uppercase">
            Campaign Support & Strategy
          </p>
        </div>

        {/* Numbered Grid of Services */}
        <div className="fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15 w-full px-10">
          {[
            {
              title: "Influencer Discovery",
              desc: "Find the perfect creators based on audience data, category alignment, and brand tone — all in one dashboard.",
            },
            {
              title: "Brief & Collaboration",
              desc: "We help you craft clear briefs and creative guidelines to get results that match your brand identity.",
            },
            {
              title: "Content Approval",
              desc: "Review and approve creator content before it goes live. Ensure it’s brand-safe and aligned with goals.",
            },
            {
              title: "Performance Reporting",
              desc: "Get detailed analytics and campaign reports that highlight engagement, reach, and ROI — with insights to scale.",
            },
          ].map(({ title, desc }, index) => (
            <div
              key={index}
              className="flex flex-col items-end justify-start min-h-[340px] border-b-4 border-transparent hover:border-teal-900 transition-colors duration-300 group transform transition-transform hover:-translate-y-2"
            >
              {/* Rotated Number */}
              <div className="flex-shrink-0 flex items-center justify-center md:mr-0 md:mb-0 mb-4 md:mb-0">
                <span className="pb-10 text-7xl font-extrabold text-teal-900 leading-none select-none -rotate-90 md:-rotate-90">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Content */}
              <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left md:pl-4">
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-black">
                  {title}
                </h3>
                <p className="text-black/50 text-sm md:text-base leading-relaxed max-w-xs">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
