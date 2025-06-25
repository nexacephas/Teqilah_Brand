import React from 'react';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';

const BestSellers = () => {
  const bestSelling = products.filter(item => item.category === 'Best');
  return (
    <div className="product-grid">
      {bestSelling.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

export default BestSellers;
