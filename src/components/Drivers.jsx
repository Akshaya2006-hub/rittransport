import React, { useState } from 'react';
import './css pages/Drivers.css';
import ritLogo from './assets/rit-logo-new.png';

function Drivers() {
  const [activePage, setActivePage] = useState('drivers');
  const [activeMenu, setActiveMenu] = useState('Drivers'); // Define activeMenu state
  const [drivers, setDrivers] = useState([
    { name: 'Ram', phone: '9685452789' },
    { name: 'Vignesh', phone: '9685452789' },
    { name: 'Vadivelu', phone: '9685452789' },
    { name: 'Nataraj', phone: '9685452789' },
    { name: 'Thiyagaraj', phone: '9685452789' },
    { name: 'Ravi', phone: '9685452789' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const handleMenuClick = (menu) => { // Define handleMenuClick function
    setActiveMenu(menu);
  };

  const handleAdd = () => {
    console.log("Add driver clicked");
  };

  const handleRemove = () => {
    console.log("Remove driver clicked");
  };

  const handleModify = () => {
    console.log("Modify driver clicked");
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-section">
          <img src={ritLogo} alt="RIT Logo" className="logo" />
        </div>
        <h1 className="title">DRIVERS</h1>
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
          

          <div className="content-area">
            <div className="drivers-table">
              <div className="table-header">
                <div className="name-column">Driver's Name</div>
                <div className="phone-column">Phone</div>
              </div>
              {drivers.map((driver, index) => (
                <div key={index} className="table-row">
                  <div className="name-cell">{driver.name}</div>
                  <div className="phone-cell">{driver.phone}</div>
                </div>
              ))}
            </div>

            <div className="controls">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="action-button add-button" onClick={handleAdd}>+ Add</button>
              <button className="action-button remove-button" onClick={handleRemove}>- Remove</button>
              <button className="action-button modify-button" onClick={handleModify}>Modify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drivers;
