"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const marqueeRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation
      gsap.fromTo(
        marqueeRef.current,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 30,
          repeat: -1,
          ease: "none",
        }
      );

      // Scroll reveal
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
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

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black overflow-hidden border-t border-white/10 py-10 px-6 md:px-20"
    >
      <div
        ref={marqueeRef}
        className="whitespace-nowrap flex text-white font-bold text-8xl tracking-tight uppercase"
      >
        <span className="px-10">
          Creators win. Brands grow. Fast PKR payouts.
        </span>
        <span className="px-10">
          Creators win. Brands grow. Fast PKR payouts.
        </span>
      </div>
    </section>
  );
}
