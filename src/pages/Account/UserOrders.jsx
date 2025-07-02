import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserOrders.css';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/api/orders/user/${user._id}`)
      .then(res => setOrders(res.data.reverse()))
      .catch(err => console.error('❌ Could not load user orders:', err));
  }, [user]);

  return (
    <div className="user-orders">
      <h2>🧾 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <h4>Order on {new Date(order.createdAt).toLocaleDateString()}</h4>
                <span className={`status ${order.status?.toLowerCase() || 'pending'}`}>{order.status || 'Pending'}</span>
              </div>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>{item.title} ({item.size}/{item.color}) × {item.quantity}</li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₦{order.total.toLocaleString()}</p>
              <p><strong>Shipping:</strong> ₦{order.shippingCost.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;