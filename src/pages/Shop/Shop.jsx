import React, { useState } from 'react';
import './Shop.css';
import AllProducts from './AllProducts';
import NewArrivals from './NewArrivals';
import BestSellers from './BestSellers';

const Shop = () => {
  const [activeTab, setActiveTab] = useState('all');

  const renderTab = () => {
    switch (activeTab) {
      case 'all':
        return <AllProducts />;
      case 'new':
        return <NewArrivals />;
      case 'best':
        return <BestSellers />;
      default:
        return <AllProducts />;
    }
  };

  return (
    <section className="shop-section">
      <div className="container">
        <h2 className="section-title">Shop Our Looks</h2>
        <div className="shop-tabs">
          <button onClick={() => setActiveTab('all')} className={activeTab === 'all' ? 'active' : ''}>All Products</button>
          <button onClick={() => setActiveTab('new')} className={activeTab === 'new' ? 'active' : ''}>New Arrivals</button>
          <button onClick={() => setActiveTab('best')} className={activeTab === 'best' ? 'active' : ''}>Best Sellers</button>
        </div>
        {renderTab()}
      </div>
    </section>
  );
};

export default Shop;
