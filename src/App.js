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
import TodaysTasksPage from './components/cards/TodaysTasksPage';
import TotalVehiclesPage from './components/cards/TotalVehiclesPage';
import DieselPage from './components/cards/DieselPage';
import IssuesPage from './components/cards/IssuesPage';
import OrdersPage from './components/cards/OrdersPage'; // Assuming path to your page component

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
        {/* Add the routes for your card-specific pages here */}
        <Route path="/today-tasks" element={<TodaysTasksPage />} />
        <Route path="/vehicles-list" element={<TotalVehiclesPage />} />
        <Route path="/diesel-info" element={<DieselPage />} />
        <Route path="/vehicle-issues" element={<IssuesPage />} />
        <Route path="/orders-list" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;