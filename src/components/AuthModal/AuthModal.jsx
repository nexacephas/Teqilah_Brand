import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ onClose }) => {
  const [view, setView] = useState('login'); // 'login', 'register', 'forgot'

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="auth-tabs">
          <button
            className={view === 'login' ? 'active' : ''}
            onClick={() => setView('login')}
          >
            Login
          </button>
          <button
            className={view === 'register' ? 'active' : ''}
            onClick={() => setView('register')}
          >
            Register
          </button>
          <button
            className={view === 'forgot' ? 'active' : ''}
            onClick={() => setView('forgot')}
          >
            Forgot
          </button>
        </div>

        {view === 'login' && (
          <form className="auth-form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        )}

        {view === 'register' && (
          <form className="auth-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Register</button>
          </form>
        )}

        {view === 'forgot' && (
          <form className="auth-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
