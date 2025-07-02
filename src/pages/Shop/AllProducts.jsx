// src/pages/Shop/AllProducts.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';
import './Shop.css'; // optional for styling

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load products', err);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="product-grid">
        {currentItems.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          ← Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </>
  );
};

export default AllProducts;
