import React, { useState } from 'react';
import './css pages/Dashboard.css'; // You might want a separate CSS for Maintenance
import ritLogo from './assets/rit-logo-new.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config'; // Import auth
function Maintenance() {
  const [activeMenu, setActiveMenu] = useState('Maintenance');
  const [flashCard, setFlashCard] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Handle menu item click
  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
    console.log(`Menu selected: ${menuItem}`);
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

  // Handle card click with flash effect
  const handleCardClick = (cardTitle) => {
    setFlashCard(cardTitle);
    console.log(`Card clicked: ${cardTitle}`);

    // Reset flash after animation completes
    setTimeout(() => {
      setFlashCard(null);
    }, 300); // Match this to your CSS animation duration
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
      {/* Header with left-aligned logo and title */}
      <header className="header">
        <div className="logo-section">
          <img src={ritLogo} alt="RIT Logo" className="logo" />
        </div>
        <h1 className="title">MAINTENANCE</h1>
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
          <button className="logout-btn sidebar-logout-btn" onClick={handleLogout}>Log out</button>
        </nav>

        <main className="dashboard-content"> {/* Consider renaming this class */}
          <div
            className={`card ${flashCard === "To be service" ? 'flash' : ''}`}
            onClick={() => handleCardClick("To be service")}
          >
            <div className="card-title">To be service</div>
          </div>
          <div
            className={`card ${flashCard === "Out for Service" ? 'flash' : ''}`}
            onClick={() => handleCardClick("Out for Service")}
          >
            <div className="card-title">Out for Service</div>
          </div>
          <div
            className={`card ${flashCard === "Open Issues" ? 'flash' : ''}`}
            onClick={() => handleCardClick("Open Issues")}
          >
            <div className="card-title">Open Issues</div>
          </div>
          <div
            className={`card ${flashCard === "Closed Issues" ? 'flash' : ''}`}
            onClick={() => handleCardClick("Closed Issues")}
          >
            <div className="card-title">Closed Issues</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Maintenance;