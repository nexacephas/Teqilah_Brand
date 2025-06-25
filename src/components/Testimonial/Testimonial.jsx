// Testimonials.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonial.css';

import { testimonials } from './testimonialsData';

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src={item.image} alt={item.name} />
                </div>
                <p className="testimonial-text">“{item.message}”</p>
                <div className="testimonial-stars">
                  {Array(item.rating).fill().map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <h4 className="testimonial-name">{item.name}</h4>
                <span className="testimonial-role">{item.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="testimonial-cta">
          <a href="#contact" className="btn-primary">Share Your Experience</a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
