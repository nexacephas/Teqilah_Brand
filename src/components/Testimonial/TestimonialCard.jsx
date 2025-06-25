// TestimonialCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div className="testimonial-card" variants={cardVariant}>
      <div className="testimonial-avatar">
        <img src={testimonial.image} alt={testimonial.name} />
      </div>
      <p className="testimonial-text">“{testimonial.message}”</p>
      <div className="testimonial-stars">
        {Array(testimonial.rating).fill().map((_, i) => (
          <FiStar key={i} className="star" />
        ))}
      </div>
      <h4 className="testimonial-name">{testimonial.name}</h4>
      <span className="testimonial-role">{testimonial.role}</span>
    </motion.div>
  );
};

export default TestimonialCard;
