"use client";

import React, { useState } from "react";

const PROJECTS = [
  {
    name: "Versace Fragrance",
    location: "Corsica, France 2023",
    image: "/feature-img2.png",
  },
  {
    name: "Hermès Ski",
    image: "/feature-bg.jpeg",
  },
  {
    name: "Dior Rouge",
    image: "/public/facebook.jpeg",
  },
  {
    name: "Vogue The Independents",
    image: "/public/Instagram.jpeg",
  },
];

export default function PortfolioShowcaseSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full flex justify-center items-center py-24 bg-white">
      <div className="relative w-full max-w-5xl min-h-[600px] bg-white rounded-3xl border-2 border-black/80 flex flex-col md:flex-row overflow-hidden shadow-xl">
        {/* Left: Project List */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 gap-2">
          <div className="flex flex-col gap-2">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.name}
                onClick={() => setActive(idx)}
                className={`text-left transition font-sans ${
                  idx === active
                    ? "text-black font-bold text-2xl"
                    : "text-black/30 font-semibold text-xl hover:text-black/60"
                }`}
              >
                {proj.name}
                {idx === 0 && (
                  <span className="ml-2 text-xs font-light text-black/40 uppercase">{proj.location}</span>
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Right: Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-2 py-8 pr-8">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.name}
              className={`rounded-xl overflow-hidden h-28 md:h-32 w-full transition-all duration-300 ${
                idx === active ? "opacity-100 scale-100 z-10" : "opacity-40 scale-95"
              }`}
              style={{ boxShadow: idx === active ? "0 4px 24px 0 rgba(0,0,0,0.08)" : "none" }}
            >
              <img
                src={proj.image}
                alt={proj.name}
                className="object-cover w-full h-full transition-all duration-300"
                style={{ filter: idx === active ? "none" : "grayscale(80%) blur(1px)" }}
              />
            </div>
          ))}
        </div>
        {/* Border radius corners (optional for extra style) */}
        <div className="absolute top-0 left-0 w-6 h-6 bg-white rounded-tl-3xl border-l-2 border-t-2 border-black/80" />
        <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-tr-3xl border-r-2 border-t-2 border-black/80" />
        <div className="absolute bottom-0 left-0 w-6 h-6 bg-white rounded-bl-3xl border-l-2 border-b-2 border-black/80" />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-br-3xl border-r-2 border-b-2 border-black/80" />
      </div>
    </section>
  );
} 