import React, { useState, useEffect } from 'react';
//import './css pages/Dashboard.css';

function DieselPage() {
  const [dieselData, setDieselData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API endpoint to fetch diesel information
    fetch('/api/diesel/level') // Or an endpoint that provides more detailed diesel info
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setDieselData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading diesel information...</div>;
  }

  if (error) {
    return <div>Error fetching diesel information: {error.message}</div>;
  }

  return (
    <div className="diesel-page">
      <h1>Diesel Information</h1>
      {dieselData !== null ? (
        <div>
          <p>Current Diesel Level: {dieselData} Liters</p>
          {/* Add more details about diesel consumption, history, etc. */}
        </div>
      ) : (
        <p>No diesel information available.</p>
      )}
      {/* You might want to display charts or more detailed data here */}
    </div>
  );
}

export default DieselPage;