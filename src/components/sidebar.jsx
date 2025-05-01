import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css pages/Dashboard.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function Sidebar({ activeMenu, setActiveMenu }) {
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
        navigate('/Dashboard');
        break;
      case 'Maintenance':
        navigate('/Maintenance'); // Navigation for Maintenance
        break;
      case 'Drivers':
        navigate('/Drivers');
        break;
      // Add other cases as needed
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
      {/* Logout button at the bottom of the sidebar */}
      <button className="logout-btn sidebar-logout-btn" onClick={handleLogout}>Log out</button>
    </nav>
  );
}

export default Sidebar;