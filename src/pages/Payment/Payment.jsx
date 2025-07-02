import React, { useState, useEffect, useContext } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './Payment.css';
import { motion } from 'framer-motion';
import StepProgress from '../../components/StepProgress/StepProgress';
import creditCardIcon from '../../assets/icons/credit-card-solid.svg';
import transferIcon from '../../assets/icons/money-bill-transfer-solid.svg';
import ussdIcon from '../../assets/icons/hashtag-solid.svg';
const Payment = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [shippingCost, setShippingCost] = useState(2000);
  const [grandTotal, setGrandTotal] = useState(cartTotal + shippingCost);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setGrandTotal(cartTotal + shippingCost);

    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [cartTotal, shippingCost, user]);

const handlePaystackPayment = () => {
  const handler = window.PaystackPop.setup({
    key: 'pk_test_a256ec4dd0e49b858f886273bd9cc380b77644ef',
    email,
    amount: grandTotal * 100,
    currency: 'NGN',
    onClose: () => {
      setLoading(false);
      alert('Payment cancelled');
    },
   callback: function(response) {
  submitOrder(); // no await here
},
  });

  handler.openIframe();
};

const submitOrder = async () => {
  try {
    const orderId = Date.now();
    const shippingMethod = shippingCost === 2000 ? 'Standard' : 'Express';

    await axios.post('http://localhost:5000/api/orders/send-receipt', {
      name,
      email,
      address,
      orderId,
      shippingMethod,
      deliveryStatus: 'Processing',
      items: cartItems,
      total: grandTotal,
    });

    clearCart();

    navigate('/success', {
      state: {
        name,
        email,
        address,
        orderId,
        shippingMethod,
        total: grandTotal,
        items: cartItems,
        deliveryStatus: 'Processing',
      },
    });
  } catch (err) {
    console.error('❌ Order saving failed:', err);
    alert('❌ Order failed to save. Please try again.');
  } finally {
    setLoading(false);
  }
};


const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  if (paymentMethod === 'paystack') {
    handlePaystackPayment();
  } else {
    submitOrder();
  }
};


  return (
    <div className="payment-page">
      <StepProgress currentStep={2} totalSteps={3} />
      <h2>💳 Complete Your Payment</h2>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            required
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            required
            placeholder="Enter a valid email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!user}
          />
          {user && <small className="info-text">Auto-filled from your account</small>}
        </div>

        <div className="form-group">
          <label>Shipping Option</label>
          <select
            value={shippingCost}
            onChange={(e) => setShippingCost(Number(e.target.value))}
          >
            <option value={2000}>Standard - ₦2,000 (3–5 days)</option>
            <option value={5000}>Express - ₦5,000 (1–2 days)</option>
          </select>
        </div>
    <div className="form-group">
  <label>Address</label>
  <textarea required value={address} onChange={(e) => setAddress(e.target.value)} />
</div>

<div className="form-group payment-methods">
  <label>Select Payment Method</label>
  <div className="method-grid">
    <div
      className={`method-card ${paymentMethod === 'paystack' ? 'selected' : ''}`}
      onClick={() => setPaymentMethod('paystack')}
    >
      <img src={creditCardIcon} alt="Card" />
      <span>Card</span>
    </div>

    <div
      className={`method-card ${paymentMethod === 'transfer' ? 'selected' : ''}`}
      onClick={() => setPaymentMethod('transfer')}
    >
      <img src={transferIcon} alt="Transfer" />
      <span>Bank Transfer</span>
      <small className="badge">New</small>
    </div>

    <div
      className={`method-card ${paymentMethod === 'ussd' ? 'selected' : ''}`}
      onClick={() => setPaymentMethod('ussd')}
    >
      <img src={ussdIcon} alt="USSD" />
      <span>USSD</span>
    </div>
  </div>
</div>


        <div className="summary-box">
          <h4>Order Summary</h4>
          <p>Cart Total: <strong>₦{cartTotal.toLocaleString()}</strong></p>
          <p>Shipping: <strong>₦{shippingCost.toLocaleString()}</strong></p>
          <hr />
          <p>Grand Total: <strong className="total">₦{grandTotal.toLocaleString()}</strong></p>
        </div>

        <motion.button
  type="submit"
  className="pay-btn"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  disabled={loading}
>
  {loading ? (
    <span className="spinner"></span>
  ) : (
    'Complete Payment'
  )}
</motion.button>

      </form>
    </div>
  );
};

export default Payment;
