import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Velvet Bloom</h2>
          <p>Bringing nature’s elegance to every doorstep.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#arrivals">Shop</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div> 

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: hello@velvetbloom.com</p>
          <p>Phone: +1 (234) 567-8901</p>
          <p>123 Blossom Avenue, Garden City</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Velvet Bloom. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;