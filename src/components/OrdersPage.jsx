// OrdersPage.jsx
import React from 'react';
import { ArrowLeft, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const orders = [
  { id: 1, part: 'Seat', bus: 'R12', route: 'MINJUR' },
  { id: 2, part: 'Wiper', bus: 'R21', route: 'MKB NAGAR' },
  { id: 3, part: 'Battery', bus: 'R18', route: 'PALLIKARANAI' },
  { id: 4, part: 'Mirror', bus: 'R05', route: 'THACHOOR' },
  { id: 5, part: 'Tyres', bus: 'R01', route: 'COLLECTOR NAGAR' },
];

function OrdersPage() {
  const navigate = useNavigate();

  const handleBack = () => navigate('/dashboard');

  return (
    <div className="orders-container">
      <div className="orders-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="orders-title">
          <ClipboardList style={{ marginRight: '12px', color: '#10b981' }} />
          Spare Parts Orders
        </h1>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-left">
              <h3 className="order-title">{order.part}</h3>
              <p className="order-info">Bus: {order.bus}</p>
              <p className="order-info">Route: {order.route}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .orders-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 24px;
        }

        .orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #10b981;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }

        .orders-title {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 700;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .order-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .order-left {
          display: flex;
          flex-direction: column;
        }

        .order-title {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .order-info {
          font-size: 14px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}

export default OrdersPage;
