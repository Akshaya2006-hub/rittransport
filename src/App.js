// App.js
import React from 'react';
import LoginPage from './components/login_page';
import Dashboard from './components/Dashboard';
import Maintenance from './components/Maintenance';
import BusDetails from './components/BusDetails';
import { HashRouter as Router ,Routes,Route } from 'react-router-dom';
// Adjust the path if needed
import './App.css'; // Optional: your global styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Maintenance" element={<Maintenance/>}/>
        <Route path="/BusDetails" element={<BusDetails/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
