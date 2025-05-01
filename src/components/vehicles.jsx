// VehicleManagement.jsx
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import './css pages/vehicles.css';
import ritLogo from './assets/rit-logo-new.png';
import { useNavigate, Link } from 'react-router-dom';

const Vehicles = () => {
  const [activeMenu, setActiveMenu] = useState('Vehicles');
  const navigate = useNavigate();

  const vehicles = [
    { busNo: 'R12', routeName: 'MINJUR' },
    { busNo: 'R21', routeName: 'MKB NAGAR' },
    { busNo: 'R18', routeName: 'PALLIKARANAI' },
    { busNo: 'T05', routeName: 'THACHOOR' }, // Added a new bus for demonstration
  ];

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

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  };

  const detailsCellStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const detailsIconStyle = {
    color: 'orange',
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-section">
          <img src={ritLogo} alt="RIT Logo" className="logo" />
        </div>
        <h1 className="title">VEHICLES</h1>
      </header>

      <div className="content-container">
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

        <div className="main-content">
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
          </div>

          <div className="vehicle-table-container">
            <div className="vehicle-table-header">
              <div className="vehicle-table-cell">Bus No.</div>
              <div className="vehicle-table-cell">Route Name</div>
              <div className="vehicle-table-cell">Details</div>
            </div>

            {vehicles.map((vehicle, index) => (
              <Link
                key={index}
                to={`/bus-details/${vehicle.busNo}`}
                style={linkStyle}
              >
                <div className="vehicle-table-row">
                  <div className="vehicle-table-cell">{vehicle.busNo}</div>
                  <div className="vehicle-table-cell">{vehicle.routeName}</div>
                  <div
                    className="vehicle-table-cell details-cell"
                    style={detailsCellStyle}
                  >
                    <ChevronRight size={18} style={detailsIconStyle} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;