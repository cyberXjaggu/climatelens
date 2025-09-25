import React, { useState } from 'react';
import OTPVerification from './OTPVerification';
import ForgotPassword from './ForgotPassword';
import './Auth.css';

interface AuthProps {
  onLogin: (token: string, user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    languagePreference: 'english'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!isLogin) {
      // Send OTP for registration
      try {
        const response = await fetch('http://localhost:5000/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        });
        
        if (response.ok) {
          setPendingEmail(formData.email);
          setShowOTP(true);
        } else {
          alert('Failed to send OTP');
        }
      } catch (error) {
        alert('Failed to send OTP');
      }
    } else {
      // Direct login
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
          onLogin(data.token, data.user);
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert('Login failed');
      }
    }
    setLoading(false);
  };

  const handleOTPVerified = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setShowOTP(false);
        setIsLogin(true);
        setFormData({ email: formData.email, password: '', name: '', languagePreference: 'english' });
        alert('Registration successful! Please login with your credentials.');
      } else {
        alert(data.error);
        setShowOTP(false);
      }
    } catch (error) {
      alert('Registration failed');
      setShowOTP(false);
    }
  };

  if (showForgotPassword) {
    return (
      <ForgotPassword
        onBack={() => setShowForgotPassword(false)}
      />
    );
  }

  if (showOTP) {
    return (
      <OTPVerification
        email={pendingEmail}
        onVerified={handleOTPVerified}
        onBack={() => setShowOTP(false)}
      />
    );
  }

  return (
    <div className="auth-page">
      <div className="overlay"></div>
      
      <header className="auth-header">
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

      <main className="auth-main">
        <div className="auth-container">
          <h2 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Join ClimateLens'}
          </h2>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to continue sharing climate stories' : 'Start sharing your climate impact stories'}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  autoComplete="name"
                  required
                />
              </div>
            )}
            
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                autoComplete="email"
                required
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
              />
            </div>
            
            {!isLogin && (
              <div className="input-group">
                <select
                  value={formData.languagePreference}
                  onChange={(e) => setFormData({...formData, languagePreference: e.target.value})}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="nepali">Nepali</option>
                </select>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="auth-btn"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          <div className="auth-links">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="link-btn"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
            
            {isLogin && (
              <button
                onClick={() => setShowForgotPassword(true)}
                className="forgot-btn"
              >
                Forgot Password?
              </button>
            )}
          </div>
        </div>
      </main>
      
      <footer className="auth-footer">
        <p>Powered by ClimateLens | OpenWeather | Gemini AI</p>
      </footer>
    </div>
  );
};

export default Auth;