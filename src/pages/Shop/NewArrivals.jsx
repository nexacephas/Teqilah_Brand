import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const filtered = res.data.filter(p => p.category === 'New');
        setProducts(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default NewArrivals;
