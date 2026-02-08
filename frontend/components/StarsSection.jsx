  "use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StarsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for staggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
        },
      });
      tl.from(headingRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 0.9,
        ease: "power2.out",
      })
        .from(
          subtextRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          imageRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.97,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-white pt-10 px-6 md:px-20 flex flex-col items-center"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="text-8xl font-bold uppercase tracking-tight text-center leading-tight mb-6"
      >
        Pakistan’s  <span className="text-holo">Stars</span>
      </h2>

      {/* Sub Text */}
      <p
        ref={subtextRef}
        className="text-white text-sm md:text-base text-center mb-12"
      >
        A growing network of top influencers — trusted, verified, and ready to collaborate with your brand.
      </p>

      {/* Big Image */}
      <div className="w-full  overflow-hidden">
        <img
          ref={imageRef}
          src="./Pakistani Influncer.png"
          alt="Top Influencers"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
}
