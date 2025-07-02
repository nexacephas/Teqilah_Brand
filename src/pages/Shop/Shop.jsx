// src/pages/Shop/Shop.jsx
import React, { useState, useEffect } from 'react';
import './Shop.css';
import AllProducts from './AllProducts';
import NewArrivals from './NewArrivals';
import BestSellers from './BestSellers';
import api from '../../utils/axios';

const Shop = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderTab = () => {
    if (loading) return <p className="loading-text">Loading products...</p>;

    switch (activeTab) {
      case 'all':
        return <AllProducts products={products} />;
      case 'new':
        return <NewArrivals products={products} />;
      case 'best':
        return <BestSellers products={products} />;
      default:
        return null;
    }
  };

  return (
    <section className="shop-section">
      <div className="container">
        <h2 className="section-title">Shop Our Looks</h2>
        <p className="section-subtitle">
          Browse elegant, modest, and handcrafted styles made by Tephilah.
        </p>

        <div className="shop-tabs">
          <button onClick={() => setActiveTab('all')} className={activeTab === 'all' ? 'active' : ''}>
            All
          </button>
          <button onClick={() => setActiveTab('new')} className={activeTab === 'new' ? 'active' : ''}>
            New Arrivals
          </button>
          <button onClick={() => setActiveTab('best')} className={activeTab === 'best' ? 'active' : ''}>
            Best Sellers
          </button>
        </div>

        {renderTab()}
      </div>
    </section>
  );
};

export default Shop;
