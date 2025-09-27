import React, { useState } from 'react';
import './OTPVerification.css';

interface OTPProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPProps> = ({ email, onVerified, onBack }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      if (response.ok) {
        onVerified();
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      alert('Verification failed');
    }
    setLoading(false);
  };

  const resendOTP = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      alert('OTP resent successfully');
    } catch (error) {
      alert('Failed to resend OTP');
    }
  };

  return (
    <div className="otp-page">
      <div className="overlay"></div>
      
      <header className="otp-header">
        <h1>🌍 ClimateLens</h1>
        <nav>
          <ul className="menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="otp-main">
        <div className="otp-container">
          <h2 className="otp-title">Verify Email</h2>
          <p className="otp-subtitle">
            Enter the 6-digit OTP sent to <strong>{email}</strong>
          </p>

          <form onSubmit={handleVerify} className="otp-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                autoComplete="one-time-code"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="otp-btn" 
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <div className="otp-links">
            <button onClick={resendOTP} className="resend-btn">
              Resend OTP
            </button>
            <span className="separator">|</span>
            <button onClick={onBack} className="back-btn">
              ← Back
            </button>
          </div>
        </div>
      </main>
      
      <footer className="otp-footer">
        <p>Powered by ClimateLens | OpenWeather | Gemini AI</p>
      </footer>
    </div>
  );
};

export default OTPVerification;