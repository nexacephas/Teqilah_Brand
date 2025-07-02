import React, { useState } from 'react';
import './Contact.css';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const formData = new FormData(e.target);
    formData.append("access_key", "b0d63608-782b-495a-a8ab-03c7d80e1c92"); // ✅ Replace with your real access key

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Message sent successfully!");
        e.target.reset();
      } else {
        setStatus("❌ Failed to send. Try again later.");
      }
    } catch (error) {
      console.error("Web3Forms Error:", error);
      setStatus("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-container">
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

          {/* Form with Web3Forms */}
          <motion.form 
  className="contact-right"
  onSubmit={handleSubmit}
  data-captcha="true"         // ✅ Add this line
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
          >
            <motion.div className="form-group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="floating-label">
                <input type="text" name="name" required />
                <label>Your Name</label>
              </div>
              <div className="floating-label">
                <input type="email" name="email" required />
                <label>Your Email</label>
              </div>
            </motion.div>

            <motion.div className="floating-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <textarea name="message" rows="5" required />
              <label>Your Message</label>
            </motion.div>

            <motion.button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>

            {status && <p className="form-status">{status}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
