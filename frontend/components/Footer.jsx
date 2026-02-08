"use client";

import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const collaborationRef = useRef(null);
  const circleButtonRef = useRef(null);
  const workTextRef = useRef(null);
  const togetherTextRef = useRef(null);
  const footerRef = useRef(null);
  const brandColumnRef = useRef(null);
  const linksGridRef = useRef(null);
  const newsletterRef = useRef(null);
  const bottomSectionRef = useRef(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // GSAP animations for collaboration section
    const ctx = gsap.context(() => {
      // Animate circle button (fade in only, no scale)
      gsap.fromTo(circleButtonRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: collaborationRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate "LET'S WORK" text (slide from left)
      gsap.fromTo(workTextRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: collaborationRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate "TOGETHER" text (slide from right)
      gsap.fromTo(togetherTextRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: collaborationRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate background circles (continuous animation) - using teal color
      gsap.to(".bg-circle-1", {
        y: -20,
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".bg-circle-2", {
        y: 15,
        scale: 1,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      });

      // Stagger animation for footer items
      gsap.fromTo(".footer-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Individual item animations with hover effects
      gsap.fromTo(brandColumnRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: brandColumnRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(linksGridRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: linksGridRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(newsletterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(bottomSectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomSectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

    });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <>
      {/* Collaboration Section - Using teal gradient */}
      <section 
        ref={collaborationRef}
        className='overflow-x-hidden pb-20 border-b border-gray-700 relative flex items-center justify-center flex-col gap-6 md:gap-8 text-center bg-gradient-to-br from-teal-900 to-black min-h-screen px-4'
      >
        {/* Animated background elements - using teal color */}
        <div className="bg-circle-1 absolute bottom-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-teal-600/10 rounded-full blur-3xl" />
        <div className="bg-circle-2 absolute top-20 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-teal-600/10 rounded-full blur-3xl" />

        {/* Circle Button - Center position maintained */}
        <div 
          ref={circleButtonRef}
          className='z-45 text-teal-900 absolute border-teal-600 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white hover:bg-black/80 hover:text-white w-16 h-16 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full font-bold flex flex-col items-center justify-center text-xs md:text-base tracking-wider transition-all duration-300 hover:scale-110 cursor-pointer group border border-transparent hover:border-white'
        >
          <ArrowRight className='group-hover:rotate-[-40deg] transition-transform duration-300 mb-0.5 md:mb-1 w-4 h-4 md:w-6 md:h-6' />
          <span className='text-[10px] md:text-sm'> LET'S COLLABORATE</span>
        </div>
        
        <h1 className='text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[12rem] font-bold leading-tight md:leading-none px-2 text-white'>
          <span 
            ref={workTextRef}
            className='inline-block'
          >
            LET'S WORK
          </span>
          <br/>
          <span 
            ref={togetherTextRef}
            className='inline-block'
          >
            TOGETHER
          </span>
        </h1>
      </section>

      {/* Footer Section */}
      <footer ref={footerRef} className="bg-black text-white relative overflow-hidden">
        {/* Enhanced Animated Background Elements - using teal color */}
        <div className="absolute inset-0">
          {/* Additional Random Glowing Circles */}
          <div className="bg-circle-4 absolute top-1/4 right-1/3 w-24 h-24 sm:w-40 sm:h-40 bg-teal-600/8 rounded-full blur-2xl" />
          <div className="bg-circle-5 absolute bottom-1/3 left-1/4 w-20 h-20 sm:w-32 sm:h-32 bg-teal-600/6 rounded-full blur-xl" />
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-8">
            {/* Brand Column with Glass Effect */}
            <div 
              ref={brandColumnRef}
              className="footer-item lg:col-span-4 bg-black/10 backdrop-blur-sm border border-white/20 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl transition-all duration-500 hover:bg-black/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-600/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <Image
                    src="/logo-light.png"
                    alt="Logo"
                    width={130}
                    height={80}
                    priority
                    className="transition-all duration-300 w-24 md:w-auto"
                  />
                </div>
              </div>
              
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                A platform connecting creators and visionary brands for meaningful growth through cutting-edge collaboration.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-teal-700 transition-all duration-300 border border-transparent group-hover:border-teal-600 group-hover:scale-110">
                    <FaEnvelope className="text-teal-900 group-hover:text-white text-base sm:text-lg transition-all duration-300" />
                  </div> 
             
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Email us</p>
                    <p className="text-white font-medium text-sm sm:text-base">info@brandxcreator.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-teal-700 transition-all duration-300 border border-transparent group-hover:border-teal-600 group-hover:scale-110">
                    <FaPhone className="text-teal-900 group-hover:text-white text-base sm:text-lg transition-all duration-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Phone</p>
                    <p className="text-white font-medium text-sm sm:text-base">0300-1234567</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-between lg:col-span-8'>
              {/* Links Grid with Glass Effect */}
              <div 
                ref={linksGridRef}
                className="footer-item lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 border-b border-gray-700 pb-8 sm:pb-12 mb-8 sm:mb-12 backdrop-blur-sm bg-black/10 p-4 sm:p-6"
              >
                {/* Explore */}
                <div className="md:border-r md:border-gray-700/50 md:pr-6 sm:md:pr-8 pb-6 sm:pb-8 md:pb-0">
                  <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6 pb-2 inline-block">
                    Explore
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { href: "/creator", label: "For Creators" },
                      { href: "/brand", label: "For Brands" },
                      { href: "/blog", label: "Blog" },
                      { href: "/about", label: "About Us" },
                      { href: "/contact", label: "Contact" }
                    ].map((item, index) => (
                      <li key={item.href} className="footer-item" style={{ animationDelay: `${index * 0.1}s` }}>
                        <a href={item.href} className="text-gray-300 hover:text-teal-600 transition-all duration-300 flex items-center gap-2 group hover:translate-x-1 text-sm sm:text-base">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div className="md:border-r md:border-gray-700/50 md:pr-6 sm:md:pr-8 pb-6 sm:pb-8 md:pb-0">
                  <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6 pb-2 inline-block">
                    Services
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Influencer Campaigns',
                      'Creator Management', 
                      'Brand Partnerships',
                      'Social Strategy',
                      'Content Production'
                    ].map((service, index) => (
                      <li key={service} className="footer-item" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                        <a href="#" className="text-gray-300 hover:text-teal-600 transition-all duration-300 flex items-center gap-2 group hover:translate-x-1 text-sm sm:text-base">
                          {service}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Follow Us */}
                <div className="pb-6 sm:pb-8 md:pb-0">
                  <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6 pb-2 inline-block">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {[
                      { icon: FaFacebookF, href: "#", label: "Facebook" },
                      { icon: FaTwitter, href: "#", label: "Twitter" },
                      { icon: FaInstagram, href: "#", label: "Instagram" },
                      { icon: FaLinkedinIn, href: "#", label: "LinkedIn" }
                    ].map((social, index) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-item w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-teal-600 rounded-full flex items-center justify-center text-teal-900 hover:text-black border border-gray-700 hover:border-teal-700 transition-all duration-300 hover:scale-110 hover:rotate-12"
                        style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                        title={social.label}
                      >
                        <social.icon size={18} className="sm:w-5 sm:h-5" />
                      </a>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="primary" size="default" className="text-sm md:text-base py-6 w-full">
                      <Link href="/about">
                        Start Your Journey
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Newsletter Section with Glass Effect */}
              <div 
                ref={newsletterRef}
                className="footer-item backdrop-blur-md bg-black/15 p-6 rounded-2xl transition-all duration-300 border border-gray-700/30"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                      Subscribe Our Newsletter
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Get the latest updates on creator collaborations
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border border-gray-700/50 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300 bg-black/20 text-sm sm:text-base w-full"
                    />
                    <Button asChild variant="primary" size="default" className="text-sm md:text-base py-7">
                      <Link href="/about">
                        Subscribe
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section with Glass Effect */}
          <div 
            ref={bottomSectionRef}
            className="footer-item border-t border-gray-700/50 pt-6 sm:pt-8 backdrop-blur-sm bg-black/10 p-4 sm:p-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
                © {new Date().getFullYear()} BrandXCreator — Empowering Brands & Creators.
              </div>
              <div className="flex gap-6 text-xs">
                <a href="/privacy" className="text-gray-400 hover:text-teal-600 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-teal-600 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-teal-600 transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;