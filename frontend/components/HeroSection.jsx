"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGSAPAnimation } from "@/lib/animation";
import { posts } from "@/lib/data/blogs";

export default function HeroSection() {
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonRef = useRef(null);
  const blogCardRef = useRef(null);


  const { 
    animateBackgroundZoom, 
    animateHeadlineSlideUp,
    animateSubtextSlideRight,
    animateButtonSlideLeftWithScale,
    animateBlogCardSlideUpWithScale,
    animateBlogCardFloating 
  } = useGSAPAnimation();

  useEffect(() => {
    // Background zoom effect
    animateBackgroundZoom(document.querySelector("img"), {
      delay: 0,
      duration: 1.5,
      ease: "power2.out",
      initialScale: 1.1,
      finalScale: 1,
      initialOpacity: 0.8,
      finalOpacity: 1
    });

    // Headline animation
    animateHeadlineSlideUp(headlineRef, {
      delay: 0,
      duration: 1,
      ease: "power3.out",
      yOffset: 100
    });

    // Subtext animation
    animateSubtextSlideRight(subtextRef, {
      delay: 0.4,
      duration: 0.8,
      ease: "power2.out",
      xOffset: 60
    });

    // Button animation
    animateButtonSlideLeftWithScale(buttonRef, {
      delay: 0.6,
      duration: 0.7,
      ease: "power2.out",
      xOffset: -100,
      initialScale: 0.8
    });

    // Blog card animation
    animateBlogCardSlideUpWithScale(blogCardRef, {
      delay: 0.8,
      duration: 0.8,
      ease: "power2.out",
      yOffset: 60,
      initialScale: 0.9
    });

    // Floating animations
    animateBlogCardFloating(blogCardRef, {
      delay: 1,
      duration: 2.5,
      ease: "power2.inOut",
      yOffset: -8
    });

  }, [
    animateBackgroundZoom, 
    animateHeadlineSlideUp,
    animateSubtextSlideRight,
    animateButtonSlideLeftWithScale,
    animateBlogCardSlideUpWithScale,
    animateBlogCardFloating
  ]);
  

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black" style={{ zIndex: 1 }}>
      <Image
        src="/hero-bg.avif"
        alt="Hero Background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/50" style={{ zIndex: 2 }}></div>

      {/* Main Headline - Responsive */}
      <h1
        ref={headlineRef}
        className="absolute top-20 md:top-25 left-4 md:left-16 text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold text-white uppercase leading-none tracking-tighter max-w-xs sm:max-w-md md:max-w-none"
        style={{ zIndex: 10 }}
      >
        Power <br /> your <br /> <span className="text-holo">Marketing</span>
      </h1>

      {/* Subtext - Responsive */}
      <p
        ref={subtextRef}
        className="absolute bottom-20 md:bottom-10 right-4 md:right-10 text-white font-mono text-xs uppercase tracking-widest leading-relaxed max-w-60 md:max-w-80 text-right"
        style={{ zIndex: 10 }}
      >
        The new era of marketing belongs to creators.
        We connect visionary brands with authentic voices to shape culture and drive growth.
      </p>

      {/* Button - Responsive */}
      <div
        ref={buttonRef}
        className="absolute bottom-10 left-4 md:left-16"
        style={{ zIndex: 10 }}
      >
        <Button asChild variant="primary" size="default" className="text-sm md:text-base">
          <Link href="/about">
            See How It Works
          </Link>
        </Button>
      </div>

      {/* Blog Card - Responsive */}
      <div
        ref={blogCardRef}
        className="absolute top-20 md:top-20 right-4 md:right-5 lg:right-32 w-64 md:w-72 lg:w-80 h-48 md:h-56 lg:h-60 bg-white/10 backdrop-blur-sm border border-white/20 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl transition-all duration-500 hover:bg-white/20 hover:scale-105 group overflow-hidden hidden sm:block"
        style={{ zIndex: 20 }}
      >
        <div className="flex flex-col gap-3 md:gap-4  text-right relative h-full">
          <span className="text-xs uppercase font-mono tracking-widest text-gray-300">
            Latest Blogs
          </span>
          <div className="flex flex-col gap-2  overflow-y-auto pr-2 h-32 md:h-48 lg:h-64 custom-scrollbar">
            {posts.slice(0, 10).map((post, idx) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="text-white text-xs md:text-sm font-semibold hover:text-teal-300 transition-all duration-300 hover:translate-x-1 transform line-clamp-2"
              >
                {idx + 1}. {post.title} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}