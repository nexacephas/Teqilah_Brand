import React, { useState, useContext } from 'react';
import axios from 'axios';
import './AuthModal.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const AuthModal = ({ onClose }) => {
  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (view === 'login') {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        login(res.data.user);
        toast.success('Welcome back!');
        onClose();
      }

      if (view === 'register') {
        await axios.post('http://localhost:5000/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        toast.success('Registration successful. Please check your email to verify.');
        setView('login');
      }

      if (view === 'forgot') {
        await axios.post('http://localhost:5000/api/auth/forgot-password', {
          email: formData.email,
        });
        toast.success('📧 Password reset link sent!');
        setView('login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="auth-tabs">
          <button className={view === 'login' ? 'active' : ''} onClick={() => setView('login')}>Login</button>
          <button className={view === 'register' ? 'active' : ''} onClick={() => setView('register')}>Register</button>
          <button className={view === 'forgot' ? 'active' : ''} onClick={() => setView('forgot')}>Forgot</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {view === 'register' && (
            <div className="input-group">
              <FaUser />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {(view === 'login' || view === 'register') && (
            <>
              <div className="input-group">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="google-login-wrapper">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
                        token: credentialResponse.credential,
                      });
                      localStorage.setItem('user', JSON.stringify(res.data.user));
                      login(res.data.user);
                      toast.success('Logged in with Google!');
                      onClose();
                    } catch (err) {
                      toast.error('Google login failed');
                    }
                  }}
                  onError={() => {
                    toast.error('Google login failed');
                  }}
                />
              </div>
            </>
          )}

          {view === 'forgot' && (
            <div className="input-group">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? 'Loading...'
              : view === 'login'
              ? 'Login'
              : view === 'register'
              ? 'Register'
              : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
