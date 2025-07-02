// admin/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBox, FaClipboardList, FaTachometerAlt, FaBars } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>🛍</h2>
        <button onClick={() => setCollapsed(!collapsed)} className="collapse-toggle">
          <FaBars />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaBox />
          <span>Products</span>
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
