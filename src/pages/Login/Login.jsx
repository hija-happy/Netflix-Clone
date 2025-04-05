import React, { useState } from 'react';
import './Login.css';
import NetflixBG from '../../assets/images/home_background.webp';
import NetflixLogo from '../../assets/images/LOGO.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
  
    // Optional: Basic validation
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const res = await axios.post(
        `http://localhost:4000${endpoint}`,
        isSignUp
          ? {
              name: formData.fullName,
              email: formData.email,
              password: formData.password
            }
          : {
              email: formData.email,
              password: formData.password
            },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          // withCredentials: true // use if backend uses cookies
        }
      );
  
      const data = res.data;
  
      if (!isSignUp) {
        localStorage.setItem('token', data.token);  // Save token
        navigate('/home'); // ✅ Redirect after successful login
      } else {
        alert("Signup successful. Please log in.");
        setIsSignUp(false); // Switch to login form
      }
  
    } catch (err) {
      console.error('Axios Error:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Something went wrong');
      } else {
        setError('Network error. Try again later.');
      }
    }
  };

  return (
    <div className='login-container'>
      <img className="netflix-background" src={NetflixBG} />
      <div className='logo'>
        <img className="netflix-logo" src={NetflixLogo} />
      </div>
      <div className="login-form-main">
        <form className={`login-form ${isSignUp ? 'sign-up' : ''}`} onSubmit={handleSubmit}>
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          {isSignUp && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type='submit' className='login-button'>
            {isSignUp ? "Sign Up" : "Login"}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <p className="new-to-netflix">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <span onClick={toggleMode}>
              {isSignUp ? " Login" : " Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
