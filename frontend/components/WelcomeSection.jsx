"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimation } from "@/lib/animation";

export default function WelcomeSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const { animateText, animateStagger } = useGSAPAnimation();

  const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial position
      gsap.set(sectionRef.current, {
        y: 0,
        position: "absolute",
        top: "100vh",
        zIndex: 20
      });

      // Slide-up animation (keeping original since it's complex)
      gsap.fromTo(sectionRef.current, 
        { y: 0 },
        {
          y: -window.innerHeight,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: `+=${window.innerHeight * 0.5}`,
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const easedProgress = easeInOut(progress);
              gsap.set(sectionRef.current, {
                y: -window.innerHeight * easedProgress
              });
            }
          }
        }
      );

      // Text animations using reusable functions
      animateText(headingRef, {
        direction: 'up',
        delay: 0.2,
        duration: 1,
        trigger: sectionRef.current,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse'
      });

      animateText(subtitleRef, {
        direction: 'left',
        delay: 0.4,
        duration: 0.8,
        trigger: sectionRef.current,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse'
      });

      // Stagger animation for banner text
      animateStagger([titleRef, descriptionRef], {
        direction: 'up',
        stagger: 0.2,
        delay: 0.6,
        duration: 0.6,
        trigger: sectionRef.current,
        start: 'top 95%',
        end: 'bottom 5%',
        toggleActions: 'play none none reverse'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [animateText, animateStagger]);

  return (
    <section 
      ref={sectionRef} 
      className="w-full font-mono text-black"
      style={{ 
        willChange: "transform",
        zIndex: 20,
        position: "absolute",
        top: "100vh",
        left: 0,
        right: 0,
        height: "calc(100vh + 80vh)"
      }}
      data-section="welcome"
    >
      {/* Top: White background + BIG heading */}
      <div className="bg-white text-center px-6 pt-15 pb-12">
        <h1
          ref={headingRef}
          className="text-4xl md:text-7xl font-extrabold uppercase tracking-tight leading-tight"
        >
          Welcome to <span className="text-holo" style={{ WebkitTextStroke: "1px black" }}>BrandXCreator</span>
        </h1>
        <p 
          ref={subtitleRef}
          className="mt-2 text-sm uppercase tracking-widest text-gray-800"
        >
          Let's amplify your brand through the power of creators.
        </p>
      </div>

      {/* Banner with overlayed text */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        <Image
          src="/welcome-bg.jpg"
          alt="Influencer Marketing Visual"
          fill
          className="object-cover brightness-[.55]"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center px-6 md:px-20 text-center text-white">
          <div className="max-w-3xl space-y-6">
            <h2 
              ref={titleRef}
              className="text-2xl md:text-4xl font-bold uppercase tracking-wide leading-tight"
            >
              Pakistan's Premier Influencer Marketing Platform
            </h2>
            <div 
              ref={descriptionRef}
              className="space-y-4"
            >
              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                BrandXCreator connects visionary brands with authentic creators. Our growing network
                includes YouTubers, Instagram influencers, bloggers, and digital storytellers across Pakistan's top platforms.
              </p>
              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                We help brands build credibility, and empower creators to turn their passion into income.
                From campaign planning to content collaboration — we make marketing human again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}