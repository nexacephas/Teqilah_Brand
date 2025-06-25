// components/GalleryModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../pages/Gallery/Gallery.css'; // or create separate GalleryModal.css if needed

const GalleryModal = ({ image, onClose }) => {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="gallery-modal"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={image.src}
            alt={image.tag}
            className="modal-image"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="modal-caption">{image.tag}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
