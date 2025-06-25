// About.jsx
import React from 'react';
import './About.css';
import { FiStar, FiScissors, FiFeather } from 'react-icons/fi';
import aboutImage from '../../assets/about.jpg'; // Replace later

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        <div className="about-left" data-aos="fade-right">
          <img src={aboutImage} alt="Ibidola Ajoke Oluwabukunmi" className="about-image" />
        </div>

        <div className="about-right" data-aos="fade-left">
          <h5 className="section-subtitle">About the Founder</h5>
          <h2 className="section-title">I’m Ibidola Ajoke Oluwabukunmi</h2>
          <p>
            I am a passionate fashion tutor and the founder of <strong>Tephilah</strong>, a steadily growing fashion brand and academy built on elegance, creativity, class, and modesty.
          </p>
          <p>
            Tephilah came to life over two years ago with a vision to empower individuals to <em>wear their imagination</em>. From bespoke outfits to hands-on training, we continue to shape confident creatives and timeless pieces.
          </p>
            <p>
                Join us on this journey of style, creativity, and empowerment. Together, we can redefine fashion and inspire the next generation of designers.</p>
                <p className="tagline">“Wear Your Imagination”</p>

          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-icon"><FiScissors /></span>
              2+ Years of Fashion Excellence
            </div>
            <div className="stat-item">
              <span className="stat-icon"><FiFeather /></span>
              Creative & Modest Design Philosophy
            </div>
            <div className="stat-item">
              <span className="stat-icon"><FiStar /></span>
              Fashion Academy for Emerging Designers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
