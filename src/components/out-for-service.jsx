import React, { useState } from 'react';
import { Truck, Filter, SortAsc, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample task data for Out for Service category
const initialTasks = [
  { 
    id: 1, 
    vehicle: 'RIT-005', 
    title: 'Transmission Repair', 
    description: 'Repair transmission fluid leak',
    priority: 'High',
    serviceDate: '2024-05-14',
    expectedReturn: '2024-05-18',
    serviceCenter: 'Precision Auto'
  },
  { 
    id: 2, 
    vehicle: 'RIT-008', 
    title: 'Engine Overhaul', 
    description: 'Complete engine rebuild and optimization',
    priority: 'Medium',
    serviceDate: '2024-05-10',
    expectedReturn: '2024-05-25',
    serviceCenter: 'Elite Motors'
  },
  { 
    id: 3, 
    vehicle: 'RIT-012', 
    title: 'Electrical System Diagnosis', 
    description: 'Diagnosing intermittent electrical failures',
    priority: 'High',
    serviceDate: '2024-05-15',
    expectedReturn: '2024-05-19',
    serviceCenter: 'AutoTech Solutions'
  }
];

function OutForService() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Return Date');
  const navigate = useNavigate();

  // Filter tasks based on priority
  const filteredTasks = tasks.filter(task => 
    filter === 'All' || task.priority === filter
  );

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'Priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.expectedReturn) - new Date(b.expectedReturn);
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
          <Truck className="task-icon" />
          Out for Service Tasks
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
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
          <div className="filter-group">
            <SortAsc size={18} />
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="filter-select"
            >
              <option value="Return Date">Sort by Return Date</option>
              <option value="Priority">Sort by Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      {sortedTasks.length === 0 ? (
        <div className="no-tasks-message">
          No vehicles currently out for service
        </div>
      ) : (
        <div className="tasks-list">
          {sortedTasks.map(task => (
            <div 
              key={task.id} 
              className="task-card"
            >
              <div className="task-card-content">
                <div>
                  <h3 className="task-card-title">
                    {task.title} - {task.vehicle}
                  </h3>
                  <p className="task-card-description">{task.description}</p>
                  <p className="service-center">At: {task.serviceCenter}</p>
                </div>
                <div className="task-card-meta">
                  <span 
                    className={`priority-badge ${
                      task.priority === 'High' ? 'priority-high' : 
                      task.priority === 'Medium' ? 'priority-medium' : 
                      'priority-low'
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                  <div className="date-info">
                    <div>Service Date: {task.serviceDate}</div>
                    <div>Expected Return: {task.expectedReturn}</div>
                  </div>
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
          color: #3b82f6;
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
        
        .service-center {
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
        
        .priority-badge {
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .priority-high {
          background-color: #fee2e2;
          color: #dc2626;
        }
        
        .priority-medium {
          background-color: #fef3c7;
          color: #d97706;
        }
        
        .priority-low {
          background-color: #d1fae5;
          color: #059669;
        }
        
        .date-info {
          font-size: 14px;
          color: #6b7280;
          text-align: right;
        }
      `}</style>
    </div>
  );
}

export default OutForService;