import React, { useState, useEffect, memo } from 'react';
import './css pages/Drivers.css';
import ritLogo from './assets/rit-logo-new.png';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const Modal = memo(({ show, title, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
});

function Drivers() {
  const [activePage, setActivePage] = useState('drivers');
  const [activeMenu, setActiveMenu] = useState('Drivers');
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Ram', phone: '9685452789' },
    { id: 2, name: 'Vignesh', phone: '9685452789' },
    { id: 3, name: 'Vadivelu', phone: '9685452789' },
    { id: 4, name: 'Nataraj', phone: '9685452789' },
    { id: 5, name: 'Thiyagaraj', phone: '9685452789' },
    { id: 6, name: 'Ravi', phone: '9685452789' },
    { id: 7, name: 'Ram', phone: '9685452789' },
    { id: 8, name: 'Vignesh', phone: '9685452789' },
    { id: 9, name: 'Vadivelu', phone: '9685452789' },
    { id: 10, name: 'Nataraj', phone: '9685452789' },
    { id: 11, name: 'Thiyagaraj', phone: '9685452789' },
    { id: 12, name: 'Ravi', phone: '9685452789' },
    { id: 13, name: 'Ramu', phone: '9685452789' },
    { id: 14, name: 'Ram', phone: '9685452789' },
    { id: 15, name: 'Vignesh', phone: '9685452789' },
    { id: 16, name: 'Vadivelu', phone: '9685452789' },
    { id: 17, name: 'cheran', phone: '9685452789' },
    { id: 18, name: 'charan', phone: '9685452789' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [newDriver, setNewDriver] = useState({ name: '', phone: '' });
  const [modifiedDriver, setModifiedDriver] = useState(null);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  const generateId = () => {
    const ids = drivers.map(driver => driver.id);
    return Math.max(...ids, 0) + 1;
  };

  useEffect(() => {
    const results = drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm)
    );
    setFilteredDrivers(results);
  }, [searchTerm, drivers]);

  useEffect(() => {
    setFilteredDrivers(drivers);
  }, [drivers]);

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    switch (menu) {
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

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateDriverData = (data, isAdd = true) => {
    let isValid = true;
    let nameErr = '';
    let phoneErr = '';

    if (!data.name.trim()) {
      nameErr = 'Name is required';
      isValid = false;
    }

    if (!data.phone.trim()) {
      phoneErr = 'Phone number is required';
      isValid = false;
    } else if (!validatePhoneNumber(data.phone)) {
      phoneErr = 'Phone must be a 10-digit number';
      isValid = false;
    }

    setNameError(nameErr);
    setPhoneError(phoneErr);

    return isValid;
  };

  const handleAdd = () => {
    setNewDriver({ name: '', phone: '' });
    setNameError('');
    setPhoneError('');
    setShowAddModal(true);
  };

  const handleRemove = () => {
    if (selectedDriver) {
      setShowRemoveModal(true);
    } else {
      alert("Please select a driver to remove");
    }
  };

  const handleModify = () => {
    if (selectedDriver) {
      setModifiedDriver({ ...selectedDriver });
      setNameError('');
      setPhoneError('');
      setShowModifyModal(true);
    } else {
      alert("Please select a driver to modify");
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out.');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const handleRowClick = (driver) => {
    setSelectedDriver(selectedDriver?.id === driver.id ? null : driver);
  };

  const handleAddSubmit = () => {
    if (validateDriverData(newDriver)) {
      const newId = generateId();
      const driverToAdd = {
        id: newId,
        name: newDriver.name.trim(),
        phone: newDriver.phone.trim()
      };

      setDrivers(prevDrivers => [...prevDrivers, driverToAdd]);
      setNewDriver({ name: '', phone: '' });
      setShowAddModal(false);
    }
  };

  const handleModifySubmit = () => {
    if (modifiedDriver && validateDriverData(modifiedDriver, false)) {
      const updatedDrivers = drivers.map(driver =>
        driver.id === modifiedDriver.id
          ? { ...driver, name: modifiedDriver.name.trim(), phone: modifiedDriver.phone.trim() }
          : driver
      );

      setDrivers(updatedDrivers);
      setSelectedDriver({ ...modifiedDriver });
      setShowModifyModal(false);
    }
  };

  const handleRemoveSubmit = () => {
    if (selectedDriver) {
      const updatedDrivers = drivers.filter(driver => driver.id !== selectedDriver.id);
      setDrivers(updatedDrivers);
      setSelectedDriver(null);
      setShowRemoveModal(false);
    }
  };

  const handleNewDriverNameChange = (e) => {
    setNewDriver(prev => ({ ...prev, name: e.target.value }));
  };

  const handleNewDriverPhoneChange = (e) => {
    setNewDriver(prev => ({ ...prev, phone: e.target.value }));
  };

  const handleModifiedDriverNameChange = (e) => {
    setModifiedDriver(prev => ({ ...prev, name: e.target.value }));
  };

  const handleModifiedDriverPhoneChange = (e) => {
    setModifiedDriver(prev => ({ ...prev, phone: e.target.value }));
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
          <button className="logout-btn sidebar-logout-btn" onClick={handleLogout}>Log out</button>
        </nav>

        <div className="main-content">
          <div className="content-area">
            <div className="drivers-table">
              <div className="table-header">
                <div className="name-column">Driver's Name</div>
                <div className="phone-column">Phone</div>
              </div>
              <div className="table-body">
                {filteredDrivers.length > 0 ? (
                  filteredDrivers.map((driver) => (
                    <div
                      key={driver.id}
                      className={`table-row ${selectedDriver?.id === driver.id ? 'selected-row' : ''}`}
                      onClick={() => handleRowClick(driver)}
                    >
                      <div className="name-cell">{driver.name}</div>
                      <div className="phone-cell">{driver.phone}</div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No drivers found</div>
                )}
              </div>
            </div>

            <div className="controls">
              <input
                type="text"
                placeholder="Search by name or phone"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="action-button add-button" onClick={handleAdd}>+ Add</button>
              <button
                className={`action-button remove-button ${!selectedDriver ? 'disabled-button' : ''}`}
                onClick={handleRemove}
                disabled={!selectedDriver}
              >
                - Remove
              </button>
              <button
                className={`action-button modify-button ${!selectedDriver ? 'disabled-button' : ''}`}
                onClick={handleModify}
                disabled={!selectedDriver}
              >
                Modify
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal show={showAddModal} title="Add Driver" onClose={() => setShowAddModal(false)}>
        <div className="modal-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={newDriver.name}
              onChange={handleNewDriverNameChange}
            />
            {nameError && <div className="error-message">{nameError}</div>}
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={newDriver.phone}
              onChange={handleNewDriverPhoneChange}
            />
            {phoneError && <div className="error-message">{phoneError}</div>}
          </div>
          <div className="modal-buttons">
            <button className="cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="submit-button" onClick={handleAddSubmit}>Add</button>
          </div>
        </div>
      </Modal>

      {/* Remove Modal */}
      <Modal show={showRemoveModal} title="Remove Driver" onClose={() => setShowRemoveModal(false)}>
        <div className="modal-form">
          <p>Are you sure you want to remove {selectedDriver?.name}?</p>
          <div className="modal-buttons">
            <button className="cancel-button" onClick={() => setShowRemoveModal(false)}>Cancel</button>
            <button className="submit-button remove-confirm-button" onClick={handleRemoveSubmit}>Remove</button>
          </div>
        </div>
      </Modal>

      {/* Modify Modal */}
      <Modal show={showModifyModal} title="Modify Driver" onClose={() => setShowModifyModal(false)}>
        {modifiedDriver && (
          <div className="modal-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={modifiedDriver.name}
                onChange={handleModifiedDriverNameChange}
              />
              {nameError && <div className="error-message">{nameError}</div>}
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                value={modifiedDriver.phone}
                onChange={handleModifiedDriverPhoneChange}
              />
              {phoneError && <div className="error-message">{phoneError}</div>}
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setShowModifyModal(false)}>Cancel</button>
              <button className="submit-button" onClick={handleModifySubmit}>Update</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Drivers;