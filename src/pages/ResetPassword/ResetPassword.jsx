import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!token) {
      toast.error('Invalid or expired token');
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error('Please enter a new password');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );
      toast.success('Password reset successfully!');
      navigate('/login'); // or home page
    } catch (err) {
      // Show backend error message if available
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Reset failed. Please check your link or try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="reset-container">
      <h2>🔐 Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        <p>
          Remembered your password? <a href="/login">Login</a> 
        </p>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
