import React, { useState } from 'react';
import './css pages/login_page.css';
import ritLogo from './assets/rit-logo-new.png'; // Ensure this path is correct

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      alert('Please enter both User ID and Password.');
      return;
    }
    // Handle login logic here
    console.log('Login attempt with:', { userId, password });
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password clicked');
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
            />
          </div>

          <div className="buttons">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="forgot-btn"
            >
              Forget password
            </button>
            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
