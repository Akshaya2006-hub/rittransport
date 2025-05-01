import React, { useState } from 'react';
import './css pages/login_page.css';
import ritLogo from './assets/rit-logo-new.png';
import { auth } from './firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      setError('Please enter both User ID and Password.');
      return;
    }

    try {
      setError('');
      setLoading(true);

      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, userId, password);
      const user = userCredential.user;

      console.log('User logged in successfully:', user);
      navigate('/dashboard');

    } catch (error) {
      console.error('Login error:', error);
      setError('Access Denied');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Please contact your system administrator to reset your password.');
  };

  return (
    <div className="login-container">
      <div className="content-wrapper">
        <div className="login-header">
          <div className="login-logo-section">
            <img src={ritLogo} alt="RIT Logo" className="logo" />
          </div>
          <h1 className="login-title">Transport Maintenance</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="userId" className="sr-only">User ID</label>
            <input
              id="userId"
              name="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="USER ID"
              className="input-field"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className="input-field"
              disabled={loading}
            />
          </div>

          <div className="buttons">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="forgot-btn"
              disabled={loading}
            >
              Forget password
            </button>
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
