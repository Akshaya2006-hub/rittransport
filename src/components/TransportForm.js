// src/components/TransportForm.jsx
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';

function TransportForm({ onTransportAdded }) {
  const [formData, setFormData] = useState({
    vehicleName: '',
    vehicleNumber: '',
    vehicleType: 'Bus', // Default value
    capacity: '',
    status: 'Active', // Default value
    lastMaintenance: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create a new transport document in Firestore
      const transportRef = collection(db, 'transport');
      await addDoc(transportRef, {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Reset form
      setFormData({
        vehicleName: '',
        vehicleNumber: '',
        vehicleType: 'Bus',
        capacity: '',
        status: 'Active',
        lastMaintenance: '',
        notes: ''
      });
      
      // Notify parent component that transport was added
      if (onTransportAdded) {
        onTransportAdded();
      }
      
    } catch (err) {
      console.error('Error adding transport:', err);
      setError('Failed to add transport. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="transport-form-container">
      <h2>Add New Transport</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="transport-form">
        <div className="form-group">
          <label htmlFor="vehicleName">Vehicle Name</label>
          <input
            type="text"
            id="vehicleName"
            name="vehicleName"
            value={formData.vehicleName}
            onChange={handleChange}
            required
            placeholder="Enter vehicle name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="vehicleNumber">Vehicle Number</label>
          <input
            type="text"
            id="vehicleNumber"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            placeholder="Enter vehicle number (e.g., TN-01-AA-1234)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="vehicleType">Vehicle Type</label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          >
            <option value="Bus">Bus</option>
            <option value="Van">Van</option>
            <option value="Car">Car</option>
            <option value="Truck">Truck</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Enter seating capacity"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Maintenance">In Maintenance</option>
            <option value="Out of Service">Out of Service</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="lastMaintenance">Last Maintenance Date</label>
          <input
            type="date"
            id="lastMaintenance"
            name="lastMaintenance"
            value={formData.lastMaintenance}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any additional information"
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Transport'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransportForm;