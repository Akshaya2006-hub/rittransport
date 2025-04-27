// VehicleManagement.jsx
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import './vehicles.css';
import ritLogo from './assets/rit-logo-new.png'; 

const Vehicles = () => {
  // State for active sidebar item
  const [activeMenu, setActiveMenu] = useState('Vehicles');

  // Data for the vehicle table
  const vehicles = [
    { busNo: 'R12', routeName: 'MINJUR' },
    { busNo: 'R21', routeName: 'MKB NAGAR' },
    { busNo: 'R12', routeName: 'THACHOOR' },
    { busNo: 'R18', routeName: 'PALLIKARANAI' },
  ];

  // Handle menu item click
  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  return (
    <div className="app-container">
      {/* Header with left-aligned logo and title */}
      <header className="header">
        <div className="logo-section">
          <img src={ritLogo} alt="RIT Logo" className="logo" />
        </div>
        <h1 className="title">VEHICLES</h1>
      </header>
      
      {/* Content container with sidebar and dashboard */}
      <div className="content-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <div 
            className={`menu-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
            onClick={() => handleMenuClick('Dashboard')}
          >
            Dashboard {activeMenu === 'Dashboard' && '▸'}
          </div>
          <div 
            className={`menu-item ${activeMenu === 'Vehicles' ? 'active' : ''}`}
            onClick={() => handleMenuClick('Vehicles')}
          >
            Vehicles {activeMenu === 'Vehicles' && '▸'}
          </div>
          <div 
            className={`menu-item ${activeMenu === 'Maintenance' ? 'active' : ''}`}
            onClick={() => handleMenuClick('Maintenance')}
          >
            Maintenance {activeMenu === 'Maintenance' && '▸'}
          </div>
          <div 
            className={`menu-item ${activeMenu === 'Drivers' ? 'active' : ''}`}
            onClick={() => handleMenuClick('Drivers')}
          >
            Drivers {activeMenu === 'Drivers' && '▸'}
          </div>
        </nav>
      
        {/* Main content */}
        <div className="main-content">
          {/* Search Bar */}
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
          </div>

          {/* Vehicle Table */}
          <div className="table-container">
            <div className="table-header">
              <div className="table-cell">Bus No.</div>
              <div className="table-cell">Route Name</div>
              <div className="table-cell">Details</div>
            </div>

            {vehicles.map((vehicle, index) => (
              <div key={index} className="table-row">
                <div className="table-cell">{vehicle.busNo}</div>
                <div className="table-cell">{vehicle.routeName}</div>
                <div className="table-cell details-cell">
                  <ChevronRight size={18} className="details-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;