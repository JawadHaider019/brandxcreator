    "use client";

    import React, { useRef, useEffect } from "react";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    export default function CreatorServicesSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        gsap.from(sectionRef.current.querySelectorAll(".fade-in"), {
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            },
        });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
        ref={sectionRef}
        className="w-full bg-gradient-to-br from-teal-900 to-black  text-white flex flex-col items-center justify-center px-4 md:px-0 py-24 border-t border-black/10"
        >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-20">
            {/* Section Heading */}
            <div className="fade-in w-full text-center mb-8">
            <h2 className="text-8xl font-extrabold uppercase tracking-tight mb-2">
                Creator <span className="text-holo" style={{WebkitTextStroke:"1.5px white"}}>Services</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto tracking-widest uppercase">
                Our Portfolio of Support
            </p>
            </div>

            {/* Numbered Grid of Services */}
            <div className="fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15 w-full px-10">
            {[
                {
                title: "Profile Optimization",
                desc: "We help you build a strong and professional influencer identity with polished bios, visuals, and positioning.",
                },
                {
                title: "Campaign Matching",
                desc: "Get paired with brands that align with your niche, audience, and content style — backed by real data.",
                },
                {
                title: "Content Strategy",
                desc: "From storytelling to scripting, we guide your creative flow to match campaign goals and audience interests.",
                },
                {
                title: "Growth & Monetization",
                desc: "Earn confidently through sponsorships, paid gigs, and brand deals. We handle negotiations and payments.",
                },
            ].map(({ title, desc }, index) => (
                <div
                key={index}
                className="flex flex-col items-end justify-start min-h-[340px]  border-b-4 border-transparent hover:border-teal-900 transition-colors duration-300 group transform transition-transform hover:-translate-y-2"
                >
                {/* Rotated Number */}
                <div className="flex-shrink-0 flex items-center justify-center md:mr-0 md:mb-0 mb-4 md:mb-0">
                    <span className="pb-10 text-7xl font-extrabold text-teal-900 leading-none select-none -rotate-90 md:-rotate-90">
                    {String(index + 1).padStart(2, "0")}
                    </span>
                </div>
                {/* Content */}
                <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left md:pl-4">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-2 text-white">
                    {title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xs">
                    {desc}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }
