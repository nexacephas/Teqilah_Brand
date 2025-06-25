// src/components/Contact/Contact.jsx
import React from 'react';
import './Contact.css';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="container contact-container">

        {/* Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Let’s Connect</h2>
          <p className="section-subtitle">
            Whether you’re looking to enroll, style, or partner — our team is ready to respond.
          </p>
        </motion.div>

        <div className="contact-content">

          {/* Left Info */}
          <motion.div 
            className="contact-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Get in Touch</h3>
            <p>Reach us directly through any of the following channels:</p>

            <div className="contact-info">
              <div><FiMail /> tephilahfashion@gmail.com</div>
              <div><FiPhone /> +234 000 000 0000</div>
              <div><FiMapPin /> Lagos, Nigeria</div>
            </div>

            <div className="contact-note">
              <p><strong>Office Hours:</strong> Mon–Fri, 9AM – 5PM</p>
              <p><strong>Follow us:</strong> Facebook • Instagram • WhatsApp</p>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.form 
            className="contact-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! We'll get back to you shortly.");
              e.target.reset();
            }}
          >
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
