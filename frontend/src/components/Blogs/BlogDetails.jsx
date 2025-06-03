import React from "react";
import { useParams } from "react-router-dom";
import { mockBlogs } from "../../assets/assets";
import "./BlogDetails.css";

export default function BlogDetails() {
  const { id } = useParams();
  const blog = mockBlogs.find((b) => b.id.toString() === id);

  if (!blog) return <h2 style={{ textAlign: "center" }}>Blog not found</h2>;

  return (
    <div className="blogs-details-page">
      <h1>{blog.title}</h1>
      <p className="blogs-date">{blog.date}</p>
      <div className="content-and-img">
        <img src={blog.image} alt={blog.title} className="detail-img" />
        <div className="full-content">
          <p>{blog.content}</p>
          <div className="blogs-tags">
        {blog.tags.map(tag => <span key={tag}>{tag}</span>)}
      </div>
        </div>
      </div>
      
    </div>
  );
}