import React, { useState } from 'react';
import { Wrench, Filter, SortAsc, ArrowLeft, CheckCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample task data for Today's Tasks
const initialTasks = [
  { 
    id: 1, 
    vehicle: 'R12 - MINJUR', 
    title: 'Oil Change', 
    description: 'Routine oil change and filter replacement',
    status: 'Pending',
    assignedTo: 'Rajesh',
    date: '2025-05-14'
  },
  { 
    id: 2, 
    vehicle: 'R21 - MKB NAGAR', 
    title: 'Brake Pad Replacement', 
    description: 'Replace worn out brake pads',
    status: 'In Progress',
    assignedTo: 'Suresh',
    date: '2025-05-14'
  },
  { 
    id: 3, 
    vehicle: 'R05 - THACHOOR', 
    title: 'AC Repair', 
    description: 'Fix air conditioning system and recharge refrigerant',
    status: 'Pending',
    assignedTo: 'Ramesh',
    date: '2025-05-15'
  },
  { 
    id: 4, 
    vehicle: 'R11 - ENNORE', 
    title: 'Transmission Fluid Change', 
    description: 'Replace transmission fluid and inspect for leaks',
    status: 'Completed',
    assignedTo: 'Ganesh',
    date: '2025-05-14'
  },
  { 
    id: 5, 
    vehicle: 'R13 - TRIPLECANE', 
    title: 'Engine Belt Replacement', 
    description: 'Replace worn timing and serpentine belts',
    status: 'In Progress',
    assignedTo: 'Mahesh',
    date: '2025-05-15'
  },
  { 
    id: 6, 
    vehicle: 'R24 - THIRUTANI', 
    title: 'Headlight Replacement', 
    description: 'Replace non-functional headlight assembly',
    status: 'Pending',
    assignedTo: 'Dinesh',
    date: '2025-05-16'
  },
  { 
    id: 7, 
    vehicle: 'R14 - GUINDY', 
    title: 'Battery Replacement', 
    description: 'Replace failing battery with new unit',
    status: 'Pending',
    assignedTo: 'Venkat',
    date: '2025-05-14'
  }
];

function TodayTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Today's date in YYYY-MM-DD format
  const navigate = useNavigate();

  // Filter tasks based on status and selected date
  const filteredTasks = tasks.filter(task => 
    (filter === 'All' || task.status === filter) && 
    (task.date === selectedDate)
  );

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: 'Completed' } 
        : task
    ));
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="task-page-container">
      <div className="task-header">
        <button 
          onClick={handleBack} 
          className="back-button"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="task-title">
          <Wrench className="task-icon" />
          Maintenance Tasks
        </h1>
      </div>

      {/* Calendar Date Selector */}
      <div className="calendar-section">
        <div className="calendar-header">
          <Calendar size={20} className="calendar-icon" />
          <span className="selected-date">{formatDateForDisplay(selectedDate)}</span>
        </div>
        <div className="date-selector">
          <label htmlFor="date-picker" className="date-picker-label">Select Date:</label>
          <input
            id="date-picker"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={18} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="task-summary">
          <span className="task-count">
            {filteredTasks.filter(task => task.status === 'Completed').length}/{filteredTasks.length} Tasks Completed
          </span>
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="no-tasks-message">
          No tasks found for the selected date and filter
        </div>
      ) : (
        <div className="tasks-list">
          {filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-card ${task.status === 'Completed' ? 'task-completed' : ''}`}
            >
              <div className="task-card-content">
                <div className="task-card-info">
                  <h3 className="task-card-title">
                    {task.title} - {task.vehicle}
                  </h3>
                  <p className="task-card-description">{task.description}</p>
                  <p className="task-assigned-to">Assigned to: {task.assignedTo}</p>
                </div>
                <div className="task-card-actions">
                  <span 
                    className={`status-badge ${
                      task.status === 'Completed' ? 'status-completed' : 
                      task.status === 'In Progress' ? 'status-progress' : 
                      'status-pending'
                    }`}
                  >
                    {task.status}
                  </span>
                  {task.status !== 'Completed' && (
                    <button 
                      onClick={() => handleCompleteTask(task.id)} 
                      className="complete-button"
                    >
                      <CheckCircle size={16} />
                      Mark Complete
                    </button>
                  )}
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
        
        .calendar-section {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .calendar-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .calendar-icon {
          color: #4b5563;
        }
        
        .selected-date {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }
        
        .date-selector {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .date-picker-label {
          font-size: 14px;
          color: #4b5563;
        }
        
        .date-picker {
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 4px 8px;
          background-color: white;
        }
        
        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
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
        
        .task-summary {
          font-weight: 600;
          color: #4b5563;
        }
        
        .task-count {
          background-color: #dbeafe;
          color: #1e40af;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 14px;
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
        
        .task-completed {
          background-color: #f9fafb;
          border-left: 4px solid #10b981;
        }
        
        .task-card-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .task-card-info {
          flex: 1;
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
        
        .task-assigned-to {
          font-size: 14px;
          color: #4b5563;
          font-style: italic;
        }
        
        .task-card-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        
        .status-badge {
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }
        
        .status-completed {
          background-color: #d1fae5;
          color: #059669;
        }
        
        .status-progress {
          background-color: #e0f2fe;
          color: #0369a1;
        }
        
        .status-pending {
          background-color: #fef3c7;
          color: #d97706;
        }
        
        .complete-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          background-color: #10b981;
          color: white;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .complete-button:hover {
          background-color: #059669;
        }
      `}</style>
    </div>
  );
}

export default TodayTasks;