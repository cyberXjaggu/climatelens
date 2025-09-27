import React, { useState } from 'react';
import OTPVerification from './OTPVerification';

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setStep('otp');
      } else {
        alert('Failed to send OTP');
      }
    } catch (error) {
      alert('Failed to send OTP');
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      
      if (response.ok) {
        alert('Password reset successfully! Please login with your new password.');
        onBack();
      } else {
        alert('Failed to reset password');
      }
    } catch (error) {
      alert('Failed to reset password');
    }
  };

  if (step === 'otp') {
    return (
      <OTPVerification
        email={email}
        onVerified={() => setStep('password')}
        onBack={() => setStep('email')}
      />
    );
  }

  if (step === 'password') {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Reset Password</h2>
        <form onSubmit={resetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Forgot Password</h2>
      <form onSubmit={sendOTP}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            background: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginBottom: '10px'
          }}
        >
          Send OTP
        </button>
      </form>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer' }}>
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;