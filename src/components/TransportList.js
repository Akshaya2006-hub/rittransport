// src/components/TransportList.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

function TransportList() {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        setLoading(true);
        const transportCollection = collection(db, 'transport');
        const transportSnapshot = await getDocs(transportCollection);
        const transportList = transportSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTransports(transportList);
        setError(null);
      } catch (err) {
        console.error('Error fetching transports:', err);
        setError('Failed to load transport data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransports();
  }, []);

  if (loading) {
    return <div className="loading">Loading transport data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (transports.length === 0) {
    return (
      <div className="no-transports">
        <h3>No transports found</h3>
        <p>Click on "Add Transport" to create a new transport entry.</p>
      </div>
    );
  }

  return (
    <div className="transport-list">
      <h2>Transport List</h2>
      <div className="transport-grid">
        {transports.map((transport) => (
          <div className="transport-card" key={transport.id}>
            <h3>{transport.vehicleName || 'Unnamed Vehicle'}</h3>
            <div className="transport-details">
              <p><strong>Vehicle Number:</strong> {transport.vehicleNumber || 'N/A'}</p>
              <p><strong>Vehicle Type:</strong> {transport.vehicleType || 'N/A'}</p>
              <p><strong>Status:</strong> {transport.status || 'Unknown'}</p>
              <p><strong>Last Maintenance:</strong> {transport.lastMaintenance || 'Not recorded'}</p>
            </div>
            <div className="card-actions">
              <button className="view-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransportList;