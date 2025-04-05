import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faXTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <FontAwesomeIcon  icon={faInstagram} className='icons' color="white" />
        <FontAwesomeIcon  icon={faYoutube} className='icons' color="white" />
        <FontAwesomeIcon  icon={faXTwitter} className='icons' color="white" />
        <FontAwesomeIcon icon={faFacebookF} className='icons' color="white" />
      </div>
      <ul>
          <li>About Us</li>
          <li>Services</li>
          <li>Contact</li>
          <li>Blog</li>
          <li>Careers</li>
          <li>FAQ</li>
          <li>Support</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Sitemap</li>
          <li>Accessibility</li>
          <li>Feedback</li>
</ul>
      <div className="footer-text">
        <p>&copy; 1997-25 Netflix. All rights reserved.</p>
    </div>
    </div>
  );
}

export default Footer;
