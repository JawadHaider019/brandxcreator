"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  textRevealAnimation, 
  slideInAnimation, 
  scaleAnimation, 
  floatingAnimation,
  fadeInAnimation
} from "@/lib/animation";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function CreatorInviteSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headlineRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const floatingImageRef = useRef(null);

  useEffect(() => {
    // Main image fade in
    fadeInAnimation(imageRef.current, {
      delay: 0.2,
      duration: 1.5,
      trigger: sectionRef.current
    });

    // Headline text reveal
    textRevealAnimation(headlineRef.current, {
      direction: 'up',
      delay: 0.4,
      duration: 1,
      trigger: sectionRef.current
    });

    // Description text reveal
    textRevealAnimation(textRef.current, {
      direction: 'up',
      delay: 0.6,
      duration: 1,
      trigger: sectionRef.current
    });

    // Button scale animation
    scaleAnimation(buttonRef.current, {
      delay: 0.8,
      duration: 0.8,
      trigger: sectionRef.current
    });

    // Floating image animation
    floatingAnimation(floatingImageRef.current, {
      delay: 1,
      duration: 2,
      trigger: sectionRef.current
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-100vw h-100vh flex items-center justify-sp py-5 ">
<div className=" flex ml-30 relative">
  {/* Main Image */}
  <Image
    ref={imageRef}
    src="/feature-bg.jpeg"
    alt="Featured Creators"
    width={400}
    height={500}
    className="z-10 object-cover relative"
  />

  {/* Teal Overlay */}
  <div  className="absolute inset-0 bg-teal-900/70 z-20 mix-blend-multiply"></div>
</div>
 <div className="flex-1 flex flex-col justify-center items-start mx-30 ">
   <h2 
     ref={headlineRef}
     className="text-3xl md:text-7xl font-extrabold uppercase leading-tight tracking-tight mb-2 text-black"
   >
     THE CREATOR <span className="text-holo"  style={{ WebkitTextStroke: "1px black" }}> ERA STARTS HERE</span>
   </h2>
   
   <p 
     ref={textRef}
     className="text-sm md:text-base max-w-sm mt-25 text-black"
   >
     BrandXCreator is where bold voices and original content finally get the platform they deserve.
     Join the new wave of Pakistani creators building real communities and earning on their own terms.
   </p>
   <Button 
     ref={buttonRef}
     variant="secondary" 
     size="lg" 
     className="mt-8"
   >
     Join the Movement
   </Button>
 </div>
 <div >
   <Image 
     ref={floatingImageRef}
     src="/feature-img1.png" 
     alt="Creator 1" 
     width={450} 
     height={450} 
     className="rotate-350 absolute z-20 top-20 left-60" 
   />
   {/* <Image src="/feature-img2.png" alt="Creator 2" width={250} height={250} className="rotate-340 absolute bottom-[-10px] left-[-10px] z-20" /> */}
 </div>


    </section>
    
  );
}