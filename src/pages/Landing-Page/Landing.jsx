import React from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/home_background.webp';
import Logo from '../../assets/images/LOGO.png';

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className="header"> 
        <img src={bgImage} alt="Background" className="background-img" />
      <nav>
        <img src={Logo} alt="Logo" className="logo" />
        <div>
          <button className="nav-language">
            <span role="img" aria-label="globe">🌐</span>
            English <span>▼</span>
          </button>
          <button onClick={()=> navigate('/login')}>Sign In</button>
        </div>
      </nav>

      <div className="header-content">
        <h1>Unlimited movies, TV shows and more.</h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <p>Ready to watch? Enter your email to create or restart your membership</p>
        <form className="email-signup">
          <input type="email" placeholder="Email address" required />
          <button type="submit">Get Started &gt;</button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
