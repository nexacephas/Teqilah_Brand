// HeroImageStack.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

// ✅ Import images first (outside the array)
import layer1 from '../../assets/layer1.jpg';
import layer2 from '../../assets/layer2.jpg';
import layer3 from '../../assets/layer3.jpg';
import layer4 from '../../assets/layer4.jpg';
import layer5 from '../../assets/layer5.jpg';
import layer6 from '../../assets/layer6.jpg';

const images = [layer1, layer2, layer3, layer4, layer5, layer6];

const HeroImageStack = () => {
  return (
    <div className="image-stack">
      {images.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`layer-${index + 1}`}
          className={`layer-img layer-${index + 1}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: index * 0.2,
            ease: 'easeInOut'
          }}
          whileHover={{
            scale: 1.1,
            zIndex: 99,
            rotate: 2,
            transition: { duration: 0.5, ease: 'easeInOut' }
          }}
        />
      ))}
    </div>
  );
};

export default HeroImageStack;
