// Hero.jsx
import React from 'react';
import './Hero.css';
import HeroImageStack from './HeroImageStack';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-content">
        {/* Left content */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Build Your <span>Brand</span> with Confidence
          </h1>
          <p>
            We help businesses launch, grow, and scale with modern digital experiences.
            Elevate your online presence with world-class design and tech.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">View Portfolio</button>
          </div>
        </motion.div>

        {/* Right image stack */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <HeroImageStack />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue">
        <span></span>
      </div>
    </section>
  );
};

export default Hero;
