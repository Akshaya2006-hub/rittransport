import React, { useState, useEffect } from 'react';
//import './css pages/Dashboard.css';

function TotalVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API endpoint to fetch all vehicles
    fetch('/api/vehicles/all')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setVehicles(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading vehicle list...</div>;
  }

  if (error) {
    return <div>Error fetching vehicles: {error.message}</div>;
  }

  return (
    <div className="total-vehicles-page">
      <h1>Total Vehicles</h1>
      {vehicles.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Registration Number</th>
              {/* Add other relevant vehicle details as table headers */}
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>{vehicle.model}</td>
                <td>{vehicle.registrationNumber}</td>
                {/* Add other vehicle details as table data */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vehicles found.</p>
      )}
      {/* You can add filtering, sorting, or more details here */}
    </div>
  );
}

export default TotalVehiclesPage;