"use client";
import React from "react";
import Link from "next/link";
import { posts } from "@/lib//data/blogs"

export default function BlogShowCase() {
  return (
    <section className="w-full bg-black text-white min-h-screen font-sans">
      {/* Header Bar */}
      <div className="flex justify-between items-end px-6 pt-8 pb-2 bg-black">
        <span className="text-[2.5rem] md:text-[5rem] font-extrabold uppercase tracking-tighter leading-none">OUR</span>
        <span className="text-holo text-[2.5rem] md:text-[5rem] font-extrabold uppercase tracking-tighter leading-none">BLOG</span>
      </div>
      {/* Navigation */}
      {/* <nav className="flex gap-8 px-6 py-3 border-b border-white/10 uppercase text-xs tracking-widest text-gray-300 bg-black">
        {navLinks.map((link) => (
          <a key={link} href="#" className="hover:text-white transition">{link}</a>
        ))}
      </nav> */}
      {/* Description */}
      <div className="px-6 py-6 text-center text-sm md:text-base max-w-4xl mx-auto">
        Insights, trends, and tips for creators and brands in the influencer marketing space. Learn how to grow, earn, and lead with authenticity. Insights, trends, and tips for creators and brands.
      </div>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {posts.map((post, idx) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className={`group ${post.featured ? "md:col-span-2 md:row-span-2" : ""}`}
          >
            <div
              className={`bg-gradient-to-br from-teal-900 to-black text-white border border-[#bbb] rounded-md overflow-hidden shadow-sm hover:shadow-lg transition duration-200 flex flex-col ${
                post.featured ? "p-8" : "p-4"
              } relative group-hover:scale-[1.03] group-hover:z-10 cursor-pointer`}
              style={post.featured ? { minHeight: "340px" } : { minHeight: "180px" }}
            >
              {post.featured && (
                <span className="z-50 absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-widest">Latest</span>
              )}
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className={`w-full ${post.featured ? "h-[220px] mb-6" : "h-[100px] mb-3"} object-cover object-center grayscale hover:grayscale-0 transition duration-300 rounded`}
                />
              )}
              <div className="flex-1 flex flex-col">
                <h2 className={`font-extrabold uppercase ${post.featured ? "text-2xl md:text-4xl mb-4" : "text-lg md:text-xl mb-2"} leading-tight tracking-tight`}>{post.title}</h2>
                <span className="text-xs uppercase text-gray-200 mt-auto tracking-widest">{post.meta}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
