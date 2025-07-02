import React from 'react';
import './Hero.css';
import HeroImageStack from './HeroImageStack';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="glass-overlay" />

      <div className="container hero-content">
        {/* Left Text */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Build Your <span className="gradient-text">Brand</span> with Confidence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            We help businesses launch, grow, and scale with modern digital experiences.
            Elevate your online presence with world-class design and tech.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <a href="http://localhost:5174"
  target="_blank"
  rel="noopener noreferrer">
    <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="image-stack-wrapper"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut'
            }}
          >
            <HeroImageStack />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue">
        <span className="scroll-dot"></span>
      </div>
    </section>
  );
};

export default Hero;
