import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useScrollReveal from './hooks/useScrollReveal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Testimonial from './components/Testimonial/Testimonial';
import Gallery from './pages/Gallery/Gallery';
import Blog from './pages/Blog/Blog';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import Shop from './pages/Shop/Shop';
import AllProducts from './pages/Shop/AllProducts';
import NewArrivals from './pages/Shop/NewArrivals';
import BestSellers from './pages/Shop/BestSellers';

import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import Success from './pages/Success/Success';

import AdminLayout from './pages/Admin/AdminLayout';
import Products from './pages/Admin/pages/Products';
import Orders from './pages/Admin/pages/Orders';
import Dashboard from './pages/Admin/pages/Dashboard';
import ResetPassword from './pages/ResetPassword/ResetPassword';

// Account Pages
import MyAccount from './pages/Account/MyAccount';
import UserOrders from './pages/Account/UserOrders';

import './styles/global.css';

const App = () => {
  useScrollReveal();
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Home Route */}
        <Route
          path="/"
          element={
            <>
             <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
              <Hero />
              <About />
              <Services />
              <Testimonial />
              <Gallery />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* Public Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/all" element={<AllProducts />} />
        <Route path="/shop/new" element={<NewArrivals />} />
        <Route path="/shop/best-sellers" element={<BestSellers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/contact" element={<Contact />} />

        {/* 🔧 FIXED: Place this INSIDE <Routes> block */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        {/* Account Routes */}
        <Route path="/account" element={<MyAccount />} />
        <Route path="/account/orders" element={<UserOrders />} />
      </Routes>
    </Router>
  );
};

export default App;
