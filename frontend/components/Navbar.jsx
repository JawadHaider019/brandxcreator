"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const linkColor = "text-white";
  const underlineColor = "bg-white";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Function to check if link is active
  const isActive = (path) => {
    return pathname === path || 
           (path !== '/' && pathname.startsWith(path));
  };

  const navigationItems = [
    { path: "/creator", label: "FOR CREATORS" },
    { path: "/brand", label: "FOR BRANDS" },
    { path: "/blog", label: "BLOG" },
    { path: "/about", label: "ABOUT US" },
    { path: "/contact", label: "CONTACT US" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[9999] flex justify-between items-center px-4 md:px-8 backdrop-blur-sm shadow-md border-b border-white transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-gradient-to-br from-teal-900/60 to-black/60"
            : "py-4 bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo-light.png"
            alt="Logo"
            width={isScrolled ? 120 : 120}
            height={isScrolled ? 80 : 80}
            priority
            className="transition-all duration-300 w-24 md:w-auto"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className={`hidden lg:flex space-x-8 font-medium ${linkColor}`}>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`group relative transition duration-300 ${
                isActive(item.path) ? "font-bold" : ""
              }`}
            >
              {item.label}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${
                  isActive(item.path) 
                    ? `w-full ${underlineColor}`
                    : `w-0 group-hover:w-full ${underlineColor}`
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Mobile/Tablet Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-teal-300 transition-colors duration-300"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile/Tablet Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-br from-teal-900 to-black shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white hover:text-teal-300 transition-colors duration-300"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-bold text-white transition-all duration-300 hover:text-teal-300 ${
                      isActive(item.path) ? "text-teal-300" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Bottom Spacing */}
              <div className="p-8">
                <div className="w-full h-px bg-white/20 mb-4"></div>
                <p className="text-white/60 text-sm">
                  © 2024 BrandXCreator
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}