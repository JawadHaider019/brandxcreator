"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function AppPromotionSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="-mt-[100vh]"></div>
    <section className="w-full bg-white text-black py-16 md:py-28 px-4 md:px-20 relative overflow-hidden">
        
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12"
      >
        {/* Left-Top: Heading */}
        <div className="self-start justify-self-start order-1 lg:order-1">
          <h2 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase leading-tight tracking-tight">
            Let's <span className="text-holo" style={{WebkitTextStroke:"1.5px black"}}>Work Together</span>
          </h2>
        </div>

        {/* Center: Phone Mockup */}
        <div className="flex justify-center items-center order-2 lg:order-2">
          <img
            src="/mobile.png"
            alt="BrandXCreator App Mobile Mockup"
            className="w-[250px] h-[500px] md:w-[300px] md:h-[600px] object-contain"
          />
        </div>

        {/* Right: Content */}
        <div className="self-center justify-self-start order-3 lg:order-3">
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
              Download Our App
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Get the BrandXCreator app to manage campaigns, track performance, and connect with brands on the go. Available for iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="default" className="w-full sm:w-auto">
                Download for iOS
              </Button>
              <Button variant="secondary" size="default" className="w-full sm:w-auto">
                Download for Android
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              * App coming soon. Join our waitlist to be notified when it launches.
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
