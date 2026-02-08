"use client";
import BlogDetailTemplate from "@/components/blog/BlogDetailTemplate";
import { posts } from "@/lib/data/blogs";

export default function BlogDetailPage({ params }) {
  const post = posts.find((p) => p.id === params.id);
  if (!post) return <div className="text-white p-10">Blog post not found.</div>;

  return (
    <BlogDetailTemplate
      title={post.title}
      meta={post.meta}
      image={post.image}
    >
      
    </BlogDetailTemplate>
  );
}
