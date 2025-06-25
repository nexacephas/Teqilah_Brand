import React from 'react';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';

const NewArrivals = () => {
  const newProducts = products.filter(item => item.category === 'New');
  return (
    <div className="product-grid">
      {newProducts.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

export default NewArrivals;
