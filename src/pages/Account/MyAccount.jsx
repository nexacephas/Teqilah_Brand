// src/pages/Account/MyAccount.jsx
import React, { useEffect, useState } from 'react';
import './MyAccount.css';

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('account');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored) {
      setUser(stored);
      setFormData({
        name: stored.name || '',
        phone: stored.phone || '',
        address: stored.address || ''
      });
    }
  }, []);

  const handleInput = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    const updated = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
    setShowModal(false);
  };

  return (
    <div className="account-page">
      <div className="account-card">
        <div className="account-tabs">
          {['account', 'orders', 'saved'].map(key => (
            <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>
              {key === 'account' ? 'Account' : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'account' && (
          <>
            <h2 className="account-title">👤 My Account</h2>
            {user ? (
              <div className="account-details">
                <div className="account-row">
                  <span>Name:</span>
                  <p>{user.name}</p>
                </div>
                <div className="account-row">
                  <span>Email:</span>
                  <p>{user.email}</p>
                </div>
                <div className="account-row">
                  <span>Phone:</span>
                  <p>{user.phone || 'Not provided'}</p>
                </div>
                <div className="account-row">
                  <span>Address:</span>
                  <p>{user.address || 'Not provided'}</p>
                </div>
                <div className="account-row">
                  <span>Role:</span>
                  <p>{user.role || 'User'}</p>
                </div>
                <button className="edit-btn" onClick={() => setShowModal(true)}>✏️ Edit Profile</button>
              </div>
            ) : (
              <p className="account-warning">⚠️ Please log in to view account details.</p>
            )}
          </>
        )}

        {tab === 'orders' && (
          <div className="account-section">
            <h2>🛍️ My Orders</h2>
            <p>You haven't placed any orders yet.</p>
          </div>
        )}

        {tab === 'saved' && (
          <div className="account-section">
            <h2>❤️ Saved Items</h2>
            <p>You have no saved items.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>Edit Profile</h3>
            <input name="name" value={formData.name} onChange={handleInput} placeholder="Name" />
            <input name="phone" value={formData.phone} onChange={handleInput} placeholder="Phone" />
            <input name="address" value={formData.address} onChange={handleInput} placeholder="Address" />
            <div className="modal-actions">
              <button onClick={handleSave}>💾 Save</button>
              <button onClick={() => setShowModal(false)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
