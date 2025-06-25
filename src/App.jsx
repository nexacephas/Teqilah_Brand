import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Testimonial from './components/Testimonial/Testimonial';
import Gallery from './pages/Gallery/Gallery';
import Blog from './pages/Blog/Blog';
import './styles/global.css';
import { Link } from 'react-router-dom';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AllProducts from './pages/Shop/AllProducts';
import NewArrivals from './pages/Shop/NewArrivals';
import BestSellers from './pages/Shop/BestSellers';

import Shop from './pages/Shop/Shop';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Services />
              <Testimonial />
              <Gallery />
              <Contact/>
              <Footer/>
            </>
          }
        />
        <Route path="/blog" element={<Blog />} />
         <Route path="/shop" element={<Shop />} />
         <Route path="/shop/all" element={<AllProducts />} />
<Route path="/shop/new" element={<NewArrivals />} />
<Route path="/shop/best-sellers" element={<BestSellers />} />

      </Routes>
    </Router>
  );
};

export default App;
