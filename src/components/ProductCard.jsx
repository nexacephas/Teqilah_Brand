import React from 'react';
import './ProductCard.css';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-img">
        <img src={product.image} alt={product.title} />
      </div>
      <h4>{product.title}</h4>
      <p>{product.price}</p>
      <button className="btn-primary">View</button>
    </motion.div>
  );
};

export default ProductCard;
