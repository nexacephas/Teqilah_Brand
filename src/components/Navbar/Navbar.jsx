import React, { useState, useRef, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import {
  FiMenu, FiX, FiHeart, FiShoppingCart, FiUser, FiPhone,
  FiBox, FiTag, FiStar, FiLogOut, FiUserCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo-navbar.png';
import useClickOutside from '../../hooks/useClickOutside';
import AuthModal from '../AuthModal/AuthModal';
import { useCart } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef();
  const userRef = useRef();

  const { cartCount } = useCart();
  const { user, logout } = useContext(AuthContext);

  useClickOutside(dropdownRef, () => setDropdownOpen(false));
  useClickOutside(userRef, () => setUserDropdownOpen(false));

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const toggleUserDropdown = () => setUserDropdownOpen(prev => !prev);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo" data-aos="fade-right">
          <Link to="/" onClick={() => setIsOpen(false)}>
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
                  <li><Link to="/shop/all"><FiBox /> All Products</Link></li>
                  <li><Link to="/shop/new"><FiTag /> New Arrivals</Link></li>
                  <li><Link to="/shop/best-sellers"><FiStar /> Best Sellers</Link></li>
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
                {user ? (
                  <>
                    <a href="#account" className="icon-link" onClick={() => setIsOpen(false)}><FiUser /> {user.name}</a>
                    <Link to="/orders" className="icon-link" onClick={() => setIsOpen(false)}><FiBox /> Orders</Link>
                    <button className="auth-btn" onClick={() => logout()}>Logout</button>
                  </>
                ) : (
                  <button onClick={() => setShowAuthModal(true)} className="auth-btn">Login</button>
                )}
                <div className="icon-badge">
                  <Link to="/wishlist" className="icon-link"><FiHeart /></Link>
                </div>
                <div className="icon-badge">
                  <Link to="/cart" className="icon-link"><FiShoppingCart />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ul>

        <div className="nav-right">
          <div className="user-icon" ref={userRef}>
            <button className="icon-link" onClick={toggleUserDropdown}><FiUser /></button>
            <AnimatePresence>
              {userDropdownOpen && user && (
                <motion.ul
                  className="user-dropdown"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <li><Link to="/account"><FiUserCheck /> My Account</Link></li>
                  <li><Link to="account/orders"><FiBox /> My Orders</Link></li>
                  <li><button onClick={logout}><FiLogOut /> Logout</button></li>
                </motion.ul>
              )}
              {userDropdownOpen && !user && (
                <motion.ul
                  className="user-dropdown"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <li><button onClick={() => setShowAuthModal(true)}>Login</button></li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="icon-badge">
            <Link to="/wishlist" className="icon-link"><FiHeart /></Link>
          </div>

          <div className="icon-badge">
            <Link to="/cart" className="icon-link">
              <FiShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>

          <a href="tel:+234000000000" className="icon-link"><FiPhone /></a>
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
