import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-img" />
      <div className="blog-details">
        <h2>{blog.title}</h2>
        <p className="blog-date">{blog.date}</p>
        <p>{blog.excerpt}</p>
        <div className="blogs-tags">
          {blog.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link to={`/blogs/${blog.id}`} className="read-more">Read More →</Link>
      </div>
    </div>
  );
}