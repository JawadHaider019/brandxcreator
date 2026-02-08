"use client";
import Image from "next/image";
import React from "react";

export default function ContactInfoSection() {
  return (
    <section className="w-full min-h-[70vh] flex items-stretch justify-center bg-gradient-to-br from-teal-900 to-black ">
      {/* Left: Repeated, stacked text + description */}
      <div className="flex-1 flex flex-col justify-between py-16 px-6 md:px-20 overflow-hidden ">
        <div className="flex flex-col gap-8">
          <h1 className="text-[clamp(3rem,10vw,7rem)] font-extrabold leading-[1.1] tracking-tighter uppercase text-white">
            Contact <br />Your <br />
            <span className="text-holo inline-block" style={{ WebkitTextStroke: "1.5px white" }}>Creator</span>
          </h1>
          <p className="max-w-lg text-white text-base md:text-lg leading-relaxed">
            Have a campaign idea or collaboration request? Whether you're a brand, agency, or independent creator — BrandXCreator is your bridge to meaningful partnerships. Let’s build something bold.
          </p>
        </div>
      </div>

      {/* Right: Contact info and logo */}
      <div className="flex-[0.9] flex flex-col justify-center items-center text-white px-6 md:px-12 py-16 min-w-[320px] max-w-[440px]">
        <div className="flex flex-col items-center gap-10 w-full">
         
          {/* Contact Info */}
          <div className="text-center space-y-4">
            <div className="text-xl font-semibold tracking-wider uppercase">Reach Out to Us</div>
            <div className="text-base">Email: <a href="mailto:hello@brandxcreator.com" className="underline">hello@brandxcreator.com</a></div>
            <div className="text-base">Phone: <a href="tel:+923000000000" className="underline">+92 300 0000000</a></div>
            <div className="text-base">WhatsApp: <a href="https://wa.me/923000000000" className="underline" target="_blank">Message Now</a></div>
            <div className="text-base">Instagram: <a href="https://instagram.com/brandxcreator" className="underline" target="_blank">@brandxcreator</a></div>
            <div className="text-base">Website: <a href="https://www.brandxcreator.com" className="underline" target="_blank">www.brandxcreator.com</a></div>
          </div>

              </div>
      </div>
    </section>
  );
}
