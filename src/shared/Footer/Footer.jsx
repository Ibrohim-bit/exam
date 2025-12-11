import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Computer Store</h3>
          <p>Your trusted source for computers and components. Quality products at great prices.</p>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><NavLink to="/contact">FAQ</NavLink></li>
            <li><NavLink to="/contact">Shipping Info</NavLink></li>
            <li><NavLink to="/contact">Returns</NavLink></li>
            <li><NavLink to="/contact">Support</NavLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p><FaMapMarkerAlt /> 123 Tech Street, Silicon Valley, CA 94000</p>
          <p><FaPhone /> (123) 456-7890</p>
          <p><FaEnvelope /> info@computerstore.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Computer Store. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
