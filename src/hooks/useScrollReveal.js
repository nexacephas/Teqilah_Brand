// src/hooks/useScrollReveal.js
import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.section, .container, img');

    const reveal = (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(reveal);
    }, {
      threshold: 0.15,
    });

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

export default useScrollReveal;
