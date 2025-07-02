import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then((res) => setOrders(res.data.reverse()))
      .catch((err) => console.error('❌ Failed to fetch orders:', err));
  }, []);

  const filteredOrders = orders.filter(order =>
    filter === 'All' || order.status?.toLowerCase() === filter.toLowerCase()
  );

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status: newStatus });
      setOrders(prev =>
        prev.map(order => order._id === id ? { ...order, status: newStatus } : order)
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handlePrint = (order) => {
    const content = `\nReceipt for ${order.name}\n------------------------\n${order.items.map(i => `${i.title} - ₦${i.price} x ${i.quantity}`).join('\n')}\n------------------------\nTotal: ₦${order.total}\nShipping: ₦${order.shippingCost}\n`; 
    const newWindow = window.open('', '', 'width=600,height=400');
    newWindow.document.write(`<pre>${content}</pre>`);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="orders-page">
      <h2>📦 Customer Orders</h2>

      <div className="filter-controls">
        {['All', 'Pending', 'Completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={filter === status ? 'active' : ''}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="empty-msg">No orders found.</p>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <h3>{order.name}</h3>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>

              <div className="order-items">
                <h4>🛍️ Items</h4>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.title} ({item.size}/{item.color}) – ₦{item.price.toLocaleString()} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-summary">
                <p><strong>Shipping:</strong> ₦{order.shippingCost.toLocaleString()}</p>
                <p><strong>Total:</strong> ₦{order.total.toLocaleString()}</p>
                <p className={`status-tag ${order.status?.toLowerCase() || 'pending'}`}>
                  {order.status || 'Pending'}
                </p>
                <div className="order-actions">
                  <select onChange={(e) => handleStatusUpdate(order._id, e.target.value)} value={order.status || 'Pending'}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button onClick={() => handlePrint(order)}>🖨️ Print</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
