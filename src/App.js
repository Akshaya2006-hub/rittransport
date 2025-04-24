// App.js
import React from 'react';
import Dashboard from './components/Dashboard';

import LoginPage from './components/login_page';

// Adjust the path if needed
import './App.css'; // Optional: your global styles

function App() {
  return (
    <div className="App">
      <Dashboard />
      <LoginPage />

    </div>
  );
}

export default App;
