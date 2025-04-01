import React, { useState } from 'react';
import './Login.css'
import NetflixBG from '../../assets/images/home_background.webp'
import NetflixLogo from '../../assets/images/LOGO.png'
const Login = () => {


  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => {
    console.log("Current state:", isSignUp);
    setIsSignUp(!isSignUp);
    console.log("Toggling to:", !isSignUp);
  };
  

  return (
    <div className='login-container'>
      <img className="netflix-background" src={NetflixBG}  />
      <div className='logo'>
        <img className="netflix-logo" src={NetflixLogo} />
      </div>
      <div className="login-form-main">
        
        <form className={`login-form ${isSignUp ? 'sign-up' : ''}`}>
        <h2>{isSignUp? "Sign Up": "Login"}</h2>
          {isSignUp && <input type="text" placeholder="Full Name" required/> }
          <input type="email" placeholder='Email' required />
          <input type="password" placeholder='Password' required />
          {isSignUp && <input type="password" placeholder='Confirm Password' required/>}
          <button type='submit' className='login-button'>{isSignUp? "Sign Up":" Login"}</button>
          
          <p className="new-to-netflix">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <span onClick={toggleMode}>
          {isSignUp ? " Login" : " Sign Up"}
        </span>
      </p>
        </form>
      </div>
    </div>
  )
}

export default Login