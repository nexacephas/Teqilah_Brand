import React from 'react';
import { blogData } from '../../data/blogData';
import './Blog.css';

const Blog = () => {
  return (
    <section className="blog-page">
      <div className="container">
        <h2 className="section-title">Our Blog</h2>
        <div className="blog-grid">
          {blogData.map(post => (
            <div key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} />
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href={`/blog/${post.id}`} className="read-more">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
