"use client";
import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES = [
  {
    title: "Escrow-Protected Payments",
    description: [
      "Creators get paid with confidence.",
      "Once a brand approves deliverables, funds are instantly released from a secure wallet system.",
      "Payments are held in escrow — so creators are never left unpaid."
    ]
  },
  {
    title: "Manual Profile Verification",
    description: [
      "Every brand and creator is manually reviewed by the admin team.",
      "This protects against spam, fake campaigns, and bot profiles — ensuring only serious players use the platform."
    ]
  },
  {
    title: "Smart Digital Contracts",
    description: [
      "Every campaign generates a legally binding digital contract including scope, deadlines, and payment terms.",
      "No verbal deals. No misunderstandings. Just transparency."
    ]
  },
  {
    title: "Multi-Influencer Campaigns",
    description: [
      "Brands can collaborate with multiple creators in a single campaign — and track each one separately.",
      "Great for scaling, outreach, and community marketing."
    ]
  },
  {
    title: "Built-in Chat for Deliverables",
    description: [
      "Brands and influencers chat directly through the platform.",
      "All messages, content files, and updates are stored securely — no more lost DMs."
    ]
  },
  {
    title: "Prebuilt Campaign Templates",
    description: [
      "Brands choose from structured formats like:",
      "• Product Review",
      "• Giveaway",
      "• Shoutout + Feed",
      "• Unboxing",
      "• Event Coverage",
      "This makes campaign creation fast and professional."
    ]
  },
  {
    title: "Real-Time Wallet + Analytics",
    description: [
      "Both creators and brands get dashboards with:",
      "• PKR balances",
      "• Escrow status",
      "• Earnings",
      "• Proposal activity",
      "• Notifications",

    ]
  },
  {
    title: "Live Notifications & Updates",
    description: [
      "Never miss a message, proposal, or payout.",
      "In-app and email notifications keep you in control."
    ]
  },
  {
    title: "Interest-Based Matching Engine",
    description: [
      "Influencers see only the campaigns that match their selected content interests (beauty, travel, food, tech, etc.)",
      "No irrelevant spam — just tailored opportunities."
    ]
  },
  {
    title: "PKR Wallet & Local Payouts",
    description: [
      "Funds are handled in Pakistani Rupees, ready for local withdrawal.",
      "No need for third-party tools or foreign accounts."
    ]
  },

];

export default function WhyChooseUs() {
  const [expanded, setExpanded] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, {
        y: 0,
        position: "relative",
        zIndex: 10
      });
      gsap.fromTo(
        sectionRef.current,
        { y: 0 },
        {
          y: -window.innerHeight,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: `+=${window.innerHeight * 0.5}`,
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const easedProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
              gsap.set(sectionRef.current, {
                y: -window.innerHeight * easedProgress
              });
            }
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-br from-teal-900 to-black text-white py-24 px-6 md:px-20">
      {/* Section Header */}
      {/* Top Header: Split layout */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 text-white">
        <h1 className="text-8xl font-bold uppercase text-white leading-none x    text-left mt-8 md:mt-0">
          WHY <br />CHOOSE <br />
          <span
            className="text-holo"
          >
            US ?
          </span>
        </h1>
        <p className="text-sm text-white tracking-wide max-w-md">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt autem quibusdam nam beatae, earum harum deserunt perspiciatis dicta optio odit ut. Sed, vero doloremque quam beatae cum eum! Tempora, nemo?
        </p>
      </div>
      {/* Service List */}
      <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-br from-teal-900 to-black/80 shadow-xl overflow-hidden divide-y divide-white/10">
        {SERVICES.map((service, idx) => {
          const isOpen = expanded === idx;
          return (
            <div
              key={idx}
              className={`group flex flex-col md:flex-row items-center md:items-center px-6 md:px-12 py-8 md:py-10 transition-all duration-300 cursor-pointer ${
                isOpen ? "bg-white/5" : ""
              }`}
              onClick={() => setExpanded(idx)}
              onMouseEnter={() => setExpanded(idx)}
              onMouseLeave={() => setExpanded(null)}
            >
              {/* Left: Number and Tag */}
              <div className="flex flex-col items-start justify-start md:w-1/6 w-full text-left">
                <span className="text-5xl font-bold tracking-widest text-white">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Center: Title */}
              <div className="flex flex-col justify-center md:w-1/3 w-full pl-0 md:pl-4 md:pr-8 min-h-[60px]">
                <span className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-center w-full">
                  {service.title}
                </span>
              </div>
              {/* Right: Arrow & Description */}
              <div className="flex flex-col items-end justify-center md:w-1/2 w-full">
                <div className="flex flex-col items-end w-full">
                  <div className="mb-2">
                    {isOpen ? (
                      <ArrowUpRight
                        className={`w-8 h-8 text-white`}
                      />
                    ) : (
                      <ArrowDownRight
                        className={`w-8 h-8 text-white`}
                      />
                    )}
                  </div>
                  {isOpen && (
                    <div className="w-full flex flex-col gap-2 ">
                      {service.description.map((desc, i) => (
                        <p
                          key={i}
                          className="text-white/80 text-base md:text-lg leading-relaxed"
                        >
                          {desc}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
