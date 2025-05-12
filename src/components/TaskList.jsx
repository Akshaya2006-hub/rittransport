import React, { useState } from 'react';

// Sample task data - in a real app, this would come from a backend/database
const taskData = {
  "To be service": [
    { id: 1, title: "Oil Change for Vehicle A", priority: "High", dueDate: "2024-05-20" },
    { id: 2, title: "Tire Rotation for Vehicle B", priority: "Medium", dueDate: "2024-05-25" },
    { id: 3, title: "Brake Inspection for Vehicle C", priority: "High", dueDate: "2024-05-22" }
  ],
  "Out for Service": [
    { id: 4, title: "Engine Diagnostics - Vehicle D", priority: "Critical", dueDate: "2024-05-18" },
    { id: 5, title: "Transmission Service - Vehicle E", priority: "High", dueDate: "2024-05-23" }
  ],
  "Open Issues": [
    { id: 6, title: "Electrical System Check", priority: "Medium", dueDate: "2024-05-26" },
    { id: 7, title: "Suspension Repair", priority: "High", dueDate: "2024-05-21" }
  ],
  "Closed Issues": [
    { id: 8, title: "Windshield Replacement", priority: "Completed", dueDate: "2024-05-15" },
    { id: 9, title: "Minor Dent Repair", priority: "Completed", dueDate: "2024-05-16" }
  ]
};

const TaskList = ({ category }) => {
  const tasks = taskData[category] || [];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-yellow-600';
      case 'Completed': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{category} Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks in this category</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li 
              key={task.id} 
              className="flex justify-between items-center p-2 border-b last:border-b-0 hover:bg-gray-100 transition-colors"
            >
              <div>
                <span className="font-semibold">{task.title}</span>
                <span 
                  className={`ml-2 text-sm ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>
              <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;