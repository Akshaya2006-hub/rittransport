import React, { useState, useEffect } from 'react';
//import './css pages/OrdersPage.css'; // Optional CSS

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API endpoint to fetch all orders
    fetch('/api/orders/all')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error fetching orders: {error.message}</div>;
  }

  return (
    <div className="orders-page">
      <h1>Orders</h1>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
              {/* Add other relevant order details */}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.orderDate}</td>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
                {/* Add other order details */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
      {/* You can add filtering, sorting, or details for individual orders */}
    </div>
  );
}

export default OrdersPage;