// src/components/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <img src={post.image} alt={post.title} />
      <div className="blog-info">
        <span className="blog-category">{post.category}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="blog-meta">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
        <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
      </div>
    </div>
  );
};

export default BlogCard;
