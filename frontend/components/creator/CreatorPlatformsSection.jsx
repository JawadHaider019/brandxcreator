"use client";
import React, { useEffect, useRef, useState } from "react";
import { textRevealAnimation, fadeInAnimation } from "@/lib/animation";

const PLATFORMS = [
  {
    name: "YOUTUBE",
    label: `Video <br />Creators`,
    image: "/youtube.jpeg",
  },
  {
    name: "INSTAGRAM",
    label: `Visual <br />Storytellers`,
    image: "/instagram.jpeg",
  },
  {
    name: "TIKTOK",
    label: `Trend <br />Makers`,
    image: "/tiktok.jpeg",
  },
  {
    name: "SNAPCHAT",
    label: `Moment <br />Sharers`,
    image: "/snapchat.jpeg",
  },
  {
    name: "FACEBOOK",
    label: `Community <br />Builders`,
    image: "/facebook.jpeg",
  },
];

export default function OurNetworkEditorial() {
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const headerRef = useRef(null);
  const subheadRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotlightIdx((prev) => (prev + 1) % PLATFORMS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      textRevealAnimation(headerRef.current, { direction: "up", delay: 0.1, duration: 1 });
    }
    if (subheadRef.current) {
      textRevealAnimation(subheadRef.current, { direction: "up", delay: 0.3, duration: 1 });
    }
    cardRefs.current.forEach((ref, i) => {
      if (ref) {
        fadeInAnimation(ref, { delay: 0.2 + i * 0.15, duration: 0.8 });
      }
    });
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-teal-900 to-black  overflow-hidden">
      {/* Top Header: Split layout */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 text-white">
        {/* Left: Large Subheading */}
        <h2 ref={subheadRef} className="text-2xl md:text-5xl font-bold uppercase tracking-wide max-w-md opacity-0">
        Multi-Platform, <br /> One Mission
        </h2>

        {/* Right: Main Heading */}
        <h1 ref={headerRef} className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tight text-right mt-8 md:mt-0 opacity-0">
        for{" "}
          <span
            className="text-holo"
            style={{ WebkitTextStroke: "1.5px white" }}
          >
           Creators
          </span>
        </h1>
      </div>

      {/* Grid of Profiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-0 px-6 py-10 pb-0 relative text-white">
        {PLATFORMS.map((platform, i) => (
          <div
            key={i}
            ref={el => cardRefs.current[i] = el}
            className={`group flex flex-col items-end space-y-2 relative opacity-0 ${spotlightIdx === i ? 'z-30' : 'z-10'}`}
          >
            {/* Platform Text Block */}
            <div className="text-right leading-tight">
              <p
                className="text-xl font-bold uppercase tracking-wide"
                dangerouslySetInnerHTML={{ __html: platform.label }}
              />
              <h3 className="text-sm uppercase tracking-wider">
                {platform.name}
              </h3>
            </div>

            {/* Image */}
            <img
              src={platform.image}
              alt={platform.name}
              className={`w-full h-[400px] object-cover grayscale transition-all duration-300 ease-in-out
                group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-125
                ${spotlightIdx === i ? "grayscale-0 scale-105 contrast-125 z-10" : ""}
              `}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
