import React, { useState, useEffect } from 'react';
//import './css pages/Dashboard.css';

function TodaysTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API endpoint to fetch today's tasks
    fetch('/api/tasks/today')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading today's tasks...</div>;
  }

  if (error) {
    return <div>Error fetching today's tasks: {error.message}</div>;
  }

  return (
    <div className="todays-tasks-page">
      <h1>Today's Tasks</h1>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.description} - Due: {task.dueDate}
              {task.completed && <span className="completed"> (Completed)</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks scheduled for today.</p>
      )}
      {/* You can add more detailed information or actions here */}
    </div>
  );
}

export default TodaysTasksPage;