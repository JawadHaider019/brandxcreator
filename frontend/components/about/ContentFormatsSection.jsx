"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContentFormatsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollLength, setScrollLength] = useState(0);

  const formats = [
    {
      title: "Instagram Reels",
      desc: "We help creators craft high-performing reels that drive brand visibility and engagement on Instagram.",
      image: "/formats/reels.jpg",
    },
    {
      title: "Stories + Polls",
      desc: "Interactive stories with polls, Q&A, and swipe-ups designed for deep audience interaction and conversion.",
      image: "/formats/stories.jpg",
    },
    {
      title: "Tutorials",
      desc: "Creators deliver clear, engaging how-to content to educate followers and highlight product usage.",
      image: "/formats/tutorials.jpg",
    },
    {
      title: "Product Shoots",
      desc: "Visually compelling photo/video shoots tailored for brand campaigns, shot by influencers with niche aesthetics.",
      image: "/formats/shoots.jpg",
    },
    {
      title: "Unboxing",
      desc: "Authentic unboxing content capturing packaging, reactions, and first impressions — perfect for product launches.",
      image: "/formats/unboxing.jpg",
    },
    {
      title: "Live Streams",
      desc: "Real-time product showcases and creator Q&As that foster trust, drive sales, and create brand buzz.",
      image: "/formats/live.jpg",
    },
  ];

  useEffect(() => {
    const updateScrollLength = () => {
      if (trackRef.current && sectionRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const sectionWidth = sectionRef.current.offsetWidth;
        setScrollLength(trackWidth - sectionWidth + 64);
      }
    };

    updateScrollLength();
    window.addEventListener("resize", updateScrollLength);
    return () => window.removeEventListener("resize", updateScrollLength);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !trackRef.current) return;

      gsap.to(trackRef.current, {
        x: () => -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollLength}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollLength]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-black relative overflow-hidden h-[120vh]"
    >
      <div className="w-full h-full flex flex-row items-center">
        {/* Sticky Left Heading */}
        <div className="flex flex-col justify-center items-start w-[30vw] px-10 sticky left-0 top-0 h-full bg-white z-20">
          <h2 className="text-7xl font-extrabold uppercase tracking-tight mb-4 mr-2">
          Content in Motion
          </h2>
          <p className="text-black/60 text-base md:text-lg max-w-xs leading-relaxed">
            Explore the branded content formats creators deliver with BrandXCreator  all built for engagement, reach, and performance.
          </p>
        </div>

        {/* Horizontal Scroll Cards */}
        <div
          ref={trackRef}
          className="flex flex-row gap-12 ml-10 mb-17  bg-black items-center justify-center"
        >
          {formats.map(({ image, title, desc }, idx) => (
            <div
              key={idx}
              className="relative group w-[350px] h-[500px] rounded-3xl overflow-hidden bg-teal-900 shadow-lg border border-black/10 hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 p-5 text-white z-10">
                <h3 className="text-xl font-bold uppercase tracking-wide mb-1">
                  {title}
                </h3>
                <p className="text-sm text-white/80 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
