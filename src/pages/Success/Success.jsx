import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import StepProgress from '../../components/StepProgress/StepProgress';
const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="fallback">No order data found.</div>;
  }

  const { name, email, total, items } = state;

  return (
    <div className="success-container">
      <StepProgress currentStep={3} totalSteps={4} />

    <motion.div

      className="success-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="success-icon">
        <FiCheckCircle />
      </div>
      <h2>Payment Successful 🎉</h2>
      <p>Thank you <strong>{name}</strong>, your order has been confirmed!</p>
      <p>A confirmation has been sent to: <strong>{email}</strong></p>

      <div className="order-summary">
        <h3>🧾 Order Summary</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <span>{item.name} x{item.quantity}</span>
              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="total-line">
          <strong>Total Paid:</strong>
          <strong>₦{total.toLocaleString()}</strong>
        </div>
      </div>

      <div className="success-actions">
        <button onClick={() => navigate('/shop/all')} className="btn-primary">
          Continue Shopping
        </button>
        <button onClick={() => navigate('/orders')} className="btn-secondary">
          View My Orders
        </button>
      </div>
      <button onClick={() => window.print()} className="btn-secondary">
  🖨️ Print Receipt
</button>

    </motion.div>
    </div>
  );
};

export default Success;
