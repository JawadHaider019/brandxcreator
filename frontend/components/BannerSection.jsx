"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function BannerSection({
  mainTitle = "Main Title",
  title = "Page Title",
  subtitle = "Subtitle goes here...",
  bgImage = "/hero-bg.avif",
  showButton = true,
  buttonLabel = "Get in Touch",
  buttonLink = "/contact",
}) {
  const mainTitleRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const elements = [mainTitleRef.current, titleRef.current, subtitleRef.current];
    if (showButton) elements.push(buttonRef.current);

    gsap.set(elements, { opacity: 0, y: 50 });
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out",
    });
  }, [showButton]);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
        
        {/* Main Title with half underline */}
        <h1
          ref={mainTitleRef}
          className="text-holo relative text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-white pb-4"
        >
          {mainTitle}
          {/* Half Underline — more premium with gradient + slight hover */}
          <span className="absolute left-1/4 bottom-0 w-1/2 h-[4px] bg-white transition-all duration-500"></span>
        </h1>

        {/* Secondary Title */}
        <h2
          ref={titleRef}
          className="text-xl md:text-3xl font-semibold uppercase tracking-widest text-gray-200 mt-6"
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 text-sm md:text-base max-w-2xl text-gray-300 font-mono uppercase tracking-wider leading-relaxed"
        >
          {subtitle}
        </p>

        {/* Conditional CTA Button */}
        {showButton && (
          <Link
            href={buttonLink}
            ref={buttonRef}
            className="mt-8 bg-white text-black px-10 py-4 rounded-full font-mono text-xs uppercase tracking-widest 
            hover:bg-gradient-to-br from-teal-900 to-black  hover:text-white transition-all duration-300 shadow-md"
          >
            {buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
