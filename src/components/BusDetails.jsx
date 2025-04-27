import React, { useState } from 'react';
import './css pages/BusDetails.css';
import ritLogo from './assets/rit-logo-new.png'; 

const BusDetails = () => {
    const [expandedSection, setExpandedSection] = useState(null);
    const [activeMenu, setActiveMenu] = useState('Vehicles'); // Add activeMenu state
  
    const toggleSection = (section) => {
      if (expandedSection === section) {
        setExpandedSection(null);
      } else {
        setExpandedSection(section);
      }
    };
    
    // Add handleMenuClick function
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
        <h1 className="title">BUS DETAILS</h1>
      </header>
      
      {/* Content container with sidebar and dashboard */}
      <div className="content-container">
        {/* Sidebar now extends full height below header */}
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
          <div className="vehicle-header">R12 MINJUR</div>
          
          <div className="accordion">
            <div className="accordion-item">
              <div 
                className="accordion-header" 
                onClick={() => toggleSection('driver')}
              >
                Driver Details
                <span className={`chevron ${expandedSection === 'driver' ? 'up' : 'down'}`}>▼</span>
              </div>
              {expandedSection === 'driver' && (
                <div className="accordion-content">
                  {/* Driver details content would go here */}
                </div>
              )}
            </div>
            
            <div className="accordion-item">
              <div 
                className="accordion-header" 
                onClick={() => toggleSection('documents')}
              >
                Documents
                <span className={`chevron ${expandedSection === 'documents' ? 'up' : 'down'}`}>▼</span>
              </div>
              {expandedSection === 'documents' && (
                <div className="accordion-content">
                  {/* Documents content would go here */}
                </div>
              )}
            </div>
            
            <div className="accordion-item">
              <div 
                className="accordion-header" 
                onClick={() => toggleSection('maintenance')}
              >
                Maintenance
                <span className={`chevron ${expandedSection === 'maintenance' ? 'up' : 'down'}`}>▼</span>
              </div>
              {expandedSection === 'maintenance' && (
                <div className="accordion-content">
                  {/* Maintenance content would go here */}
                </div>
              )}
            </div>
            
            <div className="accordion-item">
              <div 
                className="accordion-header" 
                onClick={() => toggleSection('route')}
              >
                Route
                <span className={`chevron ${expandedSection === 'route' ? 'up' : 'down'}`}>▼</span>
              </div>
              {expandedSection === 'route' && (
                <div className="accordion-content">
                  {/* Route content would go here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;