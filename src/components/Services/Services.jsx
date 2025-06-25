// Services.jsx
import React, { useState, useEffect } from 'react';
import { FiScissors, FiTrendingUp, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from './ServiceModal';
import './Services.css';

const services = [
  {
    title: 'Fashion Training',
    desc: 'Professional training tailored for all levels.',
    longDesc: 'We provide structured, intensive fashion design training for beginners and professionals. Learn cutting-edge tailoring, sketching, and styling in a practical environment.',
    icon: <FiScissors />,
    cta: 'Enroll Now'
  },
  {
    title: 'Brand Styling',
    desc: 'Creative styling that speaks elegance and modesty.',
    longDesc: 'Our styling services focus on blending elegance with modesty. We help you build a timeless wardrobe and style that reflects your personality and purpose.',
    icon: <FiTrendingUp />,
    cta: 'Book a Stylist'
  },
  {
    title: 'Ready-to-Wear Shop',
    desc: 'Classy and unique pieces for every occasion.',
    longDesc: 'Explore our collection of elegant, ready-to-wear outfits crafted for comfort, class, and confidence. Each design is a blend of creativity and excellence.',
    icon: <FiShoppingBag />,
    cta: 'Shop Now'
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeService ? 'hidden' : 'auto';
  }, [activeService]);

  return (
    <section className="services-section" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, i) => (
            <motion.div
              className="service-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: 'easeOut' }}
              onClick={() => setActiveService(service)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <button
                className="service-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveService(service);
                }}
              >
                {service.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <ServiceModal
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
