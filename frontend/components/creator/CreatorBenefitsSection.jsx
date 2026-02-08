"use client";
import React from "react";

const Benefits = [
    {
      number: "01",
      title: "Campaign Matching That Fits You",
      description: [
        "We connect creators with campaigns that align with their niche, audience, and values.",
        "No more random promos — only meaningful collaborations with local brands that respect your voice."
      ]
    },
    {
      number: "02",
      title: "Real-Time Performance Tracking",
      description: [
        "Access a personalized dashboard to view your reach, engagement, and campaign earnings.",
        "Make data-driven decisions with simplicity — grow smarter, not harder."
      ]
    },
    {
      number: "03",
      title: "Creator Support Hub",
      description: [
        "From how-to guides and legal templates to equipment suggestions and platform policies — we’ve got you covered.",
        "We help you focus on what matters most: creating."
      ]
    },
    {
      number: "03",
      title: "Access to Local Pakistani Brands",
      description: [
        "BrandXCreator is Pakistan-first.",
        "We bring you opportunities with trusted, relevant, and growing businesses across the country — and handle the logistics for you."
      ]
    },
    {
      number: "03",
      title: "Tech & Platform Assistance",
      description: [
        "Whether you’re stuck on uploading content, managing deadlines, or optimizing for a platform — our support team is here to help with tools, formats, and delivery."
      ]
    },
    {
      number: "04",
      title: "Smooth Workflow & Payment Handling",
      description: [
        "From content approval to secure payments, our platform automates campaign steps so you can stay focused on being creative — not chasing clients."
      ]
    },
    {
      number: "05",
      title: "Legal & Contract Templates",
      description: [
        "We provide simple, legally sound templates and usage rights documentation to protect both your content and your deals.",
        "No confusion. Just clarity."
      ]
    },
    {
      number: "06",
      title: "Content Delivery Made Easy",
      description: [
        "Upload your deliverables right from your dashboard — or link from your social media.",
        "Receive feedback and track revisions, all in one place."
      ]
    },
    {
      number: "07",
      title: "Mobile App for Creators",
      description: [
        "Apply to campaigns, chat with brands, track stats, and upload deliverables on the go — all from the BrandXCreator app."
      ]
    },
    {
      number: "08",
      title: "Creator Community & Collaboration",
      description: [
        "Connect with like-minded creators across Pakistan.",
        "Share ideas, join collabs, and grow together as part of a vibrant creator network."
      ]
    }
  ];
  
  export default function CreatorBenefitsSection() {
      return (
        <section className="w-full bg-black text-white py-24 px-10">
          <div className=" mx-auto flex flex-col gap-20">
            {/* Section Heading */}
            <div className="text-center">
              <h2 className="text-8xl font-extrabold uppercase tracking-tight mb-4">
                Influencer <span className="text-holo" style={{ WebkitTextStroke: "1.5px #fff" }}>Marketing</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                Influencer marketing isn’t just a trend — it’s a shift. Reach your audience through relatable voices and build trust through real content.
              </p>
            </div>
    
            {/* Benefit Blocks */}
            {Benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16"
              >
                {/* Outlined Number */}
                <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
                  <span
                    className="text-[8rem] md:text-[12rem] font-extrabold text-transparent leading-none select-none"
                    style={{ WebkitTextStroke: "2px #444" }}
                  >
                    {benefit.number}
                  </span>
                </div>
    
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-3xl md:text-5xl font-bold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }
  