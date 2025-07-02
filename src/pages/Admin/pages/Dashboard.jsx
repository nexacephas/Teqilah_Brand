// src/pages/Admin/pages/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import { FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';
import CountUp from 'react-countup';

const Dashboard = () => {
  const stats = [
    {
      label: 'Total Products',
      count: 42,
      icon: <FaBox />,
      color: '#4caf50',
    },
    {
      label: 'Total Orders',
      count: 108,
      icon: <FaShoppingCart />,
      color: '#2196f3',
    },
    {
      label: 'Total Users',
      count: 17,
      icon: <FaUsers />,
      color: '#f44336',
    },
  ];

  const recentOrders = [
    { id: 'ORD123', customer: 'Jane Doe', total: '$55.00', status: 'Pending' },
    { id: 'ORD124', customer: 'John Smith', total: '$120.00', status: 'Delivered' },
    { id: 'ORD125', customer: 'Alice Brown', total: '$35.00', status: 'Shipped' },
  ];

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div className="dashboard-card" key={index} style={{ borderColor: stat.color }}>
            <div className="dashboard-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="dashboard-info">
              <h3>
                <CountUp end={stat.count} duration={1.5} />
              </h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 📦 Recent Orders Section */}
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
