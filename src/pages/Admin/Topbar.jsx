// src/pages/Admin/Topbar.jsx
import React, { useState } from 'react';
import { FaBell, FaCaretDown } from 'react-icons/fa';
import './Topbar.css';

const Topbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="admin-topbar">
      <h3>Welcome Admin</h3>

      <div className="topbar-right">
        <div className="notification-icon">
          <FaBell size={18} />
          <span className="dot"></span>
        </div>

        <div className="profile" onClick={toggleDropdown}>
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="Admin Avatar"
            className="avatar"
          />
          <FaCaretDown />
          {showDropdown && (
            <div className="dropdownn">
              <p>Admin</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
