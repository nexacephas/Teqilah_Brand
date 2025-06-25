// ServiceModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import './Services.css';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modal = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 }
};

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <motion.div
      className="modal-backdrop"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div className="modal-content" variants={modal}>
        <button className="modal-close" onClick={onClose}>
          <FiX size={24} />
        </button>
        <div className="modal-icon">{service.icon}</div>
        <h2>{service.title}</h2>
        <p>{service.longDesc}</p>
        <button className="modal-action">{service.cta}</button>
      </motion.div>
    </motion.div>
  );
};

export default ServiceModal;
