import React, { useState, useEffect } from 'react';
import { Truck, Search, ArrowLeft, AlertCircle, CheckCircle, MinusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Real data for vehicles with status including 'Out of Service'
const initialVehicles = [
  { busNo: 'R12', routeName: 'MINJUR', status: 'Active' },
  { busNo: 'R21', routeName: 'MKB NAGAR', status: 'Active' },
  { busNo: 'R18', routeName: 'PALLIKARANAI', status: 'Active' },
  { busNo: 'R05', routeName: 'THACHOOR', status: 'Inactive' },
  { busNo: 'R01', routeName: 'COLLECTOR NAGAR', status: 'Active' },
  { busNo: 'R11', routeName: 'ENNORE', status: 'Out of Service' },
  { busNo: 'R13', routeName: 'TRIPLECANE', status: 'Active' },
  { busNo: 'R22', routeName: 'CIT NAGAR', status: 'Active' },
  { busNo: 'R23', routeName: 'ARAKKONAM', status: 'Inactive' },
  { busNo: 'R24', routeName: 'THIRUTANI', status: 'Active' },
  { busNo: 'R14', routeName: 'GUINDY', status: 'Active' },
  { busNo: 'R15', routeName: 'PUDUR', status: 'Active' },
  { busNo: 'R16', routeName: 'KELAMBAKKAM', status: 'Active' },
  { busNo: 'R17', routeName: 'KOVILAMKKAM', status: 'Active' },
  { busNo: 'R20', routeName: 'ADAYAR', status: 'Active' },
  { busNo: 'R19', routeName: 'ICF', status: 'Active' },
  { busNo: 'R23', routeName: 'CHINMAYANAGAR', status: 'Inactive' },
  { busNo: 'R24A', routeName: 'AVADI', status: 'Active' },
  { busNo: 'R20A', routeName: 'PAMMAL', status: 'Active' },
  { busNo: 'R19B', routeName: 'KANCHEEPURAM', status: 'Active' },
  { busNo: 'R25', routeName: 'ARCOT', status: 'Active' },
  { busNo: 'R26', routeName: 'KAKKALUR', status: 'Active' },
  { busNo: 'R27', routeName: 'VELACHERY', status: 'Active' },
  { busNo: 'R28', routeName: 'AGARAM', status: 'Active' },
  { busNo: 'R29', routeName: 'KALLIKUPPAM', status: 'Active' },
  { busNo: 'R29A', routeName: 'ANDARKUPPAM', status: 'Active' },
];

function VehiclesList() {
  const [vehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState(initialVehicles);
  const navigate = useNavigate();

  // Update filtered vehicles whenever search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      // If search term is empty, show all vehicles
      setFilteredVehicles(vehicles);
    } else {
      // Convert search term to lowercase for case-insensitive comparison
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      
      // Filter vehicles based on bus number or route name
      const filtered = vehicles.filter(vehicle => 
        vehicle.busNo.toLowerCase().includes(lowerSearchTerm) || 
        vehicle.routeName.toLowerCase().includes(lowerSearchTerm)
      );
      
      setFilteredVehicles(filtered);
    }
  }, [searchTerm, vehicles]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="vehicles-page-container">
      <div className="vehicles-header">
        <button
          onClick={handleBack}
          className="back-button"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="vehicles-title">
          <Truck className="vehicles-icon" />
          Total Vehicles
        </h1>
      </div>

      {/* Search */}
      <div className="controls-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by bus number or route..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      {/* Search results info */}
      <div className="search-results-info">
        {searchTerm && (
          <p>
            Showing {filteredVehicles.length} results for "{searchTerm}"
          </p>
        )}
      </div>

      {/* Vehicles List */}
      {filteredVehicles.length === 0 ? (
        <div className="no-vehicles-message">
          No vehicles found matching "{searchTerm}"
        </div>
      ) : (
        <div className="vehicles-list">
          {filteredVehicles.map((vehicle, index) => (
            <div
              key={`${vehicle.busNo}-${index}`}
              className={`vehicle-card ${vehicle.status === 'Inactive' ? 'vehicle-inactive' : (vehicle.status === 'Out of Service' ? 'vehicle-out-of-service' : '')}`}
            >
              <h3 className="vehicle-card-title">
                {vehicle.busNo} - {vehicle.routeName}
              </h3>
              <span
                className={`status-badge ${
                  vehicle.status === 'Active' ? 'status-active' : (vehicle.status === 'Inactive' ? 'status-inactive' : 'status-out-of-service')
                }`}
              >
                {vehicle.status === 'Active' ? (
                  <><CheckCircle size={14} /> Active</>
                ) : (vehicle.status === 'Inactive' ? (
                  <><AlertCircle size={14} /> Inactive</>
                ) : (
                  <><MinusCircle size={14} /> Out of Service</>
                ))}
              </span>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .vehicles-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }

        .vehicles-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #3b82f6;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: color 0.2s;
        }

        .back-button:hover {
          color: #1d4ed8;
        }

        .vehicles-title {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 700;
        }

        .vehicles-icon {
          margin-right: 12px;
          color: #3b82f6;
        }

        .controls-section {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 16px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background-color: white;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 8px 12px;
          width: 40%;
        }

        .search-input {
          border: none;
          outline: none;
          margin-left: 8px;
          width: 100%;
        }

        .search-results-info {
          margin-bottom: 16px;
          color: #6b7280;
          font-size: 14px;
        }

        .no-vehicles-message {
          text-align: center;
          color: #6b7280;
          padding: 40px 0;
        }

        .vehicles-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }

        .vehicle-card {
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .vehicle-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .vehicle-inactive {
          border-left: 4px solid #ef4444;
        }

        .vehicle-out-of-service {
          border-left: 4px solid #f59e0b;
        }

        .vehicle-card-title {
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-active {
          background-color: #d1fae5;
          color: #059669;
        }

        .status-inactive {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .status-out-of-service {
          background-color: #ffedd5;
          color: #d97706;
        }
      `}</style>
    </div>
  );
}

export default VehiclesList;