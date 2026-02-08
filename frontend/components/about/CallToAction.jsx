    "use client";

    import React, { useRef, useEffect } from "react";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    export default function CallToAction() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        const textWidth = textRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollLength = textWidth - viewportWidth + 64;
        gsap.to(textRef.current, {
            x: () => -scrollLength,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${scrollLength}`,
                pin: false,
                scrub: 1,
                anticipatePin: 1,
            },
        });
        
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
        ref={sectionRef}
        className="w-full bg-black text-white relative overflow-hidden h-[180px] flex items-center border-t border-black/20"
        >
        <div
            ref={textRef}
            className="whitespace-nowrap font-extrabold uppercase text-[12vw] md:text-[8vw] tracking-tighter select-none px-8"
            style={{ lineHeight: 1, letterSpacing: '-0.04em' }}
        >
            CREATORS. BRANDS. STORIES. IMPACT. REACH. GROWTH. CREATORS. BRANDS. STORIES. IMPACT. REACH. GROWTH.
        </div>
        </section>
    );
    }
