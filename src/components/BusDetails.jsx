// BusDetails.jsx
import React, { useState, useEffect } from 'react';
import './css pages/BusDetails.css';
import ritLogo from './assets/rit-logo-new.png';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config'; // Import auth
const BusDetails = () => {
  const { busNo } = useParams();
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeMenu, setActiveMenu] = useState('');
  const [busName, setBusName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/Dashboard')) {
      setActiveMenu('Dashboard');
    } else if (path.includes('/vehicles')) {
      setActiveMenu('Vehicles');
    } else if (path.includes('/Maintenance')) {
      setActiveMenu('Maintenance');
    } else if (path.includes('/Drivers')) {
      setActiveMenu('Drivers');
    }
  }, [location]);

  useEffect(() => {
    console.log('Bus No:', busNo);
    const fetchBusDetails = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const busData = {
        'R12': 'MINJUR',
        'R21': 'MKB NAGAR',
        'R18': 'PALLIKARANAI',
        'T05': 'THACHOOR',
        // Add more bus mappings as needed
      };
      if (busData[busNo]) {
        setBusName(busData[busNo]);
      } else {
        setBusName(''); // Set busName to empty string if not found
      }
    };
    fetchBusDetails();
  }, [busNo]);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
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
        <h1 className="title">BUS DETAILS - {busNo}</h1> {/* Display busNo in the header */}
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
          <div className="vehicle-header">{busName || busNo}</div> {/* Keep this for the section header */}

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
                  <p>Driver Name: Nataraj </p>
                  <p>License Number: TN05 20250001948</p>
                  <p>Driver phone: 8945671236  </p>
                  <p>Employee code: td094 </p>
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
                  <ul>
                    <li>Registration Certificate: [Link/Status]</li>
                    <li>Insurance Policy: [Link/Status]</li>
                  </ul>
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
                  <ul>
                    <li>Last Service Date: 12/01/2025</li>
                    <li>Next Service Due: 4/04/2025</li>
                  </ul>
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
                  <p>Route Name: {busName || busNo || 'N/A'}</p> {/* Display busName or busNo */}
                  <p>Stops: [List of Stops]</p>
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