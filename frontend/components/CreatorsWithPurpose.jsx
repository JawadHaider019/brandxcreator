"use client";
import React, { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const CREATOR_TYPES = [
  {
    number: "01",
    title: "The Educator",
    description:
      "They create to inform — breaking down complex topics, teaching new skills, and building awareness. Every post adds value.",
    bg: "bg-teal-900 text-white",
    numberBg: "bg-white text-teal-900",
    arrowColor: "text-white",
    rotate: "-rotate-3",
  },
  {
    number: "02",
    title: "The Entertainer",
    description:
      "They connect through joy. From humor to storytelling, their content sparks emotion and reminds us to feel something real.",
    bg: "bg-teal-800 text-white",
    numberBg: "bg-white text-teal-800",
    arrowColor: "text-white",
    rotate: "rotate-2",
  },
  {
    number: "03",
    title: "The Explorer",
    description:
      "Driven by curiosity, they uncover ideas, cultures, tools, and experiences. Their content invites the audience into discovery.",
    bg: "bg-teal-700 text-white",
    numberBg: "bg-white text-teal-700",
    arrowColor: "text-white",
    rotate: "-rotate-2",
  },
  {
    number: "04",
    title: "The Visionary",
    description:
      "They see what others don’t. Their content inspires, challenges norms, and sparks new ways of thinking for their audience.",
    bg: "bg-teal-600 text-white",
    numberBg: "bg-white text-teal-600",
    arrowColor: "text-white",
    rotate: "rotate-3",
  },
];

export default function CreatorsWithPurpose() {
  const cardsRef = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <section className="w-full bg-white text-black py-24 px-6 md:px-20">
      {/* Section Heading – Hero-style */}
      <div ref={headingRef} className="mb-20 text-center flex flex-col items-center justify-center">
        <h1 className="text-7xl font-extrabold text-black uppercase leading-none tracking-tighter text-center">
          Creators With <span className="text-holo" style={{ WebkitTextStroke: "1.5px black" }}>Purpose</span>
        </h1>
        <p className="mt-6 text-gray-800 max-w-2xl text-base md:text-lg text-center">
          Not every post is for the algorithm. Some are built for impact. BrandXCreator champions creators who lead with intention and authenticity.
        </p>
      </div>
      {/* Grid of Floating Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {CREATOR_TYPES.map((item, idx) => (
          <div
            key={idx}
            ref={el => (cardsRef.current[idx] = el)}
            className={`relative rounded-2xl p-7 min-h-[280px] flex flex-col justify-between shadow-xl transform hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition duration-300 ease-in-out ${item.bg} ${item.rotate}`}
          >
            <div className="flex items-start justify-between mb-6">
              <span className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-base ${item.numberBg}`}>{item.number}</span>
              <ArrowUpRight className={`w-6 h-6 ${item.arrowColor}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-2">{item.title}</h3>
              <p className="opacity-80 text-sm md:text-base leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
