"use client";
import React from "react";

export default function CreatorInfoSection() {
  return (
    <section className="w-full bg-white text-black py-32 px-4 md:px-20 font-sans">
      <div className="max-w-5xl mx-auto text-center leading-none tracking-tight uppercase">
        <h1 className="text-6xl font-extrabold text-black">
          We believe <span className="text-holo" style={{ WebkitTextStroke: "1.5px black" }}>creators</span> from Pakistan deserve <span className="text-holo" style={{ WebkitTextStroke: "1.5px black" }}>tools</span>, <span className="text-holo" style={{ WebkitTextStroke: "1.5px black" }}>exposure</span>, and <span className="text-holo" style={{ WebkitTextStroke: "1.5px black" }}>opportunities</span> that match <span className="text-holo" style={{ WebkitTextStroke: "1.5px black" }}>international </span>standards.
        </h1>
      </div>
    </section>
  );
}
