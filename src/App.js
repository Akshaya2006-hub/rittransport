import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import LoginPage from './components/login_page';
import Dashboard from './components/Dashboard';
import Maintenance from './components/Maintenance';
import BusDetails from './components/BusDetails';
import Vehicles from './components/vehicles';
import Drivers from './components/Drivers';

// Card and Task Components
import TodayTasks from './components/todaytasks';
import VehiclesList from './components/VehiclesList';
import DieselInfo from './components/DiselInfo';
import OrdersPage from './components/OrdersPage';

// Additional Task Routes
import ToBeServiced from './components/to-be-serviced';
import OutForService from './components/out-for-service';
import OpenIssues from './components/open-issues';
import ClosedIssues from './components/closed-issues';

// Optional: Global styles
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Route */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Main Navigation Routes */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Maintenance" element={<Maintenance />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/Drivers" element={<Drivers />} />
        
        {/* Specific Details Routes */}
        <Route path="/bus-details/:busNo" element={<BusDetails />} />
        
        {/* Card-Specific Routes */}
        <Route path="/components/todaytasks" element={<TodayTasks/>} />
        <Route path="/components/VehiclesList" element={<VehiclesList />} />
        <Route path="/components/DiselInfo" element={<DieselInfo />} />
        
        <Route path="/components/OrdersPage" element={<OrdersPage/>} />
        
        {/* Task Routes */}
        <Route path="/components/to-be-serviced" element={<ToBeServiced />} />
        <Route path="/components/out-for-service" element={<OutForService />} />
        <Route path="/components/open-issues" element={<OpenIssues />} />
        <Route path="/components/closed-issues" element={<ClosedIssues />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;