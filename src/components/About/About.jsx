import React from 'react';
import './About.css';
import { FiStar, FiScissors, FiFeather } from 'react-icons/fi';
import aboutImage from '../../assets/about.jpg';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">

        <motion.div 
          className="about-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <img src={aboutImage} alt="Ibidola Ajoke Oluwabukunmi" className="about-image" />
        </motion.div>

        <motion.div 
          className="about-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h5 className="section-subtitle">About the Founder</h5>
          <h2 className="section-title">I’m Ibidola Ajoke Oluwabukunmi</h2>
          <p>
            I am a passionate fashion tutor and the founder of <strong>Tephilah</strong>, a steadily growing fashion brand and academy built on elegance, creativity, class, and modesty.
          </p>
          <p>
            Tephilah came to life over two years ago with a vision to empower individuals to <em>wear their imagination</em>. From bespoke outfits to hands-on training, we continue to shape confident creatives and timeless pieces.
          </p>
          <p>
            Join us on this journey of style, creativity, and empowerment. Together, we can redefine fashion and inspire the next generation of designers.
          </p>
          <p className="tagline">“Wear Your Imagination”</p>

          <div className="about-stats">
            <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
              <span className="stat-icon"><FiScissors /></span>
              2+ Years of Fashion Excellence
            </motion.div>
            <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
              <span className="stat-icon"><FiFeather /></span>
              Creative & Modest Design Philosophy
            </motion.div>
            <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
              <span className="stat-icon"><FiStar /></span>
              Fashion Academy for Emerging Designers
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
