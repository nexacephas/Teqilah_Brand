import React, { useState } from 'react';
import './Gallery.css';
import GalleryModal from '../../components/GalleryPreview/GalleryModal';
import { motion, AnimatePresence } from 'framer-motion';

import layer1 from '../../assets/layer1.jpg';
import layer2 from '../../assets/layer2.jpg';
import layer3 from '../../assets/layer3.jpg';
import layer4 from '../../assets/layer4.jpg';
import layer5 from '../../assets/layer5.jpg';
import layer6 from '../../assets/layer6.jpg';

const galleryImages = [
  { src: layer1, tag: 'fashion' },
  { src: layer2, tag: 'event' },
  { src: layer3, tag: 'training' },
  { src: layer4, tag: 'fashion' },
  { src: layer5, tag: 'event' },
  { src: layer6, tag: 'fashion' },
];

const Gallery = () => {
  const [activeTag, setActiveTag] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered = activeTag === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.tag === activeTag);

  const visibleImages = filtered.slice(0, visibleCount);

  return (
    <section className="gallery-section">
      <h2 className="section-title">Gallery</h2>

      <div className="gallery-filters">
        {['all', 'fashion', 'event', 'training'].map((tag) => (
          <motion.button
            key={tag}
            onClick={() => {
              setActiveTag(tag);
              setVisibleCount(6);
            }}
            className={`filter-btn ${activeTag === tag ? 'active' : ''}`}
            whileHover={{ scale: 1.1 }}
          >
            {tag}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="gallery-grid">
        <AnimatePresence>
          {visibleImages.map((img, i) => (
            <motion.figure
              key={img.src + i}
              className="gallery-card"
              onClick={() => setSelectedImage(img)}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <img src={img.src} alt={img.tag} loading="lazy" />
              <span className="tag-badge">{img.tag}</span>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleCount < filtered.length && (
        <div className="load-more-wrap">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="btn-secondary"
          >
            Load More
          </button>
        </div>
      )}

      {/* Reusable Modal */}
      <GalleryModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
};

export default Gallery;
