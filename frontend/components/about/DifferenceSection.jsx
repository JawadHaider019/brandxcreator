"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DifferenceSection() {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const DIFFERENCE_POINTS = [
    "Secure Payments",
    "Verified Profiles",
    "PKR Wallet",
    "Campaign Tools",
    "Smart Contracts",
    "In-App Chat",
    "Templates Ready",
    "Realtime Analytics",
    "Matching Engine",
    "Local Payouts",
    "Manual Review",
    "Scalable Campaigns",
    "Creator Dashboard",
    "Brand Discovery",
    "Auto Reminders",
    "Creator Hub",
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-black min-h-screen border-t border-black/10 border-b  border-black/10 flex items-stretch px-0 py-0"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row h-full min-h-screen">
        {/* Left: Difference List */}
        <div className="w-full md:w-1/2 bg-black border-r border-black/10 flex items-center justify-center py-20 px-6 md:px-12">
          <div className="w-full flex flex-col justify-center items-center gap-3">
            {DIFFERENCE_POINTS.map((point, index) => (
              <div
                key={index}
                className="group relative cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <p
                  className={`font-extrabold uppercase text-center text-4xl tracking-tight font-mono transition-colors duration-300 ${
                    hoveredIndex === index ? "text-teal-700" : "text-white"
                  }`}
                >
                  {point}
                  {hoveredIndex === index && (
                    <span className="inline-block transition-opacity duration-300 opacity-100 pl-2">
                    {" "}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bold Heading */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center relative px-4">
          <h2 className="text-black text-[14vw] md:text-[9vw] leading-none font-extrabold uppercase text-center tracking-tighter">
            What <br /> Makes <br />
            <span className="text-holo" style={{WebkitTextStroke: "1.5px black"}}>Us Different</span>
          </h2>
          <span className="absolute bottom-3 right-1 w-70 text-black/60 text-sm md:text-base ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis dolorum itaque sit eius inventore consequatur corrupti at sunt, tenetur fugiat nemo pariatur temporibus adipisci molestias repellendus ducimus facilis ipsam ullam?  
          </span>
        </div>
      </div>
    </section>
  );
}
