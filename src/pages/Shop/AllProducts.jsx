import React from 'react';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';

const AllProducts = () => (
  <div className="product-grid">
    {products.map((item) => (
      <ProductCard key={item.id} product={item} />
    ))}
  </div>
);

export default AllProducts;
