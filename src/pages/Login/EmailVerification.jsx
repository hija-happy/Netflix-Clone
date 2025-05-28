import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css'; // reuse same styles
import axios from 'axios';
import NetflixBG from '../../assets/images/home_background.webp';
import NetflixLogo from '../../assets/images/LOGO.png';

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    console.log('🔍 Verifying OTP...');
    console.log('➡️ Data being sent:', { otp, userId });

    try {
      const res = await axios.post(
        'http://localhost:4000/api/auth/verify-account',
        { otp, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ OTP Verification Response:', res.data);
      setMessage('Email verified successfully!');
      navigate('/home');
    } catch (err) {
      console.error('❌ OTP Verification Error:', err);
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  const handleResendOtp = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    console.log('📩 Resending OTP...');
    console.log('➡️ Data being sent:', { userId });

    try {
      const res = await axios.post(
        'http://localhost:4000/api/auth/send-verify-otp',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('✅ OTP Resend Response:', res.data);
      setMessage('OTP sent to your email');
    } catch (err) {
      console.error('❌ OTP Resend Error:', err);
      setError('Failed to send OTP');
    }
  };

  return (
    <div className='login-container'>
      <img className="netflix-background" src={NetflixBG} />
      <div className='logo'>
        <img className="netflix-logo" src={NetflixLogo} />
      </div>
      <div className="login-form-main">
        <div className="login-form">
          <h2>Email Verification</h2>
          <p>Please enter the 6-digit code sent to <b>{email}</b></p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button className='login-button' onClick={handleVerify}>Verify</button>
          <p className="new-to-netflix">Didn't get the code? <span onClick={handleResendOtp}>Resend OTP</span></p>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
