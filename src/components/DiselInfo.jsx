import React, { useState } from 'react';
import { Fuel, Calendar, ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample diesel refueling data for today
const initialRefuelingList = [
  { 
    id: 1, 
    busNo: 'R12', 
    routeName: 'MINJUR',
    driver: 'Rajesh Kumar',
    scheduledTime: '08:30 AM',
    estimatedLiters: 60,
    status: 'Completed'
  },
  { 
    id: 2, 
    busNo: 'R21', 
    routeName: 'MKB NAGAR',
    driver: 'Shankar M',
    scheduledTime: '09:15 AM',
    estimatedLiters: 55,
    status: 'Completed'
  },
  { 
    id: 3, 
    busNo: 'R05', 
    routeName: 'THACHOOR',
    driver: 'Prakash S',
    scheduledTime: '10:00 AM',
    estimatedLiters: 65,
    status: 'In Progress'
  },
  { 
    id: 4, 
    busNo: 'R01', 
    routeName: 'COLLECTOR NAGAR',
    driver: 'Velu P',
    scheduledTime: '11:30 AM',
    estimatedLiters: 50,
    status: 'In Progress'
  },
  { 
    id: 5, 
    busNo: 'R13', 
    routeName: 'TRIPLECANE',
    driver: 'Manoj T',
    scheduledTime: '01:45 PM',
    estimatedLiters: 60,
    status: 'In Progress'
  },
  { 
    id: 6, 
    busNo: 'R22', 
    routeName: 'CIT NAGAR',
    driver: 'Arun Kumar',
    scheduledTime: '03:00 PM',
    estimatedLiters: 58,
    status: 'In Progress'
  }
];

function DieselInfo() {
  const [refuelingList, setRefuelingList] = useState(initialRefuelingList);
  const [filterStatus, setFilterStatus] = useState('All');
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const navigate = useNavigate();

  // Filter refueling entries based on status
  const filteredList = refuelingList.filter(entry => 
    filterStatus === 'All' || entry.status === filterStatus
  );

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleUpdateStatus = (id, newStatus) => {
    setRefuelingList(refuelingList.map(entry => 
      entry.id === id ? { ...entry, status: newStatus } : entry
    ));
  };

  // Calculate summary statistics
  const totalBuses = refuelingList.length;
  const completedBuses = refuelingList.filter(entry => entry.status === 'Completed').length;
  const totalLiters = refuelingList.reduce((sum, entry) => sum + entry.estimatedLiters, 0);
  const refueledLiters = refuelingList
    .filter(entry => entry.status === 'Completed')
    .reduce((sum, entry) => sum + entry.estimatedLiters, 0);

  return (
    <div className="diesel-page-container">
      <div className="diesel-header">
        <button 
          onClick={handleBack} 
          className="back-button"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="diesel-title">
          <Fuel className="diesel-icon" />
          Diesel Refueling Schedule
        </h1>
      </div>

      {/* Date and Summary Panel */}
      <div className="date-summary-panel">
        <div className="current-date">
          <Calendar size={18} />
          <span>{currentDate}</span>
        </div>
        <div className="summary-metrics">
          <div className="metric">
            <span className="metric-label">Buses:</span>
            <span className="metric-value">{completedBuses}/{totalBuses}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Liters:</span>
            <span className="metric-value">{refueledLiters}/{totalLiters}</span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select 
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Refueling List */}
      {filteredList.length === 0 ? (
        <div className="no-refueling-message">
          No refueling tasks match the selected filter
        </div>
      ) : (
        <div className="refueling-list">
          {filteredList.map(entry => (
            <div 
              key={entry.id} 
              className={`refueling-card ${
                entry.status === 'Completed' ? 'status-completed' : 
                entry.status === 'In Progress' ? 'status-progress' : 
                'status-pending'
              }`}
            >
              <div className="card-header">
                <h3 className="bus-info">
                  {entry.busNo} - {entry.routeName}
                </h3>
                <div className="status-badge">
                  {entry.status}
                </div>
              </div>
              <div className="card-content">
                <div className="detail-row">
                  <span className="detail-label">Driver:</span>
                  <span className="detail-value">{entry.driver}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Scheduled Time:</span>
                  <span className="detail-value">
                    <Clock size={14} className="time-icon" />
                    {entry.scheduledTime}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Estimated Diesel:</span>
                  <span className="detail-value">{entry.estimatedLiters} liters</span>
                </div>
              </div>
              <div className="card-actions">
                {entry.status === 'In Progress' && (
                  <button 
                    onClick={() => handleUpdateStatus(entry.id, 'Completed')}
                    className="action-button complete-button"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .diesel-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }
        
        .diesel-header {
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
        
        .diesel-title {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 700;
        }
        
        .diesel-icon {
          margin-right: 12px;
          color: #3b82f6;
        }
        
        .date-summary-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f9fafb;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
        }
        
        .current-date {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 500;
          color: #4b5563;
        }
        
        .summary-metrics {
          display: flex;
          gap: 24px;
        }
        
        .metric {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .metric-label {
          font-size: 14px;
          color: #4b5563;
        }
        
        .metric-value {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }
        
        .filter-section {
          margin-bottom: 24px;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .filter-select {
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 14px;
        }
        
        .no-refueling-message {
          text-align: center;
          color: #6b7280;
          padding: 40px 0;
        }
        
        .refueling-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 16px;
        }
        
        .refueling-card {
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.2s;
        }
        
        .refueling-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .status-completed {
          border-left: 4px solid #10b981;
        }
        
        .status-progress {
          border-left: 4px solid #3b82f6;
        }
        
        .status-pending {
          border-left: 4px solid #f59e0b;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .bus-info {
          font-weight: 600;
          color: #111827;
          margin: 0;
        }
        
        .status-badge {
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          background-color: #f3f4f6;
          color: #4b5563;
        }
        
        .status-completed .status-badge {
          background-color: #d1fae5;
          color: #059669;
        }
        
        .status-progress .status-badge {
          background-color: #dbeafe;
          color: #1d4ed8;
        }
        
        .status-pending .status-badge {
          background-color: #fef3c7;
          color: #d97706;
        }
        
        .card-content {
          margin-bottom: 16px;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .detail-label {
          font-size: 14px;
          color: #6b7280;
        }
        
        .detail-value {
          font-size: 14px;
          color: #111827;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .time-icon {
          color: #4b5563;
        }
        
        .card-actions {
          display: flex;
          justify-content: flex-end;
        }
        
        .action-button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .start-button {
          background-color: #3b82f6;
          color: white;
        }
        
        .start-button:hover {
          background-color: #1d4ed8;
        }
        
        .complete-button {
          background-color: #10b981;
          color: white;
        }
        
        .complete-button:hover {
          background-color: #059669;
        }
      `}</style>
    </div>
  );
}

export default DieselInfo;