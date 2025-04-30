// App.js
import React from 'react';
import LoginPage from './components/login_page';
import Dashboard from './components/Dashboard';
import Maintenance from './components/Maintenance';
import BusDetails from './components/BusDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Adjust the path if needed
import './App.css'; // Optional: your global styles
import Vehicles from './components/vehicles';
import Drivers from './components/Drivers';
//import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Maintenance" element={<Maintenance />} />
        <Route path="/bus-details/:busNo" element={<BusDetails />} /> {/* Updated route */}
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/Drivers" element={<Drivers />} />
      </Routes>
    </Router>
  );
}

export default App;