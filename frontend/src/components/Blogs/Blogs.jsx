import React, { useState } from "react";
import BlogCard from "./BlogCard.jsx";
import "./Blogs.css";
import { mockBlogs } from "../../assets/assets.js"; // Adjust path as needed

export default function Blogs() {
  const [search, setSearch] = useState("");

  const filtered = mockBlogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flower-blogs">
      <h1 className="page-title">Bloom Blog</h1>
      <p className="subtitle">Tips, inspiration & floral love</p>
      <input
        type="text"
        placeholder="Search blog posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="blog-grid">
        {filtered.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}