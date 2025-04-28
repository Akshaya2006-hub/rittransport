import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import './css pages/Dashboard.css'; // Using your existing CSS path
import ritLogo from './assets/rit-logo-new.png';
const Navbar =() =>{
  return (
    <nav>
      <h1>
      <img src={ritLogo} alt="RIT Logo" className="logo" />
      </h1>
      <ul>
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Maintenance">Maintenance</Link>
        <Link to="/vehicles">vehicles</Link>
        <Link to="/Drivers">Drivers</Link>
      </ul>
    </nav>
  );
};
export default Navbar;

  