import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../../components/StepProgress/StepProgress';
const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const [shippingCost, setShippingCost] = useState(2000);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [grandTotal, setGrandTotal] = useState(cartTotal + shippingCost);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: '',
    notes: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const cost = selectedShipping === 'express' ? 5000 : 2000;
    setShippingCost(cost);
    setGrandTotal(cartTotal + cost);
  }, [cartTotal, selectedShipping]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (!form.name || !form.phone || !form.address || !form.deliveryDate) {
      alert('Please fill all required fields');
      return;
    }

    // You can send the form + cart data to backend here if needed
    console.log('✅ Order Info:', { ...form, cartItems, shipping: selectedShipping, total: grandTotal });

    navigate('/payment');
  };

  return (
    <div className="checkout-page">
      <StepProgress currentStep={1} totalSteps={3} />
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="checkout-container">
          {/* LEFT: Order Summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cartItems.map((item, index) => (
              <div className="checkout-item" key={index}>
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>₦{item.price.toLocaleString()} x {item.quantity}</p>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Billing, Shipping, and Form */}
          <div className="checkout-box">
            <h3>Shipping Options</h3>
            <label>
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={selectedShipping === 'standard'}
                onChange={() => setSelectedShipping('standard')}
              />
              Standard (₦2,000, 3–5 days)
            </label>
            <label>
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={selectedShipping === 'express'}
                onChange={() => setSelectedShipping('express')}
              />
              Express (₦5,000, 1–2 days)
            </label>

            <h3>Customer Information</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Shipping Address *</label>
              <textarea name="address" value={form.address} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Delivery Deadline *</label>
              <input type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Order Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} />
            </div>

            <div className="checkout-totals">
              <p>Subtotal: <strong>₦{cartTotal.toLocaleString()}</strong></p>
              <p>Shipping: <strong>₦{shippingCost.toLocaleString()}</strong></p>
              <hr />
              <p className="grand-total">Grand Total: <strong>₦{grandTotal.toLocaleString()}</strong></p>
            </div>

            <button className="checkout-btn" onClick={handleCheckout} navigate="/payment">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
