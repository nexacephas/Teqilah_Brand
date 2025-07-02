import React from 'react';
import { useCart } from '../../context/CartContext';
import './Cart.css';
import { Link } from 'react-router-dom';
import StepProgress from '../../components/StepProgress/StepProgress';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    cartTotal,
    setCartItems,
  } = useCart();

  const updateSize = (index, newSize) => {
    const updated = [...cartItems];
    updated[index].size = newSize;
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const updateColor = (index, newColor) => {
    const updated = [...cartItems];
    updated[index].color = newColor;
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  return (
    <div className="cart-page">
      <StepProgress currentStep={0} />

      <h2>🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.title} className="cart-img" />

                <div className="cart-info">
                  <h4>{item.title}</h4>
                  <p>Price: ₦{item.price.toLocaleString()}</p>

                  {/* Size Selector */}
                  <div className="form-control">
                    <label>Size:</label>
                    <select
                      value={item.size}
                      onChange={(e) => updateSize(index, e.target.value)}
                      className="size-selector"
                    >
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  {/* Color Swatch */}
                  <div className="form-control">
                    <label>Color:</label>
                    <div className="swatch-group">
                      {['Red', 'Blue', 'Black', 'White'].map((color) => (
                        <div
                          key={color}
                          className={`swatch ${item.color === color ? 'selected' : ''}`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          onClick={() => updateColor(index, color)}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>

                  <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₦{cartTotal.toLocaleString()}</h3>
            <div className="cart-actions">
              <button className="clear-btn" onClick={clearCart}>🗑 Clear Cart</button>
              <Link to="/checkout">
                <button className="checkout-btn">✅ Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
