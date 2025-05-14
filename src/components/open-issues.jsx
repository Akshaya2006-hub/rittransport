import React, { useState } from 'react';
import { AlertTriangle, Filter, SortAsc, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample task data for Open Issues category
const initialIssues = [
  { 
    id: 1, 
    vehicle: 'R24-ARCOT', 
    title: 'Check Engine Light', 
    description: 'Check engine light comes on intermittently',
    severity: 'Critical',
    reportedDate: '2024-05-11',
    reportedBy: 'John Driver'
  },
  { 
    id: 2, 
    vehicle: 'R28-AGARAM', 
    title: 'Air Conditioning Failure', 
    description: 'AC not blowing cold air',
    severity: 'Moderate',
    reportedDate: '2024-05-14',
    reportedBy: 'Sarah Operator'
  },
  { 
    id: 3, 
    vehicle: 'R11-ENNORE', 
    title: 'Steering Wheel Vibration', 
    description: 'Steering wheel vibrates at highway speeds',
    severity: 'Critical',
    reportedDate: '2024-05-13',
    reportedBy: 'Mike Handler'
  },
  { 
    id: 4, 
    vehicle: 'R22-THIRUTANI', 
    title: 'Bluetooth Connectivity', 
    description: 'Can\'t connect phones to vehicle bluetooth',
    severity: 'Minor',
    reportedDate: '2024-05-15',
    reportedBy: 'Lisa Technician'
  }
];

function OpenIssues() {
  const [issues, setIssues] = useState(initialIssues);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Date');
  const navigate = useNavigate();

  // Filter issues based on severity
  const filteredIssues = issues.filter(issue => 
    filter === 'All' || issue.severity === filter
  );

  // Sort issues
  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sort === 'Severity') {
      const severityOrder = { 'Critical': 1, 'Moderate': 2, 'Minor': 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return new Date(b.reportedDate) - new Date(a.reportedDate); // Newest first
  });

  const handleBack = () => {
    navigate('/Maintenance');
  };

  return (
    <div className="task-page-container">
      <div className="task-header">
        <button 
          onClick={handleBack} 
          className="back-button"
        >
          <ArrowLeft size={20} />
          Back to Maintenance
        </button>
        <h1 className="task-title">
          <AlertTriangle className="task-icon" />
          Open Issues
        </h1>
      </div>

      {/* Filters and Sorting */}
      <div className="filters-section">
        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={18} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="Moderate">Moderate</option>
              <option value="Minor">Minor</option>
            </select>
          </div>
          <div className="filter-group">
            <SortAsc size={18} />
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="filter-select"
            >
              <option value="Date">Sort by Date (Newest)</option>
              <option value="Severity">Sort by Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      {sortedIssues.length === 0 ? (
        <div className="no-tasks-message">
          No open issues reported
        </div>
      ) : (
        <div className="tasks-list">
          {sortedIssues.map(issue => (
            <div 
              key={issue.id} 
              className="task-card"
            >
              <div className="task-card-content">
                <div>
                  <h3 className="task-card-title">
                    {issue.title} - {issue.vehicle}
                  </h3>
                  <p className="task-card-description">{issue.description}</p>
                  <p className="reported-by">Reported by: {issue.reportedBy}</p>
                </div>
                <div className="task-card-meta">
                  <span 
                    className={`severity-badge ${
                      issue.severity === 'Critical' ? 'severity-critical' : 
                      issue.severity === 'Moderate' ? 'severity-moderate' : 
                      'severity-minor'
                    }`}
                  >
                    {issue.severity}
                  </span>
                  <span className="reported-date">
                    Reported: {issue.reportedDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .task-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }
        
        .task-header {
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
        
        .task-title {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 700;
        }
        
        .task-icon {
          margin-right: 12px;
          color: #f59e0b;
        }
        
        .filters-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .filter-controls {
          display: flex;
          gap: 16px;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .filter-select {
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 4px 8px;
          background-color: white;
        }
        
        .no-tasks-message {
          text-align: center;
          color: #6b7280;
          padding: 40px 0;
        }
        
        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .task-card {
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.2s;
        }
        
        .task-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .task-card-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .task-card-title {
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }
        
        .task-card-description {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 4px;
        }
        
        .reported-by {
          font-size: 14px;
          color: #4b5563;
          font-style: italic;
        }
        
        .task-card-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
        }
        
        .severity-badge {
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .severity-critical {
          background-color: #fee2e2;
          color: #dc2626;
        }
        
        .severity-moderate {
          background-color: #fef3c7;
          color: #d97706;
        }
        
        .severity-minor {
          background-color: #d1fae5;
          color: #059669;
        }
        
        .reported-date {
          font-size: 14px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}

export default OpenIssues;