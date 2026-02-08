"use client";
import React from "react";

export default function BlogDetailTemplate({
  title = "Why Pakistani Creators Are Leading the Influencer Economy",
  meta = "Creator Economy · July 2024",
  image = "/hero-bg.avif",
  content,
  children,
}) {
  return (
    <section className="w-full  px-2 md:px-0 py-24 bg-black relative overflow-x-hidden">
      
      <div className="relative 0 max-w-5xl mx-auto z-10">
         {/* Meta Info */}
         <div className="rounded-full bg-gradient-to-br from-teal-900 to-black inline-block px-4 py-1 mb-8  text-xs md:text-sm uppercase text-white  font-semibold shadow-sm">
          {meta}
        </div>
        {/* Title */}
        <h1 className="text-4xl font-extrabold leading-tight md:leading-[1.1] mb-2 md:mb-4 text-white tracking-tight text-left">
          {title}
        </h1>
                {/* Cover Image */}
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-[250px] md:h-[420px] object-cover rounded-2xl mb-10 border border-white/10 shadow-2xl"
          />
        )}
        {/* Blog Content */}
        <article
  className="prose prose-invert max-w-none text-white md:prose-xl leading-relaxed tracking-wide 
             prose-headings:text-holo prose-headings:font-extrabold prose-headings:tracking-tight 
             prose-a:text-teal-400 prose-a:underline hover:prose-a:text-teal-200 
             prose-strong:text-white prose-blockquote:border-l-4 prose-blockquote:border-teal-600 
             prose-blockquote:text-gray-300 prose-blockquote:italic 
             prose-img:rounded-2xl prose-img:shadow-xl 
             prose-li:marker:text-holo prose-ul:pl-6 prose-ol:pl-6 
             prose-p:mb-4 prose-h2:mb-3 prose-h3:mb-2 prose-h2:mt-10 prose-h3:mt-6"
>
  {content || children || (
    <p className="text-gray-400 italic">No content found for this article.</p>
  )}
</article>

     
      </div>
    </section>
  );
}
