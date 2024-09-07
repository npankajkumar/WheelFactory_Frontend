import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManagerDashboard from './manager';

const ManagerRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/manager/:userId" element={<ManagerDashboard />} />
      </Routes>
    </Router>
  );
};

export default ManagerRoutes;
