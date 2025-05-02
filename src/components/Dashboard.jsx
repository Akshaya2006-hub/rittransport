import React, { useState } from 'react';
import './css pages/Dashboard.css';
import ritLogo from './assets/rit-logo-new.png';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config'; // Import auth


function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [flashCard, setFlashCard] = useState(null);
  const navigate = useNavigate();

  // Handle menu item click
  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
    console.log(`Menu selected: ${menuItem}`);
    switch (menuItem) {
      case 'Vehicles':
        navigate('/vehicles');
        break;
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Maintenance':
        navigate('/maintenance'); // Navigation for Maintenance
        break;
      case 'Drivers':
        navigate('/drivers');
        break;
      // Add other cases as needed
      default:
        break;
    }
  };

  // Handle card click with flash effect and navigation
  const handleCardClick = (cardTitle) => {
    setFlashCard(cardTitle);
    console.log(`Card clicked: ${cardTitle}`);

    let route;
    switch (cardTitle) {
      case "Today's Task":
        route = '/cards/today-tasks';
        break;
      case "Total Vehicle":
        route = '/vehicles-list';
        break;
      case "Diesel":
        route = '/diesel-info';
        break;
      case "Issues":
        route = '/vehicle-issues';
        break;
      case "Orders":
        route = '/orders-list';
        break;
      default:
        route = '/dashboard'; // Fallback
        break;
    }
    navigate(route);

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
        <h1 className="title">WELCOME</h1>
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
          {/* Logout button moved to the bottom of the sidebar */}
          <button className="logout-btn sidebar-logout-btn" onClick={handleLogout}>Log out</button>
        </nav>

        {/* Dashboard content */}
        <main className="dashboard-content">
          <div
            className={`card ${flashCard === "Today's Task" ? 'flash' : ''}`}
            onClick={() => handleCardClick("Today's Task")}
          >
            <div className="card-title">Today's Task</div>
            <div className="card-value">7<span className="denominator">/7</span></div>
          </div>
          <div
            className={`card ${flashCard === "Total Vehicle" ? 'flash' : ''}`}
            onClick={() => handleCardClick("Total Vehicle")}
          >
            <div className="card-title">Total Vehicle</div>
            <div className="card-value">34<span className="denominator">/34</span></div>
          </div>
          <div
            className={`card ${flashCard === "Diesel" ? 'flash' : ''}`}
            onClick={() => handleCardClick("Diesel")}
          >
            <div className="card-title">Diesel</div>
          </div>
          <div
            className={`card ${flashCard === "Issues" ? 'flash' : ''}`}
            onClick={() => handleCardClick("Issues")}
          >
            <div className="card-title">Issues</div>
          </div>
          <div
            className={`card ${flashCard === "Orders" ? 'flash' : ''}`}
            onClick={() => handleCardClick("Orders")}
          >
            <div className="card-title">Orders</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;