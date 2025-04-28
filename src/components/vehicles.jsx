// VehicleManagement.jsx
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import './css pages/vehicles.css';
import ritLogo from './assets/rit-logo-new.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Vehicles = () => {
  // State for active sidebar item
  const [activeMenu, setActiveMenu] = useState('Vehicles');
  const navigate = useNavigate(); // Initialize navigate

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
    switch (menuItem) {
      case 'Dashboard':
        navigate('/Dashboard');
        break;
      case 'Vehicles':
        navigate('/vehicles');
        break;
      case 'Maintenance':
        navigate('/Maintenance');
        break;
      case 'Drivers':
        navigate('/Drivers');
        break;
      default:
        break;
    }
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
          <div className="vehicle-table-container">
            <div className="vehicle-table-header">
              <div className="vehicle-table-cell">Bus No.</div>
              <div className="vehicle-table-cell">Route Name</div>
              <div className="vehicle-table-cell">Details</div>
            </div>

            {vehicles.map((vehicle, index) => (
              <div key={index} className="vehicle-table-row">
                <div className="vehicle-table-cell">{vehicle.busNo}</div>
                <div className="vehicle-table-cell">{vehicle.routeName}</div>
                <div className="vehicle-table-cell details-cell">
                  <ChevronRight size={18} className="vehicle-details-icon" />
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