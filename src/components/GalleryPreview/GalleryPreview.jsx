// components/GalleryPreview.jsx
import React from 'react';
import './Gallery.css';
import { useNavigate } from 'react-router-dom';
import layer1 from '../assets/layer1.jpg';
import layer2 from '../assets/layer2.jpg';
import layer3 from '../assets/layer3.jpg';

const previewImages = [layer1, layer2, layer3];

const GalleryPreview = () => {
  const navigate = useNavigate();

  return (
    <div className="gallery-preview">
      <h2 className="section-title">Quick Look</h2>
      <div className="gallery-grid">
        {previewImages.map((img, i) => (
          <div key={i} className="gallery-card">
            <img src={img} alt={`preview-${i}`} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="btn-wrap">
        <button onClick={() => navigate('/gallery')} className="btn-primary">
          View Full Gallery
        </button>
      </div>
    </div>
  );
};

export default GalleryPreview;
