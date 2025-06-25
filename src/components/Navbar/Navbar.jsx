// Navbar.jsx
import React, { useState, useRef } from 'react';
import './Navbar.css';
import { Link, Links } from 'react-router-dom';
import {
  FiMenu, FiX, FiHeart, FiShoppingCart, FiUser, FiPhone,
  FiBox, FiTag, FiStar
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo-navbar.png';
import useClickOutside from '../../hooks/useClickOutside';
import AuthModal from '../AuthModal/AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(2);

  const dropdownRef = useRef();
  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  return (
    <nav className="navbar">
      <div className="container nav-container">
          <div className="logo" data-aos="fade-right">
            <Link to="/">
              <img src={logo} alt="Brand Logo" />
            </Link>
          </div>


        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>

          <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
<li className="dropdown" ref={dropdownRef} onClick={() => setIsOpen(false)}>
  <button onClick={toggleDropdown} className="dropdown-toggle">Shop</button>

  <AnimatePresence>
    {dropdownOpen && (
      <motion.ul
        className="dropdown-menu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
<li><Link to="/shop/all" onClick={() => setIsOpen(false)}><FiBox /> All Products</Link></li>
<li><Link to="/shop/new" onClick={() => setIsOpen(false)}><FiTag /> New Arrivals</Link></li>
<li><Link to="/shop/best-sellers" onClick={() => setIsOpen(false)}><FiStar /> Best Sellers</Link></li>

      </motion.ul>
    )}
  </AnimatePresence>
</li>


          <li><a href="#services" onClick={() => setIsOpen(false)}>Services</a></li>
          <li><a href="#testimonials" onClick={() => setIsOpen(false)}>Testimonials</a></li>
          <li><a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a></li>
          <li><Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>

          <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mobile-icons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <a href="#account" className="icon-link" onClick={() => setIsOpen(false)}><FiUser /> Account</a>

                <div className="icon-badge">
                  <a href="#wishlist" className="icon-link" onClick={() => setIsOpen(false)}>
                    <FiHeart /> Wishlist
                  </a>
                  {wishlistCount > 0 && <span className="badge" onClick={() => setIsOpen(false)}>{wishlistCount}</span>}
                </div>

                <div className="icon-badge">
                  <a href="#cart" className="icon-link" onClick={() => setIsOpen(false)}>
                    <FiShoppingCart /> Cart
                  </a>
                  {cartCount > 0 && <span className="badge" onClick={() => setIsOpen(false)}>{cartCount}</span>}
                </div>

                <a href="tel:+234000000000" className="icon-link" onClick={() => setIsOpen(false)}><FiPhone /> Call</a>

                <button onClick={() => setShowAuthModal(true)} className="auth-btn" onClick={() => setIsOpen(false)}>
                  {isLoggedIn ? 'Logout' : 'Login'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </ul>

<div className="nav-right">
  <a href="#account" className="icon-link"><FiUser /></a>

  <div className="icon-badge">
    <a href="#wishlist" className="icon-link"><FiHeart /></a>
    {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
  </div>

  <div className="icon-badge">
    <a href="#cart" className="icon-link"><FiShoppingCart /></a>
    {cartCount > 0 && <span className="badge">{cartCount}</span>}
  </div>

  <a href="tel:+234000000000" className="icon-link"><FiPhone /></a>

  {/* ✅ DESKTOP LOGIN/LOGOUT BUTTON */}
  <button onClick={() => setShowAuthModal(true)} className="auth-btn">
    {isLoggedIn ? 'Logout' : 'Login'}
  </button>
</div>


        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span /><span /><span />
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </nav>
  );
};

export default Navbar;
