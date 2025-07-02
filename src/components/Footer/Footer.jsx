// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiArrowUp
} from 'react-icons/fi';
import logo from '../../assets/logo-navbar.png';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="footer-container container">
        {/* Top Section */}
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo & Intro */}
          <div className="footer-brand">
            <motion.img
              src={logo}
              alt="Tephilah Logo"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <p>
              Tephilah is a growing fashion brand and academy that blends creativity,
              elegance, and modesty. <strong>Wear your imagination.</strong>
            </p>
          </div>

          {/* Footer Links */}
          <div className="footer-links-group">
            <div className="footer-links">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="#testimonial">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Help</h4>
              <ul>
                <li><a href="#faq">FAQs</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="#academy">Join Academy</a></li>
                <li><a href="#shop">Shop</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li><a href="#policy">Privacy Policy</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Join our newsletter for style tips & updates</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Subscribed!');
                e.target.reset();
              }}
            >
              <input type="email" placeholder="Your Email" required />
              <button type="submit"><FiMail /></button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <p>&copy; {new Date().getFullYear()} Tephilah Fashion. All rights reserved.</p>

          <div className="footer-socials">
            {[{
              icon: <FiFacebook />,
              href: 'https://facebook.com'
            }, {
              icon: <FiInstagram />,
              href: 'https://instagram.com'
            }, {
              icon: <FiTwitter />,
              href: 'https://twitter.com'
            }, {
              icon: <FiYoutube />,
              href: 'https://youtube.com'
            }].map(({ icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                {icon}
              </motion.a>
            ))}
            <motion.button
              className="scroll-top-btn"
              onClick={scrollToTop}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
              title="Back to Top"
            >
              <FiArrowUp />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
