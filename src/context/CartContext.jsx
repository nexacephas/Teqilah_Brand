import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🔁 Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // 💾 Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to cart (with size & quantity)
  const addToCart = (product, selectedSize = 'M') => {
    setCartItems(prev => {
      // Check if same product & size exists
      const existingIndex = prev.findIndex(
        item => item._id === product._id && item.size === selectedSize
      );

      if (existingIndex !== -1) {
        // Increment quantity
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
  setCartItems(prev => [...prev, { ...product, quantity: 1, size: selectedSize }]);

      // Add new item
      return [...prev, { ...product, size: selectedSize, quantity: 1 }];
    });
  };

  // ❌ Remove item
  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // ➕ Increase qty
  const increaseQty = (index) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity += 1;
      return updated;
    });
  };

  // ➖ Decrease qty
  const decreaseQty = (index) => {
    setCartItems(prev => {
      const updated = [...prev];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
      } else {
        updated.splice(index, 1); // remove item if qty hits 0
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
