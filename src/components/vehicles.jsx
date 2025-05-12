// VehicleManagement.jsx
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import './css pages/vehicles.css';
import ritLogo from './assets/rit-logo-new.png';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config'; // Import auth

const Vehicles = () => {
  const [activeMenu, setActiveMenu] = useState('Vehicles');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const navigate = useNavigate();

  const vehicles = [
    { busNo: 'R12', routeName: 'MINJUR' },
    { busNo: 'R21', routeName: 'MKB NAGAR' },
    { busNo: 'R18', routeName: 'PALLIKARANAI' },
    { busNo: 'R05', routeName: 'THACHOOR' },
    { busNo: 'R01', routeName: 'COLLECTOR NAGAR' },
    { busNo: 'R11', routeName: 'ENNORE' },
    { busNo: 'R13', routeName: 'TRIPLECANE' },
    { busNo: 'R22', routeName: 'CIT NAGAR' },
    { busNo: 'R23', routeName: 'ARAKKONAM' },
    { busNo: 'R24', routeName: 'THIRUTANI' },
    { busNo: 'R14', routeName: 'GUINDY' },
    { busNo: 'R15', routeName: 'PUDUR' }, // Added a new bus for demonstration
  ];

  // Initialize filteredVehicles with all vehicles on component mount
  useEffect(() => {
    setFilteredVehicles(vehicles);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    // Filter vehicles based on search term (both bus number and route name)
    const filtered = vehicles.filter(
      vehicle => 
        vehicle.busNo.toLowerCase().includes(term) || 
        vehicle.routeName.toLowerCase().includes(term)
    );
    
    setFilteredVehicles(filtered);
  };

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
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('User signed out.');
        navigate('/'); // Redirect to the login page after logout
      })
      .catch((error) => {
        // An error happened.
        console.error('Error signing out:', error);
        //  Consider showing an error message to the user here.
      });
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
          <button className="logout-btn sidebar-logout-btn" onClick={handleLogout}>Log out</button>
        </nav>

        <div className="main-content">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search by bus number or route name" 
              className="search-input" 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="vehicle-table-container">
            <div className="vehicle-table-header">
              <div className="vehicle-table-cell">Bus No.</div>
              <div className="vehicle-table-cell">Route Name</div>
              <div className="vehicle-table-cell">Details</div>
            </div>

            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (
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
              ))
            ) : (
              <div className="no-results-message">
                No vehicles found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;