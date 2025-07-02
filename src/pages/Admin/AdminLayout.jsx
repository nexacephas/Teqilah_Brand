// src/pages/Admin/AdminLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './AdminLayout.css';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Topbar />
        <main>
          <Outlet /> {/* ✅ This renders the matched child route like <Products /> */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
